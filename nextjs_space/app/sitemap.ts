
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

// Increase caching to 6 hours and add timeout handling
export const revalidate = 21600 // Revalidate sitemap every 6 hours
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-cache'
export const maxDuration = 60 // Set max execution time to 60 seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://placid.asia'
  
  // Use static dates for static pages (only update when content actually changes)
  const staticDate = new Date('2025-11-28T00:00:00.000Z')
  
  // Static pages with stable timestamps
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: staticDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: staticDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: staticDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: staticDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/applications`,
      lastModified: staticDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: staticDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/measurement-sets`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories-hierarchy`,
      lastModified: staticDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: staticDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // SEO-optimized landing pages
    {
      url: `${baseUrl}/sound-level-meter-thailand`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/noise-dosimeter-thailand`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Solution pages
    {
      url: `${baseUrl}/solutions/impedance-tube-iso-10534-2`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/class-1-microphone-thailand`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/factory-noise-monitoring`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/end-of-line-acoustic-testing`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Try to fetch dynamic content from database with timeout
  // If database is not available (e.g., during initial build), just return static pages
  try {
    // Set a timeout for database queries (30 seconds)
    const queryTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database query timeout')), 30000)
    )
    
    // Fetch all active products with limit to prevent huge queries
    const productsPromise = prisma.product.findMany({
      where: { active: true },
      select: { sku: true, updatedAt: true },
      take: 500 // Limit to 500 products max
    })
    
    const products = await Promise.race([productsPromise, queryTimeout]) as any

    const productPages: MetadataRoute.Sitemap = products.map((product: { sku: string; updatedAt: Date | null }) => {
      // Ensure SKU is properly encoded for URL
      const encodedSku = encodeURIComponent(product.sku)
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\+/g, '%2B')
      
      return {
        url: `${baseUrl}/products/${encodedSku}`,
        lastModified: product.updatedAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })

    // Fetch all active categories
    const categories = await prisma.category.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true }
    })

    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: category.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    // Brand pages (based on unique suppliers)
    const suppliers = await prisma.product.findMany({
      where: { 
        active: true,
        supplier: { not: null }
      },
      select: { supplier: true },
      distinct: ['supplier']
    })

    const brandPages: MetadataRoute.Sitemap = suppliers
      .filter(s => s.supplier)
      .map((supplier) => ({
        url: `${baseUrl}/brands/${encodeURIComponent(supplier.supplier!.toLowerCase().replace(/\s+/g, '-'))}`,
        lastModified: staticDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      }))

    // Application pages (hardcoded slugs)
    const applications = [
      'building-acoustics',
      'environmental-noise-monitoring',
      'vibration-analysis',
      'sound-source-location',
      'industrial-noise-control',
      'material-testing',
      'room-field-acoustics',
      'research-development',
      'quality-control',
      'construction-demolition',
      'secondary-acoustic-calibration'
    ]

    const applicationPages: MetadataRoute.Sitemap = applications.map((app) => ({
      url: `${baseUrl}/applications/${app}`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    // Guide pages (hardcoded slugs)
    const guides = [
      'building-acoustics-testing-kit',
      'noise-monitoring-system',
      'vibration-measurement-equipment',
      'sound-level-meter-selection',
      'acoustic-camera-systems',
      'material-testing-equipment',
      'sound-intensity-measurement'
    ]

    const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide}`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

    // Blog posts
    const blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    })

    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    return [
      ...staticPages,
      ...productPages,
      ...categoryPages,
      ...brandPages,
      ...applicationPages,
      ...guidePages,
      ...blogPages
    ]
  } catch (error) {
    // If database connection fails or times out, return just static pages
    console.warn('Database not available for sitemap generation, returning static pages only:', error)
    console.error('Sitemap generation error details:', error)
    
    // Still include hardcoded application and guide pages
    const applications = [
      'building-acoustics',
      'environmental-noise-monitoring',
      'vibration-analysis',
      'sound-source-location',
      'industrial-noise-control',
      'material-testing',
      'room-field-acoustics',
      'research-development',
      'quality-control',
      'construction-demolition',
      'secondary-acoustic-calibration'
    ]

    const applicationPages: MetadataRoute.Sitemap = applications.map((app) => ({
      url: `${baseUrl}/applications/${app}`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    const guides = [
      'building-acoustics-testing-kit',
      'noise-monitoring-system',
      'vibration-measurement-equipment',
      'sound-level-meter-selection',
      'acoustic-camera-systems',
      'material-testing-equipment',
      'sound-intensity-measurement'
    ]

    const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide}`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

    return [
      ...staticPages,
      ...applicationPages,
      ...guidePages
    ]
  }
}
