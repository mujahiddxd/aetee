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

    // 1. Find or create User
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
        },
      });
    } else {
      // Optionally update user details if they changed
      user = await prisma.user.update({
        where: { id: user.id },
        data: { firstName, lastName, phone }
      });
    }

    // 2. Create Address
    await prisma.address.create({
      data: {
        userId: user.id,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        postalCode,
      }
    });

    // 3. Create Razorpay Order
    // In production, recalculate totalAmount from DB prices to prevent tampering!
    const amountInPaise = Math.round(totalAmount * 100);
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // 4. Create Order in Database
    const dbOrder = await prisma.order.create({
      data: {
        userId: user.id,
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
    return NextResponse.json(
      { success: false, error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}
