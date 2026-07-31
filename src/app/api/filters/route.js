import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getOrSetCache, invalidateCache } from '@/lib/cache';

export const revalidate = 60;

export async function GET() {
  try {
    const filters = await getOrSetCache('filters', 3600, async () => {
      return await prisma.filterTag.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { products: true },
          },
        },
      });
    });

    const formatted = filters.map((f) => ({
      id: f.id,
      name: f.name,
      products: f._count.products,
      createdAt: f.createdAt,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Failed to fetch filters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filters' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Filter name is required' },
        { status: 400 }
      );
    }

    const filter = await prisma.filterTag.create({
      data: { name: name.trim() },
    });

    // Bust the cache so changes are reflected immediately
    invalidateCache('filters');

    return NextResponse.json(
      { id: filter.id, name: filter.name, products: 0, createdAt: filter.createdAt },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A filter with this name already exists' },
        { status: 409 }
      );
    }
    console.error('Failed to create filter:', error);
    return NextResponse.json(
      { error: 'Failed to create filter' },
      { status: 500 }
    );
  }
}
