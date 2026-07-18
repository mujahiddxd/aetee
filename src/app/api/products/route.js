import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      include: {
        category: true,
        options: true,
        filters: true,
      },
    });

    const formatted = products.map((prod) => ({
      id: prod.id,
      name: prod.name,
      description: prod.description || '',
      price: Number(prod.price),
      categoryId: prod.categoryId,
      category: prod.category ? prod.category.name : 'Uncategorized',
      parentCategory: prod.category?.parent ? prod.category.parent.name : null,
      image: prod.imageUrl || 'https://placehold.co/400x300/FDF3D5/4A2C1D?text=No+Image',
      isFeatured: prod.isFeatured,
      isBestSelling: prod.isBestSeller,
      isSoldOut: prod.isSoldOut,
      // We map database options back to sizes and addons using prefixes
      addons: prod.options.filter(opt => !opt.name.startsWith('SIZE:::')).map(opt => ({
        id: opt.id,
        name: opt.name.startsWith('ADDON:::') ? opt.name.replace('ADDON:::', '') : opt.name,
        price: Number(opt.extraPrice),
        image: opt.imageUrl
      })),
      sizes: prod.options.filter(opt => opt.name.startsWith('SIZE:::')).map(opt => ({
        id: opt.id,
        name: opt.name.replace('SIZE:::', ''),
        price: Number(opt.extraPrice),
        image: opt.imageUrl
      })),
      filters: prod.filters.map(f => f.id),
      filterTags: prod.filters.map(f => ({ id: f.id, name: f.name }))
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, price, categoryId, sizes, addons, isFeatured, isBestSelling, isSoldOut, image, filterIds } = body;

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

    const product = await prisma.product.create({
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
        },
        filters: {
          connect: (filterIds || []).map(id => ({ id }))
        }
      },
      include: {
        category: true,
        options: true,
        filters: true,
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
      addons: product.options.filter(opt => !opt.name.startsWith('SIZE:::')).map(opt => ({ id: opt.id, name: opt.name.startsWith('ADDON:::') ? opt.name.replace('ADDON:::', '') : opt.name, price: Number(opt.extraPrice), image: opt.imageUrl })),
      sizes: product.options.filter(opt => opt.name.startsWith('SIZE:::')).map(opt => ({ id: opt.id, name: opt.name.replace('SIZE:::', ''), price: Number(opt.extraPrice), image: opt.imageUrl })),
      filters: product.filters.map(f => f.id)
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
