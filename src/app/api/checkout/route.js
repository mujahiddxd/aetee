import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';
import { stripHtml } from '@/lib/sanitize';
import { verifyTurnstile } from '@/lib/turnstile';

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      firstName, lastName, email, phone, 
      addressLine1, addressLine2, city, postalCode,
      distance,
      totalAmount, items, deliveryDate, additionalInfo 
    } = body;

    // ── 1. Strict Input Validation ──────────────────────────────────
    if (!email || !firstName || !lastName || !addressLine1 || !city || !postalCode || !items || !items.length) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
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

    if (typeof postalCode !== 'string' || (postalCode !== '' && !/^\d{6}$/.test(postalCode))) {
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
      const istFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' });
      const todayIST = istFormatter.format(now); // 'YYYY-MM-DD'
      if (deliveryDate < todayIST) {
        return NextResponse.json({ success: false, error: 'Delivery date cannot be in the past' }, { status: 400 });
      }
    }

    // ── Turnstile verification ──────────────────────────────────────
    const turnstileToken = body['cf-turnstile-response'];
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || '';
    const turnstileResult = await verifyTurnstile(turnstileToken, clientIp);
    if (!turnstileResult.success) {
      return NextResponse.json({ success: false, error: 'Bot verification failed' }, { status: 403 });
    }
    // ────────────────────────────────────────────────────────────────

    // ── 2. Sanitize text inputs ─────────────────────────────────────
    const safeFirstName = stripHtml(firstName);
    const safeLastName = stripHtml(lastName);
    const safeAddressLine1 = stripHtml(addressLine1);
    const safeAddressLine2 = addressLine2 ? stripHtml(addressLine2) : null;
    const safeCity = stripHtml(city);
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
    
    if (serverCalculatedTotal > 0) {
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
      address: fullAddress.substring(0, 255),
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

    // ── 7. Wrap all DB writes in a transaction ──────────────────────
    const { user, dbOrder } = await prisma.$transaction(async (tx) => {
      let txUser = await tx.user.findUnique({ where: { email } });

      if (!txUser) {
        txUser = await tx.user.create({
          data: { firstName: safeFirstName, lastName: safeLastName, email, phone },
        });
      } else {
        // ⚠️ CRITICAL — ROW LOCK: This update acquires an EXCLUSIVE ROW LOCK (X lock)
        // on this user record in MySQL/InnoDB. Any concurrent transaction for the same
        // user will be blocked at this line until this transaction commits or rolls back.
        // This serializes concurrent checkouts and makes the rate limit check below
        // race-condition-proof. DO NOT REMOVE this update without adding an alternative
        // locking mechanism (e.g., SELECT ... FOR UPDATE).
        txUser = await tx.user.update({
          where: { id: txUser.id },
          data: { firstName: safeFirstName, lastName: safeLastName, phone },
        });
      }

      // ── 5 (moved here). Rate limit: max 25 paid orders per 24 hours ─
      // Safe from race conditions because the tx.user.update above holds an
      // exclusive row lock, serializing all concurrent requests for this user.
      const now = new Date();
      const year = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric' }).format(now);
      const month = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', month: '2-digit' }).format(now);
      const day = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', day: '2-digit' }).format(now);
      const startOfDay = new Date(`${year}-${month}-${day}T00:00:00+05:30`);

      const recentPaidOrders = await tx.order.count({
        where: {
          userId: txUser.id,
          status: 'PAID',
          createdAt: { gte: startOfDay },
        },
      });

      if (recentPaidOrders >= 25) {
        throw new Error('RATE_LIMITED');
      }

      await tx.address.create({
        data: {
          userId: txUser.id,
          addressLine1: safeAddressLine1,
          addressLine2: safeAddressLine2,
          city: safeCity,
          postalCode,
        },
      });

      const txOrder = await tx.order.create({
        data: {
          userId: txUser.id,
          totalAmount: verifiedTotal,
          status: 'PENDING',
          razorpayOrderId: razorpayOrder.id,
          deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
          notes: safeAdditionalInfo,
          items: {
            create: verifiedItems,
          },
        },
      });

      return { user: txUser, dbOrder: txOrder };
    });

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

    if (error.message === 'RATE_LIMITED') {
      return NextResponse.json(
        { success: false, error: 'Sorry for the inconvenience, but you have reached the maximum limit of 25 orders in a day. Please try ordering again tomorrow.' },
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
