
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function GET(
  request: Request,
  { params }: { params: { sku: string } }
) {
  try {
    const sku = decodeURIComponent(params.sku)
    
    const product = await prisma.product.findUnique({
      where: { 
        sku,
        active: true 
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Product API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
