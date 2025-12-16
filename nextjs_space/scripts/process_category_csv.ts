import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();
const prisma = new PrismaClient();

async function processCategoryCSV() {
  console.log('📂 Processing product-category-assignments CSV...\n');
  
  // Read the CSV file
  // NOTE: CSV path is relative to project root
  const csvPath = path.join(__dirname, '..', '..', '..', 'Uploads', 'product-category-assignments (2).csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    console.log('❌ CSV file is empty or invalid');
    return;
  }
  
  // Parse header
  const header = lines[0].split(',');
  console.log(`📋 Found ${header.length} columns`);
  console.log(`📦 Processing ${lines.length - 1} products\n`);
  
  // Get all categories from database
  const categories = await prisma.category.findMany({
    where: { active: true }
  });
  
  // Create a map of category names to IDs
  const categoryMap = new Map<string, string>();
  categories.forEach(cat => {
    categoryMap.set(cat.name_en, cat.id);
  });
  
  let updatedCount = 0;
  let skippedCount = 0;
  
  // Process each product row
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    const sku = row[0]?.trim();
    
    if (!sku) {
      skippedCount++;
      continue;
    }
    
    // Find the product
    const product = await prisma.product.findUnique({
      where: { sku }
    });
    
    if (!product) {
      console.log(`⚠️  Product not found: ${sku}`);
      skippedCount++;
      continue;
    }
    
    // Collect categories for this product
    const primaryCategory: string | null = null;
    const secondaryCategories: string[] = [];
    let primaryCategoryName = '';
    
    // Check each category column (starting from column 4)
    for (let j = 4; j < row.length && j < header.length; j++) {
      const categoryName = header[j].trim();
      const value = row[j]?.trim();
      
      if (value === 'P') {
        primaryCategoryName = categoryName;
      } else if (value === 'X') {
        secondaryCategories.push(categoryName);
      }
    }
    
    // Update product's primary category field
    if (primaryCategoryName && categoryMap.has(primaryCategoryName)) {
      await prisma.product.update({
        where: { sku },
        data: { category: primaryCategoryName }
      });
    }
    
    // Delete existing category relationships
    await prisma.productCategory.deleteMany({
      where: { product_id: product.id }
    });
    
    // Create new category relationships
    if (primaryCategoryName && categoryMap.has(primaryCategoryName)) {
      await prisma.productCategory.create({
        data: {
          product_id: product.id,
          category_id: categoryMap.get(primaryCategoryName)!,
          is_primary: true
        }
      });
    }
    
    for (const catName of secondaryCategories) {
      if (categoryMap.has(catName)) {
        await prisma.productCategory.create({
          data: {
            product_id: product.id,
            category_id: categoryMap.get(catName)!,
            is_primary: false
          }
        });
      }
    }
    
    updatedCount++;
    
    if (updatedCount % 20 === 0) {
      console.log(`✓ Processed ${updatedCount} products...`);
    }
  }
  
  console.log(`\n✅ Successfully updated ${updatedCount} products`);
  console.log(`⚠️  Skipped ${skippedCount} products`);
  
  // Update category product counts
  console.log('\n📊 Updating category product counts...');
  
  for (const category of categories) {
    const count = await prisma.productCategory.count({
      where: { 
        category_id: category.id,
        product: { active: true }
      }
    });
    
    await prisma.category.update({
      where: { id: category.id },
      data: { product_count: count }
    });
  }
  
  console.log('✅ Category counts updated!');
  
  await prisma.$disconnect();
}

processCategoryCSV().catch(console.error);
