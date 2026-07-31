import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { invalidateCache } from '@/lib/cache';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, price, categoryId, sizes, addons, isFeatured, isBestSelling, isSoldOut, hasEggless, hasEgg, image, filterIds } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Name, price, and category are required' }, { status: 400 });
    }

    if (Number(price) < 0) {
      return NextResponse.json({ error: 'Price cannot be negative' }, { status: 400 });
    }

    // Combine sizes and addons into ProductOptions using prefixes to differentiate them
    const allOptions = [
      ...(sizes || []).map(s => ({ name: `SIZE:::${s.name}`, extraPrice: Math.max(0, Number(s.price)), imageUrl: s.image || null })),
      ...(addons || []).map(a => ({ name: `ADDON:::${a.name}`, extraPrice: Math.max(0, Number(a.price)), imageUrl: a.image || null }))
    ].filter(opt => opt.name.replace('SIZE:::', '').replace('ADDON:::', '').trim() !== '');

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
        hasEggless: hasEggless !== undefined ? Boolean(hasEggless) : true,
        hasEgg: hasEgg !== undefined ? Boolean(hasEgg) : false,
        options: {
          create: allOptions,
        },
        filters: {
          set: (filterIds || []).map(id => ({ id }))
        }
      },
      include: {
        category: true,
        options: true,
        filters: true,
      }
    });

    invalidateCache('products');

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
      hasEggless: product.hasEggless,
      hasEgg: product.hasEgg,
      addons: product.options.filter(opt => !opt.name.startsWith('SIZE:::')).map(opt => ({ id: opt.id, name: opt.name.startsWith('ADDON:::') ? opt.name.replace('ADDON:::', '') : opt.name, price: Number(opt.extraPrice), image: opt.imageUrl })),
      sizes: product.options.filter(opt => opt.name.startsWith('SIZE:::')).map(opt => ({ id: opt.id, name: opt.name.replace('SIZE:::', ''), price: Number(opt.extraPrice), image: opt.imageUrl })),
      filters: product.filters.map(f => f.id)
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

    invalidateCache('products');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
