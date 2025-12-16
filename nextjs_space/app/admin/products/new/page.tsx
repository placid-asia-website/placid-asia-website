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
import { ArrowLeft, Save, Loader2, Plus, X, Upload } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewProductPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [saving, setSaving] = useState(false)
  const [newImageUrl, setNewImageUrl] = useState('')
  
  // Product state
  const [sku, setSku] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [titleTh, setTitleTh] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [descriptionTh, setDescriptionTh] = useState('')
  const [category, setCategory] = useState('')
  const [supplier, setSupplier] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [active, setActive] = useState(true)
  const [hasPricing, setHasPricing] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [pdfs, setPdfs] = useState<string[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin-login')
    }
  }, [status, router])

  const handleAddImage = () => {
    if (!newImageUrl.trim()) {
      toast.error('Please enter a valid image URL')
      return
    }

    // Validate URL format if it's an external URL
    if (newImageUrl.startsWith('http')) {
      try {
        new URL(newImageUrl)
      } catch {
        toast.error('Please enter a valid URL (must start with http:// or https://)')
        return
      }
    }

    setImages([...images, newImageUrl.trim()])
    setNewImageUrl('')
    toast.success('Image added!')
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
    toast.success('Image removed!')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!sku.trim()) {
      toast.error('SKU is required')
      return
    }
    if (!titleEn.trim()) {
      toast.error('English title is required')
      return
    }
    if (!titleTh.trim()) {
      toast.error('Thai title is required')
      return
    }

    // Prepare product data
    const productData = {
      sku: sku.trim().toUpperCase(),
      title_en: titleEn.trim(),
      title_th: titleTh.trim(),
      description_en: descriptionEn.trim() || '',
      description_th: descriptionTh.trim() || '',
      category: category.trim() || 'Miscellaneous',
      supplier: supplier.trim() || null,
      source_url: sourceUrl.trim() || null,
      active,
      has_pricing: hasPricing,
      images: images.length > 0 ? images : [],
      pdfs: pdfs.length > 0 ? pdfs : []
    }

    setSaving(true)
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        toast.success('Product created successfully!')
        router.push('/admin/products')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Failed to create product')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
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
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-muted-foreground">
            Create a new product in the catalog
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
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="PRODUCT-SKU"
                  required
                />
                <p className="text-xs text-muted-foreground">Unique product identifier (will be converted to uppercase)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Sound Level Meters"
                />
              </div>
            </div>

            {/* English Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">English Content</h3>
              <div className="space-y-2">
                <Label htmlFor="title_en">Title (English) *</Label>
                <Input
                  id="title_en"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="Norsonic Nor150 Sound & Vibration Analyzer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description_en">Description (English)</Label>
                <Textarea
                  id="description_en"
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  rows={4}
                  placeholder="Enter product description in English..."
                />
              </div>
            </div>

            {/* Thai Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Thai Content</h3>
              <div className="space-y-2">
                <Label htmlFor="title_th">Title (Thai) *</Label>
                <Input
                  id="title_th"
                  value={titleTh}
                  onChange={(e) => setTitleTh(e.target.value)}
                  placeholder="เครื่องวัดเสียงและการสั่นสะเทือน Norsonic Nor150"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description_th">Description (Thai)</Label>
                <Textarea
                  id="description_th"
                  value={descriptionTh}
                  onChange={(e) => setDescriptionTh(e.target.value)}
                  rows={4}
                  placeholder="ใส่คำอธิบายผลิตภัณฑ์เป็นภาษาไทย..."
                />
              </div>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier/Brand</Label>
                <Input
                  id="supplier"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="Norsonic"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source_url">Source URL</Label>
                <Input
                  id="source_url"
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://norsonic.com/product/..."
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
                  checked={active}
                  onCheckedChange={setActive}
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
                  checked={hasPricing}
                  onCheckedChange={setHasPricing}
                />
              </div>
            </div>

            {/* Image Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Product Images</h3>
                  <p className="text-sm text-muted-foreground">
                    Add product images (CDN URLs or local paths)
                  </p>
                </div>
              </div>

              {/* Current Images */}
              {images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((imageUrl, index) => (
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
              ) : (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No images yet</p>
                </div>
              )}

              {/* Add New Image */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="https://i.ytimg.com/vi/cMz1C15oCdM/maxresdefault.jpg or /product-sku.jpg"
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
                  Add Image
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                💡 Tip: Use full CDN URLs (https://...) for external images, or relative paths (/product-sku.jpg) for local images
              </p>
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
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Product
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
