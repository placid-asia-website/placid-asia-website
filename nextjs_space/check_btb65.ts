import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function checkBTB65() {
  try {
    const product = await prisma.product.findUnique({
      where: { sku: 'BEDROCK-BTB65' },
      select: {
        sku: true,
        title_en: true,
        images: true,
        active: true
      }
    });

    if (product) {
      console.log('✅ Product found in database:');
      console.log('SKU:', product.sku);
      console.log('Title:', product.title_en);
      console.log('Active:', product.active);
      console.log('Images:', JSON.stringify(product.images, null, 2));
    } else {
      console.log('❌ Product NOT found in database');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBTB65();
