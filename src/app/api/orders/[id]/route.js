import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            addresses: true, // Fetch all addresses, could be refined to just the one used for the order if we linked it
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                imageUrl: true,
              }
            }
          }
        },
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Format the response
    const formatted = {
      id: order.id,
      totalAmount: Number(order.totalAmount),
      status: order.status,
      razorpayOrderId: order.razorpayOrderId,
      razorpayPaymentId: order.razorpayPaymentId,
      deliveryDate: order.deliveryDate,
      notes: order.notes,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      customer: {
        id: order.user.id,
        firstName: order.user.firstName,
        lastName: order.user.lastName,
        email: order.user.email,
        phone: order.user.phone,
        // For simplicity, just pick the latest address, or all addresses if the UI needs it
        addresses: order.user.addresses
      },
      items: order.items.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.product?.name || 'Deleted Product',
        image: item.product?.imageUrl || null,
        quantity: item.quantity,
        price: Number(item.price),
        size: item.size,
        addons: item.addons,
        total: Number(item.price) * item.quantity
      }))
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Failed to fetch order details:', error);
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const validStatuses = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'FAILED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully',
      order: {
        id: updatedOrder.id,
        status: updatedOrder.status,
      }
    });
  } catch (error) {
    console.error('Failed to update order:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
