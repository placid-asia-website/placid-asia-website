import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function checkMicrophones() {
  try {
    // Get all microphone products
    const mics = await prisma.product.findMany({
      where: {
        active: true,
        category: 'Microphones'
      },
      select: {
        sku: true,
        title_en: true,
        supplier: true
      },
      orderBy: {
        supplier: 'asc'
      }
    });
    
    const measMics = await prisma.product.findMany({
      where: {
        active: true,
        category: 'Measurement Microphones'
      },
      select: {
        sku: true,
        title_en: true,
        supplier: true
      }
    });
    
    console.log('=== Measurement Microphones (1 product) ===');
    measMics.forEach(m => console.log(`- ${m.sku}: ${m.title_en} (${m.supplier})`));
    
    console.log('\n=== Microphones Category (21 products) ===');
    console.log('Should be moved to Measurement Microphones:');
    mics.forEach(m => {
      // Check if it's a measurement microphone based on title or supplier
      const isMeasurement = m.title_en.toLowerCase().includes('measurement') ||
                           m.title_en.toLowerCase().includes('mic') ||
                           m.title_en.toLowerCase().includes('pmp') ||
                           m.title_en.toLowerCase().includes('cartridge') ||
                           m.supplier === 'Placid Instruments' ||
                           m.supplier === 'Norsonic' ||
                           m.supplier === 'Convergence Instruments';
      
      if (isMeasurement) {
        console.log(`✓ ${m.sku}: ${m.title_en} (${m.supplier})`);
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkMicrophones();
