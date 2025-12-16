
"use client"

import { useState } from 'react'
import { Star } from 'lucide-react'
import { toast } from 'sonner'

interface FeaturedToggleProps {
  productId: string
  productSku: string
  initialFeatured: boolean
}

export function FeaturedToggle({ productId, productSku, initialFeatured }: FeaturedToggleProps) {
  const [featured, setFeatured] = useState(initialFeatured)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/products/${productSku}/featured`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !featured }),
      })

      if (response.ok) {
        setFeatured(!featured)
        toast.success(
          !featured 
            ? 'Product added to featured list' 
            : 'Product removed from featured list'
        )
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update featured status')
      }
    } catch (error) {
      console.error('Error toggling featured status:', error)
      toast.error('Failed to update featured status')
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-lg transition-colors ${
        featured
          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
      } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      title={featured ? 'Remove from featured' : 'Add to featured'}
    >
      <Star className={`h-5 w-5 ${featured ? 'fill-current' : ''}`} />
    </button>
  )
}
