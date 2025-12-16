import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Search for products that might be sound sources or noise sources
  const products = await prisma.product.findMany({
    where: {
      active: true,
      OR: [
        { title_en: { contains: 'source', mode: 'insensitive' } },
        { title_en: { contains: 'generator', mode: 'insensitive' } },
        { title_en: { contains: 'speaker', mode: 'insensitive' } },
        { description_en: { contains: 'sound source', mode: 'insensitive' } },
        { description_en: { contains: 'noise source', mode: 'insensitive' } },
        { title_en: { contains: 'dodecahedron', mode: 'insensitive' } },
        { title_en: { contains: 'loudspeaker', mode: 'insensitive' } }
      ]
    },
    select: {
      sku: true,
      title_en: true,
      category: true,
      supplier: true
    }
  });
  
  console.log('\nProducts that might be sound/noise sources:');
  console.log('Total found:', products.length);
  console.log('\n');
  products.forEach(p => {
    console.log(`- [${p.sku}] ${p.title_en}`);
    console.log(`  Category: ${p.category || 'None'} | Supplier: ${p.supplier}`);
    console.log('');
  });
}

main().finally(() => prisma.$disconnect());
