import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Count products by supplier
  const products = await prisma.product.findMany({
    where: { active: true },
    select: { supplier: true }
  })
  
  const supplierCounts: Record<string, number> = {}
  products.forEach(product => {
    const supplier = product.supplier || 'No Supplier'
    supplierCounts[supplier] = (supplierCounts[supplier] || 0) + 1
  })
  
  console.log('Active Products by Supplier:')
  Object.entries(supplierCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([supplier, count]) => {
      console.log(`  ${supplier}: ${count} products`)
    })
  
  console.log(`\nTotal active products: ${products.length}`)
  console.log(`Total brands: ${Object.keys(supplierCounts).length}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
