import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function checkAllPlacid() {
  try {
    const skus = [
      'PLACID-POFM-01',
      'HEMISPHERE',
      'MEASUREMENT-MICROPHONE-SETS',
      'PREAMPLIFIERS',
      'HEMISPHERE-KITS',
      'SOUND-CALIBRATOR',
      'IMPEDANCE-TUBE'
    ];
    
    for (const sku of skus) {
      const product = await prisma.product.findUnique({
        where: { sku }
      });
      
      if (product) {
        console.log(`\n${sku}:`);
        console.log(`  Title: ${product.title_en}`);
        console.log(`  Images: ${JSON.stringify(product.images)}`);
      } else {
        console.log(`\n${sku}: NOT FOUND`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAllPlacid();
