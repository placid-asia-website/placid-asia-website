import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('\n=== Activating Sound Sources Category ===\n');
  
  // 1. Activate the "Noise Sources" category
  const category = await prisma.category.update({
    where: { slug: 'noise-sources' },
    data: { active: true }
  });
  console.log('✓ Activated category:', category.name_en);
  
  // 2. List of products that should be in Sound Sources / Noise Sources
  const soundSourceSkus = [
    'NOR278',  // Reference Sound Source
    'NOR283',  // Dodecahedron loudspeaker
    'NOR286',  // ORIGAMI impulse sound source
    'NOR279',  // Impact ball
    'NOR277',  // Tapping machine
    'NOR280',  // Power amplifier (for sound sources)
    'NOR282',  // Power amplifier (for sound sources)
    'NOR1494', // Loudspeaker cable
  ];
  
  console.log('\n=== Moving Products to Noise Sources ===\n');
  
  // 3. Update each product
  for (const sku of soundSourceSkus) {
    try {
      const product = await prisma.product.update({
        where: { sku: sku },
        data: { category: 'Noise Sources' }
      });
      console.log(`✓ Moved ${sku}: ${product.title_en}`);
    } catch (error) {
      console.log(`✗ Failed to move ${sku}:`, error);
    }
  }
  
  // 4. Recalculate product counts for affected categories
  console.log('\n=== Updating Category Product Counts ===\n');
  
  const categories = await prisma.category.findMany({
    select: { id: true, name_en: true, slug: true }
  });
  
  for (const cat of categories) {
    const count = await prisma.product.count({
      where: {
        active: true,
        category: cat.name_en
      }
    });
    
    await prisma.category.update({
      where: { id: cat.id },
      data: { product_count: count }
    });
    
    if (count > 0 || cat.slug === 'noise-sources') {
      console.log(`Updated ${cat.name_en.padEnd(40)} → ${count} products`);
    }
  }
  
  console.log('\n✓ Done!\n');
}

main().finally(() => prisma.$disconnect());
