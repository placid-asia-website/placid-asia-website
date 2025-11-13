
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductGrid } from '@/components/product-grid'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

interface CategoryPageProps {
  params: { slug: string }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { 
      slug: decodeURIComponent(params.slug),
      active: true 
    }
  })

  if (!category) {
    notFound()
  }

  const productsRaw = await prisma.product.findMany({
    where: {
      category: category.name_en,
      active: true
    },
    orderBy: { title_en: 'asc' }
  })

  // Convert raw products to proper format
  const products = productsRaw.map(product => ({
    ...product,
    images: Array.isArray(product.images) ? product.images as string[] : [],
    pdfs: Array.isArray(product.pdfs) ? product.pdfs as string[] : []
  }))

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button - We need to make this client-side to use translations */}
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href="/categories">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Link>
        </Button>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">{category.name_en}</h1>
        <p className="text-lg text-muted-foreground mb-4">{category.name_th}</p>
        {category.description_en && (
          <p className="text-muted-foreground mb-4">{category.description_en}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? 'product' : 'products'} in this category
        </p>
      </div>

      {/* Products */}
      <ProductGrid products={products} />
    </div>
  )
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { 
      slug: decodeURIComponent(params.slug),
      active: true 
    }
  })

  if (!category) {
    return {
      title: 'Category Not Found - Placid Asia',
    }
  }

  return {
    title: `${category.name_en} - Placid Asia`,
    description: category.description_en || `Browse ${category.name_en} products at Placid Asia`,
    keywords: [category.name_en, 'acoustic measurement', 'sound equipment'],
  }
}
