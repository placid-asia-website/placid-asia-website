
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'

interface SearchResult {
  sku: string
  title_en: string
  title_th: string
  category: string
  images: string[]
}

export function ProductSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const { language, t } = useLanguage()

  // Debounce search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      searchProducts(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const searchProducts = async (searchQuery: string) => {
    setIsSearching(true)
    try {
      const response = await fetch(
        `/api/products?search=${encodeURIComponent(searchQuery)}&limit=10`
      )
      if (response.ok) {
        const data = await response.json()
        setResults(data.products || [])
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleResultClick = (sku: string) => {
    setIsOpen(false)
    setQuery('')
    setResults([])
    router.push(`/products/${sku}`)
  }

  const handleViewAll = () => {
    setIsOpen(false)
    router.push(`/products?search=${encodeURIComponent(query)}`)
    setQuery('')
    setResults([])
  }

  // Keyboard shortcut to open search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search products...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          
          <div className="px-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product name, SKU, or category..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-9"
                autoFocus
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => {
                    setQuery('')
                    setResults([])
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4 overflow-y-auto max-h-[400px] px-2">
            {isSearching && (
              <div className="text-center py-8 text-muted-foreground">
                Searching...
              </div>
            )}

            {!isSearching && query && results.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No products found
              </div>
            )}

            {!isSearching && results.length > 0 && (
              <div className="space-y-2 pb-4">
                {results.map((product) => (
                  <button
                    key={product.sku}
                    onClick={() => handleResultClick(product.sku)}
                    className="w-full text-left px-4 py-3 hover:bg-accent/10 rounded-lg transition-colors flex items-center gap-4"
                  >
                    <div className="relative w-16 h-16 bg-muted rounded flex-shrink-0">
                      {product.images && product.images.length > 0 && (
                        <Image
                          src={product.images[0]}
                          alt={language === 'th' ? product.title_th : product.title_en}
                          fill
                          className="object-contain rounded"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {language === 'th' ? product.title_th : product.title_en}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {product.sku} • {product.category}
                      </p>
                    </div>
                  </button>
                ))}
                
                {results.length >= 10 && (
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={handleViewAll}
                  >
                    View all results for "{query}"
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
