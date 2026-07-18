import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.filterTag.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Filter not found' },
        { status: 404 }
      );
    }
    console.error('Failed to delete filter:', error);
    return NextResponse.json(
      { error: 'Failed to delete filter' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Filter name is required' },
        { status: 400 }
      );
    }

    const updatedFilter = await prisma.filterTag.update({
      where: { id },
      data: {
        name: name.trim()
      },
    });

    return NextResponse.json(updatedFilter);
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Filter not found' },
        { status: 404 }
      );
    }
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A filter with this name already exists' },
        { status: 409 }
      );
    }
    console.error('Failed to update filter:', error);
    return NextResponse.json(
      { error: 'Failed to update filter' },
      { status: 500 }
    );
  }
}
