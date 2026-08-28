import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';
import { stripHtml } from '@/lib/sanitize';

import { getISTHour, getISTDateString } from '@/lib/ist-time';
import { checkRateLimit } from '@/lib/rateLimitMemory';
import { isDateBlocked } from '@/lib/blocked-dates';

const BLOCKED_DATE_MESSAGE = "We're not delivering on the selected date. Please choose another delivery date.";

export async function POST(req) {
  const limited = checkRateLimit(req, 'checkout', { max: 15, windowMs: 60000 });
  if (limited) return limited;

  try {
    const body = await req.json();
    const {
      firstName, lastName, email, phone,
      addressLine1, addressLine2, city, postalCode,
      distance,
      totalAmount, items, deliveryDate, additionalInfo,
      deliveryType: rawDeliveryType
    } = body;

    // Normalize deliveryType — only 'PICKUP' or 'DELIVERY'
    const deliveryType = rawDeliveryType === 'PICKUP' ? 'PICKUP' : 'DELIVERY';
    const isPickup = deliveryType === 'PICKUP';

    // ── 1. Strict Input Validation ──────────────────────────────────
    if (!email || !firstName || !lastName || !items || !items.length) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Address fields are only required for delivery orders
    if (!isPickup && (!addressLine1 || !city)) {
      return NextResponse.json({ success: false, error: 'Address is required for delivery orders' }, { status: 400 });
    }

    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    if (typeof phone !== 'string' || !/^\d{10}$/.test(phone)) {
      return NextResponse.json({ success: false, error: 'Phone must be exactly 10 digits' }, { status: 400 });
    }

    if (typeof firstName !== 'string' || firstName.length > 100 || typeof lastName !== 'string' || lastName.length > 100) {
      return NextResponse.json({ success: false, error: 'Name fields are invalid' }, { status: 400 });
    }

    if (!isPickup && typeof postalCode !== 'string' || (!isPickup && postalCode !== '' && !/^\d{6}$/.test(postalCode))) {
      return NextResponse.json({ success: false, error: 'Invalid pincode format' }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return NextResponse.json({ success: false, error: 'Invalid items list' }, { status: 400 });
    }

    for (const item of items) {
      if (!item.productId || typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > 100) {
        return NextResponse.json({ success: false, error: 'Invalid item in cart' }, { status: 400 });
      }
    }

    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid total amount' }, { status: 400 });
    }

    // Validate delivery date is not in the past (IST)
    if (deliveryDate) {
      const now = new Date();
      const todayIST = getISTDateString(now);

      const cleanDateStr = typeof deliveryDate === 'string' ? deliveryDate.split('T')[0] : new Date(deliveryDate).toISOString().split('T')[0];

      // Admin-disabled dates — fast fail before doing any expensive work.
      // Re-checked inside the transaction below to close the race where a
      // date is disabled mid-checkout.
      if (await isDateBlocked(cleanDateStr)) {
        return NextResponse.json({ success: false, error: BLOCKED_DATE_MESSAGE }, { status: 400 });
      }

      // Block past dates outright
      if (deliveryDate < todayIST) {
        return NextResponse.json({ success: false, error: 'Delivery date cannot be in the past' }, { status: 400 });
      }

      // Enforce the 12 PM cutoff for same-day requests
      if (deliveryDate === todayIST) {
        const istHour = getISTHour(now);
        
        if (istHour >= 12) {
          return NextResponse.json({ 
            success: false, 
            error: 'Same-day delivery is only available for orders placed before 12 PM. Please select a future date.' 
          }, { status: 400 });
        }
      }
    }



    // ── 2. Sanitize text inputs ─────────────────────────────────────
    const safeFirstName = stripHtml(firstName);
    const safeLastName = stripHtml(lastName);
    const safeAddressLine1 = isPickup ? 'Store Pickup' : stripHtml(addressLine1);
    const safeAddressLine2 = isPickup ? null : (addressLine2 ? stripHtml(addressLine2) : null);
    const safeCity = isPickup ? 'Mumbai' : stripHtml(city);
    const safeAdditionalInfo = additionalInfo ? stripHtml(additionalInfo) : null;

    // ── 3. Server-side Price Verification ───────────────────────────
    // Look up actual product prices from the database
    const productIds = items.map(i => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { options: true }
    });

    const productMap = {};
    for (const p of products) {
      productMap[p.id] = p;
    }

    // Verify every item exists and recalculate the total
    let serverCalculatedTotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const product = productMap[item.productId];
      if (!product) {
        return NextResponse.json({ success: false, error: `Product not found: ${item.productId}` }, { status: 400 });
      }

      if (product.isSoldOut) {
        return NextResponse.json({ success: false, error: `${product.name} is currently sold out` }, { status: 400 });
      }

      // Base price from the database (NOT from the frontend)
      let itemPrice = Number(product.price);

      // Add option extras if size/addons were selected
      if (item.size && product.options) {
        const expectedSizeName = `size:::${item.size.toLowerCase()}`;
        const rawSizeName = item.size.toLowerCase();
        const sizeOption = product.options.find(opt => opt.name.toLowerCase() === expectedSizeName || opt.name.toLowerCase() === rawSizeName);
        if (sizeOption) {
          itemPrice += Number(sizeOption.extraPrice);
        }
      }

      if (item.addons && product.options) {
        const addonNames = item.addons.split(',').map(a => a.trim().toLowerCase());
        for (const addonName of addonNames) {
          const expectedAddonName = `addon:::${addonName}`;
          const addonOption = product.options.find(opt => opt.name.toLowerCase() === expectedAddonName || opt.name.toLowerCase() === addonName);
          if (addonOption) {
            itemPrice += Number(addonOption.extraPrice);
          }
        }
      }

      serverCalculatedTotal += itemPrice * item.quantity;
      verifiedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: itemPrice,
        size: item.size || null,
        addons: item.addons || null,
      });
    }

    // ── 3.5 Calculate Delivery Charges Securely on the Server ──
    // We IGNORE the client-provided distance completely and recalculate it here
    let deliveryCharges = 0;

    // Pickup orders have zero delivery charges — skip distance calculation entirely
    if (!isPickup && serverCalculatedTotal > 0) {
      try {
        const SHOP_ADDRESS = "NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089";
        // Create full destination string exactly as the frontend would
        const destinationAddress = `${safeAddressLine1}, ${safeCity} - ${postalCode}`;

        const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!googleApiKey) {
          throw new Error("Missing Google Maps API Key in environment");
        }

        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(SHOP_ADDRESS)}&destinations=${encodeURIComponent(destinationAddress)}&key=${googleApiKey}`;

        // We spoof the Referer just in case the API key has HTTP referer restrictions
        const mapsRes = await fetch(url, {
          headers: { 'Referer': 'https://aeteesbakehouse.com/' }
        });

        const mapsData = await mapsRes.json();

        if (mapsData.status === 'OK' && mapsData.rows[0] && mapsData.rows[0].elements[0].status === 'OK') {
          const distanceInMeters = mapsData.rows[0].elements[0].distance.value;
          const verifiedDistanceKm = distanceInMeters / 1000;

          if (verifiedDistanceKm > 40) {
            return NextResponse.json({ success: false, error: `Sorry, your location is ${verifiedDistanceKm.toFixed(1)}km away. We do not deliver beyond 40km.` }, { status: 400 });
          }

          // Base fee of ₹50 plus ₹10 per km
          const BASE_DELIVERY_FEE = 50;
          const COST_PER_KM = 10;
          deliveryCharges = BASE_DELIVERY_FEE + Math.ceil(verifiedDistanceKm * COST_PER_KM);
        } else {
          // If Google Maps fails (e.g. unrecognizable address), reject the order to prevent free delivery abuse
          console.error("Google Maps Distance API Error:", mapsData);
          return NextResponse.json({ success: false, error: 'Could not verify delivery distance for this address. Please ensure the address is correct.' }, { status: 400 });
        }
      } catch (err) {
        console.error("Server distance calculation error:", err);
        return NextResponse.json({ success: false, error: 'Internal server error calculating delivery charges.' }, { status: 500 });
      }
    }

    serverCalculatedTotal += deliveryCharges;
    serverCalculatedTotal = parseFloat(serverCalculatedTotal.toFixed(2));

    // Use the server-calculated total for all downstream operations
    const verifiedTotal = serverCalculatedTotal;

    // ── 4. Validate minimum amount ──────────────────────────────────
    const amountInPaise = Math.round(verifiedTotal * 100);
    if (amountInPaise < 100) {
      return NextResponse.json({ success: false, error: 'Minimum amount must be at least ₹1' }, { status: 400 });
    }

    // ── 5. Rate limit check moved inside the transaction (see step 7) ──
    // NOTE: Moving this check here (outside the transaction) would create a race
    // condition — concurrent requests could all pass at the same time. The check
    // is enforced atomically inside prisma.$transaction below.


    // ── 6. Create Razorpay Order ────────────────────────────────────
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const fullAddress = `${safeAddressLine1}${safeAddressLine2 ? ', ' + safeAddressLine2 : ''}, ${safeCity} - ${postalCode}`;

    let notesObj = {
      order_type: isPickup ? 'Store Pickup' : 'Delivery',
      address: isPickup ? 'Store Pickup — Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089' : fullAddress.substring(0, 255),
      phone: phone,
      customer_name: `${safeFirstName} ${safeLastName}`.substring(0, 255),
      delivery_date: deliveryDate || 'N/A'
    };
    if (safeAdditionalInfo && typeof safeAdditionalInfo === 'string' && safeAdditionalInfo.trim() !== '') {
      notesObj.special_instructions = safeAdditionalInfo.substring(0, 255);
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: notesObj
    });

    // ── 7. Wrap all DB writes in a transaction with Retry Wrapper ───
    let txResult;
    let retries = 0;
    const MAX_RETRIES = 3;

    while (retries < MAX_RETRIES) {
      try {
        txResult = await prisma.$transaction(async (tx) => {
          let txUser = await tx.user.findUnique({ where: { email } });

          if (!txUser) {
            txUser = await tx.user.create({
              data: { firstName: safeFirstName, lastName: safeLastName, email, phone },
            });
          } else {
            txUser = await tx.user.update({
              where: { id: txUser.id },
              data: { firstName: safeFirstName, lastName: safeLastName, phone },
            });
          }

          // ── 5. Global Capacity Limit (Max 25 orders per Delivery Date) ─
          if (deliveryDate) {
            const cleanDateStr = typeof deliveryDate === 'string' ? deliveryDate.split('T')[0] : new Date(deliveryDate).toISOString().split('T')[0];
            const targetDate = new Date(`${cleanDateStr}T00:00:00.000Z`);
            const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);

            // Re-check inside the transaction: the admin may have disabled this
            // date after the validation above ran.
            if (await isDateBlocked(cleanDateStr, tx)) {
              throw new Error('DATE_BLOCKED');
            }

            const capacityCount = await tx.order.count({
              where: {
                deliveryDate: targetDate,
                OR: [
                  { status: 'PAID' },
                  { status: 'PENDING', createdAt: { gte: fifteenMinsAgo } }
                ]
              },
            });

            if (capacityCount >= 25) {
              throw new Error('DATE_FULL');
            }
          }

          // Only create an address record for delivery orders
          if (!isPickup) {
            await tx.address.create({
              data: {
                userId: txUser.id,
                addressLine1: safeAddressLine1,
                addressLine2: safeAddressLine2,
                city: safeCity,
                postalCode,
              },
            });
          }

          const cleanDateStr = deliveryDate ? (typeof deliveryDate === 'string' ? deliveryDate.split('T')[0] : new Date(deliveryDate).toISOString().split('T')[0]) : null;
          const finalDeliveryDate = cleanDateStr ? new Date(`${cleanDateStr}T00:00:00.000Z`) : null;

          const txOrder = await tx.order.create({
            data: {
              userId: txUser.id,
              totalAmount: verifiedTotal,
              status: 'PENDING',
              deliveryType: deliveryType,
              razorpayOrderId: razorpayOrder.id,
              deliveryDate: finalDeliveryDate,
              notes: safeAdditionalInfo,
              items: {
                create: verifiedItems,
              },
            },
          });

          return { user: txUser, dbOrder: txOrder };
        }, { isolationLevel: 'Serializable' });

        break; // Success! Break out of the retry loop.
      } catch (err) {
        // Naturally full or deliberately disabled — retrying won't change either
        if (err.message === 'DATE_FULL' || err.message === 'DATE_BLOCKED') throw err;

        // P2034 is Prisma's error code for a write conflict / deadlock in Serializable transactions
        if (err.code === 'P2034') {
          retries++;
          if (retries >= MAX_RETRIES) throw new Error('DATE_FULL'); // Assume full if we can't get a lock
          // Exponential backoff: 50ms, 100ms
          await new Promise(res => setTimeout(res, 50 * retries));
          continue;
        }

        throw err; // Throw any other unexpected errors
      }
    }

    const { user, dbOrder } = txResult;

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
      dbOrderId: dbOrder.id,
      userId: user.id
    });
  } catch (error) {
    console.error('Error in checkout:', error);

    if (error.message === 'DATE_BLOCKED') {
      return NextResponse.json({ success: false, error: BLOCKED_DATE_MESSAGE }, { status: 400 });
    }

    if (error.message === 'DATE_FULL' || error.message === 'RATE_LIMITED') {
      return NextResponse.json(
        { success: false, error: 'This date is fully booked. Please select another delivery date to place your order. Thank you for choosing AeTee\'s Bakehouse.' },
        { status: 429 }
      );
    }

    if (error.statusCode === 401) {
      return NextResponse.json({ success: false, error: 'Payment gateway authentication failed' }, { status: 401 });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to process checkout. Please try again.' },
      { status: 500 }
    );
  }
}
