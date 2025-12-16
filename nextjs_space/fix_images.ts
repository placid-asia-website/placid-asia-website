import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Fixing product images...');
  
  // Fix SPE-PLUS image path
  console.log('\n1. Fixing SPE-PLUS image...');
  const speProduct = await prisma.product.findFirst({
    where: { sku: 'SPE-PLUS' }
  });
  
  if (speProduct) {
    await prisma.product.update({
      where: { id: speProduct.id },
      data: {
        images: JSON.stringify([{
          url: 'https://placid.asia/SOUNDPLAN-SPE-PLUS.png',
          alt: 'SoundPLAN essential Plus - Noise Mapping Software'
        }])
      }
    });
    console.log('[OK] SPE-PLUS image fixed: https://placid.asia/SOUNDPLAN-SPE-PLUS.png');
  } else {
    console.log('[ERROR] SPE-PLUS product not found');
  }
  
  // Fix PLACID-ANGEL images
  console.log('\n2. Fixing PLACID-ANGEL images...');
  const angelProduct = await prisma.product.findFirst({
    where: { sku: 'PLACID-ANGEL' }
  });
  
  if (angelProduct) {
    await prisma.product.update({
      where: { id: angelProduct.id },
      data: {
        images: JSON.stringify([
          'https://placid.asia/PLACID-ANGEL-1.png',
          'https://placid.asia/PLACID-ANGEL-2.png'
        ])
      }
    });
    console.log('[OK] PLACID-ANGEL images fixed:');
    console.log('   - https://placid.asia/PLACID-ANGEL-1.png');
    console.log('   - https://placid.asia/PLACID-ANGEL-2.png');
  } else {
    console.log('[ERROR] PLACID-ANGEL product not found');
  }
  
  console.log('\n[OK] All image fixes complete!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
