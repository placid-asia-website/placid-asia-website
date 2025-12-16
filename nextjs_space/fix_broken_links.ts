import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function fixBrokenLinks() {
  console.log('🔧 Fixing broken external links...');

  // Fix broken PDF link for VISUALIZATION-SIMULATION-AND-EVALUATION-OF-SOUNDS
  const vizProduct = await prisma.product.findUnique({
    where: { sku: 'VISUALIZATION-SIMULATION-AND-EVALUATION-OF-SOUNDS' }
  });

  if (vizProduct && vizProduct.pdfs) {
    const pdfs = Array.isArray(vizProduct.pdfs) ? vizProduct.pdfs : JSON.parse(vizProduct.pdfs as string);
    const filteredPdfs = pdfs.filter((pdf: string) => !pdf.includes('siVisiononLivePad_en.pdf'));
    
    await prisma.product.update({
      where: { sku: 'VISUALIZATION-SIMULATION-AND-EVALUATION-OF-SOUNDS' },
      data: { pdfs: filteredPdfs as any }
    });
    console.log('✅ Removed broken PDF link from VISUALIZATION-SIMULATION-AND-EVALUATION-OF-SOUNDS');
  }

  // Fix broken source URLs for APS products
  const apsProducts = ['APS-129', 'APS-300', 'APS-500', 'APS-600'];
  for (const sku of apsProducts) {
    await prisma.product.updateMany({
      where: { sku },
      data: { source_url: 'https://www.apsdynamics.com/' }
    });
  }
  console.log('✅ Updated APS product source URLs');

  // Fix broken source URLs for SPEKTRA products
  await prisma.product.updateMany({
    where: { sku: 'SPEKTRA-CS18-MODAL-SYSTEM' },
    data: { source_url: 'https://www.spektra-dresden.com/' }
  });
  await prisma.product.updateMany({
    where: { sku: 'SPEKTRA-VCS-SHAKER-CONTROL' },
    data: { source_url: 'https://www.spektra-dresden.com/' }
  });
  await prisma.product.updateMany({
    where: { sku: 'SPEKTRA-Q-LEAP-SYSTEM' },
    data: { source_url: 'https://www.spektra-dresden.com/' }
  });
  console.log('✅ Updated SPEKTRA product source URLs');

  // Fix Convergence Instruments URLs (change http:// to https://)
  await prisma.product.updateMany({
    where: {
      source_url: {
        contains: 'convergenceinstruments.com'
      }
    },
    data: { source_url: 'https://www.convergenceinstruments.com/' }
  });
  console.log('✅ Updated Convergence Instruments URLs');

  // Update products_data.json backup
  const dataPath = path.join(__dirname, 'data', 'products_data.json');
  const backupPath = path.join(__dirname, 'data', `products_data.json.backup.${new Date().toISOString().split('T')[0]}`);
  
  if (fs.existsSync(dataPath)) {
    fs.copyFileSync(dataPath, backupPath);
    console.log(`✅ Created backup at ${backupPath}`);
  }

  console.log('\n✨ All broken links have been fixed!');
}

fixBrokenLinks()
  .catch((error) => {
    console.error('❌ Error fixing broken links:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
