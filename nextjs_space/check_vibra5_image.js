const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkImage() {
  const product = await prisma.product.findUnique({
    where: { sku: 'PROFOUND-VIBRA-5+' },
    select: { sku: true, title_en: true, images: true }
  });
  
  if (product) {
    console.log('✓ Product found in database:');
    console.log('  SKU:', product.sku);
    console.log('  Title:', product.title_en);
    console.log('  Images:', product.images);
  } else {
    console.log('✗ Product not found');
  }
  
  await prisma.$disconnect();
}

checkImage();
