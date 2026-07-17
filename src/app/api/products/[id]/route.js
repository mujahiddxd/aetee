import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, price, categoryId, sizes, addons, isFeatured, isBestSelling, isSoldOut, image } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Name, price, and category are required' }, { status: 400 });
    }

    // Combine sizes and addons into ProductOptions
    const allOptions = [
      ...(sizes || []).map(s => ({ name: s.name, extraPrice: Number(s.price) })),
      ...(addons || []).map(a => ({ name: a.name, extraPrice: Number(a.price) }))
    ].filter(opt => opt.name.trim() !== '');

    // In a real app we'd intelligently update/delete options. Here we just delete all and recreate for simplicity.
    await prisma.productOption.deleteMany({
      where: { productId: id }
    });

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: Number(price),
        categoryId,
        imageUrl: image,
        isFeatured: Boolean(isFeatured),
        isBestSeller: Boolean(isBestSelling),
        isSoldOut: Boolean(isSoldOut),
        options: {
          create: allOptions,
        }
      },
      include: {
        category: true,
        options: true,
      }
    });

    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      categoryId: product.categoryId,
      category: product.category ? product.category.name : 'Uncategorized',
      image: product.imageUrl,
      isFeatured: product.isFeatured,
      isBestSelling: product.isBestSeller,
      isSoldOut: product.isSoldOut,
      addons: product.options.map(opt => ({ id: opt.id, name: opt.name, price: Number(opt.extraPrice) })),
      sizes: [],
    });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
