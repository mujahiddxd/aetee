import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { escapeHtml, sendOrderNotification, sendPaymentFailedNotification } from '@/lib/telegram';

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      console.error('[Razorpay Webhook] CRITICAL: RAZORPAY_WEBHOOK_SECRET is missing in environment variables. Webhook cannot be verified and will fail.');
      return NextResponse.json({ error: 'Webhook configuration error' }, { status: 500 });
    }

    // Verify the webhook signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    let isValid = false;
    try {
      isValid = crypto.timingSafeEqual(
        Buffer.from(generated_signature),
        Buffer.from(signature)
      );
    } catch (e) {
      isValid = false; // Length mismatch
    }

    if (!isValid) {
      console.error('Webhook signature mismatch');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const body = JSON.parse(rawBody);



    // We can listen for 'order.paid' or 'payment.captured'
    if (body.event === 'order.paid' || body.event === 'payment.captured') {
      let razorpayOrderId = null;

      if (body.event === 'order.paid') {
        razorpayOrderId = body.payload.order?.entity?.id;
      } else if (body.event === 'payment.captured') {
        razorpayOrderId = body.payload.payment?.entity?.order_id;
      }

      if (!razorpayOrderId) {
        return NextResponse.json({ success: true, message: 'No order ID found in payload' });
      }

      // Fetch the full order details from the database
      const order = await prisma.order.findUnique({
        where: { razorpayOrderId: razorpayOrderId },
        include: {
          user: {
            include: {
              addresses: {
                orderBy: { createdAt: 'desc' },
                take: 1
              }
            }
          },
          items: {
            include: { product: true }
          }
        }
      });

      if (!order) {
        console.error(`Order not found for Razorpay Order ID: ${razorpayOrderId}`);
        return NextResponse.json({ success: true, message: 'Order not found in DB' });
      }

      // Atomically check-and-set status to prevent duplicate messages from concurrent webhooks
      const updateResult = await prisma.order.updateMany({
        where: { id: order.id, status: { in: ['PENDING', 'FAILED'] } },
        data: { status: 'PAID' }
      });

      if (updateResult.count === 0) {
        return NextResponse.json({ success: true, message: 'Order already processed concurrently' });
      }

      // Format Telegram message (escape all user-supplied values)
      let itemsText = '';
      order.items.forEach((item, index) => {
        const pName = escapeHtml(item.product?.name || `Product #${item.productId}`);

        let extras = [];
        if (item.size) extras.push(`Size: ${escapeHtml(item.size)}`);
        if (item.addons) extras.push(`Addons: ${escapeHtml(item.addons)}`);
        const extrasStr = extras.length > 0 ? ` [${extras.join(', ')}]` : '';

        itemsText += `${index + 1}. ${pName}${extrasStr} - Qty: ${item.quantity} (₹${Number(item.price).toFixed(2)})\n`;
      });

      // Calculate Delivery Time (Before 12 PM IST = Same Day)
      const hourFormatter = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
      const orderHourIST = parseInt(hourFormatter.format(order.createdAt), 10);

      const dateFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' });
      const todayStr = dateFormatter.format(order.createdAt);
      const tomorrowStr = dateFormatter.format(new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000));

      // Calculate Daily Serial Number
      const startOfDay = new Date(`${todayStr}T00:00:00+05:30`);
      const serialNumber = await prisma.order.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: order.createdAt
          }
        }
      });

      const deliveryDateStr = order.deliveryDate
        ? new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(order.deliveryDate))
        : null;

      const finalDeliveryText = deliveryDateStr || (orderHourIST < 12 ? `SAME DAY (${todayStr})` : `NEXT DAY (${tomorrowStr})`);

      // Send using centralized helper (handles escaping, retries, and plain-text fallback)
      const tgResult = await sendOrderNotification(order, serialNumber, finalDeliveryText, itemsText);

      if (!tgResult.ok) {
        console.error('Failed to send Telegram message:', tgResult.description);
      } else {
        console.log('Successfully sent Telegram notification for order:', order.id);
      }

      // Send WhatsApp Receipt
      if (order.user.phone && process.env.WHATSAPP_API_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
        const cleanPhone = order.user.phone.replace(/\D/g, '');
        const waMessage = `*Payment Successful!*\n\nHi ${order.user.firstName},\nThank you for your order! Your payment of ₹${order.totalAmount} has been received.\n\n*Delivery:* ${finalDeliveryText}\n\nWe will notify you once it's out for delivery.`;

        const waUrl = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
        await fetch(waUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: cleanPhone,
            type: 'text',
            text: { body: waMessage },
          })
        }).then(async res => {
          if (!res.ok) console.error('WhatsApp Receipt API Error:', await res.text());
        }).catch(e => console.error('WhatsApp Receipt Exception:', e));
      }
    } else if (body.event === 'payment.failed') {
      const razorpayOrderId = body.payload.payment?.entity?.order_id;
      if (razorpayOrderId) {
        const order = await prisma.order.findUnique({
          where: { razorpayOrderId: razorpayOrderId },
          include: { user: true }
        });

        if (order) {
          const updateResult = await prisma.order.updateMany({
            where: { id: order.id, status: 'PENDING' },
            data: { status: 'FAILED' }
          });

          if (updateResult.count > 0) {
            // Send failure notification using centralized helper
            await sendPaymentFailedNotification(
              order,
              body.payload.payment?.entity?.error_description
            );

            // Send WhatsApp Failure Alert
            if (order.user.phone && process.env.WHATSAPP_API_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
              const cleanPhone = order.user.phone.replace(/\D/g, '');
              const waFailMessage = `*Payment Failed*\n\nHi ${order.user.firstName},\nWe noticed your recent payment attempt of ₹${order.totalAmount} failed.\n\nPlease try again on our website or contact support if you need help.`;

              const waUrl = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
              await fetch(waUrl, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  messaging_product: 'whatsapp',
                  recipient_type: 'individual',
                  to: cleanPhone,
                  type: 'text',
                  text: { body: waFailMessage },
                })
              }).then(async res => {
                if (!res.ok) console.error('WhatsApp Failure Alert API Error:', await res.text());
              }).catch(e => console.error('WhatsApp Failure Alert Exception:', e));
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Razorpay Webhook] Fatal Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed', details: error.message }, { status: 500 });
  }
}
