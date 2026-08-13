import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    
    const skip = (page - 1) * limit;

    const whereClause = status ? { status } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: whereClause,
        orderBy: { createdAt: sort === 'asc' ? 'asc' : 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            }
          },
          _count: {
            select: { items: true }
          }
        },
      }),
      prisma.order.count({ where: whereClause })
    ]);

    const formattedOrders = orders.map(order => ({
      id: order.id,
      totalAmount: Number(order.totalAmount),
      status: order.status,
      deliveryType: order.deliveryType,
      createdAt: order.createdAt,
      customerName: `${order.user.firstName} ${order.user.lastName}`,
      customerEmail: order.user.email,
      itemsCount: order._count.items,
    }));

    return NextResponse.json({
      orders: formattedOrders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
