import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();
const prisma = new PrismaClient();

async function listCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name_en: 'asc' }
  });
  
  console.log(`Total categories: ${categories.length}\n`);
  categories.forEach(cat => {
    console.log(`- ${cat.name_en} (Active: ${cat.active})`);
  });
  
  await prisma.$disconnect();
}

listCategories();
