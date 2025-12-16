
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Migrating products to new category structure...\n');

  try {
    // Get the new "Sound Level Meters & Analyzers" category
    const slmAnalyzersCategory = await prisma.category.findFirst({
      where: { slug: 'sound-level-meters-analyzers' }
    });

    if (!slmAnalyzersCategory) {
      console.log('❌ Could not find "Sound Level Meters & Analyzers" category');
      return;
    }

    // Update products that were in "Sound Level Meters" or "Sound Analyzers"
    console.log('Updating products from old categories to new structure...');
    
    // Update products that reference "Sound Level Meters" or "Sound Analyzers"
    const updatedProducts = await prisma.product.updateMany({
      where: {
        OR: [
          { category: 'Sound Level Meters' },
          { category: 'Sound Analyzers' }
        ]
      },
      data: {
        category: slmAnalyzersCategory.name_en
      }
    });

    console.log(`✅ Updated ${updatedProducts.count} products to "Sound Level Meters & Analyzers"`);

    // Get the new "Vibration & NVH Shakers" category
    const nvhShakersCategory = await prisma.category.findFirst({
      where: { slug: 'vibration-nvh-shakers' }
    });

    if (nvhShakersCategory) {
      // Update products that were in "Vibration Exciters"
      const updatedShakers = await prisma.product.updateMany({
        where: {
          category: 'Vibration Exciters'
        },
        data: {
          category: nvhShakersCategory.name_en
        }
      });

      console.log(`✅ Updated ${updatedShakers.count} products to "Vibration & NVH Shakers"`);
    }

    // Update product counts for all categories
    console.log('\nRecalculating category product counts...');
    const categories = await prisma.category.findMany();
    
    for (const category of categories) {
      const productCount = await prisma.product.count({
        where: {
          category: category.name_en,
          active: true
        }
      });

      await prisma.category.update({
        where: { id: category.id },
        data: { product_count: productCount }
      });
    }

    console.log('✅ Category product counts updated');

    console.log('\n✅ Migration complete!');
    
    // Display summary
    console.log('\n📊 Summary:');
    console.log(`   - Migrated Sound Level Meters/Analyzers to new unified category`);
    console.log(`   - Updated Vibration Exciters to Vibration & NVH Shakers`);
    console.log(`   - Recalculated all category product counts`);
    
  } catch (error) {
    console.error('❌ Error migrating products:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
