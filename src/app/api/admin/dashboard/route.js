import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [totalProducts, featured, bestSellers, soldOut, flaggedBestSellers] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isFeatured: true } }),
      prisma.product.count({ where: { isBestSeller: true } }),
      prisma.product.count({ where: { isSoldOut: true } }),
      prisma.product.findMany({
        where: { isBestSeller: true },
        take: 10,
        include: { category: true }
      })
    ]);

    // Calculate actual top selling items based on orders
    const topSales = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });
    
    let realBestSellers = [];
    if (topSales.length > 0) {
      const productIds = topSales.map(ts => ts.productId);
      const prods = await prisma.product.findMany({
        where: { id: { in: productIds } },
        include: { category: true }
      });
      
      realBestSellers = topSales.map(ts => {
        const p = prods.find(pr => pr.id === ts.productId);
        if (!p) return null;
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category ? p.category.name : 'Uncategorized',
          imageUrl: p.imageUrl,
          totalSold: ts._sum.quantity
        };
      }).filter(Boolean);
    }

    const formattedFlagged = flaggedBestSellers.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category ? p.category.name : 'Uncategorized',
      imageUrl: p.imageUrl
    }));

    return NextResponse.json({
      totalProducts,
      featured,
      bestSellers,
      soldOut,
      flaggedBestSellers: formattedFlagged,
      realBestSellers
    });
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
