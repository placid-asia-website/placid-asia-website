import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Adding SoundPLAN essential (SPe+) product...');

  // Check if product already exists
  const existing = await prisma.product.findUnique({
    where: { sku: 'SPE-PLUS' }
  });

  if (existing) {
    console.log('Product SPE-PLUS already exists. Updating...');
    await prisma.product.update({
      where: { sku: 'SPE-PLUS' },
      data: {
        title_en: 'SoundPLAN essential Plus (SPe+)',
        title_th: 'SoundPLAN essential Plus (SPe+) - ซอฟต์แวร์แผนที่เสียงรบกวนมืออาชีพ',
        description_en: `SoundPLAN essential Plus (SPe+) is a comprehensive noise mapping and sound propagation analysis software. Designed for acoustic consultants, engineers, and environmental planners, SPe+ provides powerful tools for creating detailed noise maps and assessing environmental noise impact from roads, railways, and industrial sources.

Key features include unlimited noise sources and receivers, multi-threaded calculations for fast performance, 3D visualization, and support for international calculation standards. The Plus version adds advanced capabilities including OpenStreetMap integration, 3D directivity modeling, facade noise mapping, and the Building Acoustics Outside module for transmission loss analysis.

Ideal for environmental impact assessments, urban planning, noise control studies, and compliance with noise regulations across Thailand and ASEAN region.`,
        description_th: `SoundPLAN essential Plus (SPe+) เป็นซอฟต์แวร์ระดับมืออาชีพสำหรับการสร้างแผนที่เสียงรบกวนและวิเคราะห์การแพร่กระจายของเสียง ออกแบบมาเพื่อที่ปรึกษาด้านอะคูสติก วิศวกร และนักวางผังเมือง SPe+ มอบเครื่องมือที่ทรงพลังสำหรับการสร้างแผนที่เสียงรบกวนที่ละเอียดและประเมินผลกระทบของเสียงรบกวนต่อสิ่งแวดล้อมจากถนน ทางรถไฟ และแหล่งกำเนิดในโรงงานอุตสาหกรรม

คุณสมบัติหลักประกอบด้วย: แหล่งกำเนิดเสียงและจุดรับเสียงไม่จำกัด, การคำนวณแบบหลายเธรดเพื่อความเร็วสูง, การแสดงผลแบบ 3 มิติ, และรองรับมาตรฐานการคำนวณระดับสากล เวอร์ชัน Plus เพิ่มความสามารถขั้นสูงรวมถึงการผสานรวม OpenStreetMap, การจำลองทิศทางเสียงแบบ 3 มิติ, การทำแผนที่เสียงบนผนังอาคาร, และโมดูล Building Acoustics Outside สำหรับการวิเคราะห์การสูญเสียการถ่ายทอดเสียง

เหมาะสำหรับการประเมินผลกระทบสิ่งแวดล้อม, การวางผังเมือง, การศึกษาการควบคุมเสียงรบกวน, และการปฏิบัติตามกฎระเบียบเสียงรบกวนทั่วประเทศไทยและภูมิภาคอาเซียน`,
        category: 'Acoustic Software',
        supplier: 'SoundPLAN',
        images: JSON.stringify([
          {
            url: '/SOUNDPLAN-SPE-PLUS.png',
            alt: 'SoundPLAN essential Plus - Noise Mapping Software'
          }
        ]),
        pdfs: JSON.stringify([
          {
            url: 'https://www.soundplan.eu/wp-content/uploads/NEU_EN_SPessential_A3_21.10.2025_WEB.pdf',
            title: 'SoundPLAN essential Brochure'
          }
        ]),
        has_pricing: false,
        source_url: 'https://www.soundplan.eu/products/soundplanessential/',
        featured: true,
        active: true
      }
    });
    console.log('✅ Updated SPE-PLUS');
  } else {
    await prisma.product.create({
      data: {
        sku: 'SPE-PLUS',
        title_en: 'SoundPLAN essential Plus (SPe+)',
        title_th: 'SoundPLAN essential Plus (SPe+) - ซอฟต์แวร์แผนที่เสียงรบกวนมืออาชีพ',
        description_en: `SoundPLAN essential Plus (SPe+) is a comprehensive noise mapping and sound propagation analysis software. Designed for acoustic consultants, engineers, and environmental planners, SPe+ provides powerful tools for creating detailed noise maps and assessing environmental noise impact from roads, railways, and industrial sources.

Key features include unlimited noise sources and receivers, multi-threaded calculations for fast performance, 3D visualization, and support for international calculation standards. The Plus version adds advanced capabilities including OpenStreetMap integration, 3D directivity modeling, facade noise mapping, and the Building Acoustics Outside module for transmission loss analysis.

Ideal for environmental impact assessments, urban planning, noise control studies, and compliance with noise regulations across Thailand and ASEAN region.`,
        description_th: `SoundPLAN essential Plus (SPe+) เป็นซอฟต์แวร์ระดับมืออาชีพสำหรับการสร้างแผนที่เสียงรบกวนและวิเคราะห์การแพร่กระจายของเสียง ออกแบบมาเพื่อที่ปรึกษาด้านอะคูสติก วิศวกร และนักวางผังเมือง SPe+ มอบเครื่องมือที่ทรงพลังสำหรับการสร้างแผนที่เสียงรบกวนที่ละเอียดและประเมินผลกระทบของเสียงรบกวนต่อสิ่งแวดล้อมจากถนน ทางรถไฟ และแหล่งกำเนิดในโรงงานอุตสาหกรรม

คุณสมบัติหลักประกอบด้วย: แหล่งกำเนิดเสียงและจุดรับเสียงไม่จำกัด, การคำนวณแบบหลายเธรดเพื่อความเร็วสูง, การแสดงผลแบบ 3 มิติ, และรองรับมาตรฐานการคำนวณระดับสากล เวอร์ชัน Plus เพิ่มความสามารถขั้นสูงรวมถึงการผสานรวม OpenStreetMap, การจำลองทิศทางเสียงแบบ 3 มิติ, การทำแผนที่เสียงบนผนังอาคาร, และโมดูล Building Acoustics Outside สำหรับการวิเคราะห์การสูญเสียการถ่ายทอดเสียง

เหมาะสำหรับการประเมินผลกระทบสิ่งแวดล้อม, การวางผังเมือง, การศึกษาการควบคุมเสียงรบกวน, และการปฏิบัติตามกฎระเบียบเสียงรบกวนทั่วประเทศไทยและภูมิภาคอาเซียน`,
        category: 'Acoustic Software',
        supplier: 'SoundPLAN',
        images: JSON.stringify([
          {
            url: '/SOUNDPLAN-SPE-PLUS.png',
            alt: 'SoundPLAN essential Plus - Noise Mapping Software'
          }
        ]),
        pdfs: JSON.stringify([
          {
            url: 'https://www.soundplan.eu/wp-content/uploads/NEU_EN_SPessential_A3_21.10.2025_WEB.pdf',
            title: 'SoundPLAN essential Brochure'
          }
        ]),
        has_pricing: false,
        source_url: 'https://www.soundplan.eu/products/soundplanessential/',
        featured: true,
        active: true
      }
    });
    console.log('✅ Created SPE-PLUS');
  }

  // Ensure the Acoustic Software category exists and is active
  const category = await prisma.category.findFirst({
    where: { slug: 'acoustic-software' }
  });

  if (category) {
    // Update product count
    const productCount = await prisma.product.count({
      where: {
        category: 'Acoustic Software',
        active: true
      }
    });

    await prisma.category.update({
      where: { id: category.id },
      data: {
        product_count: productCount,
        active: true
      }
    });

    console.log(`✅ Updated Acoustic Software category (${productCount} products)`);
  }

  console.log('\n✅ SoundPLAN essential Plus (SPe+) added successfully!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
