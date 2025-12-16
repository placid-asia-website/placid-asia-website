import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

config()

const prisma = new PrismaClient()

async function main() {
  // Find the Preamplifiers category
  const preamps = await prisma.category.findFirst({
    where: { 
      name_en: 'Preamplifiers',
      active: true
    },
    include: {
      parent: {
        include: {
          parent: true
        }
      }
    }
  })

  if (preamps) {
    console.log('✅ Preamplifiers category found!\n')
    console.log('Category Details:')
    console.log(`  Name (EN): ${preamps.name_en}`)
    console.log(`  Name (TH): ${preamps.name_th}`)
    console.log(`  Slug: ${preamps.slug}`)
    console.log(`  Product Count: ${preamps.product_count}`)
    console.log(`  Active: ${preamps.active}`)
    console.log(`  Order: ${preamps.order}\n`)

    if (preamps.parent) {
      console.log('Hierarchy:')
      if (preamps.parent.parent) {
        console.log(`  ${preamps.parent.parent.name_en} (root)`)
      }
      console.log(`    └─ ${preamps.parent.name_en} (child)`)
      console.log(`        └─ ${preamps.name_en} (grandchild)\n`)
    }

    console.log(`✅ View it at: https://placid.asia/categories/${preamps.slug}`)
    console.log(`✅ Or view the full hierarchy at: https://placid.asia/categories-hierarchy`)
  } else {
    console.log('❌ Preamplifiers category not found or inactive')
  }

  await prisma.$disconnect()
}

main().catch(console.error)
