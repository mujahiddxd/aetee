import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const body = await req.json();
    const { 
      firstName, lastName, email, phone, 
      addressLine1, addressLine2, city, postalCode,
      totalAmount, items 
    } = body;

    if (!email || !firstName || !lastName || !addressLine1 || !city || !postalCode || !items || !items.length) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Validate amount before any DB or API calls
    const amountInPaise = Math.round(totalAmount * 100);
    if (amountInPaise < 100) {
      return NextResponse.json({ success: false, error: 'Minimum amount must be at least 100 paise' }, { status: 400 });
    }

    // 2. Rate limit: max 25 paid orders per 24 hours
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      const recentPaidOrders = await prisma.order.count({
        where: {
          userId: existingUser.id,
          status: 'PAID',
          createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      });

      if (recentPaidOrders >= 0) {
        return NextResponse.json(
          { success: false, error: 'You have reached the maximum limit of 25 orders in 24 hours. Please try again later.' },
          { status: 429 }
        );
      }
    }

    // 3. Create Razorpay Order (external API — cannot be rolled back)
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    // 3. Wrap all DB writes in a transaction for atomicity
    const { user, dbOrder } = await prisma.$transaction(async (tx) => {
      // Find or create User
      let txUser = await tx.user.findUnique({
        where: { email },
      });

      if (!txUser) {
        txUser = await tx.user.create({
          data: { firstName, lastName, email, phone },
        });
      } else {
        // Update user details if they changed
        txUser = await tx.user.update({
          where: { id: txUser.id },
          data: { firstName, lastName, phone },
        });
      }

      // Create Address
      await tx.address.create({
        data: {
          userId: txUser.id,
          addressLine1,
          addressLine2: addressLine2 || null,
          city,
          postalCode,
        },
      });

      // Create Order with items
      const txOrder = await tx.order.create({
        data: {
          userId: txUser.id,
          totalAmount: totalAmount,
          status: 'PENDING',
          razorpayOrderId: razorpayOrder.id,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
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
    
    if (error.statusCode === 401) {
      return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 401 });
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process checkout' },
      { status: 500 }
    );
  }
}
