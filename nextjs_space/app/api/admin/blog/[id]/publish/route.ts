
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

type RouteContext = {
  params: { id: string }
}

// PUT /api/admin/blog/[id]/publish - Toggle publish status
export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { published } = body

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        published,
        published_at: published ? new Date() : null,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating blog post status:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post status' },
      { status: 500 }
    )
  }
}
