import fs from 'fs';
import path from 'path';

// Official image URLs from supplier websites
const officialPlacidImages: Record<string, string> = {
  'PLACID-PMP20': 'https://placidinstruments.com/wp-content/uploads/2024/12/PMP20.png',
  'PLACID-PMP21': 'https://placidinstruments.com/wp-content/uploads/2024/12/PMP21.png',
  'PLACID-PMP41': 'https://placidinstruments.com/wp-content/uploads/2021/10/PMP41-1B-1-300x300.png',
  'PLACID-PMNU21': 'https://placidinstruments.com/wp-content/uploads/2024/12/PLACID-PMNV2125-low-noise-microphone-kit-300x300.png',
  'PLACID-PNP21': 'https://placidinstruments.com/wp-content/uploads/2024/12/PNP21.png',
  'PLACID-PNP22': 'https://placidinstruments.com/wp-content/uploads/2024/12/PNP22.png',
  'PLACID-PNP41': 'https://placidinstruments.com/wp-content/uploads/2024/12/PNP41.png',
  'PLACID-SL-02': 'https://placidinstruments.com/wp-content/uploads/2020/11/SL-02-.png',
  'PLACID-CA-01': 'https://placidinstruments.com/wp-content/uploads/2020/11/CA.png',
  'PLACID-CA-02': 'https://placidinstruments.com/wp-content/uploads/2020/11/CA.png',
  'PLACID-POFM-01': 'https://placidinstruments.com/wp-content/uploads/2024/10/PLACID-Optical-Fibre-POFM-01-300x226.png'
};

console.log('🔄 Updating products_data.json to use official supplier images...\n');

const jsonPath = path.join(__dirname, 'data', 'products_data.json');
const productsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

let updated = 0;
const changes: Array<{sku: string, title: string, oldImage: string, newImage: string}> = [];

productsData.forEach((product: any) => {
  if (product.supplier === 'Placid Instruments' && officialPlacidImages[product.sku]) {
    const oldImage = product.images[0];
    const newImage = officialPlacidImages[product.sku];
    
    if (oldImage !== newImage && (oldImage.includes('abacus') || oldImage.startsWith('/'))) {
      product.images = [newImage];
      updated++;
      changes.push({
        sku: product.sku,
        title: product.title_en,
        oldImage,
        newImage
      });
    }
  }
});

if (updated > 0) {
  fs.writeFileSync(jsonPath, JSON.stringify(productsData, null, 2));
  console.log(`✅ Updated ${updated} Placid Instruments products\n`);
  
  console.log('📝 Changes made:\n');
  changes.forEach((change, i) => {
    console.log(`${i + 1}. ${change.sku} - ${change.title}`);
    console.log(`   OLD: ${change.oldImage}`);
    console.log(`   NEW: ${change.newImage}\n`);
  });
  
  // Save report
  const reportPath = path.join(__dirname, '..', '..', 'Uploads', 'IMAGE-UPDATE-REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(changes, null, 2));
  console.log(`📄 Report saved to: ${reportPath}\n`);
  
  console.log('✅ All Placid Instruments products now use official placidinstruments.com images!');
  console.log('⚠️  Next step: Reseed the database to apply these changes to the live site.\n');
} else {
  console.log('✅ No updates needed - all images are already from official sources!\n');
}
