
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config()

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
  is_active?: boolean
  supplier?: string
}

async function main() {
  console.log('🌱 Seeding database...')

  // Read products data
  const dataPath = path.join(process.cwd(), 'data', 'products_data.json')
  const productsData: ProductData[] = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

  console.log(`📦 Found ${productsData.length} products to seed`)

  // Get unique categories from active products only
  const activeProducts = productsData.filter(p => p.is_active !== false)
  const categories = Array.from(new Set(activeProducts.map(p => p.category).filter(c => c && c.trim())))
  
  console.log(`🏷️ Creating ${categories.length} categories from ${activeProducts.length} active products...`)

  // Create categories with Thai translations
  const categoryTranslations: Record<string, string> = {
    // Core categories (consolidated)
    'Microphones': 'ไมโครโฟน',
    'Microphone Accessories': 'อุปกรณ์เสริมไมโครโฟน',
    'Calibrators': 'เครื่องมือปรับเทียบ',
    'Vibration Measurement': 'การวัดการสั่นสะเทือน',
    'Vibration Testing': 'การทดสอบการสั่นสะเทือน',
    'Vibration & NVH Shakers': 'เครื่องกระตุ้นความสั่นสะเทือน & NVH',
    'Acoustic Material Testing': 'การทดสอบวัสดุเสียง',
    'Sensors & Data Acquisition': 'เซนเซอร์และการรับข้อมูล',
    
    // Keep existing translations
    'Acoustic Measurement': 'การวัดเสียง',
    'Sound Level Meters': 'เครื่องวัดระดับเสียง',
    'Software': 'ซอฟต์แวร์',
    'Noise Sources': 'แหล่งกำเนิดเสียง',
    'Cases And Softbags': 'กระเป๋าและเคสอุปกรณ์',
    'Further Products': 'ผลิตภัณฑ์เพิ่มเติม',
    'Interface Cables And Adaptors': 'สายเชื่อมต่อและอแดปเตอร์',
    'Tripods And Stands': 'ขาตั้งและขาตั้งอุปกรณ์',
    'Mains Power Adaptor': 'อแดปเตอร์ไฟฟ้า',
    'Environmental Monitoring': 'การตรวจสอบสิ่งแวดล้อม',
    'Acoustic Cameras': 'กล้องอะคูสติก',
    'Impedance Tubes': 'ท่ออิมพีแดนซ์',
    'Visualization Simulation And Evaluation Of Sound': 'การแสดงภาพ การจำลอง และการประเมินเสียง',
    'Adaptors': 'อแดปเตอร์',
    'Accessories': 'อุปกรณ์เสริม',
    'Preamplifiers': 'พรีแอมปลิฟายเออร์',
    'Power Amplifiers': 'เพาเวอร์แอมปลิฟายเออร์',
    'Vibration Sensors': 'เซนเซอร์การสั่นสะเทือน',
    'Vibration Monitoring': 'การตรวจสอบการสั่นสะเทือน',
    'Wood Testing': 'การทดสอบไม้',
    'Workplace Noise Assessment': 'การประเมินเสียงในสถานที่ทำงาน'
  }

  for (const category of categories) {
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    // Count only active products in this category
    const productCount = activeProducts.filter(p => p.category === category).length

    await prisma.category.upsert({
      where: { slug },
      update: {
        name_en: category,
        name_th: categoryTranslations[category] || category,
        product_count: productCount,
        active: productCount > 0  // Only activate categories with products
      },
      create: {
        name_en: category,
        name_th: categoryTranslations[category] || category,
        slug,
        product_count: productCount,
        active: productCount > 0  // Only activate categories with products
      }
    })
  }

  console.log('✅ Categories created')

  // Create products
  let createdCount = 0
  let updatedCount = 0

  for (const productData of productsData) {
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { sku: productData.sku }
      })

      if (existingProduct) {
        await prisma.product.update({
          where: { sku: productData.sku },
          data: {
            title_en: productData.title_en,
            title_th: productData.title_th,
            description_en: productData.description_en,
            description_th: productData.description_th,
            category: productData.category || 'Uncategorized',
            images: productData.images || [],
            pdfs: productData.pdfs || [],
            has_pricing: productData.has_pricing,
            source_url: productData.source_url,
            supplier: productData.supplier || null,
            active: productData.is_active !== undefined ? productData.is_active : true
          }
        })
        updatedCount++
      } else {
        await prisma.product.create({
          data: {
            sku: productData.sku,
            title_en: productData.title_en,
            title_th: productData.title_th,
            description_en: productData.description_en,
            description_th: productData.description_th,
            category: productData.category || 'Uncategorized',
            images: productData.images || [],
            pdfs: productData.pdfs || [],
            has_pricing: productData.has_pricing,
            source_url: productData.source_url,
            supplier: productData.supplier || null,
            active: productData.is_active !== undefined ? productData.is_active : true
          }
        })
        createdCount++
      }
    } catch (error) {
      console.error(`❌ Error processing product ${productData.sku}:`, error)
    }
  }

  console.log(`✅ Products processed: ${createdCount} created, ${updatedCount} updated`)

  // Update category product counts based on actual products in database
  console.log('🔄 Updating category product counts...')
  const allCategories = await prisma.category.findMany()
  
  for (const category of allCategories) {
    const productCount = await prisma.product.count({
      where: {
        active: true,
        category: category.name_en
      }
    })
    
    await prisma.category.update({
      where: { id: category.id },
      data: {
        product_count: productCount,
        active: productCount > 0
      }
    })
    
    console.log(`  ✓ ${category.name_en}: ${productCount} products`)
  }
  
  console.log('✅ Category counts updated')

  // Create admin user
  const bcrypt = require('bcryptjs')
  const hashedPassword = await bcrypt.hash('johndoe123', 10)
  const hashedAdminPassword = await bcrypt.hash('admin123', 10)

  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      name: 'Test User',
      role: 'admin'
    }
  })

  await prisma.user.upsert({
    where: { email: 'info@placid.asia' },
    update: {},
    create: {
      email: 'info@placid.asia',
      password: hashedAdminPassword,
      name: 'Admin User',
      role: 'admin'
    }
  })

  console.log('✅ Admin users created')
  console.log('🎉 Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
