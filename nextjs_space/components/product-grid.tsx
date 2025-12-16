
"use client"

import { ProductCard } from '@/components/product-card'
import { ProductWithRelations } from '@/lib/types'

interface ProductGridProps {
  products: ProductWithRelations[]
  className?: string
}

export function ProductGrid({ products, className = '' }: ProductGridProps) {
  if (!products?.length) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </div>
  )
}
