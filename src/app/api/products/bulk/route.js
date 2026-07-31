import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { invalidateCache } from '@/lib/cache';

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

    invalidateCache('products');

    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    console.error('Error deleting products:', error);
    return NextResponse.json({ error: 'Failed to delete products' }, { status: 500 });
  }
}
