import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

interface ProductData {
  sku: string
  title_en: string
  title_th: string
  description_en: string
  description_th: string
  category: string
  supplier?: string
  images: any[]
  pdfs: any[]
  has_pricing: boolean
  source_url?: string
  featured?: boolean
}

export async function GET() {
  try {
    console.log('Starting database reset and seed...')

    // Clear existing data
    console.log('Clearing existing data...')
    await prisma.productCategory.deleteMany({})
    await prisma.product.deleteMany({})
    await prisma.category.deleteMany({})
    await prisma.user.deleteMany({})
    
    console.log('Database cleared!')

    // Create admin user
    console.log('Creating admin user...')
    const hashedPassword = await bcrypt.hash('Admin2024!', 10)
    await prisma.user.create({
      data: {
        email: 'info@placid.asia',
        name: 'Admin',
        password: hashedPassword,
        role: 'admin'
      }
    })
    console.log('Admin user created!')

    // Load products data
    const productsDataPath = path.join(process.cwd(), 'data', 'products_data.json')
    const productsData: ProductData[] = JSON.parse(
      fs.readFileSync(productsDataPath, 'utf-8')
    )

    console.log(`Loaded ${productsData.length} products`)

    // Get unique categories
    const uniqueCategories = Array.from(
      new Set(productsData.map(p => p.category))
    ).filter(Boolean)

    console.log(`Found ${uniqueCategories.length} categories`)

    // Create categories
    for (const categoryName of uniqueCategories) {
      await prisma.category.create({
        data: {
          name_en: categoryName,
          name_th: categoryName,
          slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description_en: '',
          description_th: '',
          product_count: 0,
          active: true
        }
      })
    }

    console.log('Categories created!')

    // Create products
    let createdCount = 0
    for (const productData of productsData) {
      try {
        await prisma.product.create({
          data: {
            sku: productData.sku,
            title_en: productData.title_en,
            title_th: productData.title_th,
            description_en: productData.description_en || '',
            description_th: productData.description_th || '',
            category: productData.category,
            supplier: productData.supplier || null,
            images: JSON.stringify(productData.images || []),
            pdfs: JSON.stringify(productData.pdfs || []),
            has_pricing: productData.has_pricing || false,
            source_url: productData.source_url || null,
            featured: productData.featured || false,
            active: true
          }
        })
        createdCount++
      } catch (error) {
        console.error(`Error creating ${productData.sku}:`, error)
      }
    }

    console.log(`Created ${createdCount} products!`)

    // Update category counts
    for (const categoryName of uniqueCategories) {
      const count = await prisma.product.count({
        where: { category: categoryName, active: true }
      })
      await prisma.category.update({
        where: { name_en: categoryName },
        data: { product_count: count }
      })
    }

    return NextResponse.json({
      success: true,
      message: `Database fully seeded! Created admin user, ${createdCount} products, and ${uniqueCategories.length} categories.`,
      admin: 'info@placid.asia / Admin2024!',
      products: createdCount,
      categories: uniqueCategories.length
    })

  } catch (error: any) {
    console.error('Seeding failed:', error)
    return NextResponse.json(
      { error: 'Seeding failed', message: error.message },
      { status: 500 }
    )
  }
}
