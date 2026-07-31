import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { invalidateCache } from '@/lib/cache';

export async function PUT(request) {
  try {
    const { orderedIds } = await request.json();

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Run all updates in a transaction
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.category.update({
          where: { id },
          data: { sortOrder: index },
        })
      )
    );

    invalidateCache('categories');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reorder categories:', error);
    return NextResponse.json({ error: 'Failed to reorder categories' }, { status: 500 });
  }
}
