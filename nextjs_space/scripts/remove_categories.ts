
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Removing deprecated categories...\n');

  try {
    // Deactivate "Vibration Exciters" category
    console.log('Deactivating "Vibration Exciters" category...');
    const vibrationExciters = await prisma.category.updateMany({
      where: { 
        OR: [
          { name_en: 'Vibration Exciters' },
          { slug: 'vibration-exciters' }
        ]
      },
      data: { active: false },
    });
    console.log(`✅ Deactivated ${vibrationExciters.count} "Vibration Exciters" category`);

    // Deactivate "Sound Analyzers" category
    console.log('Deactivating "Sound Analyzers" category...');
    const soundAnalyzers = await prisma.category.updateMany({
      where: { 
        OR: [
          { name_en: 'Sound Analyzers' },
          { slug: 'sound-analyzers' }
        ]
      },
      data: { active: false },
    });
    console.log(`✅ Deactivated ${soundAnalyzers.count} "Sound Analyzers" category`);

    // Update old "Sound Level Meters" category to point to the new one
    console.log('\nUpdating "Sound Level Meters" category...');
    const oldSLM = await prisma.category.updateMany({
      where: {
        slug: 'sound-level-meters',
        name_en: 'Sound Level Meters'
      },
      data: {
        name_en: 'Sound Level Meters & Analyzers',
        name_th: 'เครื่องวัดระดับเสียงและเครื่องวิเคราะห์เสียง',
        slug: 'sound-level-meters-analyzers',
        description_en: 'Professional sound level meters and analyzers for noise measurement, monitoring and analysis',
        description_th: 'เครื่องวัดระดับเสียงและเครื่องวิเคราะห์เสียงมืออาชีพสำหรับการวัด ตรวจสอบ และวิเคราะห์เสียง',
      },
    });
    console.log(`✅ Updated ${oldSLM.count} "Sound Level Meters" category`);

    console.log('\n✅ Category removal complete!');
    
    // Display summary
    console.log('\n📊 Summary:');
    console.log(`   - Deactivated "Vibration Exciters" category`);
    console.log(`   - Deactivated "Sound Analyzers" category`);
    console.log(`   - Updated "Sound Level Meters" to "Sound Level Meters & Analyzers"`);
    
  } catch (error) {
    console.error('❌ Error removing categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
