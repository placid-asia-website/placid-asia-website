import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.findFirst({ 
    where: { 
      OR: [
        { sku: { contains: 'SPE', mode: 'insensitive' } },
        { title_en: { contains: 'essential plus', mode: 'insensitive' } },
        { title_en: { contains: 'SPe+', mode: 'insensitive' } }
      ]
    } 
  });
  console.log(JSON.stringify(product, null, 2));
  await prisma.$disconnect();
}

main();
