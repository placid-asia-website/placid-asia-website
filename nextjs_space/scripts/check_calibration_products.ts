import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function main() {
  // Check NOR1525 in database
  const nor1525 = await prisma.product.findUnique({
    where: { sku: 'NOR1525' },
    select: {
      sku: true,
      title_en: true,
      active: true,
      category: true
    }
  });
  
  console.log('NOR1525 status:', nor1525);
  
  // Check Q-LEAP products
  const qleapProducts = await prisma.product.findMany({
    where: {
      OR: [
        { sku: { contains: 'Q-LEAP', mode: 'insensitive' } },
        { sku: { contains: 'QLEAP', mode: 'insensitive' } }
      ]
    },
    select: {
      sku: true,
      title_en: true,
      active: true,
      category: true
    }
  });
  
  console.log('\nQ-LEAP products:', qleapProducts);
  
  // If NOR1525 is inactive, activate it
  if (nor1525 && !nor1525.active) {
    console.log('\nActivating NOR1525...');
    await prisma.product.update({
      where: { sku: 'NOR1525' },
      data: { active: true }
    });
    console.log('NOR1525 activated successfully!');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
