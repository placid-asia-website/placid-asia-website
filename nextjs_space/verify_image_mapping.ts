import fs from 'fs';
import path from 'path';

console.log('🔍 Verifying image sources after update...\n');

const jsonPath = path.join(__dirname, 'data', 'products_data.json');
const productsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

const placidProducts = productsData.filter((p: any) => p.supplier === 'Placid Instruments');

console.log(`📊 Placid Instruments Products: ${placidProducts.length}\n`);

const sources = {
  official: 0,
  cdn: 0,
  local: 0
};

placidProducts.forEach((product: any) => {
  const image = product.images[0] || '';
  if (image.includes('placidinstruments.com')) {
    sources.official++;
  } else if (image.includes('abacus')) {
    sources.cdn++;
  } else if (image.startsWith('/')) {
    sources.local++;
  }
});

console.log('Image Sources:');
console.log(`  ✅ Official (placidinstruments.com): ${sources.official}`);
console.log(`  🌐 CDN (abacusaicdn.net): ${sources.cdn}`);
console.log(`  📦 Local (/path): ${sources.local}`);

if (sources.cdn > 0) {
  console.log('\n⚠️  Still have CDN images - update may have missed some products');
} else if (sources.local > 0) {
  console.log('\n✅ All products use either official or local images');
} else {
  console.log('\n✅ All Placid Instruments products now use official placidinstruments.com images!');
}
