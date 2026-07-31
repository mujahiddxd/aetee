import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // This forces a heavy database read directly, bypassing the Node.js memory cache completely.
    const products = await prisma.product.findMany({
      include: { options: true, category: true, filters: true }
    });
    
    return NextResponse.json({ 
      success: true, 
      count: products.length,
      message: 'Direct DB Hit' 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
