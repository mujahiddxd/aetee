import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    // Lazy init - ensures env vars are loaded and prevents build-time issues
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const body = await req.json();
    const { userId, totalAmount, items } = body;

    // IMPORTANT: In a production app, recalculate the totalAmount by fetching
    // the product prices from the database to prevent client-side tampering.
    const amountInPaise = Math.round(totalAmount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR', // Or your preferred currency
      receipt: `receipt_${Date.now()}`,
    };

    // 1. Create order on Razorpay
    const razorpayOrder = await razorpay.orders.create(options);

    // 2. Create the pending order in our database
    const dbOrder = await prisma.order.create({
      data: {
        userId: userId,
        totalAmount: totalAmount,
        status: 'PENDING',
        razorpayOrderId: razorpayOrder.id,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      }
    });

    // 3. Return the Razorpay order ID to the client
    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id, // This is needed by the frontend checkout script
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
      dbOrderId: dbOrder.id
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
