
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        active: true,
        featured: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10, // Limit to 10 featured products
    })

    return NextResponse.json({
      products,
      count: products.length,
    })
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    )
  }
}
