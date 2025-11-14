
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: NextRequest,
  { params }: { params: { sku: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Admin access required' },
        { status: 401 }
      )
    }

    const data = await request.json()

    // Validate required fields
    if (!data.title_en || !data.title_th) {
      return NextResponse.json(
        { error: 'Validation failed', message: 'Title fields are required' },
        { status: 400 }
      )
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { sku: params.sku },
      data: {
        title_en: data.title_en,
        title_th: data.title_th,
        description_en: data.description_en || '',
        description_th: data.description_th || '',
        category: data.category || '',
        supplier: data.supplier || null,
        active: data.active ?? true,
        has_pricing: data.has_pricing ?? false,
        source_url: data.source_url || null,
      },
    })

    return NextResponse.json({
      success: true,
      product: updatedProduct,
    })

  } catch (error: any) {
    console.error('Error updating product:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Not found', message: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Server error', message: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sku: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Admin access required' },
        { status: 401 }
      )
    }

    // Soft delete by setting active to false
    await prisma.product.update({
      where: { sku: params.sku },
      data: { active: false },
    })

    return NextResponse.json({
      success: true,
      message: 'Product deactivated successfully',
    })

  } catch (error: any) {
    console.error('Error deleting product:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Not found', message: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Server error', message: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
