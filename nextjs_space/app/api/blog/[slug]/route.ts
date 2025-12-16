
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

type RouteContext = {
  params: { slug: string }
}

// GET /api/blog/[slug] - Fetch a single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: params.slug,
        published: true,
      },
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
