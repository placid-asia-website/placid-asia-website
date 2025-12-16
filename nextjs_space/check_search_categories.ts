import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function checkIssues() {
  try {
    // Check NSRTW_MK4
    const nsrtw = await prisma.product.findFirst({
      where: { sku: 'CONVERGENCE-NSRTW_MK4' }
    });
    
    console.log('=== NSRTW_MK4 Product ===');
    console.log('Title:', nsrtw?.title_en);
    console.log('Category:', nsrtw?.category);
    console.log('Supplier:', nsrtw?.supplier);
    console.log('Active:', nsrtw?.active);
    
    // Check VSEW_MK4
    const vsew = await prisma.product.findFirst({
      where: { sku: 'CONVERGENCE-VSEW_MK4-8G' }
    });
    
    console.log('\n=== VSEW_MK4 Product ===');
    console.log('Title:', vsew?.title_en);
    console.log('Category:', vsew?.category);
    console.log('Supplier:', vsew?.supplier);
    console.log('Active:', vsew?.active);
    
    // Check categories
    const measMics = await prisma.product.count({
      where: { category: 'Measurement Microphones', active: true }
    });
    
    const spectral = await prisma.product.count({
      where: { category: 'Spectral Analysis', active: true }
    });
    
    const mics = await prisma.product.count({
      where: { category: 'Microphones', active: true }
    });
    
    console.log('\n=== Category Product Counts ===');
    console.log('Measurement Microphones:', measMics);
    console.log('Spectral Analysis:', spectral);
    console.log('Microphones:', mics);
    
    // Search for convergence products
    const convergenceProducts = await prisma.product.findMany({
      where: {
        active: true,
        supplier: 'Convergence Instruments'
      },
      select: {
        sku: true,
        title_en: true,
        category: true
      }
    });
    
    console.log('\n=== Convergence Instruments Products ===');
    console.log(`Total: ${convergenceProducts.length}`);
    convergenceProducts.forEach(p => {
      console.log(`- ${p.sku}: ${p.title_en} (${p.category})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkIssues();
