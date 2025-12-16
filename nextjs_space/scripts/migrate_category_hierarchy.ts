
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Migrating Category table for hierarchical support...\n');

  try {
    // Add parent_id and order columns to Category table
    console.log('Adding parent_id and order columns to Category table...');
    
    await prisma.$executeRaw`
      ALTER TABLE "Category" 
      ADD COLUMN IF NOT EXISTS "parent_id" TEXT,
      ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;
    `;
    
    console.log('✅ Columns added successfully!');

    // Add foreign key constraint for parent_id
    console.log('Adding foreign key constraint for parent-child relationship...');
    
    await prisma.$executeRaw`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint 
          WHERE conname = 'Category_parent_id_fkey'
        ) THEN
          ALTER TABLE "Category" 
          ADD CONSTRAINT "Category_parent_id_fkey" 
          FOREIGN KEY ("parent_id") REFERENCES "Category"("id") 
          ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END $$;
    `;
    
    console.log('✅ Foreign key constraint added successfully!');

    // Add index on parent_id
    console.log('Adding index on parent_id...');
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS "Category_parent_id_idx" ON "Category"("parent_id");
    `;
    
    console.log('✅ Index added successfully!');

    console.log('\n✅ Migration complete! You can now run setup_hierarchical_categories.ts');
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
