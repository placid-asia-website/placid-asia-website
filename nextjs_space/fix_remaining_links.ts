import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function fixRemainingLinks() {
  console.log('🔧 Fixing remaining broken links...');

  // Fetch all products and filter for siVision_en.pdf
  const allProducts = await prisma.product.findMany();
  
  let fixedCount = 0;
  for (const product of allProducts) {
    if (product.pdfs) {
      let pdfs: string[];
      try {
        pdfs = Array.isArray(product.pdfs) 
          ? product.pdfs 
          : JSON.parse(product.pdfs as string);
      } catch (e) {
        continue;
      }
      
      // Ensure all elements are strings
      if (!Array.isArray(pdfs) || !pdfs.every(item => typeof item === 'string')) {
        continue;
      }
      
      const hasBrokenPdf = pdfs.some((pdf: string) => typeof pdf === 'string' && pdf.includes('siVision_en.pdf'));
      
      if (hasBrokenPdf) {
        const filteredPdfs = pdfs.filter((pdf: string) => typeof pdf === 'string' && !pdf.includes('siVision_en.pdf'));
        
        await prisma.product.update({
          where: { sku: product.sku },
          data: { pdfs: filteredPdfs as any }
        });
        console.log(`✅ Removed siVision_en.pdf from ${product.sku}`);
        fixedCount++;
      }
    }
  }
  console.log(`\nFixed ${fixedCount} product(s) with siVision_en.pdf`);

  // Fix SoundPLAN Essential URL
  const soundplanUpdated = await prisma.product.updateMany({
    where: {
      source_url: {
        contains: 'soundplan.eu/products/soundplanessential'
      }
    },
    data: { source_url: 'https://www.soundplan.eu/' }
  });
  console.log(`✅ Updated ${soundplanUpdated.count} SoundPLAN product URL(s)`);

  console.log('\n📝 Note: convergenceinstruments.com returns 403 due to their website security.');
  console.log('   This is expected and the URL is still valid for browser access.');

  console.log('\n✨ All fixable broken links resolved!');
}

fixRemainingLinks()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
