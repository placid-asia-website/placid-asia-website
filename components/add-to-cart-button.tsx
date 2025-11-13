
"use client"

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

interface AddToCartButtonProps {
  productSku: string
  className?: string
}

export function AddToCartButton({ productSku, className }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const { t } = useLanguage()

  const handleAddToCart = () => {
    addItem(productSku)
  }

  return (
    <Button onClick={handleAddToCart} className={cn(className)}>
      <ShoppingCart className="h-4 w-4 mr-2" />
      {t('products.addToCart')}
    </Button>
  )
}
