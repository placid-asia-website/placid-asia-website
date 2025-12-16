import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '/home/ubuntu/placid_asia/nextjs_space/.env' });

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany({
    select: {
      name_en: true,
      slug: true,
      active: true,
      product_count: true,
      parent_id: true
    },
    orderBy: { name_en: 'asc' }
  });
  
  console.log('\n=== ALL CATEGORIES ===');
  console.log('Total categories:', categories.length);
  console.log('\nActive categories:', categories.filter(c => c.active).length);
  console.log('Inactive categories:', categories.filter(c => !c.active).length);
  console.log('\n--- Category List ---');
  console.log('Status      | Name                                     | Slug                                     | Products');
  console.log('-'.repeat(120));
  categories.forEach(cat => {
    const status = cat.active ? '✓ ACTIVE  ' : '✗ INACTIVE';
    const parentInfo = cat.parent_id ? ' (child)' : '';
    console.log(`${status} | ${cat.name_en.padEnd(40)} | ${cat.slug.padEnd(40)} | ${cat.product_count}${parentInfo}`);
  });
}

main().finally(() => prisma.$disconnect());
