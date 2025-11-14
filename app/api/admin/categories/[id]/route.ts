
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// GET: Fetch single category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const category = await prisma.category.findUnique({
      where: { id: params.id },
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT: Update category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name_en, name_th, slug, active } = body

    // Validate required fields
    if (!name_en || !name_th || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if slug is already used by another category
    const existingCategory = await prisma.category.findFirst({
      where: {
        slug,
        id: { not: params.id },
      },
    })

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Slug already in use' },
        { status: 400 }
      )
    }

    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data: {
        name_en,
        name_th,
        slug,
        active: active !== undefined ? active : true,
      },
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
