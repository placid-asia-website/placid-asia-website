
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

interface ProductData {
  sku: string
  title_en: string
  title_th: string
  description_en: string
  description_th: string
  category: string
  images: string[]
  pdfs: string[]
  has_pricing: boolean
  source_url: string
  supplier?: string
  is_active?: boolean
}

export async function POST(request: Request) {
  try {
    // Security check - only allow if Authorization header matches a secret
    const authHeader = request.headers.get('Authorization')
    const SEED_SECRET = process.env.SEED_SECRET || 'placid-asia-seed-2024'
    
    if (authHeader !== `Bearer ${SEED_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🌱 Starting database seed...')

    // Read products data
    const dataPath = path.join(process.cwd(), 'data', 'products_data.json')
    const productsData: ProductData[] = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

    console.log(`📦 Found ${productsData.length} products to seed`)

    // Get unique categories
    const categories = Array.from(new Set(productsData.map(p => p.category).filter(c => c && c.trim())))
    
    console.log(`🏷️ Creating ${categories.length} categories...`)

    // Create categories with Thai translations
    const categoryTranslations: Record<string, string> = {
      'Vibration': 'การวัดการสั่นสะเทือน',
      'Sound Level Meters': 'เครื่องวัดระดับเสียง',
      'Microphone Cables Accessories': 'อุปกรณ์เสริมสายไมโครโฟน',
      'Microphones Preamplifiers': 'ไมโครโฟนและพรีแอมป์',
      'Software': 'ซอฟต์แวร์',
      'Noise Sources': 'แหล่งกำเนิดเสียง',
      'Microphone Windscreens': 'ตัวป้องกันลมไมโครโฟน',
      'Cases And Softbags': 'กระเป๋าและเคสอุปกรณ์',
      'Test Systems': 'ระบบทดสอบ',
      'Further Products': 'ผลิตภัณฑ์เพิ่มเติม',
      'Sensors Data Collection': 'เซนเซอร์และการเก็บข้อมูล',
      'Interface Cables And Adaptors': 'สายเชื่อมต่อและอแดปเตอร์',
      'Outdoor Microphones': 'ไมโครโฟนกลางแจ้ง',
      'Tripods And Stands': 'ขาตั้งและขาตั้งอุปกรณ์',
      'Building Acoustics': 'วิศวกรรมเสียงอาคาร',
      'Noise Monitoring': 'การติดตามตรวจสอบเสียง',
      'Calibration': 'การสอบเทียบ',
      'Pile Driving Analyzers': 'เครื่องวิเคราะห์การตอกเสาเข็ม',
      'Dynamic Pile Testing': 'การทดสอบเสาเข็มแบบไดนามิก',
    }

    // Create categories
    let categoriesCreated = 0
    for (const cat of categories) {
      const slug = cat.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      const name_th = categoryTranslations[cat] || cat
      
      await prisma.category.upsert({
        where: { name_en: cat },
        update: {},
        create: {
          name_en: cat,
          name_th: name_th,
          slug: slug,
          active: true,
        },
      })
      categoriesCreated++
    }

    console.log(`✅ Created ${categoriesCreated} categories`)

    // Create products
    let productsCreated = 0
    let activeProducts = 0
    for (const product of productsData) {
      const isActive = product.is_active !== false // Default to true if not specified
      
      await prisma.product.upsert({
        where: { sku: product.sku },
        update: {
          active: isActive,
          supplier: product.supplier || null,
        },
        create: {
          sku: product.sku,
          title_en: product.title_en,
          title_th: product.title_th,
          description_en: product.description_en,
          description_th: product.description_th,
          category: product.category,
          supplier: product.supplier || null,
          images: product.images || [],
          pdfs: product.pdfs || [],
          has_pricing: product.has_pricing || false,
          source_url: product.source_url || null,
          featured: false,
          active: isActive,
        },
      })
      productsCreated++
      if (isActive) activeProducts++
      
      // Log progress every 10 products
      if (productsCreated % 10 === 0) {
        console.log(`  Progress: ${productsCreated}/${productsData.length} products (${activeProducts} active)`)
      }
    }

    console.log(`✅ Created ${productsCreated} products`)

    // Update category product counts
    console.log('📊 Updating category product counts...')
    const categoriesWithCounts = await prisma.category.findMany()
    
    for (const category of categoriesWithCounts) {
      const count = await prisma.product.count({
        where: { category: category.name_en, active: true },
      })
      
      await prisma.category.update({
        where: { id: category.id },
        data: { product_count: count },
      })
    }

    // Create admin users
    console.log('👤 Creating admin users...')
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    await prisma.user.upsert({
      where: { email: 'info@placid.asia' },
      update: {},
      create: {
        email: 'info@placid.asia',
        name: 'Admin User',
        password: hashedPassword,
        role: 'admin',
      },
    })

    await prisma.user.upsert({
      where: { email: 'john@doe.com' },
      update: {},
      create: {
        email: 'john@doe.com',
        name: 'John Doe',
        password: hashedPassword,
        role: 'admin',
      },
    })

    console.log('✅ Admin users created')
    console.log('🎉 Database seeding completed!')

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      stats: {
        categoriesCreated,
        productsCreated,
        activeProducts,
        inactiveProducts: productsCreated - activeProducts,
        adminUsersCreated: 2,
      },
    })

  } catch (error) {
    console.error('❌ Seeding error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to seed database', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export const dynamic = 'force-dynamic'
