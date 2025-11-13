
"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'
import { ProductWithRelations } from '@/lib/types'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalItems } = useCart()
  const { t } = useLanguage()
  const router = useRouter()
  const [products, setProducts] = useState<Record<string, ProductWithRelations>>({})
  const [loading, setLoading] = useState(true)
  const [sendingQuote, setSendingQuote] = useState(false)

  // Fetch product details for cart items
  useEffect(() => {
    const fetchProducts = async () => {
      if (items.length === 0) {
        setLoading(false)
        return
      }

      try {
        const productPromises = items.map(async (item) => {
          const response = await fetch(`/api/products/${item.product_sku}`)
          if (response.ok) {
            return response.json()
          }
          return null
        })

        const productResults = await Promise.all(productPromises)
        const productMap: Record<string, ProductWithRelations> = {}
        
        productResults.forEach((product, index) => {
          if (product) {
            productMap[items[index].product_sku] = product
          }
        })

        setProducts(productMap)
      } catch (error) {
        console.error('Failed to fetch product details:', error)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [items])

  const handleRequestQuote = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setSendingQuote(true)
    try {
      // Prepare cart items with product details for email
      const cartItemsForEmail = items.map(item => {
        const product = products[item.product_sku]
        return {
          product: {
            sku: item.product_sku,
            title_en: product?.title_en || 'Unknown Product',
            title_th: product?.title_th || 'Unknown Product'
          },
          quantity: item.quantity
        }
      })

      // Send email notification
      const response = await fetch('/api/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cartItemsForEmail })
      })

      if (response.ok) {
        toast.success('Quote request sent! Redirecting to contact form...')
        // Redirect to contact page for additional details after a brief delay
        setTimeout(() => {
          router.push('/contact?from=cart')
        }, 1500)
      } else {
        toast.error('Failed to send quote request. Please try contact page directly.')
        setTimeout(() => {
          router.push('/contact')
        }, 1500)
      }
    } catch (error) {
      console.error('Error sending quote request:', error)
      toast.error('An error occurred. Redirecting to contact page...')
      setTimeout(() => {
        router.push('/contact')
      }, 1500)
    } finally {
      setSendingQuote(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('cart.loading')}</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t('cart.empty')}</h2>
          <p className="text-muted-foreground mb-6">
            {t('cart.startShopping')}
          </p>
          <Button asChild>
            <Link href="/products">{t('cart.continueShopping')}</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('cart.continueShopping')}
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('cart.title')}</h1>
        <p className="text-muted-foreground">
          {totalItems} {t('cart.itemsInCart')}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const product = products[item.product_sku]
          if (!product) return null

          return (
            <Card key={item.product_sku}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-muted/20 rounded-lg overflow-hidden flex-shrink-0">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0] as string}
                        alt={product.title_en}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted/30">
                        <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1">
                      {product.title_en}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {t('cart.sku')} {product.sku}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('cart.category')} {product.category}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product_sku, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product_sku, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product_sku, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product_sku)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Separator className="my-6" />

      {/* Cart Summary */}
      <div className="bg-slate-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">{t('cart.total')}:</span>
          <span className="font-semibold">{totalItems}</span>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={clearCart} className="flex-1">
            {t('cart.clearCart')}
          </Button>
          <Button 
            onClick={handleRequestQuote} 
            disabled={sendingQuote || items.length === 0}
            className="flex-1"
          >
            {sendingQuote ? 'Sending...' : t('cart.requestQuote')}
          </Button>
        </div>
      </div>
    </div>
  )
}
