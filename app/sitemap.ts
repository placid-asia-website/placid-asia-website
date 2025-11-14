import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.placid.asia'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/applications`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Try to fetch dynamic content from database
  // If database is not available (e.g., during initial build), just return static pages
  try {
    // Fetch all active products
    const products = await prisma.product.findMany({
      where: { active: true },
      select: { sku: true, updatedAt: true }
    })

    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/products/${encodeURIComponent(product.sku)}`,
      lastModified: product.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

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
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }))

    // Application pages (hardcoded slugs)
    const applications = [
      'building-acoustics',
      'environmental-noise',
      'industrial-noise',
      'vibration-monitoring',
      'sound-source-localization',
      'noise-mapping'
    ]

    const applicationPages: MetadataRoute.Sitemap = applications.map((app) => ({
      url: `${baseUrl}/applications/${app}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    // Guide pages (hardcoded slugs)
    const guides = [
      'building-acoustic-kit',
      'noise-monitoring-system',
      'vibration-measurement',
      'sound-level-meter',
      'acoustic-camera',
      'noise-dosimeter'
    ]

    const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

    return [
      ...staticPages,
      ...productPages,
      ...categoryPages,
      ...brandPages,
      ...applicationPages,
      ...guidePages
    ]
  } catch (error) {
    // If database connection fails, return just static pages
    console.warn('Database not available for sitemap generation, returning static pages only:', error)
    
    // Still include hardcoded application and guide pages
    const applications = [
      'building-acoustics',
      'environmental-noise',
      'industrial-noise',
      'vibration-monitoring',
      'sound-source-localization',
      'noise-mapping'
    ]

    const applicationPages: MetadataRoute.Sitemap = applications.map((app) => ({
      url: `${baseUrl}/applications/${app}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    const guides = [
      'building-acoustic-kit',
      'noise-monitoring-system',
      'vibration-measurement',
      'sound-level-meter',
      'acoustic-camera',
      'noise-dosimeter'
    ]

    const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide}`,
      lastModified: new Date(),
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
