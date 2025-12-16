
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Loader2, Plus, X, Upload, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import Image from 'next/image'

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

interface Category {
  id: string
  name_en: string
  slug: string
}

export default function EditProductPage({ params }: { params: { sku: string } }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin-login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product
        const productResponse = await fetch(`/api/products/${params.sku}`)
        if (productResponse.ok) {
          const data = await productResponse.json()
          setProduct(data)
        } else {
          toast.error('Product not found')
          router.push('/admin/products')
          return
        }

        // Fetch categories
        const categoriesResponse = await fetch('/api/categories?includeInactive=true')
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          setCategories(categoriesData.filter((cat: any) => cat.active || cat.product_count > 0))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchData()
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

  const handleAddImage = () => {
    if (!product || !newImageUrl.trim()) {
      toast.error('Please enter a valid image URL')
      return
    }

    // Validate URL format
    try {
      new URL(newImageUrl)
    } catch {
      toast.error('Please enter a valid URL (must start with http:// or https://)')
      return
    }

    const updatedImages = [...product.images, newImageUrl.trim()]
    setProduct({ ...product, images: updatedImages })
    setNewImageUrl('')
    toast.success('Image added! Remember to save changes.')
  }

  const handleRemoveImage = (index: number) => {
    if (!product) return
    const updatedImages = product.images.filter((_, i) => i !== index)
    setProduct({ ...product, images: updatedImages })
    toast.success('Image removed! Remember to save changes.')
  }

  const handleFileUpload = async (file: File) => {
    if (!product) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Only images are allowed.')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 5MB.')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/products/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        const updatedImages = [...product.images, data.imageUrl]
        setProduct({ ...product, images: updatedImages })
        toast.success('Image uploaded successfully! Remember to save changes.')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
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
                <select
                  id="category"
                  value={product.category || ''}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name_en}>
                      {cat.name_en}
                    </option>
                  ))}
                </select>
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

            {/* Image Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Product Images</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload images or add URLs
                  </p>
                </div>
              </div>

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive ? 'border-accent bg-accent/10' : 'border-muted-foreground/25'
                } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    {uploading ? 'Uploading...' : 'Drag & drop image here'}
                  </p>
                  <p className="text-xs text-muted-foreground">or</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    Browse Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Supports JPG, PNG, GIF, WebP (max 5MB)
                </p>
              </div>

              {/* Current Images */}
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.images.map((imageUrl, index) => (
                    <div key={index} className="relative group border rounded-lg p-2">
                      <div className="relative aspect-square bg-muted rounded-md overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">No Image</text></svg>'
                          }}
                        />
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground truncate">
                        {imageUrl.substring(0, 50)}...
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Image URL */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Or add image URL</Label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="https://i.ytimg.com/vi/yRuA-n3IJSc/sddefault.jpg"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddImage()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddImage}
                    variant="outline"
                    size="default"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add URL
                  </Button>
                </div>
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
