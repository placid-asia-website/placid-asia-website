
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { prisma } from '@/lib/db'
import { ArrowRight, ChevronRight } from 'lucide-react'

export const dynamic = "force-dynamic"
export const revalidate = 0

interface CategoryWithChildren {
  id: string
  name_en: string
  name_th: string
  slug: string
  description_en: string | null
  description_th: string | null
  product_count: number
  active: boolean
  parent_id: string | null
  order: number
  children?: CategoryWithChildren[]
}

// Helper function to calculate total product count including all descendants
function getTotalProductCount(category: CategoryWithChildren): number {
  let total = category.product_count

  if (category.children && category.children.length > 0) {
    category.children.forEach((child) => {
      total += getTotalProductCount(child)
    })
  }

  return total
}

export default async function CategoriesPage() {
  // Fetch root categories with their children
  const rootCategories = await prisma.category.findMany({
    where: { 
      active: true,
      parent_id: null 
    },
    orderBy: { order: 'asc' },
    include: {
      children: {
        where: { active: true },
        orderBy: { order: 'asc' },
        include: {
          children: {
            where: { active: true },
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  }) as CategoryWithChildren[]

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Product Categories</h1>
        <p className="text-xl text-muted-foreground">
          Browse our comprehensive range of acoustic measurement equipment by category
        </p>
      </div>

      <div className="space-y-8">
        {rootCategories.map((category) => {
          const totalCount = getTotalProductCount(category)
          
          return (
            <div key={category.id} className="space-y-4">
              {/* Parent Category Card */}
              <Link href={`/categories/${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow border-2 border-primary/20 shadow-md cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="default" className="bg-primary">{totalCount} products</Badge>
                      <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h2 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                      {category.name_en}
                    </h2>
                    {category.description_en && (
                      <p className="text-sm text-muted-foreground">
                        {category.description_en}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>

              {/* Subcategories Grid */}
              {category.children && category.children.length > 0 && (
                <div className="ml-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.children.map((subCategory) => {
                    const subTotalCount = getTotalProductCount(subCategory)
                    
                    return (
                      <div key={subCategory.id} className="space-y-2">
                        {/* Subcategory Card */}
                        <Link href={`/categories/${subCategory.slug}`}>
                          <Card className="hover:shadow-md transition-shadow border border-muted shadow-sm cursor-pointer group h-full">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <ChevronRight className="h-4 w-4 text-accent flex-shrink-0" />
                                <Badge variant="secondary" className="text-xs">{subTotalCount} products</Badge>
                              </div>
                              <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                                {subCategory.name_en}
                              </h3>
                              {subCategory.description_en && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {subCategory.description_en}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        </Link>

                        {/* Third-level categories (if any) */}
                        {subCategory.children && subCategory.children.length > 0 && (
                          <div className="ml-4 space-y-2">
                            {subCategory.children.map((thirdLevel) => (
                              <Link key={thirdLevel.id} href={`/categories/${thirdLevel.slug}`}>
                                <div className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors group cursor-pointer">
                                  <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                    {thirdLevel.name_en}
                                  </span>
                                  <Badge variant="outline" className="ml-auto text-xs">
                                    {thirdLevel.product_count}
                                  </Badge>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
