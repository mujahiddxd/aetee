import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    // Verify the webhook signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (generated_signature !== signature) {
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

      // Format Telegram message
      let itemsText = '';
      order.items.forEach((item, index) => {
        const pName = item.product?.name || `Product #${item.productId}`;
        itemsText += `${index + 1}. ${pName} - Qty: ${item.quantity} (₹${Number(item.price).toFixed(2)})\n`;
      });

      // Extract address
      const address = order.user.addresses && order.user.addresses.length > 0 ? order.user.addresses[0] : null;
      const addressText = address 
        ? `${address.addressLine1}${address.addressLine2 ? ', ' + address.addressLine2 : ''}, ${address.city} - ${address.postalCode}`
        : 'N/A';

      // Calculate Delivery Time (Before 12 PM IST = Same Day)
      const formatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        hour12: false
      });
      const orderHourIST = parseInt(formatter.format(order.createdAt), 10);
      const deliveryNote = orderHourIST < 12 ? "🚚 *Delivery:* SAME DAY (Today)" : "📅 *Delivery:* NEXT DAY (Tomorrow)";

      const message = `
🎉 *NEW ORDER RECEIVED!* 🎉

*Order ID:* ${order.id}
*Customer:* ${order.user.firstName} ${order.user.lastName}
*Phone:* ${order.user.phone || 'N/A'}
*Address:* ${addressText}
*Amount Paid:* ₹${order.totalAmount}
${deliveryNote}

*Items Ordered:*
${itemsText}
      `.trim();

      // Send to Telegram
      const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Failed to send Telegram message:', errorData);
      } else {
        console.log('Successfully sent Telegram notification for order:', order.id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook Processing Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
