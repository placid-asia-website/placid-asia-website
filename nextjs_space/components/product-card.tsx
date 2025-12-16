
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, FileText, Eye, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { ProductWithRelations } from '@/lib/types'

interface ProductCardProps {
  product: ProductWithRelations
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage()
  const { addItem } = useCart()
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const title = language === 'th' ? product.title_th : product.title_en
  const primaryImage = product.images?.[0]
  const hasPDFs = product.pdfs?.length > 0

  const handleAddToCart = () => {
    addItem(product.sku)
  }

  const handleContactForQuote = () => {
    // Navigate to contact form with product pre-filled
    window.location.href = `/contact?product=${encodeURIComponent(product.sku)}`
  }

  return (
    <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:shadow-xl">
      <div className="relative aspect-square bg-muted/20 overflow-hidden rounded-t-lg">
        {primaryImage && !imageError ? (
          <Image
            src={primaryImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true)
              setImageLoading(false)
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No image</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 text-xs opacity-90"
        >
          {product.category}
        </Badge>

        {/* PDF Indicator */}
        {hasPDFs && (
          <Badge
            variant="outline"
            className="absolute top-2 right-2 text-xs opacity-90 bg-background/80"
          >
            <FileText className="h-3 w-3 mr-1" />
            PDF
          </Badge>
        )}
      </div>

      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-mono">
            {product.sku}
          </p>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-3">
            {language === 'th' ? product.description_th : product.description_en}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="flex gap-2 w-full">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/products/${product.sku}`}>
              <Eye className="h-4 w-4 mr-2" />
              {t('products.viewDetails')}
            </Link>
          </Button>
          
          {/* All products require contact for quote - no online pricing */}
          <Button size="sm" variant="secondary" onClick={handleContactForQuote} className="flex-1">
            <MessageCircle className="h-4 w-4 mr-2" />
            {t('products.contactForQuote')}
          </Button>
        </div>
        
        {hasPDFs && (
          <Button asChild variant="ghost" size="sm" className="w-full">
            <a href={product.pdfs[0]} target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4 mr-2" />
              {t('products.downloadPDF')}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
