
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Category definitions
const NEW_CATEGORIES = {
  'Measurement Microphones': { en: 'Measurement Microphones', th: 'ไมโครโฟนสำหรับการวัด', slug: 'measurement-microphones' },
  'Preamplifiers': { en: 'Preamplifiers', th: 'พรีแอมพลิฟายเออร์', slug: 'preamplifiers' },
  'Accelerometers': { en: 'Accelerometers', th: 'เครื่องวัดความเร่ง', slug: 'accelerometers' },
  'Acoustic Calibrators': { en: 'Acoustic Calibrators', th: 'เครื่องสอบเทียบเสียง', slug: 'acoustic-calibrators' },
  'Vibration Calibrators': { en: 'Vibration Calibrators', th: 'เครื่องสอบเทียบการสั่นสะเทือน', slug: 'vibration-calibrators' },
  'Vibration Meters': { en: 'Vibration Meters', th: 'เครื่องวัดการสั่นสะเทือน', slug: 'vibration-meters' },
  'Sound Analyzers': { en: 'Sound Analyzers', th: 'เครื่องวิเคราะห์เสียง', slug: 'sound-analyzers' },
  'DAQ (Data Acquisition)': { en: 'DAQ (Data Acquisition)', th: 'ระบบรับข้อมูล', slug: 'daq-data-acquisition' },
  'Acoustic Material Testing': { en: 'Acoustic Material Testing', th: 'การทดสอบวัสดุเสียง', slug: 'acoustic-material-testing' },
  'Acoustic Software': { en: 'Acoustic Software', th: 'ซอฟต์แวร์เสียง', slug: 'acoustic-software' },
  'Environmental Monitoring': { en: 'Environmental Monitoring', th: 'การตรวจวัดสิ่งแวดล้อม', slug: 'environmental-monitoring' },
  'Acoustic Cameras': { en: 'Acoustic Cameras', th: 'กล้องเสียง', slug: 'acoustic-cameras' },
  'Testing Equipment': { en: 'Testing Equipment', th: 'อุปกรณ์ทดสอบ', slug: 'testing-equipment' },
  'Noise Sources': { en: 'Noise Sources', th: 'แหล่งกำเนิดเสียง', slug: 'noise-sources' },
  'Cables and Accessories': { en: 'Cables and Accessories', th: 'สายเคเบิลและอุปกรณ์เสริม', slug: 'cables-and-accessories' },
  'Miscellaneous': { en: 'Miscellaneous', th: 'เบ็ดเตล็ด', slug: 'miscellaneous' }
};

interface ProductData {
  sku: string;
  title_en: string;
  category: string;
  [key: string]: any;
}

function getCategoriesForProduct(product: ProductData): string[] {
  const sku = product.sku;
  const title = product.title_en.toLowerCase();
  const old_category = product.category || '';
  const supplier = product.supplier || '';
  
  const categories: string[] = [];
  
  // Measurement Microphones
  if (['Placid Instruments', 'Norsonic'].includes(supplier) &&
      ['microphone', 'mic ', 'cartridge'].some(kw => title.includes(kw))) {
    if (!title.includes('preamplifier') && !title.includes('preamp')) {
      categories.push('Measurement Microphones');
    }
  }
  
  // Preamplifiers
  if (title.includes('preamplifier') || title.includes('preamp') || 
      sku.startsWith('PLACID-PMP') || sku.startsWith('PLACID-PNP') || sku.startsWith('PLACID-PMNU')) {
    categories.push('Preamplifiers');
  }
  
  // Accelerometers
  if (title.includes('accelerometer') || sku.startsWith('APS-')) {
    if (!title.includes('shaker') && !title.includes('power amplifier')) {
      categories.push('Accelerometers');
    }
  }
  
  // Acoustic Calibrators
  if (title.includes('calibrator') && !['MMF (Metra Mess- und Frequenztechnik)', 'SPEKTRA Dresden'].includes(supplier)) {
    if (!title.includes('vibration')) {
      categories.push('Acoustic Calibrators');
    }
  }
  
  // Vibration Calibrators
  if ((title.includes('vibration') && title.includes('calibrat')) ||
      sku.startsWith('MMF(METRAM-VC') ||
      ['SPEKTRA-CV-10', 'SPEKTRA-CV-05'].includes(sku)) {
    categories.push('Vibration Calibrators');
  }
  
  // Vibration Meters
  if (['Vibration Measurement', 'Vibration Meters'].includes(old_category) ||
      sku.startsWith('MMF(METRAM-VM') ||
      ['vibration meter', 'vibration analyzer', 'vibration analysis'].some(kw => title.includes(kw))) {
    if (!title.includes('calibrat')) {
      categories.push('Vibration Meters');
    }
  }
  
  // Sound Analyzers
  if (['sound analyzer', 'sound level meter'].some(kw => title.includes(kw)) ||
      ['nor140', 'nor145', 'nor150'].some(kw => sku.toLowerCase().includes(kw)) ||
      (supplier.toLowerCase().includes('bedrock') && ['analyzer', 'sound', 'meter'].some(kw => title.includes(kw)))) {
    categories.push('Sound Analyzers');
  }
  
  // DAQ (Data Acquisition)
  if (old_category === 'Sensors & Data Acquisition' ||
      ['data acquisition', 'daq', 'multichannel', 'data collection'].some(kw => title.toLowerCase().includes(kw))) {
    categories.push('DAQ (Data Acquisition)');
  }
  
  // Acoustic Material Testing
  if (['Acoustic Material Testing', 'Material Testing'].includes(old_category) ||
      ['material testing', 'impedance tube', 'transmission loss', 'absorption'].some(kw => title.includes(kw))) {
    categories.push('Acoustic Material Testing');
  }
  
  // Acoustic Software
  if (old_category === 'Software' ||
      ['software', 'app', 'sarooma', 'dbsea', 'femtools', 'soundplan', 'sonarchitect', 'noiseqc'].some(kw => title.toLowerCase().includes(kw))) {
    categories.push('Acoustic Software');
  }
  
  // Environmental Monitoring
  if (old_category === 'Environmental Monitoring' ||
      ['noise monitoring', 'norcloud', 'spotnoise', 'terminal'].some(kw => title.toLowerCase().includes(kw))) {
    categories.push('Environmental Monitoring');
  }
  
  // Acoustic Cameras
  if (['acoustic camera', 'sound camera'].some(kw => title.includes(kw)) ||
      sku.toLowerCase().includes('nor848') || sku.includes('ACAM') || title.toLowerCase().includes('sonocat')) {
    categories.push('Acoustic Cameras');
  }
  
  // Testing Equipment
  if (['shaker', 'tapping machine', 'sound source', 'loudspeaker', 'power amplifier', 'amplifier'].some(kw => title.includes(kw))) {
    categories.push('Testing Equipment');
  }
  
  // Noise Sources
  if (['noise source', 'sound source', 'dodecahedron'].some(kw => title.includes(kw))) {
    if (!categories.includes('Testing Equipment')) {
      categories.push('Noise Sources');
    }
  }
  
  // Cables and Accessories
  if (['cable', 'adaptor', 'adapter', 'windscreen', 'case', 'bag', 'softbag',
       'mounting', 'tripod', 'extension', 'drum', 'connector'].some(kw => title.toLowerCase().includes(kw))) {
    categories.push('Cables and Accessories');
  }
  
  // Miscellaneous (fallback)
  if (categories.length === 0) {
    categories.push('Miscellaneous');
  }
  
  return categories;
}

async function main() {
  console.log('🔄 Starting database category reorganization...\n');
  
  // Step 1: Create/update all categories
  console.log('📂 Step 1: Creating/updating categories...');
  const categoryMap = new Map<string, string>(); // name_en -> id
  
  for (const [name_en, data] of Object.entries(NEW_CATEGORIES)) {
    const category = await prisma.category.upsert({
      where: { name_en },
      update: {
        name_th: data.th,
        slug: data.slug,
        active: true
      },
      create: {
        name_en: data.en,
        name_th: data.th,
        slug: data.slug,
        active: true,
        product_count: 0
      }
    });
    categoryMap.set(name_en, category.id);
    console.log(`  ✓ ${name_en}`);
  }
  
  // Deactivate old categories that are no longer used
  console.log('\n🗑️  Step 2: Deactivating old categories...');
  const oldCategories = ['Spectral Analysis', 'Material Testing', 'Sensors & Data Acquisition', 
                         'Software', 'Vibration Measurement', 'Calibrators'];
  for (const oldCat of oldCategories) {
    try {
      await prisma.category.updateMany({
        where: { name_en: oldCat },
        data: { active: false }
      });
      console.log(`  ✓ Deactivated: ${oldCat}`);
    } catch (e) {
      // Category might not exist
    }
  }
  
  // Step 3: Load products from JSON
  console.log('\n📦 Step 3: Loading products from JSON...');
  const productsPath = path.join(__dirname, '..', 'data', 'products_data.json');
  const productsData: ProductData[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  console.log(`  ✓ Loaded ${productsData.length} products`);
  
  // Step 4: Update products and create category relationships
  console.log('\n🔗 Step 4: Creating product-category relationships...');
  let updatedCount = 0;
  let relationshipsCount = 0;
  
  for (const productData of productsData) {
    if (!productData.is_active) continue;
    
    const categories = getCategoriesForProduct(productData);
    const primaryCategory = categories[0] || 'Miscellaneous';
    
    // Update product's primary category
    const product = await prisma.product.update({
      where: { sku: productData.sku },
      data: {
        category: primaryCategory
      }
    });
    
    // Delete existing category relationships
    await prisma.productCategory.deleteMany({
      where: { product_id: product.id }
    });
    
    // Create new category relationships
    for (let i = 0; i < categories.length; i++) {
      const categoryName = categories[i];
      const categoryId = categoryMap.get(categoryName);
      
      if (categoryId) {
        await prisma.productCategory.create({
          data: {
            product_id: product.id,
            category_id: categoryId,
            is_primary: i === 0
          }
        });
        relationshipsCount++;
      }
    }
    
    updatedCount++;
    if (updatedCount % 50 === 0) {
      console.log(`  ✓ Processed ${updatedCount} products...`);
    }
  }
  
  console.log(`  ✅ Updated ${updatedCount} products with ${relationshipsCount} category relationships`);
  
  // Step 5: Update category product counts
  console.log('\n📊 Step 5: Updating category product counts...');
  for (const [name_en, categoryId] of categoryMap.entries()) {
    const count = await prisma.productCategory.count({
      where: {
        category_id: categoryId,
        product: { active: true }
      }
    });
    
    await prisma.category.update({
      where: { id: categoryId },
      data: { product_count: count }
    });
    
    console.log(`  ✓ ${name_en}: ${count} products`);
  }
  
  console.log('\n✅ Database category reorganization completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
