import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking image sources in database...\n');

  const products = await prisma.product.findMany({
    where: { active: true },
    select: {
      sku: true,
      title_en: true,
      supplier: true,
      images: true
    }
  });

  const imageSources: Record<string, number> = {};
  const productsBySource: Record<string, Array<{sku: string, title: string, supplier: string, image: string}>> = {};

  products.forEach(product => {
    const images = product.images as string[];
    if (images && images.length > 0) {
      const firstImage = images[0];
      
      if (firstImage.startsWith('http')) {
        // Extract domain
        const domain = firstImage.replace(/^https?:\/\//, '').split('/')[0];
        imageSources[domain] = (imageSources[domain] || 0) + 1;
        
        if (!productsBySource[domain]) {
          productsBySource[domain] = [];
        }
        productsBySource[domain].push({
          sku: product.sku,
          title: product.title_en,
          supplier: product.supplier || 'Unknown',
          image: firstImage
        });
      } else {
        imageSources['LOCAL'] = (imageSources['LOCAL'] || 0) + 1;
        
        if (!productsBySource['LOCAL']) {
          productsBySource['LOCAL'] = [];
        }
        productsBySource['LOCAL'].push({
          sku: product.sku,
          title: product.title_en,
          supplier: product.supplier || 'Unknown',
          image: firstImage
        });
      }
    }
  });

  console.log('📊 IMAGE SOURCES SUMMARY:\n');
  Object.entries(imageSources)
    .sort((a, b) => b[1] - a[1])
    .forEach(([source, count]) => {
      console.log(`${source}: ${count} products`);
    });

  // Check for any suspicious domains
  console.log('\n🔍 Checking for non-official sources...\n');
  
  const officialDomains = [
    'www.norsonic.com',
    'norsonic.com',
    'www.spektra-dresden.com',
    'spektra-dresden.com',
    'soundtec.eu',
    'www.soundtec.eu',
    'www.apsdynamics.com',
    'apsdynamics.com',
    'placidinstruments.com',
    'www.placidinstruments.com',
    'profound.nl',
    'www.profound.nl',
    'static.abacusaicdn.net',
    'cdn.abacus.ai',
    'mmf.de',
    'www.mmf.de',
    'noiseqc.com',
    'www.noiseqc.com',
    'convergenceinstruments.com',
    'www.convergenceinstruments.com',
    'rion.co.jp',
    'www.rion.co.jp'
  ];

  const nonOfficialSources = Object.keys(imageSources).filter(
    domain => domain !== 'LOCAL' && !officialDomains.includes(domain)
  );

  if (nonOfficialSources.length > 0) {
    console.log('⚠️  Found non-official sources:');
    nonOfficialSources.forEach(source => {
      console.log(`\n${source} (${imageSources[source]} products):`);
      const examples = productsBySource[source].slice(0, 3);
      examples.forEach(p => {
        console.log(`  - ${p.sku}: ${p.title} (${p.supplier})`);
        console.log(`    ${p.image}`);
      });
    });
  } else {
    console.log('✅ All external images are from official supplier websites!');
  }

  console.log('\n📦 Products using LOCAL images:');
  console.log(`Total: ${imageSources['LOCAL'] || 0} products`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
