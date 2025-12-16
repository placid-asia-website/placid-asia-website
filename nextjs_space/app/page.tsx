import { HomeClient } from './home-client'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export default async function HomePage() {
  // Get featured products and categories
  const [featuredProductsRaw, categories, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where: { 
        active: true,
        featured: true 
      },
      orderBy: { updatedAt: 'desc' },
      take: 10  // Show all 10 featured products (max limit)
    }),
    prisma.category.findMany({
      where: { active: true },
      orderBy: { product_count: 'desc' },
      take: 6
    }),
    prisma.product.count({ where: { active: true } })
  ])

  // Convert raw products to proper format
  const featuredProducts = featuredProductsRaw.map(product => ({
    ...product,
    images: Array.isArray(product.images) ? product.images as string[] : [],
    pdfs: Array.isArray(product.pdfs) ? product.pdfs as string[] : []
  }))

  return <HomeClient featuredProducts={featuredProducts} categories={categories} totalProducts={totalProducts} />
}
