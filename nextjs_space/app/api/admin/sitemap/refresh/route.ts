import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

// POST - Manually refresh sitemap
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Revalidate sitemap and key pages
    revalidatePath('/sitemap.xml')
    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath('/categories')
    revalidatePath('/brands')
    revalidatePath('/blog')

    return NextResponse.json({
      success: true,
      message: 'Sitemap and cache refreshed successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error refreshing sitemap:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to refresh sitemap' },
      { status: 500 }
    )
  }
}

// GET - Get sitemap status
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({
      status: 'active',
      revalidateInterval: 3600, // 1 hour
      sitemapUrl: 'https://placid.asia/sitemap.xml',
      lastRefresh: new Date().toISOString(),
      note: 'Sitemap regenerates automatically every hour, or can be manually refreshed via POST request'
    })
  } catch (error: any) {
    console.error('Error getting sitemap status:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to get sitemap status' },
      { status: 500 }
    )
  }
}
