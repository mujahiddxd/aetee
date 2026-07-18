import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/categories — Fetch all categories with product count
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { products: true },
        },
        children: {
          include: {
            _count: {
              select: { products: true },
            },
          },
        },
      },
    });

    const formatted = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      parentId: cat.parentId,
      products: cat._count.products,
      createdAt: cat.createdAt,
      children: cat.children ? cat.children.map(child => ({
        id: child.id,
        name: child.name,
        parentId: child.parentId,
        products: child._count.products,
        createdAt: child.createdAt,
      })) : [],
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories — Create a new category
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, parentId } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { 
        name: name.trim(),
        ...(parentId && { parentId })
      },
    });

    return NextResponse.json(
      { id: category.id, name: category.name, parentId: category.parentId, products: 0, createdAt: category.createdAt, children: [] },
      { status: 201 }
    );
  } catch (error) {
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A category with this name already exists' },
        { status: 409 }
      );
    }
    console.error('Failed to create category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
