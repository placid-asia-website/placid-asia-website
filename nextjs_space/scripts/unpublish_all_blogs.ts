import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function unpublishAllBlogs() {
  try {
    console.log('Unpublishing all blog posts...');
    
    const result = await prisma.blogPost.updateMany({
      where: {
        published: true
      },
      data: {
        published: false,
        published_at: null
      }
    });
    
    console.log(`✅ Successfully unpublished ${result.count} blog posts`);
    
    // Verify
    const publishedCount = await prisma.blogPost.count({
      where: { published: true }
    });
    
    const draftCount = await prisma.blogPost.count({
      where: { published: false }
    });
    
    console.log(`\nCurrent status:`);
    console.log(`- Published: ${publishedCount}`);
    console.log(`- Drafts: ${draftCount}`);
    
  } catch (error) {
    console.error('Error unpublishing blog posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

unpublishAllBlogs();
