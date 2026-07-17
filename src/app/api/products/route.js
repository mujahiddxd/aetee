import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        options: true,
      },
    });

    const formatted = products.map((prod) => ({
      id: prod.id,
      name: prod.name,
      description: prod.description || '',
      price: Number(prod.price),
      categoryId: prod.categoryId,
      category: prod.category ? prod.category.name : 'Uncategorized',
      image: prod.imageUrl || 'https://placehold.co/400x300/FDF3D5/4A2C1D?text=No+Image',
      isFeatured: prod.isFeatured,
      isBestSelling: prod.isBestSeller,
      isSoldOut: prod.isSoldOut,
      // We map database options to the addons array for the frontend
      addons: prod.options.map(opt => ({
        id: opt.id,
        name: opt.name,
        price: Number(opt.extraPrice)
      })),
      sizes: [], // The schema doesn't differentiate sizes, so we leave it empty
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
    const { name, description, price, categoryId, sizes, addons, isFeatured, isBestSelling, isSoldOut, image } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Name, price, and category are required' }, { status: 400 });
    }

    // Combine sizes and addons into ProductOptions
    const allOptions = [
      ...(sizes || []).map(s => ({ name: s.name, extraPrice: Number(s.price) })),
      ...(addons || []).map(a => ({ name: a.name, extraPrice: Number(a.price) }))
    ].filter(opt => opt.name.trim() !== '');

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
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
