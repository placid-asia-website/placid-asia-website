import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function checkBrokenImages() {
  console.log('🔍 Checking for products with problematic images...');
  
  const products = await prisma.product.findMany({
    where: { active: true }
  });

  let foundIssues = false;

  for (const product of products) {
    if (product.images) {
      let images: any[];
      try {
        images = Array.isArray(product.images) 
          ? product.images 
          : JSON.parse(product.images as string);
      } catch (e) {
        console.log(`\n⚠️  Product ${product.sku} has invalid JSON in images field`);
        foundIssues = true;
        continue;
      }

      // Check for empty strings, null, undefined, or malformed URLs
      const hasIssues = images.some((img: any) => 
        !img || 
        typeof img !== 'string' || 
        img.trim() === '' ||
        img === '[' ||
        img.startsWith('[') && !img.startsWith('http')
      );

      if (hasIssues) {
        console.log(`\n⚠️  Product ${product.sku} (${product.title_en}) has problematic images:`);
        console.log(`   Images:`, images);
        
        // Fix by filtering out invalid images
        const validImages = images.filter((img: any) => 
          img && 
          typeof img === 'string' && 
          img.trim() !== '' &&
          !img.startsWith('[') &&
          (img.startsWith('http') || img.startsWith('/'))
        );
        
        if (validImages.length !== images.length) {
          await prisma.product.update({
            where: { sku: product.sku },
            data: { images: validImages as any }
          });
          console.log(`   ✅ Fixed: Removed ${images.length - validImages.length} invalid image(s)`);
          foundIssues = true;
        }
      }
    }
  }

  if (!foundIssues) {
    console.log('✅ No products with problematic images found');
  }
}

checkBrokenImages()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
