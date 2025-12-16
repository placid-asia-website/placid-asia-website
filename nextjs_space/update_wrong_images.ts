import fs from 'fs';
import path from 'path';

console.log('🔄 Updating product images based on user review...\n');

const jsonPath = path.join(__dirname, 'data', 'products_data.json');
const productsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// Map of SKU to correct CDN image URL
const correctImages: Record<string, string> = {
  'APS-129': 'https://cdn.abacus.ai/images/ce400095-8def-4395-8986-e0186e58ebef.png',
  'APS-600': 'https://cdn.abacus.ai/images/b5bfdf04-3ad8-49d5-8ffc-b98204c304d3.png',
  'APS-500': 'https://cdn.abacus.ai/images/ca227ab7-b2d3-4b13-9491-6c5d29e69e3a.png',
  'PA-500-DM': 'https://cdn.abacus.ai/images/6543dfbe-6eb1-4cec-a5ec-316f19ccab12.png',
  'APS-300': 'https://cdn.abacus.ai/images/e48b097e-bb5c-42e8-bf52-037ee1660421.png',
  'BEDROCK-BTB115': 'https://cdn.abacus.ai/images/2bced790-96f3-474d-90c4-1d7474a1d65a.png',
  'CONVERGENCE-NSRTW_MK4': 'https://cdn.abacus.ai/images/aff531c5-ed87-4d60-acda-f5190e0f9e64.png',
  'NOISEQC-NOISEQC': 'https://cdn.abacus.ai/images/8bd409f7-28cf-4a29-b452-d79ca171eb1e.png',
  'SOUND-CALIBRATOR': 'https://cdn.abacus.ai/images/ecd4e641-abc3-4d9c-b5ed-5bf3651300af.png',
  'MEASUREMENT-MICROPHONE-SETS': 'https://cdn.abacus.ai/images/b2f2c89c-ab61-4b1b-a00e-ae1882d59d7f.png',
  'PREAMPLIFIERS': 'https://cdn.abacus.ai/images/600bdbf3-0ce8-4e01-b19f-7049b81b79b2.png',
  'HEMISPHERE-KITS': 'https://cdn.abacus.ai/images/269bad58-6f75-4318-a340-2cc30b34869c.png',
  'IMPEDANCE-TUBE': 'https://cdn.abacus.ai/images/4763aa64-d139-4db9-a0b7-4904d1919049.png',
  'SPEKTRA-CV-05': 'https://cdn.abacus.ai/images/d72891c3-831d-413d-a984-7afe267e0886.png',
  'SPEKTRA-CV-10': 'https://cdn.abacus.ai/images/8d8c65fd-989c-487d-b904-682d81efef87.png',
  'SPEKTRA-SE-2X': 'https://cdn.abacus.ai/images/ee4e4e01-0b00-4fa3-b4a9-094fef4071cd.png'
};

let updated = 0;
const changes: Array<{sku: string, title: string, oldImage: string, newImage: string}> = [];

productsData.forEach((product: any) => {
  if (correctImages[product.sku]) {
    const oldImage = product.images[0] || 'No image';
    const newImage = correctImages[product.sku];
    
    product.images = [newImage];
    updated++;
    changes.push({
      sku: product.sku,
      title: product.title_en,
      oldImage,
      newImage
    });
  }
});

fs.writeFileSync(jsonPath, JSON.stringify(productsData, null, 2));

console.log(`✅ Updated ${updated} products with correct images\n`);

console.log('📝 Changes made:\n');
changes.forEach((change, i) => {
  console.log(`${i + 1}. ${change.sku} - ${change.title}`);
  console.log(`   OLD: ${change.oldImage}`);
  console.log(`   NEW: ${change.newImage}\n`);
});

// Save report
const reportPath = path.join(__dirname, '..', '..', 'Uploads', 'IMAGE-FIX-REPORT.json');
fs.writeFileSync(reportPath, JSON.stringify(changes, null, 2));
console.log(`📄 Report saved to: ${reportPath}\n`);

console.log('✅ All wrong images have been corrected with official supplier images!');
console.log('⚠️  Next step: Reseed the database to apply these changes to the live site.\n');
