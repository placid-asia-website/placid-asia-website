import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function fixCategories() {
  try {
    console.log('=== Fixing Category Organization ===\n');
    
    // 1. Move all products from "Microphones" to "Measurement Microphones"
    const movedMics = await prisma.product.updateMany({
      where: {
        category: 'Microphones',
        active: true
      },
      data: {
        category: 'Measurement Microphones'
      }
    });
    
    console.log(`✓ Moved ${movedMics.count} products from Microphones to Measurement Microphones`);
    
    // 2. Deactivate "Spectral Analysis" category (empty)
    const deactivatedSpectral = await prisma.category.updateMany({
      where: {
        name_en: 'Spectral Analysis'
      },
      data: {
        active: false
      }
    });
    
    console.log(`✓ Deactivated Spectral Analysis category (${deactivatedSpectral.count} records)`);
    
    // 3. Deactivate old "Microphones" category
    const deactivatedMics = await prisma.category.updateMany({
      where: {
        name_en: 'Microphones',
        parent_id: null
      },
      data: {
        active: false
      }
    });
    
    console.log(`✓ Deactivated empty Microphones category (${deactivatedMics.count} records)`);
    
    // 4. Update product counts
    const measMicsCount = await prisma.product.count({
      where: {
        category: 'Measurement Microphones',
        active: true
      }
    });
    
    await prisma.category.updateMany({
      where: {
        name_en: 'Measurement Microphones'
      },
      data: {
        product_count: measMicsCount
      }
    });
    
    console.log(`✓ Updated Measurement Microphones category count: ${measMicsCount} products`);
    
    // 5. Verify the changes
    console.log('\n=== Verification ===');
    const micCheck = await prisma.product.count({
      where: { category: 'Microphones', active: true }
    });
    const measMicCheck = await prisma.product.count({
      where: { category: 'Measurement Microphones', active: true }
    });
    const spectralCheck = await prisma.product.count({
      where: { category: 'Spectral Analysis', active: true }
    });
    
    console.log(`Microphones: ${micCheck} products (should be 0)`);
    console.log(`Measurement Microphones: ${measMicCheck} products (should be 22)`);
    console.log(`Spectral Analysis: ${spectralCheck} products (should be 0)`);
    
    console.log('\n✅ Category organization fixed!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixCategories();
