import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request) {
  try {
    const { ids } = await request.json(); // Array of product IDs

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const result = await prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    if (error.code === 'P2003') {
      return NextResponse.json({ error: 'One or more selected products cannot be deleted because they are linked to existing orders. Mark them as sold out instead.' }, { status: 409 });
    }
    console.error('Error deleting products:', error);
    return NextResponse.json({ error: 'Failed to delete products' }, { status: 500 });
  }
}
