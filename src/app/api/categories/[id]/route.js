import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { invalidateCache } from '@/lib/cache';

// DELETE /api/categories/[id] — Delete a category by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.category.delete({
      where: { id },
    });

    invalidateCache('categories');

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    console.error('Failed to delete category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] — Update a category by ID
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: name.trim()
      },
    });

    invalidateCache('categories');

    return NextResponse.json(updatedCategory);
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    console.error('Failed to update category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}
