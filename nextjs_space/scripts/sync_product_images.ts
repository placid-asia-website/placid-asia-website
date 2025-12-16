import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

const prisma = new PrismaClient();

async function main() {
  console.log('Starting image sync from products_data.json to database...\n');
  
  // Load products_data.json
  const dataPath = path.join(__dirname, '..', 'data', 'products_data.json');
  const productsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const dataProduct of productsData) {
    try {
      // Find product in database
      const dbProduct = await prisma.product.findUnique({
        where: { sku: dataProduct.sku }
      });
      
      if (!dbProduct) {
        skipped++;
        continue;
      }
      
      const dbImages = (dbProduct.images as string[]) || [];
      const dataImages = dataProduct.images || [];
      
      // Check if images differ
      if (JSON.stringify(dbImages) !== JSON.stringify(dataImages)) {
        await prisma.product.update({
          where: { sku: dataProduct.sku },
          data: { images: dataImages }
        });
        
        console.log(`✓ Updated ${dataProduct.sku}: ${dataProduct.title_en}`);
        console.log(`  Old: ${JSON.stringify(dbImages.slice(0, 1))}...`);
        console.log(`  New: ${JSON.stringify(dataImages.slice(0, 1))}...`);
        updated++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`✗ Error updating ${dataProduct.sku}:`, error);
      errors++;
    }
  }
  
  console.log('\n=== SYNC COMPLETE ===');
  console.log(`Updated: ${updated} products`);
  console.log(`Skipped: ${skipped} products (already in sync or not found)`);
  console.log(`Errors: ${errors} products`);
  
  // Show specific updates
  console.log('\n=== VERIFICATION ===');
  const hemisphereCheck = await prisma.product.findUnique({
    where: { sku: 'HEMISPHERE' },
    select: { sku: true, title_en: true, images: true }
  });
  
  console.log('Hemisphere product after sync:');
  console.log(JSON.stringify(hemisphereCheck, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
