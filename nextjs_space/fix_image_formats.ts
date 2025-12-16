import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function fixImageFormats() {
  console.log('🔧 Fixing image format issues...');
  
  const products = await prisma.product.findMany();
  
  let fixedCount = 0;

  for (const product of products) {
    if (product.images) {
      let images: any;
      try {
        images = Array.isArray(product.images) 
          ? product.images 
          : JSON.parse(product.images as string);
      } catch (e) {
        console.log(`⚠️  Product ${product.sku} has invalid JSON`);
        continue;
      }

      // Check if images are objects with 'url' property instead of strings
      if (Array.isArray(images) && images.length > 0 && typeof images[0] === 'object' && images[0]?.url) {
        const fixedImages = images.map((img: any) => img.url || img).filter((url: string) => 
          url && typeof url === 'string' && url.trim() !== ''
        );
        
        await prisma.product.update({
          where: { sku: product.sku },
          data: { images: fixedImages as any }
        });
        console.log(`✅ Fixed image format for ${product.sku}`);
        fixedCount++;
      }
      // Also check for invalid entries (non-strings, empty strings, etc.)
      else if (Array.isArray(images)) {
        const validImages = images.filter((img: any) => 
          img && 
          typeof img === 'string' && 
          img.trim() !== '' &&
          !img.startsWith('[') &&
          (img.startsWith('http') || img.startsWith('/') || img.startsWith('data:'))
        );
        
        if (validImages.length !== images.length) {
          await prisma.product.update({
            where: { sku: product.sku },
            data: { images: validImages as any }
          });
          console.log(`✅ Cleaned invalid images for ${product.sku}`);
          fixedCount++;
        }
      }
    }
  }

  console.log(`\n✨ Fixed ${fixedCount} product(s) with image format issues`);
}

fixImageFormats()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
