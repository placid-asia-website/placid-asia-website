
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

    // If only updating images, skip validation
    const isImageOnlyUpdate = data.images && Object.keys(data).length === 1;

    // Validate required fields (unless it's just an image update)
    if (!isImageOnlyUpdate && (!data.title_en || !data.title_th)) {
      return NextResponse.json(
        { error: 'Validation failed', message: 'Title fields are required' },
        { status: 400 }
      )
    }

    // Build update data object
    const updateData: any = {};
    
    if (data.title_en !== undefined) updateData.title_en = data.title_en;
    if (data.title_th !== undefined) updateData.title_th = data.title_th;
    if (data.description_en !== undefined) updateData.description_en = data.description_en || '';
    if (data.description_th !== undefined) updateData.description_th = data.description_th || '';
    if (data.category !== undefined) updateData.category = data.category || '';
    if (data.supplier !== undefined) updateData.supplier = data.supplier || null;
    if (data.active !== undefined) updateData.active = data.active;
    if (data.has_pricing !== undefined) updateData.has_pricing = data.has_pricing;
    if (data.source_url !== undefined) updateData.source_url = data.source_url || null;
    if (data.images !== undefined) updateData.images = data.images;

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { sku: params.sku },
      data: updateData,
    })

    // Return the updated product directly (not wrapped in an object)
    return NextResponse.json(updatedProduct)

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
