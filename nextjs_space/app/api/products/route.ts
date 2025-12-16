
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause - enhanced search to handle special characters
    let searchTerm = search;
    // Remove special characters for better matching (user might search "nsrtw" without underscore)
    if (searchTerm) {
      searchTerm = searchTerm.replace(/[_-]/g, '');
    }
    
    const where: any = {
      active: true,
      ...(search && {
        OR: [
          { title_en: { contains: search, mode: 'insensitive' } },
          { title_th: { contains: search, mode: 'insensitive' } },
          { description_en: { contains: search, mode: 'insensitive' } },
          { description_th: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
          { supplier: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
          // Also search without special characters for better matching
          ...(searchTerm !== search ? [
            { title_en: { contains: searchTerm, mode: 'insensitive' } },
            { sku: { contains: searchTerm, mode: 'insensitive' } },
          ] : [])
        ]
      }),
      ...(category && category !== 'all' && { category }),
    }

    // Build orderBy clause
    const orderBy: any = {}
    if (sortBy === 'name') {
      orderBy.title_en = sortOrder
    } else if (sortBy === 'category') {
      orderBy.category = sortOrder
    } else {
      orderBy[sortBy] = sortOrder
    }

    // Check if we need to include categories (for admin categorization)
    const includeCategories = searchParams.get('includeCategories') === 'true';
    
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        ...(includeCategories && {
          include: {
            categories: {
              include: {
                category: true
              }
            }
          }
        })
      }),
      prisma.product.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      }
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
