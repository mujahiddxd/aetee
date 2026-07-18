import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request) {
  try {
    const { items } = await request.json(); // Array of { id, sortOrder }

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
    }

    // Execute all updates in a single transaction
    await prisma.$transaction(
      items.map((item) =>
        prisma.product.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );

    return NextResponse.json({ success: true, message: 'Products reordered successfully' });
  } catch (error) {
    console.error('Error reordering products:', error);
    return NextResponse.json({ error: 'Failed to reorder products' }, { status: 500 });
  }
}
