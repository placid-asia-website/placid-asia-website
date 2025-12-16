
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

type BlogPost = {
  id: string
  slug: string
  title_en: string
  title_th: string
  excerpt_en: string
  excerpt_th: string
  content_en: string
  content_th: string
  author: string
  featured_image: string
  category: string
  tags: string[]
  seo_keywords: string
  reading_time: number
  published: boolean
}

export default function EditBlogPost() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const postId = params?.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin-login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.role === 'admin' && postId) {
      fetchPost()
    }
  }, [session, postId])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/blog/${postId}`)
      if (response.ok) {
        const data = await response.json()
        setPost(data)
      } else {
        toast.error('Failed to load blog post')
        router.push('/admin/blog')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      toast.error('Failed to load blog post')
      router.push('/admin/blog')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!post) return

    setSaving(true)
    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      })

      if (response.ok) {
        toast.success('Blog post updated successfully')
        router.push('/admin/blog')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update blog post')
      }
    } catch (error) {
      console.error('Error updating post:', error)
      toast.error('Failed to update blog post')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof BlogPost, value: any) => {
    if (!post) return
    setPost({ ...post, [field]: value })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (session?.user?.role !== 'admin' || !post) {
    return null
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Blog Post</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Review and update content for accuracy
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Warning Banner */}
      <Card className="mb-6 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900">Review for Technical Accuracy</p>
              <p className="text-sm text-amber-700 mt-1">
                Please verify all product specifications, features, ISO standards, and technical details against manufacturer datasheets before publishing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: English Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>English Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title_en">Title (English)</Label>
                <Input
                  id="title_en"
                  value={post.title_en}
                  onChange={(e) => updateField('title_en', e.target.value)}
                  placeholder="Enter English title"
                />
              </div>

              <div>
                <Label htmlFor="excerpt_en">Excerpt (English)</Label>
                <Textarea
                  id="excerpt_en"
                  value={post.excerpt_en}
                  onChange={(e) => updateField('excerpt_en', e.target.value)}
                  placeholder="Brief summary in English"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content_en">Content (English)</Label>
                <Textarea
                  id="content_en"
                  value={post.content_en}
                  onChange={(e) => updateField('content_en', e.target.value)}
                  placeholder="Full article content in English (HTML supported)"
                  rows={20}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  HTML tags are supported. Use &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, etc.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Thai Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thai Content (เนื้อหาภาษาไทย)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title_th">Title (Thai)</Label>
                <Input
                  id="title_th"
                  value={post.title_th}
                  onChange={(e) => updateField('title_th', e.target.value)}
                  placeholder="หัวข้อภาษาไทย"
                />
              </div>

              <div>
                <Label htmlFor="excerpt_th">Excerpt (Thai)</Label>
                <Textarea
                  id="excerpt_th"
                  value={post.excerpt_th}
                  onChange={(e) => updateField('excerpt_th', e.target.value)}
                  placeholder="สรุปสั้นๆ ภาษาไทย"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content_th">Content (Thai)</Label>
                <Textarea
                  id="content_th"
                  value={post.content_th}
                  onChange={(e) => updateField('content_th', e.target.value)}
                  placeholder="เนื้อหาบทความฉบับเต็มภาษาไทย (รองรับ HTML)"
                  rows={20}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  รองรับ HTML tags เช่น &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Metadata Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Post Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={post.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                placeholder="url-friendly-slug"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Used in URL: /blog/{post.slug}
              </p>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={post.category}
                onChange={(e) => updateField('category', e.target.value)}
                placeholder="e.g., Product Guide, Technical Article"
              />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={post.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="Author name"
              />
            </div>

            <div>
              <Label htmlFor="reading_time">Reading Time (minutes)</Label>
              <Input
                id="reading_time"
                type="number"
                value={post.reading_time}
                onChange={(e) => updateField('reading_time', parseInt(e.target.value))}
                placeholder="5"
              />
            </div>

            <div>
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input
                id="featured_image"
                value={post.featured_image}
                onChange={(e) => updateField('featured_image', e.target.value)}
                placeholder="https://i.ytimg.com/vi/MPzW_wKq57M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAkONPp959Fglr-UIYK0G0pzJbK4A"
              />
            </div>

            <div>
              <Label htmlFor="seo_keywords">SEO Keywords</Label>
              <Input
                id="seo_keywords"
                value={post.seo_keywords}
                onChange={(e) => updateField('seo_keywords', e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="mt-6 flex justify-between items-center">
        <Link href="/admin/blog">
          <Button variant="outline">
            Cancel
          </Button>
        </Link>
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}
