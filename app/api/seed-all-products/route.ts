import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

// Category translations
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
  'Measurement Microphones': 'ไมโครโฟนวัดการสั่นสะเทือน',
  'USB And Network Devices': 'อุปกรณ์ USB และเครือข่าย',
  'Decibel Noise Meters': 'เครื่องวัดระดับเสียงเดซิเบล',
  'Noise Monitoring Systems': 'ระบบตรวจสอบเสียง',
  'Building Acoustics': 'เสียงศาสตร์อาคาร',
  'Calibration': 'การสอบเทียบ',
  'Environmental Noise': 'เสียงรบกวนสิ่งแวดล้อม',
  'Workplace Assessment': 'การประเมินสถานที่ทำงาน'
}

function slugify(text: string): string {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           
    .replace(/[^\w\-]+/g, '')       
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '')             
}

export async function GET(request: NextRequest) {
  try {
    const results: string[] = []
    
    results.push('🌱 Starting database seeding...\n')

    // 1. Create admin user
    results.push('👤 Creating admin user...')
    const hashedPassword = await bcrypt.hash('Placid2024!', 10)
    
    await prisma.user.upsert({
      where: { email: 'info@placid.asia' },
      update: {},
      create: {
        email: 'info@placid.asia',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      },
    })
    results.push('✅ Admin user created: info@placid.asia / Placid2024!\n')

    // 2. Read products data
    const dataPath = path.join(process.cwd(), 'data', 'products_data.json')
    
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({
        error: 'products_data.json not found',
        path: dataPath,
        help: 'Make sure data/products_data.json exists in your repository'
      }, { status: 500 })
    }

    const productsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    results.push(`📦 Found ${productsData.length} products in JSON file\n`)

    // 3. Create categories
    const categories = Array.from(new Set(productsData.map((p: any) => p.category).filter((c: any) => c && c.trim())))
    results.push(`🏷️ Creating ${categories.length} categories...`)

    for (const categoryName of categories) {
      const slug = slugify(categoryName)
      const name_th = categoryTranslations[categoryName] || categoryName
      
      await prisma.category.upsert({
        where: { slug },
        update: { name_en: categoryName, name_th },
        create: {
          name_en: categoryName,
          name_th,
          slug,
          description_en: `Professional ${categoryName.toLowerCase()} equipment for acoustic measurements`,
          description_th: `อุปกรณ์${name_th}สำหรับการวัดทางอะคูสติก`,
          active: true,
        },
      })
    }
    results.push(`✅ ${categories.length} categories created\n`)

    // 4. Create products
    results.push(`📦 Creating ${productsData.length} products...`)
    let successCount = 0
    let errorCount = 0

    for (const product of productsData) {
      try {
        await prisma.product.upsert({
          where: { sku: product.sku },
          update: {
            title_en: product.title_en,
            title_th: product.title_th,
            description_en: product.description_en || '',
            description_th: product.description_th || '',
            category: product.category,
            supplier: product.supplier || null,
            images: product.images || [],
            pdfs: product.pdfs || [],
            has_pricing: product.has_pricing || false,
            source_url: product.source_url || null,
            featured: product.featured || false,
            active: true,
          },
          create: {
            sku: product.sku,
            title_en: product.title_en,
            title_th: product.title_th,
            description_en: product.description_en || '',
            description_th: product.description_th || '',
            category: product.category,
            supplier: product.supplier || null,
            images: product.images || [],
            pdfs: product.pdfs || [],
            has_pricing: product.has_pricing || false,
            source_url: product.source_url || null,
            featured: product.featured || false,
            active: true,
          },
        })
        successCount++
        
        if (successCount % 25 === 0) {
          results.push(`   ✓ ${successCount} products uploaded...`)
        }
      } catch (error: any) {
        errorCount++
        results.push(`   ✗ Error uploading ${product.sku}: ${error.message}`)
      }
    }

    results.push(`\n✅ Product seeding complete!`)
    results.push(`   • Successfully uploaded: ${successCount} products`)
    results.push(`   • Errors: ${errorCount}`)

    // 5. Summary
    const totalProducts = await prisma.product.count()
    const totalCategories = await prisma.category.count()
    const activeProducts = await prisma.product.count({ where: { active: true } })
    const productsWithPricing = await prisma.product.count({ where: { has_pricing: true } })

    results.push(`\n📊 Database Summary:`)
    results.push(`   • Total categories: ${totalCategories}`)
    results.push(`   • Total products: ${totalProducts}`)
    results.push(`   • Active products: ${activeProducts}`)
    results.push(`   • Products with pricing: ${productsWithPricing}`)
    results.push(`\n✅ All done! Your database is ready.`)
    results.push(`\n🔐 Admin Login:`)
    results.push(`   Email: info@placid.asia`)
    results.push(`   Password: Placid2024!`)
    results.push(`\n📱 Visit: https://placid-asia-website-f6ro.vercel.app/admin/products`)

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      results: results.join('\n'),
      summary: {
        totalProducts,
        totalCategories,
        activeProducts,
        productsWithPricing,
        successCount,
        errorCount
      }
    })

  } catch (error: any) {
    console.error('Seeding error:', error)
    return NextResponse.json({
      error: 'Seeding failed',
      message: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
