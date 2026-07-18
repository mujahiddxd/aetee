import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request) {
  try {
    const { ids } = await request.json(); // Array of category IDs

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No category IDs provided' }, { status: 400 });
    }

    // Delete categories from the database
    // Because of onDelete: SetNull for products, products in these categories will simply lose their category assignment.
    // Subcategories with onDelete: SetNull will also lose their parent assignment.
    await prisma.category.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    return NextResponse.json({ success: true, message: 'Categories deleted successfully' });
  } catch (error) {
    console.error('Failed to bulk delete categories:', error);
    return NextResponse.json({ error: 'Failed to bulk delete categories' }, { status: 500 });
  }
}
