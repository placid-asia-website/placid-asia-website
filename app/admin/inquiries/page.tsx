
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { prisma } from '@/lib/db'
import { Mail, Phone, Building, Calendar, Package } from 'lucide-react'

export const dynamic = "force-dynamic"

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800'
      case 'replied':
        return 'bg-blue-100 text-blue-800'
      case 'closed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customer Inquiries</h1>
        <p className="text-muted-foreground">
          Manage customer inquiries and product requests
        </p>
      </div>

      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No inquiries yet</h3>
            <p className="text-muted-foreground">
              Customer inquiries will appear here when submitted
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{inquiry.subject}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {inquiry.name} • {inquiry.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(inquiry.status)}>
                    {inquiry.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{inquiry.email}</span>
                  </div>
                  {inquiry.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{inquiry.phone}</span>
                    </div>
                  )}
                  {inquiry.company && (
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{inquiry.company}</span>
                    </div>
                  )}
                  {inquiry.product_sku && (
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Product: {inquiry.product_sku}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Message:</h4>
                  <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                    {inquiry.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
