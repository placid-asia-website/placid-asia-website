import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config();

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 COMPREHENSIVE IMAGE AUDIT\n');
  console.log('='.repeat(80));

  // Load products_data.json
  const jsonPath = path.join(__dirname, 'data', 'products_data.json');
  const productsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  // Get products from database
  const dbProducts = await prisma.product.findMany({
    where: { active: true },
    select: {
      sku: true,
      title_en: true,
      supplier: true,
      images: true
    }
  });

  const issues: Array<{
    sku: string;
    title: string;
    supplier: string;
    issue: string;
    jsonImage: string;
    dbImage: string;
  }> = [];

  const summary: Record<string, {
    total: number;
    official: number;
    cdn: number;
    local: number;
  }> = {};

  console.log('\n📊 CHECKING ALL PRODUCTS:\n');

  dbProducts.forEach(dbProduct => {
    const jsonProduct = productsData.find((p: any) => p.sku === dbProduct.sku);
    const supplier = dbProduct.supplier || 'Unknown';
    
    if (!summary[supplier]) {
      summary[supplier] = { total: 0, official: 0, cdn: 0, local: 0 };
    }
    summary[supplier].total++;

    const dbImages = dbProduct.images as string[];
    const jsonImages = jsonProduct?.images || [];

    const dbImage = dbImages[0] || '';
    const jsonImage = jsonImages[0] || '';

    // Categorize image source
    if (dbImage.startsWith('/')) {
      summary[supplier].local++;
    } else if (dbImage.includes('abacusaicdn') || dbImage.includes('cdn.abacus.ai')) {
      summary[supplier].cdn++;
      
      // Check if JSON has official URL but DB has CDN
      if (jsonImage && !jsonImage.includes('abacus') && jsonImage.startsWith('http')) {
        issues.push({
          sku: dbProduct.sku,
          title: dbProduct.title_en,
          supplier,
          issue: 'DB has CDN but JSON has official URL',
          jsonImage,
          dbImage
        });
      }
    } else if (dbImage.startsWith('http')) {
      summary[supplier].official++;
    }

    // Check Placid Instruments specifically
    if (supplier === 'Placid Instruments') {
      if (!jsonImage.includes('placidinstruments.com') && !dbImage.startsWith('/')) {
        if (jsonImage.includes('abacus')) {
          issues.push({
            sku: dbProduct.sku,
            title: dbProduct.title_en,
            supplier,
            issue: 'Using CDN instead of placidinstruments.com',
            jsonImage,
            dbImage
          });
        }
      }
    }
  });

  console.log('\n📈 SUMMARY BY SUPPLIER:\n');
  Object.entries(summary)
    .sort((a, b) => b[1].total - a[1].total)
    .forEach(([supplier, stats]) => {
      console.log(`${supplier}:`);
      console.log(`  Total: ${stats.total}`);
      console.log(`  ✓ Official: ${stats.official}`);
      console.log(`  📦 Local: ${stats.local}`);
      console.log(`  🌐 CDN: ${stats.cdn}`);
      console.log('');
    });

  if (issues.length > 0) {
    console.log('\n⚠️  ISSUES FOUND:\n');
    console.log(`Total issues: ${issues.length}\n`);

    // Group by supplier
    const groupedIssues: Record<string, typeof issues> = {};
    issues.forEach(issue => {
      if (!groupedIssues[issue.supplier]) {
        groupedIssues[issue.supplier] = [];
      }
      groupedIssues[issue.supplier].push(issue);
    });

    Object.entries(groupedIssues).forEach(([supplier, supplierIssues]) => {
      console.log(`\n${supplier} (${supplierIssues.length} issues):`);
      console.log('-'.repeat(80));
      supplierIssues.forEach((issue, i) => {
        console.log(`\n${i + 1}. ${issue.sku} - ${issue.title}`);
        console.log(`   Issue: ${issue.issue}`);
        console.log(`   JSON:  ${issue.jsonImage}`);
        console.log(`   DB:    ${issue.dbImage}`);
      });
    });

    // Save to file
    const reportPath = path.join(__dirname, '..', '..', 'Uploads', 'IMAGE-AUDIT-DETAILED.json');
    fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2));
    console.log(`\n\n📄 Detailed report saved to: ${reportPath}`);
  } else {
    console.log('\n✅ NO ISSUES FOUND! All images are properly sourced.\n');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
