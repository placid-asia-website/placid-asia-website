
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { prisma } from '@/lib/db'
import { ArrowRight } from 'lucide-react'

export const dynamic = "force-dynamic"

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { product_count: 'desc' }
  })

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Product Categories</h1>
        <p className="text-xl text-muted-foreground">
          Browse our comprehensive range of acoustic measurement equipment by category
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm cursor-pointer group h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary">{category.product_count} products</Badge>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {category.name_en}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.name_th}
                </p>
                {category.description_en && (
                  <p className="text-sm text-muted-foreground">
                    {category.description_en}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
