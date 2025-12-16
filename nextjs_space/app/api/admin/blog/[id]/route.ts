
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

type RouteContext = {
  params: { id: string }
}

// GET /api/admin/blog/[id] - Fetch a single blog post
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/blog/[id] - Update a blog post
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
    const {
      slug,
      title_en,
      title_th,
      excerpt_en,
      excerpt_th,
      content_en,
      content_th,
      author,
      featured_image,
      category,
      tags,
      seo_keywords,
      reading_time,
      published,
    } = body

    // Check if new slug already exists (excluding current post)
    if (slug) {
      const existingPost = await prisma.blogPost.findFirst({
        where: {
          slug,
          id: { not: params.id },
        },
      })

      if (existingPost) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        )
      }
    }

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        ...(slug && { slug }),
        ...(title_en && { title_en }),
        ...(title_th && { title_th }),
        ...(excerpt_en !== undefined && { excerpt_en }),
        ...(excerpt_th !== undefined && { excerpt_th }),
        ...(content_en && { content_en }),
        ...(content_th && { content_th }),
        ...(author && { author }),
        ...(featured_image !== undefined && { featured_image }),
        ...(category && { category }),
        ...(tags && { tags }),
        ...(seo_keywords !== undefined && { seo_keywords }),
        ...(reading_time && { reading_time }),
        ...(published !== undefined && {
          published,
          published_at: published ? new Date() : null,
        }),
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/blog/[id] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.blogPost.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
