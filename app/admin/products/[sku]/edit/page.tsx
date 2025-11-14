
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Product {
  id: string
  sku: string
  title_en: string
  title_th: string
  description_en: string
  description_th: string
  category: string
  supplier: string | null
  active: boolean
  has_pricing: boolean
  images: string[]
  pdfs: string[]
  source_url: string | null
}

export default function EditProductPage({ params }: { params: { sku: string } }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin-login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.sku}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
        } else {
          toast.error('Product not found')
          router.push('/admin/products')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchProduct()
    }
  }, [params.sku, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    setSaving(true)
    try {
      const response = await fetch(`/api/admin/products/${params.sku}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })

      if (response.ok) {
        toast.success('Product updated successfully!')
        router.push('/admin/products')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to update product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error('Failed to update product')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: keyof Product, value: any) => {
    if (!product) return
    setProduct({ ...product, [field]: value })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">
            Update product information for {product.sku}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={product.sku}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={product.category || ''}
                  onChange={(e) => handleChange('category', e.target.value)}
                />
              </div>
            </div>

            {/* English Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">English Content</h3>
              <div className="space-y-2">
                <Label htmlFor="title_en">Title (English)</Label>
                <Input
                  id="title_en"
                  value={product.title_en}
                  onChange={(e) => handleChange('title_en', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description_en">Description (English)</Label>
                <Textarea
                  id="description_en"
                  value={product.description_en}
                  onChange={(e) => handleChange('description_en', e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            {/* Thai Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Thai Content</h3>
              <div className="space-y-2">
                <Label htmlFor="title_th">Title (Thai)</Label>
                <Input
                  id="title_th"
                  value={product.title_th}
                  onChange={(e) => handleChange('title_th', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description_th">Description (Thai)</Label>
                <Textarea
                  id="description_th"
                  value={product.description_th}
                  onChange={(e) => handleChange('description_th', e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier/Brand</Label>
                <Input
                  id="supplier"
                  value={product.supplier || ''}
                  onChange={(e) => handleChange('supplier', e.target.value || null)}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source_url">Source URL</Label>
                <Input
                  id="source_url"
                  type="url"
                  value={product.source_url || ''}
                  onChange={(e) => handleChange('source_url', e.target.value || null)}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Switches */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Active Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Show this product on the website
                  </p>
                </div>
                <Switch
                  checked={product.active}
                  onCheckedChange={(checked) => handleChange('active', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Has Pricing</Label>
                  <p className="text-sm text-muted-foreground">
                    Product has available pricing information
                  </p>
                </div>
                <Switch
                  checked={product.has_pricing}
                  onCheckedChange={(checked) => handleChange('has_pricing', checked)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/products')}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
