
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
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { sku } = params
    const body = await request.json()
    const { featured } = body

    if (typeof featured !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid featured status' },
        { status: 400 }
      )
    }

    // Check if setting to featured and already have 10 featured products
    if (featured) {
      const featuredCount = await prisma.product.count({
        where: {
          featured: true,
          active: true,
          NOT: { sku },
        },
      })

      if (featuredCount >= 10) {
        return NextResponse.json(
          { error: 'Maximum 10 featured products allowed. Please remove one first.' },
          { status: 400 }
        )
      }
    }

    // Update the product
    const product = await prisma.product.update({
      where: { sku },
      data: { featured },
    })

    return NextResponse.json({
      success: true,
      product,
    })
  } catch (error) {
    console.error('Error updating featured status:', error)
    return NextResponse.json(
      { error: 'Failed to update featured status' },
      { status: 500 }
    )
  }
}
