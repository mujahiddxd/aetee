import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

import Razorpay from 'razorpay';

export async function POST(req) {
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

    // 2. Validate the signature
    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // 3. Defense-in-depth: re-check limit before marking PAID
    const order = await prisma.order.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
      select: { userId: true },
    });

    if (order) {
      const recentPaidOrders = await prisma.order.count({
        where: {
          userId: order.userId,
          status: 'PAID',
          createdAt: {
            gte: (() => {
              const now = new Date();
              const year = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric' }).format(now);
              const month = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', month: '2-digit' }).format(now);
              const day = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', day: '2-digit' }).format(now);
              return new Date(`${year}-${month}-${day}T00:00:00+05:30`);
            })()
          },
        },
      });

      if (recentPaidOrders >= 5) {
        // Auto-refund — customer never loses money
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        try {
          await razorpay.payments.refund(razorpay_payment_id, {
            speed: 'normal',
          });
        } catch (refundError) {
          console.error('Auto-refund failed:', refundError);
          // still mark as FAILED so it's visible for manual refund
        }

        // Mark order as FAILED so admin dashboard reflects reality
        await prisma.order.update({
          where: { razorpayOrderId: razorpay_order_id },
          data: {
            status: 'FAILED',
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
          },
        });

        return NextResponse.json(
          { success: false, error: 'Sorry for the inconvenience, but you have reached the maximum limit of 5 orders in a day. Your payment has been automatically refunded.' },
          { status: 429 }
        );
      }
    }

    // 4. Signature is valid, update the order in the database to PAID
    const updatedOrder = await prisma.order.update({
      where: {
        razorpayOrderId: razorpay_order_id,
      },
      data: {
        status: 'PAID',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    // 5. Send Telegram Message Instantly
    try {
      const fullOrder = await prisma.order.findUnique({
        where: { id: updatedOrder.id },
        include: {
          user: { include: { addresses: { orderBy: { createdAt: 'desc' }, take: 1 } } },
          items: { include: { product: true } }
        }
      });

      if (fullOrder && process.env.TELEGRAM_BOT_TOKEN) {
        let itemsText = '';
        fullOrder.items.forEach((item, index) => {
          const pName = item.product?.name || `Product #${item.productId}`;
          let extras = [];
          if (item.size) extras.push(`Size: ${item.size}`);
          if (item.addons) extras.push(`Addons: ${item.addons}`);
          const extrasStr = extras.length > 0 ? ` [${extras.join(', ')}]` : '';
          itemsText += `${index + 1}. ${pName}${extrasStr} - Qty: ${item.quantity} (₹${Number(item.price).toFixed(2)})\n`;
        });

        const address = fullOrder.user.addresses && fullOrder.user.addresses.length > 0 ? fullOrder.user.addresses[0] : null;
        const addressText = address ? `${address.addressLine1}${address.addressLine2 ? ', ' + address.addressLine2 : ''}, ${address.city} - ${address.postalCode}` : 'N/A';

        const hourFormatter = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
        const orderHourIST = parseInt(hourFormatter.format(fullOrder.createdAt), 10);
        const dateFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' });
        const todayStr = dateFormatter.format(fullOrder.createdAt);
        const tomorrowStr = dateFormatter.format(new Date(fullOrder.createdAt.getTime() + 24 * 60 * 60 * 1000));
        const deliveryNote = orderHourIST < 12 ? `🚚 *Delivery:* SAME DAY (${todayStr})` : `📅 *Delivery:* NEXT DAY (${tomorrowStr})`;

        const startOfDay = new Date(`${todayStr}T00:00:00+05:30`);
        const serialNumber = await prisma.order.count({
          where: { createdAt: { gte: startOfDay, lte: fullOrder.createdAt } }
        });

        const deliveryDateStr = fullOrder.deliveryDate 
          ? new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(fullOrder.deliveryDate))
          : null;

        const message = `
🎉 *NEW ORDER RECEIVED! (Daily #${serialNumber})* 🎉

*Daily Order No:* #${serialNumber}
*System ID:* ${fullOrder.id}
*Razorpay ID:* ${fullOrder.razorpayOrderId}
*Customer:* ${fullOrder.user.firstName} ${fullOrder.user.lastName}
*Phone:* ${fullOrder.user.phone || 'N/A'}
*Address:* ${addressText}
*Amount Paid:* ₹${fullOrder.totalAmount}
📅 *Delivery Date:* ${deliveryDateStr || 'Not specified'}
${deliveryNote}
${fullOrder.notes ? `\n📝 *Special Instructions:*\n${fullOrder.notes}\n` : ''}

*Items Ordered:*
${itemsText}
        `.trim();

        fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' }),
        }).catch(e => console.error('Telegram error:', e));
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
