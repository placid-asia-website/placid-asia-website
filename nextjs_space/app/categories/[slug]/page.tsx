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

  let productsRaw = await prisma.product.findMany({
    where: {
      category: category.name_en,
      active: true
    },
    orderBy: { title_en: 'asc' }
  })

  // Apply category-specific filtering based on user feedback
  const categorySlug = category.slug.toLowerCase()
  
  if (categorySlug === 'microphones') {
    // Microphones: Show only Placid Instruments microphones
    productsRaw = productsRaw.filter(p => 
      p.supplier?.toLowerCase().includes('placid')
    )
  } else if (categorySlug === 'calibrators') {
    // Calibrators: Only handheld calibrators, remove SPEKTRA systems
    productsRaw = productsRaw.filter(p => {
      const title = p.title_en.toLowerCase()
      const supplier = (p.supplier || '').toLowerCase()
      // Exclude SPEKTRA calibration systems
      if (supplier.includes('spektra') && (title.includes('system') || title.includes('calibration set'))) {
        return false
      }
      return true
    })
  } else if (categorySlug === 'vibration-measurement') {
    // Vibration Measurement: Only MMF, Rion, CV-10, Convergence vibration meters
    productsRaw = productsRaw.filter(p => {
      const sku = p.sku.toLowerCase()
      const title = p.title_en.toLowerCase()
      const supplier = (p.supplier || '').toLowerCase()
      
      // Keep MMF/Metra vibration meters
      if (supplier.includes('mmf') || supplier.includes('metra')) return true
      // Keep Rion vibration meters
      if (supplier.includes('rion') && title.includes('vibration')) return true
      // Keep CV-10
      if (sku.includes('cv-10') || sku.includes('cv10')) return true
      // Keep Convergence vibration products
      if (supplier.includes('convergence') && (
        title.includes('vibration') || sku.includes('nsrt') || sku.includes('vsew')
      )) return true
      
      return false
    })
  } else if (categorySlug === 'testing-equipment') {
    // Testing Equipment: Only APS shakers
    productsRaw = productsRaw.filter(p => {
      const supplier = (p.supplier || '').toLowerCase()
      const title = p.title_en.toLowerCase()
      return supplier.includes('aps') && title.includes('shaker')
    })
  } else if (categorySlug === 'sensors-data-acquisition') {
    // Sensors & Data Acquisition: Placid DAQs + Soundtec multichannel
    productsRaw = productsRaw.filter(p => {
      const sku = p.sku.toLowerCase()
      const title = p.title_en.toLowerCase()
      const supplier = (p.supplier || '').toLowerCase()
      
      // Keep Placid DAQs
      if (supplier.includes('placid') && (
        title.includes('daq') || title.includes('data acquisition') ||
        sku.includes('pmp') || sku.includes('pnp') || sku.includes('pmnu')
      )) return true
      // Keep Soundtec multichannel
      if (supplier.includes('soundtec') && title.includes('channel')) return true
      
      return false
    })
  } else if (categorySlug === 'software') {
    // Software: Specific order and exclude CADNA/Insul
    productsRaw = productsRaw.filter(p => {
      const title = p.title_en.toLowerCase()
      // Exclude CADNA and Insul
      if (title.includes('cadna') || title.includes('insul')) return false
      // Exclude navigation/error products
      if (title.includes('navigation') || title.includes('page not found')) return false
      return true
    })
    
    // Sort software in specific order: SoundPLAN, Sarooma, dbSEA, SonArchitect, then Norsonic
    productsRaw.sort((a, b) => {
      const titleA = a.title_en.toLowerCase()
      const titleB = b.title_en.toLowerCase()
      
      const order = ['soundplan', 'sarooma', 'dbsea', 'sonarchitect', 'norsonic']
      let rankA = order.findIndex(s => titleA.includes(s))
      let rankB = order.findIndex(s => titleB.includes(s))
      
      if (rankA === -1) rankA = 999
      if (rankB === -1) rankB = 999
      
      return rankA - rankB
    })
  } else if (categorySlug === 'environmental-monitoring') {
    // Environmental Monitoring: Specific order, exclude Noisedock
    productsRaw = productsRaw.filter(p => {
      const sku = p.sku.toLowerCase()
      return !sku.includes('noisedock')
    })
    
    // Sort: Norsonic first, then Norcloud, Spotnoise, Convergence
    productsRaw.sort((a, b) => {
      const supplierA = (a.supplier || '').toLowerCase()
      const supplierB = (b.supplier || '').toLowerCase()
      const titleA = a.title_en.toLowerCase()
      const titleB = b.title_en.toLowerCase()
      
      // Priority order
      if (supplierA.includes('norsonic') && !supplierB.includes('norsonic')) return -1
      if (!supplierA.includes('norsonic') && supplierB.includes('norsonic')) return 1
      if (titleA.includes('norcloud') && !titleB.includes('norcloud')) return -1
      if (!titleA.includes('norcloud') && titleB.includes('norcloud')) return 1
      if (supplierA.includes('spotnoise') && !supplierB.includes('spotnoise')) return -1
      if (!supplierA.includes('spotnoise') && supplierB.includes('spotnoise')) return 1
      if (supplierA.includes('convergence') && !supplierB.includes('convergence')) return -1
      if (!supplierA.includes('convergence') && supplierB.includes('convergence')) return 1
      
      return a.title_en.localeCompare(b.title_en)
    })
  } else if (categorySlug === 'acoustic-cameras') {
    // Acoustic Cameras: Nor848B first, add Sonocat, remove PDA products
    productsRaw = productsRaw.filter(p => {
      const sku = p.sku.toLowerCase()
      // Exclude PDA products
      return !sku.includes('pda-') && !sku.includes('dlt-a')
    })
    
    // Sort: Nor848B first, then others
    productsRaw.sort((a, b) => {
      const skuA = a.sku.toLowerCase()
      const skuB = b.sku.toLowerCase()
      
      if (skuA.includes('nor848') && !skuB.includes('nor848')) return -1
      if (!skuA.includes('nor848') && skuB.includes('nor848')) return 1
      if (skuA.includes('acam') && !skuB.includes('acam')) return -1
      if (!skuA.includes('acam') && skuB.includes('acam')) return 1
      if (skuA.includes('sonocat') && !skuB.includes('sonocat')) return -1
      if (!skuA.includes('sonocat') && skuB.includes('sonocat')) return 1
      
      return a.title_en.localeCompare(b.title_en)
    })
  }

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
