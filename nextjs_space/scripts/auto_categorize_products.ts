import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();
const prisma = new PrismaClient();

async function autoCategorize() {
  console.log('🤖 Starting Smart Auto-Categorization...\n');
  
  // Get all categories
  const categories = await prisma.category.findMany({
    where: { active: true }
  });
  
  const categoryMap = new Map<string, string>();
  categories.forEach(cat => {
    categoryMap.set(cat.name_en, cat.id);
  });
  
  // Get products without category relationships
  const productsWithoutCategories = await prisma.product.findMany({
    where: {
      active: true,
      categories: {
        none: {}
      }
    },
    orderBy: { supplier: 'asc' }
  });
  
  console.log(`📊 Found ${productsWithoutCategories.length} products without categories\n`);
  
  // Group by supplier for analysis
  const bySupplier = productsWithoutCategories.reduce((acc, p) => {
    const supplier = p.supplier || 'Unknown';
    if (!acc[supplier]) acc[supplier] = [];
    acc[supplier].push(p);
    return acc;
  }, {} as Record<string, typeof productsWithoutCategories>);
  
  console.log('📦 Products by Supplier:');
  Object.entries(bySupplier).forEach(([supplier, products]) => {
    console.log(`  ${supplier}: ${products.length} products`);
  });
  console.log('');
  
  let categorizedCount = 0;
  const updates: Array<{ sku: string; categories: string[]; primary: string }> = [];
  
  // Auto-categorization rules
  for (const product of productsWithoutCategories) {
    const sku = product.sku;
    const titleLower = product.title_en.toLowerCase();
    const supplier = product.supplier || '';
    const categories: string[] = [];
    let primaryCategory = '';
    
    // NORSONIC PRODUCTS (111 products)
    if (supplier === 'Norsonic') {
      // Sound Level Meters
      if (titleLower.includes('nor1') && (titleLower.includes('sound level') || titleLower.includes('slm'))) {
        if (titleLower.includes('class 1') || titleLower.includes('nor140') || titleLower.includes('nor145') || titleLower.includes('nor150')) {
          primaryCategory = 'Class 1 Sound Level Meters';
          categories.push('Class 1 Sound Level Meters', 'Sound Level Meters');
        } else if (titleLower.includes('class 2') || titleLower.includes('nor103') || titleLower.includes('nor116')) {
          primaryCategory = 'Class 2 Sound Level Meters';
          categories.push('Class 2 Sound Level Meters', 'Sound Level Meters');
        } else {
          primaryCategory = 'Sound Level Meters';
          categories.push('Sound Level Meters');
        }
      }
      // Dosimeters
      else if (titleLower.includes('dosimeter') || sku.includes('NOR181')) {
        primaryCategory = 'Personal Noise Dosimeters';
        categories.push('Personal Noise Dosimeters', 'Sound Level Meters');
      }
      // Microphones
      else if (titleLower.includes('microphone') || sku.includes('MIC')) {
        primaryCategory = 'Measurement Microphones';
        categories.push('Measurement Microphones', 'Acoustic Sensors');
      }
      // Preamplifiers
      else if (titleLower.includes('preamplifier') || titleLower.includes('preamp') || sku.includes('PREAMP')) {
        primaryCategory = 'Preamplifiers';
        categories.push('Preamplifiers', 'Acoustic Sensors');
      }
      // Calibrators
      else if (titleLower.includes('calibrator') && !titleLower.includes('system')) {
        primaryCategory = 'Acoustic Calibrators';
        categories.push('Acoustic Calibrators', 'Calibrators');
      }
      // Vibration
      else if (titleLower.includes('vibration') || titleLower.includes('accelerometer')) {
        primaryCategory = 'Vibration Meters';
        categories.push('Vibration Meters');
      }
      // Software
      else if (titleLower.includes('software') || titleLower.includes('nor') && titleLower.includes('cloud')) {
        primaryCategory = 'Acoustic Software';
        categories.push('Acoustic Software');
      }
      // Acoustic Cameras
      else if (titleLower.includes('acoustic camera') || titleLower.includes('nor848')) {
        primaryCategory = 'Acoustic Cameras';
        categories.push('Acoustic Cameras');
      }
      // Environmental Monitoring
      else if (titleLower.includes('outdoor') || titleLower.includes('monitor') || titleLower.includes('nor1') && titleLower.includes('cloud')) {
        primaryCategory = 'Environmental Monitoring';
        categories.push('Environmental Monitoring');
      }
      // Sound Analyzers
      else if (titleLower.includes('analyzer') || sku.includes('NOR140') || sku.includes('NOR145') || sku.includes('NOR150')) {
        primaryCategory = 'Sound Analyzers';
        categories.push('Sound Analyzers');
      }
      // Cables and Accessories
      else if (titleLower.includes('cable') || titleLower.includes('adapter') || titleLower.includes('tripod') || titleLower.includes('case')) {
        primaryCategory = 'Cables and Accessories';
        categories.push('Cables and Accessories');
      }
      // Default for Norsonic: Miscellaneous (review needed)
      else {
        primaryCategory = 'Miscellaneous';
        categories.push('Miscellaneous');
      }
    }
    
    // MMF PRODUCTS
    else if (supplier === 'MMF (Metra Mess- und Frequenztechnik)') {
      if (titleLower.includes('vibration') && titleLower.includes('meter')) {
        primaryCategory = 'Vibration Meters';
        categories.push('Vibration Meters');
      } else if (titleLower.includes('calibrator')) {
        primaryCategory = 'Vibration Calibrators';
        categories.push('Vibration Calibrators', 'Calibrators');
      } else {
        primaryCategory = 'Vibration Meters';
        categories.push('Vibration Meters');
      }
    }
    
    // RION PRODUCTS
    else if (supplier === 'Rion') {
      if (titleLower.includes('sound level')) {
        primaryCategory = 'Class 2 Sound Level Meters';
        categories.push('Class 2 Sound Level Meters', 'Sound Level Meters');
      } else if (titleLower.includes('vibration')) {
        primaryCategory = 'Vibration Meters';
        categories.push('Vibration Meters');
      } else {
        primaryCategory = 'Sound Analyzers';
        categories.push('Sound Analyzers');
      }
    }
    
    // CONVERGENCE INSTRUMENTS
    else if (supplier === 'Convergence Instruments') {
      if (titleLower.includes('microphone')) {
        primaryCategory = 'Measurement Microphones';
        categories.push('Measurement Microphones', 'Acoustic Sensors');
      } else if (titleLower.includes('vibration')) {
        primaryCategory = 'Vibration Meters';
        categories.push('Vibration Meters');
      } else if (titleLower.includes('monitor')) {
        primaryCategory = 'Environmental Monitoring';
        categories.push('Environmental Monitoring');
      } else {
        primaryCategory = 'Miscellaneous';
        categories.push('Miscellaneous');
      }
    }
    
    // SOUNDTEC PRODUCTS
    else if (supplier === 'Soundtec') {
      if (titleLower.includes('daq') || titleLower.includes('data acquisition')) {
        primaryCategory = 'DAQ (Data Acquisition)';
        categories.push('DAQ (Data Acquisition)');
      } else {
        primaryCategory = 'Miscellaneous';
        categories.push('Miscellaneous');
      }
    }
    
    // DEFAULT: Keep as Miscellaneous
    else {
      primaryCategory = 'Miscellaneous';
      categories.push('Miscellaneous');
    }
    
    if (categories.length > 0) {
      updates.push({ sku, categories, primary: primaryCategory });
      categorizedCount++;
    }
  }
  
  console.log(`\n✅ Auto-categorized ${categorizedCount} products\n`);
  
  // Show categorization summary
  const categorySummary: Record<string, number> = {};
  updates.forEach(u => {
    categorySummary[u.primary] = (categorySummary[u.primary] || 0) + 1;
  });
  
  console.log('📈 Categorization Summary:');
  Object.entries(categorySummary)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count} products`);
    });
  
  // Apply updates to database
  console.log('\n💾 Applying updates to database...\n');
  
  let appliedCount = 0;
  for (const update of updates) {
    const product = await prisma.product.findUnique({
      where: { sku: update.sku }
    });
    
    if (!product) continue;
    
    // Update product's primary category field
    await prisma.product.update({
      where: { sku: update.sku },
      data: { category: update.primary }
    });
    
    // Delete existing category relationships
    await prisma.productCategory.deleteMany({
      where: { product_id: product.id }
    });
    
    // Create new category relationships
    for (const catName of update.categories) {
      const catId = categoryMap.get(catName);
      if (!catId) continue;
      
      await prisma.productCategory.create({
        data: {
          product_id: product.id,
          category_id: catId,
          is_primary: catName === update.primary
        }
      });
    }
    
    appliedCount++;
    if (appliedCount % 20 === 0) {
      console.log(`  ✓ Applied ${appliedCount}/${updates.length}...`);
    }
  }
  
  console.log(`\n✅ Successfully applied ${appliedCount} updates!\n`);
  
  // Update category product counts
  console.log('📊 Updating category product counts...');
  
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
  
  console.log('✅ Category counts updated!\n');
  
  // Final stats
  const remainingUncategorized = await prisma.product.count({
    where: {
      active: true,
      categories: {
        none: {}
      }
    }
  });
  
  const totalCategorized = await prisma.product.count({
    where: {
      active: true,
      categories: {
        some: {}
      }
    }
  });
  
  console.log('📈 FINAL STATISTICS:');
  console.log(`  Total Active Products: 229`);
  console.log(`  Products with Categories: ${totalCategorized}`);
  console.log(`  Products without Categories: ${remainingUncategorized}`);
  console.log(`  Percentage Categorized: ${Math.round(totalCategorized/229*100)}%\n`);
  
  await prisma.$disconnect();
}

autoCategorize().catch(console.error);
