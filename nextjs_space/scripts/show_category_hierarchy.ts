import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();
const prisma = new PrismaClient();

async function showHierarchy() {
  console.log('📂 Current Category Hierarchy:\n');
  
  // Get root categories (no parent)
  const rootCategories = await prisma.category.findMany({
    where: { 
      active: true,
      parent_id: null 
    },
    orderBy: { order: 'asc' },
    include: {
      children: {
        where: { active: true },
        orderBy: { order: 'asc' },
        include: {
          children: {
            where: { active: true },
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  function printCategory(cat: any, level: number = 0) {
    const indent = '  '.repeat(level);
    const icon = level === 0 ? '📁' : level === 1 ? '  📂' : '    📄';
    console.log(`${indent}${icon} ${cat.name_en} (${cat.product_count} products)`);
    
    if (cat.children && cat.children.length > 0) {
      cat.children.forEach((child: any) => printCategory(child, level + 1));
    }
  }

  rootCategories.forEach(cat => printCategory(cat));
  
  console.log(`\n✅ Total root categories: ${rootCategories.length}`);
  
  await prisma.$disconnect();
}

showHierarchy();
