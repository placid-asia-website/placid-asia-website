import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();
const prisma = new PrismaClient();

async function generateCategoryReview() {
  console.log('📊 Generating Category Review Report...\n');
  
  // Get all categories with their hierarchical relationships
  const allCategories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { name_en: 'asc' },
    include: {
      parent: true,
      children: {
        where: { active: true },
        orderBy: { name_en: 'asc' }
      }
    }
  });
  
  // Get all products with their category relationships
  const allProducts = await prisma.product.findMany({
    where: { active: true },
    orderBy: { sku: 'asc' },
    include: {
      categories: {
        include: {
          category: true
        }
      }
    }
  });
  
  console.log('📂 CATEGORY HIERARCHY WITH PRODUCT COUNTS:\n');
  console.log('='.repeat(70));
  
  // Group categories by root
  const rootCategories = allCategories.filter(c => !c.parent_id);
  
  function printCategoryTree(cat: any, level: number = 0) {
    const indent = '  '.repeat(level);
    const icon = level === 0 ? '📁' : level === 1 ? '  📂' : '    📄';
    
    // Count products in this category
    const productCount = allProducts.filter(p => 
      p.categories.some(pc => pc.category_id === cat.id)
    ).length;
    
    console.log(`${indent}${icon} ${cat.name_en}`);
    console.log(`${indent}   ${cat.name_th}`);
    console.log(`${indent}   Products: ${productCount} | Slug: ${cat.slug}`);
    
    if (cat.children && cat.children.length > 0) {
      console.log(`${indent}   Subcategories:`);
      cat.children.forEach((child: any) => {
        const childFull = allCategories.find(c => c.id === child.id);
        if (childFull) {
          printCategoryTree(childFull, level + 1);
        }
      });
    }
    console.log('');
  }
  
  rootCategories.forEach(cat => printCategoryTree(cat));
  
  // Summary statistics
  console.log('='.repeat(70));
  console.log('\n📈 SUMMARY STATISTICS:\n');
  console.log(`Total Categories: ${allCategories.length}`);
  console.log(`Root Categories: ${rootCategories.length}`);
  console.log(`Total Products: ${allProducts.length}`);
  
  const productsWithCategories = allProducts.filter(p => p.categories.length > 0).length;
  const productsWithoutCategories = allProducts.length - productsWithCategories;
  
  console.log(`Products with Categories: ${productsWithCategories} (${Math.round(productsWithCategories/allProducts.length*100)}%)`);
  console.log(`Products without Categories: ${productsWithoutCategories} (${Math.round(productsWithoutCategories/allProducts.length*100)}%)`);
  
  // Products with multiple categories
  const productsWithMultiple = allProducts.filter(p => p.categories.length > 1).length;
  console.log(`Products in Multiple Categories: ${productsWithMultiple}`);
  
  // Top categories by product count
  console.log('\n🏆 TOP 10 CATEGORIES BY PRODUCT COUNT:\n');
  
  const categoriesWithCounts = allCategories.map(cat => ({
    name: cat.name_en,
    count: allProducts.filter(p => 
      p.categories.some(pc => pc.category_id === cat.id)
    ).length
  })).sort((a, b) => b.count - a.count).slice(0, 10);
  
  categoriesWithCounts.forEach((cat, idx) => {
    console.log(`${idx + 1}. ${cat.name} - ${cat.count} products`);
  });
  
  // Categories with no products
  console.log('\n⚠️  CATEGORIES WITH NO PRODUCTS:\n');
  const emptyCategories = allCategories.filter(cat => {
    const count = allProducts.filter(p => 
      p.categories.some(pc => pc.category_id === cat.id)
    ).length;
    return count === 0;
  });
  
  if (emptyCategories.length > 0) {
    emptyCategories.forEach(cat => {
      console.log(`  - ${cat.name_en} (${cat.name_th})`);
    });
  } else {
    console.log('  ✅ All categories have products!');
  }
  
  await prisma.$disconnect();
}

generateCategoryReview().catch(console.error);
