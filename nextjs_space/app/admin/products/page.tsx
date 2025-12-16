
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Package, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  FileText,
  ExternalLink,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FeaturedToggle } from './featured-toggle'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/admin-login')
  }

  // Fetch all products
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Get statistics
  const totalProducts = products.length
  const activeProducts = products.filter((p: { active: boolean }) => p.active).length
  const productsWithPricing = products.filter((p: { has_pricing: boolean }) => p.has_pricing).length
  const featuredProducts = products.filter((p: { featured: boolean; active: boolean }) => p.featured && p.active).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {activeProducts} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Featured Products
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredProducts}</div>
            <p className="text-xs text-muted-foreground">
              {10 - featuredProducts} slots remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              With Pricing
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsWithPricing}</div>
            <p className="text-xs text-muted-foreground">
              {totalProducts - productsWithPricing} without
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Categories
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(products.map((p: { category: string | null }) => p.category).filter(Boolean)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No products found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Image</th>
                      <th className="text-left py-3 px-4">SKU</th>
                      <th className="text-left py-3 px-4">Product Name</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Supplier</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Pricing</th>
                      <th className="text-center py-3 px-4">Featured</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: { 
                      id: string; 
                      images: unknown; 
                      title_en: string; 
                      title_th: string; 
                      sku: string; 
                      category: string | null; 
                      supplier: string | null; 
                      active: boolean; 
                      has_pricing: boolean; 
                      featured: boolean; 
                      source_url: string | null;
                    }) => (
                      <tr key={product.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          {Array.isArray(product.images) && product.images.length > 0 ? (
                            <div className="relative w-16 h-16 bg-muted rounded">
                              <Image
                                src={product.images[0] as string}
                                alt={product.title_en}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-sm">{product.sku}</code>
                        </td>
                        <td className="py-3 px-4">
                          <div className="max-w-xs">
                            <p className="font-medium truncate">{product.title_en}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {product.title_th}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {product.category ? (
                            <Badge variant="outline">
                              {product.category}
                            </Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">
                            {product.supplier || '-'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {product.active ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <XCircle className="h-3 w-3 mr-1" />
                              Inactive
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {product.has_pricing ? (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="outline">Quote</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center">
                            <FeaturedToggle
                              productId={product.id}
                              productSku={product.sku}
                              initialFeatured={product.featured}
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                            >
                              <Link href={`/products/${product.sku}`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                            >
                              <Link href={`/admin/products/${product.sku}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            {product.source_url && (
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                              >
                                <a href={product.source_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
