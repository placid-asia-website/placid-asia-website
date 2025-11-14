
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

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
    'Mains Power Adaptor': 'อแดปเตอร์ไฟฟ้า',
    'Environmental Monitoring': 'การตรวจสอบสิ่งแวดล้อม',
    'Calibrators': 'เครื่องมือปรับเทียบ',
    'Acoustic Cameras': 'กล้องอะคูสติก',
    'Acoustic Camera': 'กล้องอะคูสติก',
    'Visualization Simulation And Evaluation Of Sound': 'การแสดงภาพ การจำลอง และการประเมินเสียง',
    'Adaptors': 'อแดปเตอร์',
    'Accessories': 'อุปกรณ์เสริม',
    'Acoustic Measurement Analysis And Documentation': 'การวัด การวิเคราะห์ และการจัดทำเอกสารทางอะคูสติก'
  }

  for (const category of categories) {
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const productCount = productsData.filter(p => p.category === category).length

    await prisma.category.upsert({
      where: { slug },
      update: {
        name_en: category,
        name_th: categoryTranslations[category] || category,
        product_count: productCount
      },
      create: {
        name_en: category,
        name_th: categoryTranslations[category] || category,
        slug,
        product_count: productCount,
        active: true
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
