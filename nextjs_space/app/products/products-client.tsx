
"use client"

import { useState, useEffect } from 'react'
import { Search, Filter, SortAsc } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductGrid } from '@/components/product-grid'
import { useLanguage } from '@/lib/language-context'
import { ProductWithRelations, CategoryWithCount } from '@/lib/types'

interface PaginationData {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export function ProductsClient() {
  const { t } = useLanguage()
  const [products, setProducts] = useState<ProductWithRelations[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<ProductWithRelations[]>([])
  const [categories, setCategories] = useState<CategoryWithCount[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [pagination, setPagination] = useState<PaginationData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch featured products (runs once on mount)
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setFeaturedLoading(true)
      try {
        const response = await fetch('/api/products/featured')
        if (response.ok) {
          const data = await response.json()
          setFeaturedProducts(data.products || [])
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error)
      }
      setFeaturedLoading(false)
    }
    fetchFeaturedProducts()
  }, [])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '12',
          ...(searchTerm && { search: searchTerm }),
          ...(selectedCategory !== 'all' && { category: selectedCategory }),
          sortBy,
          sortOrder
        })

        const response = await fetch(`/api/products?${params}`)
        if (response.ok) {
          const data = await response.json()
          setProducts(data.products || [])
          setPagination(data.pagination)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setProducts([])
      }
      setLoading(false)
    }

    const timeoutId = setTimeout(fetchProducts, 300) // Debounce search
    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedCategory, sortBy, sortOrder, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
          {t('products.title')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('products.subtitle')}
        </p>
      </div>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Preferred Products</h2>
              <p className="text-muted-foreground">Hand-picked professional equipment for your measurement needs</p>
            </div>
          </div>
          {featuredLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('products.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('products.filter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name_en}>
                  {category.name_en} ({category.product_count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
            const [newSortBy, newSortOrder] = value.split('-')
            setSortBy(newSortBy)
            setSortOrder(newSortOrder)
          }}>
            <SelectTrigger>
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('products.sort')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title_en-asc">Name A-Z</SelectItem>
              <SelectItem value="title_en-desc">Name Z-A</SelectItem>
              <SelectItem value="category-asc">Category A-Z</SelectItem>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Info */}
      {pagination && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of {pagination.totalCount} products
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
          </p>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          <Button
            variant="outline"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={!pagination.hasPreviousPage}
          >
            Previous
          </Button>
          
          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
            const pageNumber = Math.max(1, Math.min(
              pagination.totalPages - 4,
              Math.max(1, pagination.page - 2)
            )) + i
            
            if (pageNumber <= pagination.totalPages) {
              return (
                <Button
                  key={pageNumber}
                  variant={pageNumber === pagination.page ? "default" : "outline"}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            }
            return null
          })}
          
          <Button
            variant="outline"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
