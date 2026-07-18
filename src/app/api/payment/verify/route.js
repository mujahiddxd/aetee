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

      if (recentPaidOrders >= 2) {
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
          { success: false, error: 'Sorry for the inconvenience, but you have reached the maximum limit of 2 orders in a day. Your payment has been automatically refunded.' },
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
