
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff, FileText, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

type BlogPost = {
  id: string
  slug: string
  title_en: string
  title_th: string
  excerpt_en?: string
  excerpt_th?: string
  content_en: string
  content_th: string
  category: string
  published: boolean
  published_at: Date | null
  views: number
  reading_time?: number
  createdAt: Date
}

export default function AdminBlogPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin-login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchPosts()
    }
  }, [session])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog')
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Failed to fetch blog posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Blog post deleted successfully')
        if (selectedPost?.id === id) {
          setSelectedPost(null)
        }
        fetchPosts()
      } else {
        toast.error('Failed to delete blog post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete blog post')
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/blog/${id}/publish`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      })

      if (response.ok) {
        toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully`)
        fetchPosts()
        // Update selectedPost if it's the one being toggled
        if (selectedPost?.id === id) {
          setSelectedPost({ ...selectedPost, published: !currentStatus })
        }
      } else {
        toast.error('Failed to update post status')
      }
    } catch (error) {
      console.error('Error updating post:', error)
      toast.error('Failed to update post status')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (session?.user?.role !== 'admin') {
    return null
  }

  const publishedCount = posts.filter(p => p.published).length
  const draftCount = posts.filter(p => !p.published).length
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Blog Management & Review Tool</h1>
          <p className="text-muted-foreground mt-2">
            Review and edit blog posts for accuracy verification
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <span className="text-amber-600 font-medium">
              All posts are currently UNPUBLISHED for review
            </span>
          </div>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Awaiting Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{draftCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
          </CardContent>
        </Card>
      </div>

      {/* Two-Panel Layout: List + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>Posts to Review ({draftCount})</CardTitle>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No blog posts yet</p>
                <Link href="/admin/blog/new">
                  <Button>Create Your First Post</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                      selectedPost?.id === post.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{post.category}</Badge>
                          <Badge variant={post.published ? 'default' : 'secondary'}>
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{post.title_en}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{post.title_th}</p>
                        {post.excerpt_en && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.excerpt_en}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{post.views} views</span>
                          <span>•</span>
                          <span>{post.reading_time || 5} min read</span>
                          <span>•</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Button size="sm" variant="ghost" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Panel: Preview */}
        <Card className="lg:sticky lg:top-8 h-fit max-h-[85vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {selectedPost ? 'Post Preview' : 'Select a post to preview'}
              </CardTitle>
              {selectedPost && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`/blog/${selectedPost.slug}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedPost ? (
              <div className="space-y-6">
                {/* Post Header */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge>{selectedPost.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {selectedPost.reading_time || 5} min read
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{selectedPost.title_en}</h2>
                  {selectedPost.excerpt_en && (
                    <p className="text-lg text-muted-foreground mb-4">{selectedPost.excerpt_en}</p>
                  )}
                  
                  {/* Thai Version */}
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Thai Version:</p>
                    <h3 className="text-xl font-semibold mb-2">{selectedPost.title_th}</h3>
                    {selectedPost.excerpt_th && (
                      <p className="text-muted-foreground">{selectedPost.excerpt_th}</p>
                    )}
                  </div>
                </div>

                {/* Content Preview */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    English Content
                  </h4>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content_en }}
                  />
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Thai Content
                  </h4>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content_th }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="border-t pt-6 flex gap-3">
                  <Link href={`/admin/blog/${selectedPost.id}/edit`} className="flex-1">
                    <Button className="w-full" variant="default">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Post
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => handleTogglePublish(selectedPost.id, selectedPost.published)}
                  >
                    {selectedPost.published ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Approve & Publish
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(selectedPost.id, selectedPost.title_en)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click on a post from the list to preview and review it</p>
                <p className="text-sm mt-2">
                  Review each post for accuracy, then approve or edit as needed
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
