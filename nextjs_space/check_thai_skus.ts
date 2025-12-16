import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

config()

const prisma = new PrismaClient()

async function checkThaiSKUs() {
  try {
    // Check for products with Thai characters in SKU
    const products = await prisma.product.findMany({
      where: {
        active: true
      },
      select: {
        sku: true,
        title_en: true,
        title_th: true
      }
    })

    console.log(`Total active products: ${products.length}`)
    
    // Check for Thai characters (Unicode range for Thai is \u0E00-\u0E7F)
    const thaiRegex = /[\u0E00-\u0E7F]/
    
    const productsWithThaiSKU = products.filter(p => thaiRegex.test(p.sku))
    
    if (productsWithThaiSKU.length > 0) {
      console.log(`\n⚠️  Found ${productsWithThaiSKU.length} products with Thai characters in SKU:`)
      productsWithThaiSKU.forEach(p => {
        console.log(`SKU: ${p.sku}`)
        console.log(`Title EN: ${p.title_en}`)
        console.log(`Title TH: ${p.title_th}`)
        console.log('---')
      })
    } else {
      console.log('\n✓ No products with Thai characters in SKU found')
    }
    
    // Check for products with spaces or special characters in SKU
    const specialCharRegex = /[^A-Za-z0-9\-_()]/
    const productsWithSpecialChars = products.filter(p => specialCharRegex.test(p.sku))
    
    if (productsWithSpecialChars.length > 0) {
      console.log(`\n⚠️  Found ${productsWithSpecialChars.length} products with special characters in SKU:`)
      productsWithSpecialChars.slice(0, 10).forEach(p => {
        console.log(`SKU: "${p.sku}"`)
        console.log(`Title EN: ${p.title_en}`)
        console.log('---')
      })
      if (productsWithSpecialChars.length > 10) {
        console.log(`... and ${productsWithSpecialChars.length - 10} more`)
      }
    } else {
      console.log('\n✓ All SKUs use only standard characters')
    }

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkThaiSKUs()
