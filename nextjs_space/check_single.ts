import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function check() {
  try {
    const product = await prisma.product.findUnique({
      where: { sku: 'PREAMPLIFIERS' }
    });
    
    if (product) {
      console.log('PREAMPLIFIERS:');
      console.log(`  Images: ${JSON.stringify(product.images)}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

check();
