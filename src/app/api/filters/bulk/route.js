import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { invalidateCache } from '@/lib/cache';

export async function DELETE(request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No filter IDs provided' }, { status: 400 });
    }

    await prisma.filterTag.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    invalidateCache('filters');

    return NextResponse.json({ success: true, message: 'Filters deleted successfully' });
  } catch (error) {
    console.error('Failed to bulk delete filters:', error);
    return NextResponse.json({ error: 'Failed to bulk delete filters' }, { status: 500 });
  }
}
