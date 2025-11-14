import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

  // Get related categories
  const relatedCategories = await prisma.category.findMany({
    where: {
      active: true,
      slug: { not: category.slug }
    },
    take: 3,
    orderBy: { name_en: 'asc' }
  })

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/products" className="text-muted-foreground hover:text-primary">Products</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/categories" className="text-muted-foreground hover:text-primary">Categories</Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{category.name_en}</span>
          </nav>
        </div>
      </div>

      {/* Category Hero Section */}
      <section className="bg-gradient-to-br from-[#003F62] to-[#002840] text-white py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 mb-6">
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Categories
            </Link>
          </Button>

          <div className="max-w-4xl">
            <Badge className="mb-4 bg-[#D4A032] text-white border-none">
              {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {category.name_en}
            </h1>
            <p className="text-2xl text-blue-100 mb-4">
              {category.name_th}
            </p>
            {category.description_en && (
              <p className="text-lg text-blue-50 mb-6">
                {category.description_en}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-white text-white">
                Professional Grade
              </Badge>
              <Badge variant="outline" className="border-white text-white">
                Factory Calibrated
              </Badge>
              <Badge variant="outline" className="border-white text-white">
                Local Support
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Category Benefits */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-[#D4A032] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Certified Equipment</h3>
                <p className="text-sm text-muted-foreground">
                  All products meet international standards with factory calibration certificates
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-[#D4A032] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Free consultation to help you select the right equipment for your application
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-[#D4A032] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Complete Support</h3>
                <p className="text-sm text-muted-foreground">
                  Training, calibration, and technical support throughout the product lifecycle
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">All {category.name_en}</h2>
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Related Categories */}
      {relatedCategories.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Related Product Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCategories.map((relCat) => (
                <Card key={relCat.id} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">{relCat.name_en}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{relCat.name_th}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/categories/${relCat.slug}`}>
                      View Products
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
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

  const productCount = await prisma.product.count({
    where: {
      category: category.name_en,
      active: true
    }
  })

  const description = category.description_en || 
    `Browse ${productCount} professional ${category.name_en.toLowerCase()} products from leading manufacturers. ${category.name_th}. Authorized distributor in Thailand with local support, calibration services, and expert consultation. ISO certified equipment for environmental monitoring, building acoustics, industrial noise control, and vibration analysis.`

  return {
    title: `${category.name_en} | Professional Acoustic & Vibration Equipment | ${productCount} Products | Placid Asia`,
    description,
    keywords: [
      category.name_en,
      category.name_th,
      `${category.name_en} Thailand`,
      `${category.name_en} Bangkok`,
      `${category.name_en} Southeast Asia`,
      'acoustic measurement equipment',
      'sound level meters',
      'noise monitoring',
      'vibration analysis',
      'environmental noise',
      'building acoustics',
      'professional measurement',
      'ISO certified',
      'factory calibrated',
      'Norsonic',
      'SoundPLAN',
      'Bedrock',
      'authorized distributor',
      'local support Thailand',
      'calibration services',
    ],
    alternates: {
      canonical: `https://www.placid.asia/categories/${category.slug}`,
      languages: {
        'en': `https://www.placid.asia/categories/${category.slug}`,
        'th': `https://www.placid.asia/categories/${category.slug}`,
      },
    },
    openGraph: {
      title: `${category.name_en} - ${productCount} Professional Products - Placid Asia`,
      description,
      url: `https://www.placid.asia/categories/${category.slug}`,
      siteName: 'Placid Asia',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.placid.asia/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${category.name_en} - Placid Asia`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name_en} - Professional Equipment`,
      description,
      images: ['https://www.placid.asia/og-image.jpg'],
    },
  }
}
