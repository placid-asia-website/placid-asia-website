
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

interface Category {
  id: string
  name_en: string
  name_th: string
  slug: string
  active: boolean
}

export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session, status } = useSession() || {}
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [category, setCategory] = useState<Category | null>(null)

  // Redirect if not authenticated as admin
  useEffect(() => {
    if (status === 'unauthenticated' || (session && session.user?.role !== 'admin')) {
      router.push('/admin-login')
    }
  }, [session, status, router])

  // Fetch category data
  useEffect(() => {
    if (!params.id) return

    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${params.id}`)
        if (!res.ok) {
          toast.error('Failed to load category')
          router.push('/admin/categories')
          return
        }
        const data = await res.json()
        setCategory(data)
      } catch (error) {
        toast.error('Error loading category')
        router.push('/admin/categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategory()
  }, [params.id, router])

  const handleSave = async () => {
    if (!category) return

    // Validate required fields
    if (!category.name_en.trim() || !category.name_th.trim() || !category.slug.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setSaving(true)

    try {
      const res = await fetch(`/api/admin/categories/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      })

      if (!res.ok) {
        const error = await res.json()
        toast.error(error.error || 'Failed to update category')
        return
      }

      toast.success('Category updated successfully!')
      router.push('/admin/categories')
    } catch (error) {
      toast.error('Error updating category')
    } finally {
      setSaving(false)
    }
  }

  const handleSlugGenerate = () => {
    if (category) {
      const slug = category.name_en
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setCategory({ ...category, slug })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/admin/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Category</h1>
            <p className="text-muted-foreground">Update category details</p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* English Name */}
          <div className="space-y-2">
            <Label htmlFor="name_en">
              English Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name_en"
              value={category.name_en}
              onChange={(e) => setCategory({ ...category, name_en: e.target.value })}
              placeholder="Enter English name"
            />
          </div>

          {/* Thai Name */}
          <div className="space-y-2">
            <Label htmlFor="name_th">
              Thai Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name_th"
              value={category.name_th}
              onChange={(e) => setCategory({ ...category, name_th: e.target.value })}
              placeholder="Enter Thai name"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="slug"
                value={category.slug}
                onChange={(e) => setCategory({ ...category, slug: e.target.value })}
                placeholder="category-slug"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleSlugGenerate}
              >
                Generate
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              URL-friendly identifier (e.g., sound-level-meters)
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="active">Active Status</Label>
              <p className="text-sm text-muted-foreground">
                Inactive categories won't appear on the website
              </p>
            </div>
            <Switch
              id="active"
              checked={category.active}
              onCheckedChange={(checked) => setCategory({ ...category, active: checked })}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            <Button variant="outline" asChild disabled={saving}>
              <Link href="/admin/categories">Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
