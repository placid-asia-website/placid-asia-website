import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();
const prisma = new PrismaClient();

async function checkFeatured() {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: { 
        active: true,
        featured: true 
      },
      select: {
        sku: true,
        title_en: true,
        featured: true,
        updatedAt: true
      },
      orderBy: { updatedAt: 'desc' }
    });
    
    console.log('\n=== CURRENTLY FEATURED PRODUCTS ===\n');
    console.log(`Total: ${featuredProducts.length} products\n`);
    
    featuredProducts.forEach((p, i) => {
      console.log(`${i+1}. ${p.sku}`);
      console.log(`   ${p.title_en}`);
      console.log(`   Featured: ${p.featured}`);
      console.log(`   Last Updated: ${p.updatedAt}\n`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkFeatured();
