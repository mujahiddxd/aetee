import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { escapeHtml, sendOrderNotification } from '@/lib/telegram';
import { checkRateLimit } from '@/lib/rateLimitMemory';

import Razorpay from 'razorpay';

export async function POST(req) {
  const limited = checkRateLimit(req, 'payment_verify', { max: 20, windowMs: 60000 });
  if (limited) return limited;

  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      delivery_date
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Re-generate the signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    // 2. Validate the signature (timing attack safe)
    let isValid = false;
    try {
      isValid = crypto.timingSafeEqual(
        Buffer.from(generated_signature),
        Buffer.from(razorpay_signature)
      );
    } catch (e) {
      isValid = false; // Length mismatch
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // 3. Removed: Old auto-refund rate limit check (capacity is now safely reserved at checkout)

    // 4. Signature is valid, update the order in the database to PAID
    const updateResult = await prisma.order.updateMany({
      where: {
        razorpayOrderId: razorpay_order_id,
        status: { in: ['PENDING', 'FAILED'] }
      },
      data: {
        status: 'PAID',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    const wasAlreadyPaid = updateResult.count === 0;

    const updatedOrder = await prisma.order.findUnique({
      where: { razorpayOrderId: razorpay_order_id }
    });

    if (!updatedOrder) {
      console.error('Order not found after payment update for razorpay_order_id:', razorpay_order_id);
      return NextResponse.json({ success: true, message: 'Payment verified but order missing' });
    }

    // 5. Send Telegram Message Instantly and Check Overbooking
    try {
      if (updatedOrder.deliveryDate && !wasAlreadyPaid) {
        const dateStr = updatedOrder.deliveryDate.toISOString().split('T')[0];
        const capacityCount = await prisma.order.count({
          where: {
            deliveryDate: updatedOrder.deliveryDate,
            status: 'PAID'
          }
        });

        // Deduplicate the alert using globalThis so we don't spam if multiple stale payments land
        if (capacityCount >= 26) {
          const alertKey = `overbook-alerted-${dateStr}`;
          const alreadyAlerted = globalThis[alertKey];
          
          if (!alreadyAlerted) {
            globalThis[alertKey] = true;
            
            const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
            const telegramChatId = process.env.TELEGRAM_CHAT_ID;
            if (telegramToken && telegramChatId) {
              const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
              const message = `🚨 ⚠️ *OVERBOOK ALERT* ⚠️ 🚨\n\nDelivery date *${dateStr}* has exceeded capacity!\nCurrently at *${capacityCount}/25* paid orders.\n\n_Please check the dashboard and contact a customer if necessary._`;
              
              await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: telegramChatId,
                  text: message,
                  parse_mode: 'Markdown'
                })
              }).catch(err => console.error('Failed to send overbook alert:', err));
            }
          }
        }
      }
      const fullOrder = await prisma.order.findUnique({
        where: { id: updatedOrder.id },
        include: {
          user: { include: { addresses: { orderBy: { createdAt: 'desc' }, take: 1 } } },
          items: { include: { product: true } }
        }
      });

      if (fullOrder && process.env.TELEGRAM_BOT_TOKEN && !wasAlreadyPaid) {
        let itemsText = '';
        fullOrder.items.forEach((item, index) => {
          const pName = escapeHtml(item.product?.name || `Product #${item.productId}`);
          let extras = [];
          if (item.size) extras.push(`Size: ${escapeHtml(item.size)}`);
          if (item.addons) extras.push(`Addons: ${escapeHtml(item.addons)}`);
          const extrasStr = extras.length > 0 ? ` [${extras.join(', ')}]` : '';
          itemsText += `${index + 1}. ${pName}${extrasStr} - Qty: ${item.quantity} (₹${Number(item.price).toFixed(2)})\n`;
        });

        const hourFormatter = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
        const orderHourIST = parseInt(hourFormatter.format(fullOrder.createdAt), 10);
        const dateFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' });
        const todayStr = dateFormatter.format(fullOrder.createdAt);
        const tomorrowStr = dateFormatter.format(new Date(fullOrder.createdAt.getTime() + 24 * 60 * 60 * 1000));

        const startOfDay = new Date(`${todayStr}T00:00:00+05:30`);
        const serialNumber = await prisma.order.count({
          where: {
            createdAt: { gte: startOfDay, lte: fullOrder.createdAt },
            status: { notIn: ['PENDING', 'FAILED', 'CANCELLED'] }
          }
        });

        const finalDeliveryText = fullOrder.deliveryDate
          ? new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(fullOrder.deliveryDate))
          : (orderHourIST < 12 ? `SAME DAY (${todayStr})` : `NEXT DAY (${tomorrowStr})`);

        // Collect notification promises and await them with a timeout
        // so they complete before the process exits
        const notificationPromises = [];

        notificationPromises.push(
          sendOrderNotification(fullOrder, serialNumber, finalDeliveryText, itemsText)
            .then(result => {
              if (!result.ok) console.error('Telegram send failed:', result.description);
            })
            .catch(e => console.error('Telegram error:', e))
        );

        // --- Send Email Receipt via Google Apps Script ---
        if (fullOrder.user.email && process.env.GOOGLE_SCRIPT_URL) {
          const emailPayload = {
            customerEmail: fullOrder.user.email,
            customerName: fullOrder.user.firstName || 'Customer',
            orderId: `${serialNumber}`,
            totalAmount: `${fullOrder.totalAmount}`,
            deliveryDate: finalDeliveryText,
            itemsText: itemsText
          };

          notificationPromises.push(
            fetch(process.env.GOOGLE_SCRIPT_URL, {
              method: 'POST',
              body: JSON.stringify(emailPayload)
            })
            .then(res => res.json())
            .then(data => console.log('Email Script Response:', data))
            .catch(e => console.error('Email Script Error:', e))
          );
        }

        // Wait for all notifications with a 8-second timeout to prevent process hang
        await Promise.race([
          Promise.allSettled(notificationPromises),
          new Promise(resolve => setTimeout(resolve, 8000))
        ]);
      }
    } catch (err) {
      console.error('Error sending fallback telegram message:', err);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
