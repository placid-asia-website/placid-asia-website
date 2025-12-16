
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem } from '@/lib/types'

interface CartContextType {
  items: CartItem[]
  addItem: (productSku: string) => void
  removeItem: (productSku: string) => void
  updateQuantity: (productSku: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage?.getItem('cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage
    localStorage?.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (productSku: string) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product_sku === productSku)
      if (existingItem) {
        return prevItems.map(item =>
          item.product_sku === productSku
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { product_sku: productSku, quantity: 1 }]
    })
  }

  const removeItem = (productSku: string) => {
    setItems(prevItems => prevItems.filter(item => item.product_sku !== productSku))
  }

  const updateQuantity = (productSku: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productSku)
      return
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.product_sku === productSku
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
