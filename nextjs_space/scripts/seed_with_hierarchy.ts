import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Category structure with parent-child relationships
const CATEGORY_STRUCTURE = [
  // Parent: Sensors
  {
    name_en: "Sensors",
    name_th: "เซ็นเซอร์",
    slug: "sensors",
    description_en: "Acoustic and vibration sensors for measurement applications",
    description_th: "เซ็นเซอร์ทางเสียงและการสั่นสะเทือนสำหรับการวัด",
    parent: null,
    order: 1,
  },
  {
    name_en: "Microphones",
    name_th: "ไมโครโฟน",
    slug: "microphones",
    description_en: "Measurement microphones for acoustic testing and analysis",
    description_th: "ไมโครโฟนสำหรับการทดสอบและวิเคราะห์ทางเสียง",
    parent: "Sensors",
    order: 1,
  },
  {
    name_en: "Accelerometers",
    name_th: "เครื่องวัดความเร่ง",
    slug: "accelerometers",
    description_en: "Vibration sensors and accelerometers for structural analysis",
    description_th: "เซ็นเซอร์การสั่นสะเทือนและเครื่องวัดความเร่งสำหรับการวิเคราะห์โครงสร้าง",
    parent: "Sensors",
    order: 2,
  },
  
  // Parent: Calibration Systems
  {
    name_en: "Calibration Systems",
    name_th: "ระบบสอบเทียบ",
    slug: "calibration-systems",
    description_en: "Acoustic and vibration calibration equipment and systems",
    description_th: "อุปกรณ์และระบบสอบเทียบทางเสียงและการสั่นสะเทือน",
    parent: null,
    order: 2,
  },
  {
    name_en: "Acoustic Calibrators",
    name_th: "เครื่องสอบเทียบทางเสียง",
    slug: "acoustic-calibrators",
    description_en: "Sound level calibrators and acoustic calibration systems",
    description_th: "เครื่องสอบเทียบระดับเสียงและระบบสอบเทียบทางเสียง",
    parent: "Calibration Systems",
    order: 1,
  },
  {
    name_en: "Vibration Calibrators",
    name_th: "เครื่องสอบเทียบการสั่นสะเทือน",
    slug: "vibration-calibrators",
    description_en: "Vibration calibrators and calibration systems for vibration sensors",
    description_th: "เครื่องสอบเทียบการสั่นสะเทือนและระบบสอบเทียบสำหรับเซ็นเซอร์การสั่นสะเทือน",
    parent: "Calibration Systems",
    order: 2,
  },
  
  // Other categories (no parent)
  {
    name_en: "Preamplifiers",
    name_th: "พรีแอมพลิฟายเออร์",
    slug: "preamplifiers",
    description_en: "Signal conditioning and preamplifiers for acoustic sensors",
    description_th: "อุปกรณ์ปรับสัญญาณและพรีแอมพลิฟายเออร์สำหรับเซ็นเซอร์ทางเสียง",
    parent: null,
    order: 3,
  },
  {
    name_en: "Sound Analyzers",
    name_th: "เครื่องวิเคราะห์เสียง",
    slug: "sound-analyzers",
    description_en: "Sound level meters, analyzers, and acoustic measurement instruments",
    description_th: "เครื่องวัดระดับเสียง เครื่องวิเคราะห์ และอุปกรณ์วัดทางเสียง",
    parent: null,
    order: 4,
  },
  {
    name_en: "Vibration Meters",
    name_th: "เครื่องวัดการสั่นสะเทือน",
    slug: "vibration-meters",
    description_en: "Vibration meters and analyzers for structural monitoring",
    description_th: "เครื่องวัดและวิเคราะห์การสั่นสะเทือนสำหรับการติดตามโครงสร้าง",
    parent: null,
    order: 5,
  },
  {
    name_en: "DAQ (Data Acquisition)",
    name_th: "ระบบเก็บข้อมูล",
    slug: "daq-data-acquisition",
    description_en: "Data acquisition systems and multichannel analyzers",
    description_th: "ระบบเก็บข้อมูลและเครื่องวิเคราะห์หลายช่องสัญญาณ",
    parent: null,
    order: 6,
  },
  {
    name_en: "Acoustic Material Testing",
    name_th: "การทดสอบวัสดุทางเสียง",
    slug: "acoustic-material-testing",
    description_en: "Equipment for testing acoustic properties of materials",
    description_th: "อุปกรณ์สำหรับทดสอบคุณสมบัติทางเสียงของวัสดุ",
    parent: null,
    order: 7,
  },
  {
    name_en: "Acoustic Software",
    name_th: "ซอฟต์แวร์ทางเสียง",
    slug: "acoustic-software",
    description_en: "Software for acoustic analysis, simulation, and prediction",
    description_th: "ซอฟต์แวร์สำหรับการวิเคราะห์ จำลอง และทำนายทางเสียง",
    parent: null,
    order: 8,
  },
  {
    name_en: "Environmental Monitoring",
    name_th: "การตรวจสอบสิ่งแวดล้อม",
    slug: "environmental-monitoring",
    description_en: "Noise monitoring systems and environmental acoustic equipment",
    description_th: "ระบบตรวจสอบเสียงรบกวนและอุปกรณ์ทางเสียงสิ่งแวดล้อม",
    parent: null,
    order: 9,
  },
  {
    name_en: "Acoustic Cameras",
    name_th: "กล้องเสียง",
    slug: "acoustic-cameras",
    description_en: "Acoustic imaging systems and sound source localization equipment",
    description_th: "ระบบถ่ายภาพทางเสียงและอุปกรณ์ระบุแหล่งกำเนิดเสียง",
    parent: null,
    order: 10,
  },
  {
    name_en: "Testing Equipment",
    name_th: "อุปกรณ์ทดสอบ",
    slug: "testing-equipment",
    description_en: "Shakers, exciters, and testing equipment for acoustic and vibration testing",
    description_th: "เครื่องสั่นสะเทือน เครื่องกระตุ้น และอุปกรณ์ทดสอบทางเสียงและการสั่นสะเทือน",
    parent: null,
    order: 11,
  },
  {
    name_en: "Noise Sources",
    name_th: "แหล่งกำเนิดเสียง",
    slug: "noise-sources",
    description_en: "Calibrated sound sources and noise generators",
    description_th: "แหล่งกำเนิดเสียงที่สอบเทียบและเครื่องผลิตเสียงรบกวน",
    parent: null,
    order: 12,
  },
  {
    name_en: "Cables and Accessories",
    name_th: "สายเคเบิลและอุปกรณ์เสริม",
    slug: "cables-and-accessories",
    description_en: "Cables, connectors, adapters, and accessories for acoustic equipment",
    description_th: "สายเคเบิล ตัวเชื่อมต่อ อะแดปเตอร์ และอุปกรณ์เสริมสำหรับอุปกรณ์ทางเสียง",
    parent: null,
    order: 13,
  },
  {
    name_en: "Miscellaneous",
    name_th: "เบ็ดเตล็ด",
    slug: "miscellaneous",
    description_en: "Other acoustic and vibration measurement equipment",
    description_th: "อุปกรณ์วัดทางเสียงและการสั่นสะเทือนอื่นๆ",
    parent: null,
    order: 14,
  },
];

async function seed() {
  console.log('🌱 Starting Database Seeding with Hierarchical Categories...\n');

  try {
    // Load products data
    const productsFile = path.join(__dirname, '..', 'data', 'products_data.json');
    const productsData = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    
    console.log(`📦 Loaded ${productsData.length} products from data file\n`);

    // 1. Seed categories with hierarchy
    console.log('1️⃣ Seeding categories with parent-child relationships...');
    const categoryMap = new Map<string, string>(); // name_en -> id
    
    // First pass: Create/update parent categories
    for (const cat of CATEGORY_STRUCTURE.filter(c => !c.parent)) {
      const category = await prisma.category.upsert({
        where: { name_en: cat.name_en },
        update: {
          name_th: cat.name_th,
          slug: cat.slug,
          description_en: cat.description_en,
          description_th: cat.description_th,
          order: cat.order,
          parent_id: null,
          active: true,
        },
        create: {
          name_en: cat.name_en,
          name_th: cat.name_th,
          slug: cat.slug,
          description_en: cat.description_en,
          description_th: cat.description_th,
          order: cat.order,
          parent_id: null,
          active: true,
        },
      });
      categoryMap.set(cat.name_en, category.id);
      console.log(`   ✓ ${cat.name_en}`);
    }
    
    // Second pass: Create/update child categories with parent references
    for (const cat of CATEGORY_STRUCTURE.filter(c => c.parent)) {
      const parentId = categoryMap.get(cat.parent!);
      if (!parentId) {
        console.error(`   ✗ Parent not found: ${cat.parent} for ${cat.name_en}`);
        continue;
      }
      
      const category = await prisma.category.upsert({
        where: { name_en: cat.name_en },
        update: {
          name_th: cat.name_th,
          slug: cat.slug,
          description_en: cat.description_en,
          description_th: cat.description_th,
          order: cat.order,
          parent_id: parentId,
          active: true,
        },
        create: {
          name_en: cat.name_en,
          name_th: cat.name_th,
          slug: cat.slug,
          description_en: cat.description_en,
          description_th: cat.description_th,
          order: cat.order,
          parent_id: parentId,
          active: true,
        },
      });
      categoryMap.set(cat.name_en, category.id);
      console.log(`   ✓ ${cat.name_en} (under ${cat.parent})`);
    }

    console.log(`\n   Total categories: ${categoryMap.size}\n`);

    // 2. Seed products
    console.log('2️⃣ Seeding products...');
    let activeCount = 0;
    let inactiveCount = 0;

    for (const productData of productsData) {
      const isActive = productData.is_active !== false;
      
      await prisma.product.upsert({
        where: { sku: productData.sku },
        update: {
          title_en: productData.title_en || productData.title || '',
          title_th: productData.title_th || productData.title || '',
          description_en: productData.description_en || productData.description || '',
          description_th: productData.description_th || productData.description || '',
          category: productData.category || 'Miscellaneous',
          supplier: productData.supplier || null,
          images: productData.images || [],
          pdfs: productData.pdfs || [],
          has_pricing: productData.has_pricing || false,
          source_url: productData.source_url || null,
          active: isActive,
        },
        create: {
          sku: productData.sku,
          title_en: productData.title_en || productData.title || '',
          title_th: productData.title_th || productData.title || '',
          description_en: productData.description_en || productData.description || '',
          description_th: productData.description_th || productData.description || '',
          category: productData.category || 'Miscellaneous',
          supplier: productData.supplier || null,
          images: productData.images || [],
          pdfs: productData.pdfs || [],
          has_pricing: productData.has_pricing || false,
          source_url: productData.source_url || null,
          active: isActive,
        },
      });

      if (isActive) activeCount++;
      else inactiveCount++;
    }

    console.log(`   ✓ Active products: ${activeCount}`);
    console.log(`   ✓ Inactive products: ${inactiveCount}\n`);

    // 3. Update category product counts
    console.log('3️⃣ Updating category product counts...');
    for (const [catName, catId] of categoryMap.entries()) {
      const count = await prisma.product.count({
        where: {
          category: catName,
          active: true,
        },
      });
      
      await prisma.category.update({
        where: { id: catId },
        data: { product_count: count },
      });
      
      if (count > 0) {
        console.log(`   ✓ ${catName}: ${count} products`);
      }
    }

    // 4. Create admin user
    console.log('\n4️⃣ Creating admin user...');
    const hashedPassword = await bcrypt.hash('Placid2024!', 10);
    
    await prisma.user.upsert({
      where: { email: 'info@placid.asia' },
      update: {
        name: 'Admin',
        password: hashedPassword,
        role: 'admin',
      },
      create: {
        email: 'info@placid.asia',
        name: 'Admin',
        password: hashedPassword,
        role: 'admin',
      },
    });
    
    console.log('   ✓ Admin user: info@placid.asia / Placid2024!');

    console.log('\n✨ Database seeding completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
