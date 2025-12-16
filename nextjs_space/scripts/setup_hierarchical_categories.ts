
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

interface CategoryDefinition {
  name_en: string;
  name_th: string;
  slug: string;
  description_en?: string;
  description_th?: string;
  order: number;
  children?: CategoryDefinition[];
}

const hierarchicalCategories: CategoryDefinition[] = [
  {
    name_en: 'Sound Level Meters & Analyzers',
    name_th: 'เครื่องวัดระดับเสียงและเครื่องวิเคราะห์เสียง',
    slug: 'sound-level-meters-analyzers',
    description_en: 'Professional sound level meters and analyzers for noise measurement, monitoring and analysis',
    description_th: 'เครื่องวัดระดับเสียงและเครื่องวิเคราะห์เสียงมืออาชีพสำหรับการวัด ตรวจสอบ และวิเคราะห์เสียง',
    order: 1,
    children: [
      {
        name_en: 'Class 1 Sound Level Meters',
        name_th: 'เครื่องวัดระดับเสียงระดับ 1',
        slug: 'class-1-sound-level-meters',
        description_en: 'High-precision Class 1 sound level meters for laboratory and field use',
        description_th: 'เครื่องวัดระดับเสียงระดับ 1 ความแม่นยำสูงสำหรับห้องปฏิบัติการและงานภาคสนาม',
        order: 1,
      },
      {
        name_en: 'Class 2 Sound Level Meters',
        name_th: 'เครื่องวัดระดับเสียงระดับ 2',
        slug: 'class-2-sound-level-meters',
        description_en: 'General purpose Class 2 sound level meters for industrial and environmental monitoring',
        description_th: 'เครื่องวัดระดับเสียงระดับ 2 สำหรับการตรวจสอบเสียงอุตสาหกรรมและสิ่งแวดล้อม',
        order: 2,
      },
      {
        name_en: 'Personal Noise Dosimeters',
        name_th: 'เครื่องวัดปริมาณเสียงส่วนบุคคล',
        slug: 'personal-noise-dosimeters',
        description_en: 'Wearable noise dosimeters for personal exposure monitoring (e.g., ANGEL)',
        description_th: 'เครื่องวัดปริมาณเสียงแบบพกพาสำหรับการตรวจสอบระดับเสียงส่วนบุคคล (เช่น ANGEL)',
        order: 3,
      },
    ],
  },
  {
    name_en: 'Calibrators',
    name_th: 'เครื่องสอบเทียบ',
    slug: 'calibrators',
    description_en: 'Precision calibrators for acoustic and vibration measurement equipment',
    description_th: 'เครื่องสอบเทียบความแม่นยำสำหรับอุปกรณ์วัดเสียงและความสั่นสะเทือน',
    order: 2,
    children: [
      {
        name_en: 'Acoustic Calibrators',
        name_th: 'เครื่องสอบเทียบเสียง',
        slug: 'acoustic-calibrators',
        description_en: 'Sound calibrators for microphones and sound level meters',
        description_th: 'เครื่องสอบเทียบเสียงสำหรับไมโครโฟนและเครื่องวัดระดับเสียง',
        order: 1,
      },
      {
        name_en: 'Vibration Calibrators',
        name_th: 'เครื่องสอบเทียบความสั่นสะเทือน',
        slug: 'vibration-calibrators',
        description_en: 'Precision vibration calibrators for accelerometers and vibration meters',
        description_th: 'เครื่องสอบเทียบความสั่นสะเทือนสำหรับเซ็นเซอร์และเครื่องวัดความสั่นสะเทือน',
        order: 2,
      },
    ],
  },
  {
    name_en: 'Sensors',
    name_th: 'เซ็นเซอร์',
    slug: 'sensors',
    description_en: 'Professional sensors for acoustic and vibration measurement',
    description_th: 'เซ็นเซอร์มืออาชีพสำหรับการวัดเสียงและความสั่นสะเทือน',
    order: 3,
    children: [
      {
        name_en: 'Acoustic Sensors',
        name_th: 'เซ็นเซอร์เสียง',
        slug: 'acoustic-sensors',
        description_en: 'Measurement microphones for acoustic measurement',
        description_th: 'ไมโครโฟนวัดเสียงสำหรับการวัดเสียง',
        order: 1,
        children: [
          {
            name_en: 'Measurement Microphones',
            name_th: 'ไมโครโฟนวัดเสียง',
            slug: 'measurement-microphones',
            description_en: 'Precision microphones for acoustic measurements',
            description_th: 'ไมโครโฟนความแม่นยำสูงสำหรับการวัดเสียง',
            order: 1,
          },
        ],
      },
      {
        name_en: 'Preamplifiers',
        name_th: 'พรีแอมป์',
        slug: 'preamplifiers',
        description_en: 'Signal conditioning preamplifiers for microphones',
        description_th: 'พรีแอมป์ปรับสัญญาณสำหรับไมโครโฟน',
        order: 2,
      },
      {
        name_en: 'Vibration Sensors',
        name_th: 'เซ็นเซอร์ความสั่นสะเทือน',
        slug: 'vibration-sensors',
        description_en: 'Accelerometers and vibration measurement sensors',
        description_th: 'เซ็นเซอร์วัดความเร่งและความสั่นสะเทือน',
        order: 3,
        children: [
          {
            name_en: 'Accelerometers',
            name_th: 'เซ็นเซอร์วัดความเร่ง',
            slug: 'accelerometers',
            description_en: 'Vibration sensors and accelerometers',
            description_th: 'เซ็นเซอร์วัดความสั่นสะเทือนและความเร่ง',
            order: 1,
          },
        ],
      },
    ],
  },
  {
    name_en: 'Calibration Systems',
    name_th: 'ระบบสอบเทียบ',
    slug: 'calibration-systems',
    description_en: 'Complete calibration systems for acoustic and vibration equipment',
    description_th: 'ระบบสอบเทียบครบชุดสำหรับอุปกรณ์เสียงและความสั่นสะเทือน',
    order: 4,
    children: [
      {
        name_en: 'Acoustic Calibration Systems',
        name_th: 'ระบบสอบเทียบเสียง',
        slug: 'acoustic-calibration-systems',
        description_en: 'Complete systems for acoustic equipment calibration',
        description_th: 'ระบบสอบเทียบครบชุดสำหรับอุปกรณ์เสียง',
        order: 1,
      },
      {
        name_en: 'Vibration Calibration Systems',
        name_th: 'ระบบสอบเทียบความสั่นสะเทือน',
        slug: 'vibration-calibration-systems',
        description_en: 'Complete systems for vibration equipment calibration',
        description_th: 'ระบบสอบเทียบครบชุดสำหรับอุปกรณ์ความสั่นสะเทือน',
        order: 2,
      },
    ],
  },
  // Keep existing categories as top-level
  {
    name_en: 'DAQ (Data Acquisition)',
    name_th: 'ระบบรับข้อมูล',
    slug: 'daq-data-acquisition',
    description_en: 'Multi-channel data acquisition systems',
    description_th: 'ระบบรับข้อมูลหลายช่องสัญญาณ',
    order: 5,
  },
  {
    name_en: 'Acoustic Material Testing',
    name_th: 'ทดสอบวัสดุเสียง',
    slug: 'acoustic-material-testing',
    description_en: 'Equipment for testing acoustic properties of materials',
    description_th: 'อุปกรณ์ทดสอบคุณสมบัติทางเสียงของวัสดุ',
    order: 6,
  },
  {
    name_en: 'Acoustic Software',
    name_th: 'ซอฟต์แวร์เสียง',
    slug: 'acoustic-software',
    description_en: 'Specialized software for acoustic analysis and simulation',
    description_th: 'ซอฟต์แวร์เฉพาะทางสำหรับการวิเคราะห์และจำลองเสียง',
    order: 7,
  },
  {
    name_en: 'Cables and Accessories',
    name_th: 'สายเคเบิลและอุปกรณ์เสริม',
    slug: 'cables-and-accessories',
    description_en: 'Cables, connectors, and accessories for acoustic equipment',
    description_th: 'สายเคเบิล ตัวเชื่อมต่อ และอุปกรณ์เสริมสำหรับอุปกรณ์เสียง',
    order: 8,
  },
  {
    name_en: 'Environmental Monitoring',
    name_th: 'ตรวจสอบสิ่งแวดล้อม',
    slug: 'environmental-monitoring',
    description_en: 'Long-term environmental noise monitoring systems',
    description_th: 'ระบบตรวจสอบเสียงสิ่งแวดล้อมระยะยาว',
    order: 9,
  },
  {
    name_en: 'Acoustic Cameras',
    name_th: 'กล้องเสียง',
    slug: 'acoustic-cameras',
    description_en: 'Sound source localization and acoustic imaging systems',
    description_th: 'ระบบระบุตำแหน่งแหล่งกำเนิดเสียงและถ่ายภาพเสียง',
    order: 10,
  },
  {
    name_en: 'Vibration & NVH Shakers',
    name_th: 'เครื่องเขย่าสั่นสะเทือนและ NVH',
    slug: 'vibration-nvh-shakers',
    description_en: 'Vibration shakers and exciters for NVH testing and analysis',
    description_th: 'เครื่องเขย่าสั่นสะเทือนสำหรับการทดสอบและวิเคราะห์ NVH',
    order: 11,
    children: [
      {
        name_en: 'Power Amplifiers for NVH Shakers',
        name_th: 'เพาเวอร์แอมป์สำหรับเครื่องเขย่า NVH',
        slug: 'power-amplifiers-nvh-shakers',
        description_en: 'High-power amplifiers for driving vibration shakers and exciters',
        description_th: 'เพาเวอร์แอมป์กำลังสูงสำหรับขับเครื่องเขย่าสั่นสะเทือน',
        order: 1,
      },
    ],
  },
];

async function createCategoryHierarchy(
  categoryDef: CategoryDefinition,
  parentId: string | null = null,
  level: number = 0
): Promise<void> {
  const indent = '  '.repeat(level);
  console.log(`${indent}Creating category: ${categoryDef.name_en}`);

  const category = await prisma.category.upsert({
    where: { slug: categoryDef.slug },
    update: {
      name_en: categoryDef.name_en,
      name_th: categoryDef.name_th,
      description_en: categoryDef.description_en,
      description_th: categoryDef.description_th,
      parent_id: parentId,
      order: categoryDef.order,
      active: true,
    },
    create: {
      name_en: categoryDef.name_en,
      name_th: categoryDef.name_th,
      slug: categoryDef.slug,
      description_en: categoryDef.description_en,
      description_th: categoryDef.description_th,
      parent_id: parentId,
      order: categoryDef.order,
      active: true,
    },
  });

  // Create children recursively
  if (categoryDef.children && categoryDef.children.length > 0) {
    for (const childDef of categoryDef.children) {
      await createCategoryHierarchy(childDef, category.id, level + 1);
    }
  }
}

async function main() {
  console.log('🚀 Setting up hierarchical categories...\n');

  try {
    // Create all hierarchical categories
    for (const categoryDef of hierarchicalCategories) {
      await createCategoryHierarchy(categoryDef);
    }

    console.log('\n✅ Hierarchical categories created successfully!');

    // Display the hierarchy
    console.log('\n📊 Category Hierarchy:');
    const rootCategories = await prisma.category.findMany({
      where: { parent_id: null, active: true },
      orderBy: { order: 'asc' },
      include: {
        children: {
          orderBy: { order: 'asc' },
          include: {
            children: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    function displayCategory(cat: any, level: number = 0) {
      const indent = '  '.repeat(level);
      const icon = level === 0 ? '📁' : level === 1 ? '📂' : '📄';
      console.log(`${indent}${icon} ${cat.name_en} (${cat.slug})`);
      if (cat.children && cat.children.length > 0) {
        cat.children.forEach((child: any) => displayCategory(child, level + 1));
      }
    }

    rootCategories.forEach((cat) => displayCategory(cat));

    console.log('\n✅ Setup complete!');
  } catch (error) {
    console.error('❌ Error setting up categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
