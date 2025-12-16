import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// POST - Create new product
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const {
      sku,
      title_en,
      title_th,
      description_en,
      description_th,
      category,
      supplier,
      source_url,
      active,
      has_pricing,
      images,
      pdfs
    } = body

    // Validation
    if (!sku || !title_en || !title_th) {
      return NextResponse.json(
        { message: 'SKU, English title, and Thai title are required' },
        { status: 400 }
      )
    }

    // Check if SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: { sku: sku.toUpperCase() }
    })

    if (existingProduct) {
      return NextResponse.json(
        { message: `Product with SKU "${sku}" already exists` },
        { status: 400 }
      )
    }

    // Create product
    const newProduct = await prisma.product.create({
      data: {
        sku: sku.toUpperCase(),
        title_en: title_en.trim(),
        title_th: title_th.trim(),
        description_en: description_en?.trim() || '',
        description_th: description_th?.trim() || '',
        category: category?.trim() || 'Miscellaneous',
        supplier: supplier?.trim() || null,
        source_url: source_url?.trim() || null,
        active: active !== undefined ? active : true,
        has_pricing: has_pricing || false,
        images: images || [],
        pdfs: pdfs || []
      }
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error: any) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to create product' },
      { status: 500 }
    )
  }
}
