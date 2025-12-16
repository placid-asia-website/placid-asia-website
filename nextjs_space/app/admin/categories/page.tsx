
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { 
  FolderOpen, 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle,
  Package
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriesPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/admin-login')
  }

  // Fetch all categories with product counts
  const categories = await prisma.category.findMany({
    orderBy: {
      name_en: 'asc',
    },
  })

  // Count products per category
  const products = await prisma.product.findMany({
    where: { active: true },
    select: { category: true },
  })

  const categoryCounts = products.reduce((acc: Record<string, number>, product: { category: string | null }) => {
    if (product.category) {
      acc[product.category] = (acc[product.category] || 0) + 1
    }
    return acc
  }, {})

  // Get statistics
  const totalCategories = categories.length
  const activeCategories = categories.filter((c: { active: boolean }) => c.active).length
  const categoriesWithProducts = Object.keys(categoryCounts).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-muted-foreground">
            Manage product categories and organization
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90" disabled>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              {activeCategories} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              With Products
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoriesWithProducts}</div>
            <p className="text-xs text-muted-foreground">
              {totalCategories - categoriesWithProducts} empty
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No categories found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">English Name</th>
                      <th className="text-left py-3 px-4">Thai Name</th>
                      <th className="text-left py-3 px-4">Slug</th>
                      <th className="text-left py-3 px-4">Products</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category: { id: string; name_en: string; name_th: string; slug: string; active: boolean }) => {
                      const productCount = categoryCounts[category.name_en] || 0
                      
                      return (
                        <tr key={category.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <p className="font-medium">{category.name_en}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-muted-foreground">
                              {category.name_th}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {category.slug}
                            </code>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="font-mono">
                              {productCount}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            {category.active ? (
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
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                              >
                                <Link href={`/categories/${category.slug}`} target="_blank">
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                              >
                                <Link href={`/admin/categories/${category.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
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
