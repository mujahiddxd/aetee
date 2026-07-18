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
      let requestedDate = null;

      if (body.event === 'order.paid') {
        razorpayOrderId = body.payload.order?.entity?.id;
        requestedDate = body.payload.order?.entity?.notes?.delivery_date;
      } else if (body.event === 'payment.captured') {
        razorpayOrderId = body.payload.payment?.entity?.order_id;
        requestedDate = body.payload.payment?.entity?.notes?.delivery_date;
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
        
        let extras = [];
        if (item.size) extras.push(`Size: ${item.size}`);
        if (item.addons) extras.push(`Addons: ${item.addons}`);
        const extrasStr = extras.length > 0 ? ` [${extras.join(', ')}]` : '';

        itemsText += `${index + 1}. ${pName}${extrasStr} - Qty: ${item.quantity} (₹${Number(item.price).toFixed(2)})\n`;
      });

      // Extract address
      const address = order.user.addresses && order.user.addresses.length > 0 ? order.user.addresses[0] : null;
      const addressText = address 
        ? `${address.addressLine1}${address.addressLine2 ? ', ' + address.addressLine2 : ''}, ${address.city} - ${address.postalCode}`
        : 'N/A';

      // Calculate Delivery Time (Before 12 PM IST = Same Day)
      const hourFormatter = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
      const orderHourIST = parseInt(hourFormatter.format(order.createdAt), 10);
      
      const dateFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' });
      const todayStr = dateFormatter.format(order.createdAt);
      const tomorrowStr = dateFormatter.format(new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000));
      
      const deliveryNote = orderHourIST < 12 ? `🚚 *Delivery:* SAME DAY (${todayStr})` : `📅 *Delivery:* NEXT DAY (${tomorrowStr})`;

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

      const message = `
🎉 *NEW ORDER RECEIVED! (Daily #${serialNumber})* 🎉

*Daily Order No:* #${serialNumber}
*System ID:* ${order.id}
*Razorpay ID:* ${order.razorpayOrderId}
*Customer:* ${order.user.firstName} ${order.user.lastName}
*Phone:* ${order.user.phone || 'N/A'}
*Address:* ${addressText}
*Amount Paid:* ₹${order.totalAmount}
${requestedDate ? `*Requested Date:* ${requestedDate}` : ''}
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
