
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, Tag, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true },
  })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title_en,
    description: post.excerpt_en,
    keywords: post.seo_keywords || undefined,
    openGraph: {
      title: post.title_en,
      description: post.excerpt_en,
      type: 'article',
      publishedTime: post.published_at?.toISOString(),
      authors: [post.author],
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true },
  })

  if (!post) {
    notFound()
  }

  // Increment view count
  await prisma.blogPost.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  })

  // Get related posts from same category
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      category: post.category,
      id: { not: post.id },
    },
    take: 3,
    orderBy: { published_at: 'desc' },
  })

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                }) : 'Draft'}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.reading_time} min read
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {post.views} views
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title_en}
          </h1>

          <p className="text-xl text-muted-foreground mb-4">
            {post.excerpt_en}
          </p>

          <div className="text-sm text-muted-foreground">
            By {post.author}
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative aspect-video bg-muted mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title_en}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content_en }} />
        </div>

        {/* Tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {(post.tags as string[]).map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    {related.featured_image && (
                      <div className="relative aspect-video bg-muted">
                        <Image
                          src={related.featured_image}
                          alt={related.title_en}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">
                        {related.category}
                      </Badge>
                      <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                        {related.title_en}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {related.excerpt_en}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
