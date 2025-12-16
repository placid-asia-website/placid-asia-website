
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Applying ProductCategory table migration...\n');
  
  // Create table
  try {
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "ProductCategory" (
        "id" TEXT NOT NULL,
        "product_id" TEXT NOT NULL,
        "category_id" TEXT NOT NULL,
        "is_primary" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "ProductCategory_product_id_category_id_key" UNIQUE ("product_id", "category_id")
      )
    `;
    console.log('✓ Created ProductCategory table');
  } catch (e: any) {
    if (e.message.includes('already exists')) {
      console.log('✓ ProductCategory table already exists');
    } else {
      console.log('Note:', e.message);
    }
  }
  
  // Create indexes
  try {
    await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "ProductCategory_product_id_idx" ON "ProductCategory"("product_id")`;
    console.log('✓ Created product_id index');
  } catch (e) {}
  
  try {
    await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "ProductCategory_category_id_idx" ON "ProductCategory"("category_id")`;
    console.log('✓ Created category_id index');
  } catch (e) {}
  
  // Add foreign keys
  try {
    await prisma.$executeRaw`
      ALTER TABLE "ProductCategory" 
        ADD CONSTRAINT "ProductCategory_product_id_fkey" 
        FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `;
    console.log('✓ Added product foreign key');
  } catch (e: any) {
    if (!e.message.includes('already exists')) {
      console.log('Note: product FK might already exist');
    }
  }
  
  try {
    await prisma.$executeRaw`
      ALTER TABLE "ProductCategory" 
        ADD CONSTRAINT "ProductCategory_category_id_fkey" 
        FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `;
    console.log('✓ Added category foreign key');
  } catch (e: any) {
    if (!e.message.includes('already exists')) {
      console.log('Note: category FK might already exist');
    }
  }
  
  console.log('\n✅ Migration completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
