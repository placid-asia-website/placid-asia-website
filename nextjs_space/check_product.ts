import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function checkProduct() {
  try {
    const product = await prisma.product.findUnique({
      where: { sku: 'PLACID-POFM-01' }
    });
    
    if (product) {
      console.log('Product found in database:');
      console.log('SKU:', product.sku);
      console.log('Title:', product.title_en);
      console.log('Images:', JSON.stringify(product.images, null, 2));
      console.log('Active:', product.active);
    } else {
      console.log('Product NOT found in database');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProduct();
