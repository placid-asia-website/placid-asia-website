import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function exportProductsCSV() {
  console.log('Fetching all active products...');
  
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: [
      { category: 'asc' },
      { title_en: 'asc' }
    ],
    select: {
      sku: true,
      title_en: true,
      title_th: true,
      category: true,
      supplier: true,
      featured: true
    }
  });

  console.log(`Found ${products.length} active products`);

  // Create CSV header
  const header = 'SKU,Title (English),Title (Thai),Current Category,Supplier,Featured\n';

  // Create CSV rows
  const rows = products.map(p => {
    // Escape fields that might contain commas or quotes
    const escapeCSV = (str: string | null) => {
      if (!str) return '';
      const hasCommaOrQuote = /[,"\n]/.test(str);
      if (hasCommaOrQuote) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };

    return [
      escapeCSV(p.sku),
      escapeCSV(p.title_en),
      escapeCSV(p.title_th || ''),
      escapeCSV(p.category),
      escapeCSV(p.supplier || ''),
      p.featured ? 'Yes' : 'No'
    ].join(',');
  }).join('\n');

  const csv = header + rows;

  // Write to file
  const filename = 'product_categories_export.csv';
  writeFileSync(filename, csv, 'utf8');

  console.log(`\n✅ CSV exported successfully!`);
  console.log(`Filename: ${filename}`);
  console.log(`Total products: ${products.length}`);
  
  // Show category summary
  const categoryCount = products.reduce((acc: any, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\nProducts by Category:');
  Object.entries(categoryCount)
    .sort(([,a]: any, [,b]: any) => b - a)
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count} products`));

  await prisma.$disconnect();
}

exportProductsCSV().catch((error) => {
  console.error('Error exporting CSV:', error);
  process.exit(1);
});
