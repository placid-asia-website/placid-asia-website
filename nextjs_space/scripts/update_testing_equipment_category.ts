
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

// Load environment variables
config();

const prisma = new PrismaClient();

async function updateTestingEquipmentCategory() {
  console.log('Updating Testing Equipment category name...');

  try {
    // Find the category
    const category = await prisma.category.findFirst({
      where: { name_en: 'Testing Equipment' }
    });

    if (!category) {
      console.log('❌ Testing Equipment category not found');
      return;
    }

    console.log(`Found category: ${category.name_en} (ID: ${category.id})`);

    // Update the category
    const updated = await prisma.category.update({
      where: { id: category.id },
      data: {
        name_en: 'Vibration & NVH Shakers',
        name_th: 'เครื่องเขย่าสั่นสะเทือนและ NVH',
        slug: 'vibration-nvh-shakers'
      }
    });

    console.log('\n✅ Category updated successfully!');
    console.log(`New English name: ${updated.name_en}`);
    console.log(`New Thai name: ${updated.name_th}`);
    console.log(`New slug: ${updated.slug}`);

  } catch (error) {
    console.error('Error updating category:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateTestingEquipmentCategory();
