import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function checkDuplicateImages() {
  console.log('🔍 Checking for duplicate images in products...');
  
  const products = await prisma.product.findMany({
    where: { active: true }
  });

  let foundDuplicates = false;

  for (const product of products) {
    if (product.images) {
      const images = Array.isArray(product.images) 
        ? product.images 
        : JSON.parse(product.images as string);
      
      const uniqueImages = [...new Set(images)];
      
      if (images.length !== uniqueImages.length) {
        console.log(`\n⚠️  Product ${product.sku} has duplicate images:`);
        console.log(`   Total: ${images.length}, Unique: ${uniqueImages.length}`);
        
        // Fix by removing duplicates
        await prisma.product.update({
          where: { sku: product.sku },
          data: { images: uniqueImages as any }
        });
        console.log(`   ✅ Fixed: Removed ${images.length - uniqueImages.length} duplicate(s)`);
        foundDuplicates = true;
      }
    }
  }

  if (!foundDuplicates) {
    console.log('✅ No duplicate images found within individual products');
  }

  console.log('\n📝 Note: Images appearing on multiple pages (product listings, categories, brands) are expected and not duplicates.');
}

checkDuplicateImages()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
