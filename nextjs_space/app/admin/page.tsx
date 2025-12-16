
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/db'
import {
  Package,
  FolderOpen,
  MessageSquare,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react'

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/admin/login')
  }

  // Get dashboard stats
  const [
    totalProducts,
    totalCategories,
    totalInquiries,
    recentInquiries,
    productsWithPricing,
    productsWithoutPricing
  ] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.category.count({ where: { active: true } }),
    prisma.contactInquiry.count(),
    prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.product.count({ where: { has_pricing: true, active: true } }),
    prisma.product.count({ where: { has_pricing: false, active: true } }),
  ])

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: <Package className="h-8 w-8 text-blue-500" />,
      description: `${productsWithPricing} with pricing, ${productsWithoutPricing} without`
    },
    {
      title: 'Categories',
      value: totalCategories,
      icon: <FolderOpen className="h-8 w-8 text-green-500" />,
      description: 'Active product categories'
    },
    {
      title: 'Total Inquiries',
      value: totalInquiries,
      icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
      description: 'Customer inquiries received'
    },
    {
      title: 'Admin Users',
      value: 2,
      icon: <Users className="h-8 w-8 text-orange-500" />,
      description: 'Active admin accounts'
    }
  ]

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name}. Manage your acoustic equipment catalog.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry: { id: string; name: string; subject: string; product_sku: string | null; createdAt: Date; status: string }) => (
                <div key={inquiry.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{inquiry.name}</p>
                    <p className="text-xs text-muted-foreground">{inquiry.subject}</p>
                    {inquiry.product_sku && (
                      <p className="text-xs text-blue-600">Product: {inquiry.product_sku}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {inquiry.createdAt.toLocaleDateString()}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      inquiry.status === 'new' 
                        ? 'bg-red-100 text-red-800' 
                        : inquiry.status === 'replied'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                </div>
              ))}
              {recentInquiries.length === 0 && (
                <p className="text-muted-foreground text-sm">No inquiries yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-1">Product Management</h4>
                <p className="text-sm text-muted-foreground">
                  Add new products, update pricing, manage categories
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-1">Inquiry Management</h4>
                <p className="text-sm text-muted-foreground">
                  Review customer inquiries and product requests
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-1">Content Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Update product descriptions, images, and documentation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
