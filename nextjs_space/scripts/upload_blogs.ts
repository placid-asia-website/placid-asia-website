import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

// Load environment variables
config();

const prisma = new PrismaClient();

async function main() {
  const blogPostsData = JSON.parse(fs.readFileSync('/tmp/blog_posts.json', 'utf8'));
  
  console.log(`Uploading ${blogPostsData.length} blog posts...\n`);
  
  for (const post of blogPostsData) {
    try {
      const created = await prisma.blogPost.create({
        data: {
          id: `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          slug: post.slug,
          title_en: post.title_en,
          title_th: post.title_th || '',
          excerpt_en: post.excerpt_en || '',
          excerpt_th: post.excerpt_th || '',
          content_en: post.content_en,
          content_th: post.content_th || '',
          author: post.author,
          featured_image: post.featured_image || '',
          category: post.category,
          tags: post.tags,
          seo_keywords: post.seo_keywords || '',
          reading_time: post.reading_time || 5,
          published: post.published,
          published_at: post.published ? new Date() : null,
          views: 0,
          updatedAt: new Date()
        }
      });
      
      console.log(`✅ Created: ${post.title_en}`);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error: any) {
      console.log(`❌ Failed: ${post.title_en}`);
      console.log(`   Error: ${error.message}`);
    }
  }
  
  console.log('\n📊 Summary:');
  const total = await prisma.blogPost.count();
  const published = await prisma.blogPost.count({ where: { published: true } });
  console.log(`Total blog posts: ${total}`);
  console.log(`Published: ${published}`);
  console.log(`Drafts: ${total - published}`);
  
  console.log('\n🎉 Blog posts uploaded successfully!');
  console.log('\nYou can view them at:');
  console.log('  • Public blog: https://placid.asia/blog');
  console.log('  • Admin panel: https://placid.asia/admin/blog');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
