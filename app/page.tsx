
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { ProductDetailClient } from './product-detail-client'

export const dynamic = "force-dynamic"

interface ProductPageProps {
  params: { sku: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { 
      sku: decodeURIComponent(params.sku),
      active: true 
    }
  })

  if (!product) {
    notFound()
  }

  // Get related products from same category
  const relatedProductsRaw = await prisma.product.findMany({
    where: {
      category: product.category,
      sku: { not: product.sku },
      active: true
    },
    take: 4
  })

  // Convert raw products to proper format
  const relatedProducts = relatedProductsRaw.map(product => ({
    ...product,
    images: Array.isArray(product.images) ? product.images as string[] : [],
    pdfs: Array.isArray(product.pdfs) ? product.pdfs as string[] : []
  }))

  // Convert product to the format expected by client
  const productData = {
    ...product,
    images: Array.isArray(product.images) ? product.images as string[] : [],
    pdfs: Array.isArray(product.pdfs) ? product.pdfs as string[] : []
  }

  // Product structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title_en,
    description: product.description_en,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.supplier || 'Placid Asia'
    },
    category: product.category,
    image: (product.images as string[])[0] || '/og-image.png',
    offers: product.has_pricing ? {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'THB',
      seller: {
        '@type': 'Organization',
        name: 'Placid Asia'
      }
    } : {
      '@type': 'Offer',
      availability: 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'Placid Asia'
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetailClient product={productData} relatedProducts={relatedProducts} />
    </>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { 
      sku: decodeURIComponent(params.sku),
      active: true 
    }
  })

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    }
  }

  const productImages = (product.images as string[]) || []
  const firstImage = productImages[0] || '/og-image.png'
  
  return {
    title: `${product.title_en} (${product.sku})`,
    description: product.description_en.substring(0, 160) + '... Professional acoustic measurement equipment from Placid Asia.',
    keywords: [
      product.title_en,
      product.sku,
      product.category,
      'acoustic measurement',
      'sound testing equipment',
      'professional instruments',
      'Thailand',
      'Asia Pacific'
    ],
    alternates: {
      canonical: `/products/${product.sku}`,
    },
    openGraph: {
      title: `${product.title_en} - Professional Acoustic Equipment`,
      description: product.description_en.substring(0, 160),
      type: 'website',
      url: `/products/${product.sku}`,
      images: productImages.map(img => ({
        url: img,
        width: 800,
        height: 600,
        alt: product.title_en,
      })),
      siteName: 'Placid Asia',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title_en,
      description: product.description_en.substring(0, 160),
      images: [firstImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}
