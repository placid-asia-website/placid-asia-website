
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Save, Package, CheckCircle2, Upload, X, Trash2, Keyboard } from 'lucide-react';

interface Category {
  id: string;
  name_en: string;
  name_th: string;
  slug: string;
  parent_id: string | null;
  product_count: number;
  active: boolean;
}

interface ProductCategory {
  category_id: string;
  is_primary: boolean;
  category: Category;
}

interface Product {
  id: string;
  sku: string;
  title_en: string;
  title_th: string;
  description_en: string | null;
  supplier: string | null;
  category: string | null;
  images: string[];
  categories: ProductCategory[];
}

export default function CategorizeProductsPage() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [primaryCategory, setPrimaryCategory] = useState<string | null>(null);
  const [secondaryCategory, setSecondaryCategory] = useState<string | null>(null);
  const [progress, setProgress] = useState({ categorized: 0, total: 0 });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin-login');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all categories including inactive ones for admin use
        const catRes = await fetch('/api/categories?includeInactive=true');
        const catData = await catRes.json();
        // Filter to only show categories with products or that are explicitly active
        const relevantCategories = catData.filter((c: Category) => 
          c.product_count > 0 || c.active
        );
        setCategories(relevantCategories);

        // Fetch products with categories included
        const prodRes = await fetch('/api/products?limit=1000&includeCategories=true');
        const prodData = await prodRes.json();
        setProducts(prodData.products || []);
        
        // Calculate progress
        const categorized = prodData.products.filter((p: Product) => 
          p.categories && p.categories.length > 0 && 
          !p.categories.some(c => c.category.name_en === 'Miscellaneous')
        ).length;
        setProgress({ categorized, total: prodData.products.length });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
        setLoading(false);
      }
    }

    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);

  useEffect(() => {
    // Load current product's categories
    if (products.length > 0 && currentIndex < products.length) {
      const product = products[currentIndex];
      const newSelected = new Set<string>();
      
      let primary: string | null = null;
      let secondary: string | null = null;

      if (product.categories && product.categories.length > 0) {
        product.categories.forEach((pc, index) => {
          newSelected.add(pc.category_id);
          if (pc.is_primary || index === 0) {
            primary = pc.category_id;
          } else if (index === 1 && !secondary) {
            secondary = pc.category_id;
          }
        });
      }

      setSelectedCategories(newSelected);
      setPrimaryCategory(primary);
      setSecondaryCategory(secondary);
    }
  }, [currentIndex, products]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S: Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (primaryCategory) handleSave();
      }
      // Ctrl/Cmd + →: Next
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
      // Ctrl/Cmd + ←: Previous
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      }
      // Ctrl/Cmd + D: Skip
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        handleSkip();
      }
      // Ctrl/Cmd + ?: Show shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowKeyboardShortcuts(!showKeyboardShortcuts);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [primaryCategory, showKeyboardShortcuts, currentIndex, products.length]);

  const handleSave = async () => {
    if (!primaryCategory) {
      toast.error('Please select a primary category');
      return;
    }

    const product = products[currentIndex];
    setSaving(true);

    try {
      const categoriesToSave = Array.from(selectedCategories);

      const response = await fetch(`/api/admin/products/${product.sku}/categories`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: categoriesToSave,
          primaryCategory: primaryCategory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save categories');
      }

      const updatedProduct = await response.json();
      const updatedProducts = [...products];
      updatedProducts[currentIndex] = updatedProduct;
      setProducts(updatedProducts);

      // Update progress
      const categorized = updatedProducts.filter((p: Product) => 
        p.categories && p.categories.length > 0 && 
        !p.categories.some(c => c.category.name_en === 'Miscellaneous')
      ).length;
      setProgress({ categorized, total: updatedProducts.length });

      toast.success('Categories saved!');

      // Auto-advance to next product
      if (currentIndex < products.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } catch (error: any) {
      console.error('Error saving categories:', error);
      toast.error(error.message || 'Failed to save categories');
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId);
      if (primaryCategory === categoryId) setPrimaryCategory(null);
      if (secondaryCategory === categoryId) setSecondaryCategory(null);
    } else {
      newSelected.add(categoryId);
    }
    setSelectedCategories(newSelected);
  };

  const handleAddImage = async () => {
    const urlToAdd = newImageUrl.trim();
    if (!urlToAdd) return;

    // Basic URL validation
    try {
      new URL(urlToAdd);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    if (!urlToAdd.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      toast.error('URL must point to an image file');
      return;
    }

    setUploadingImage(true);

    try {
      const product = products[currentIndex];
      const updatedImages = [...(product.images || []), urlToAdd];

      const response = await fetch(`/api/admin/products/${product.sku}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: updatedImages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add image');
      }

      const updatedProduct = await response.json();
      const updatedProducts = [...products];
      updatedProducts[currentIndex] = updatedProduct;
      setProducts(updatedProducts);
      setNewImageUrl('');
      toast.success('Image added successfully!');
    } catch (error: any) {
      console.error('Error adding image:', error);
      toast.error(error.message || 'Failed to add image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = async (imageIndex: number) => {
    const product = products[currentIndex];
    const updatedImages = product.images.filter((_, idx) => idx !== imageIndex);

    setSaving(true);

    try {
      const response = await fetch(`/api/admin/products/${product.sku}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: updatedImages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove image');
      }

      const updatedProduct = await response.json();
      const updatedProducts = [...products];
      updatedProducts[currentIndex] = updatedProduct;
      setProducts(updatedProducts);
      toast.success('Image removed!');
    } catch (error: any) {
      console.error('Error removing image:', error);
      toast.error(error.message || 'Failed to remove image');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async () => {
    const product = products[currentIndex];
    
    if (!window.confirm(`Are you sure you want to delete this product?\n\nSKU: ${product.sku}\n${product.title_en}\n\nThis will mark it as inactive and remove it from the website.`)) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/admin/products/${product.sku}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      const updatedProducts = products.filter((_, idx) => idx !== currentIndex);
      setProducts(updatedProducts);
      
      if (currentIndex >= updatedProducts.length && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      
      toast.success('Product deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(error.message || 'Failed to delete product');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Package className="w-12 h-12 animate-spin mx-auto mb-4 text-accent" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold mb-2">All Done!</h2>
            <p className="text-muted-foreground">All products have been categorized.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentProduct = products[currentIndex];
  const progressPercent = Math.round((progress.categorized / progress.total) * 100);
  const rootCategories = categories.filter(c => !c.parent_id);
  const childCategories = categories.filter(c => c.parent_id);

  // Split categories into two columns
  const halfLength = Math.ceil(rootCategories.length / 2);
  const leftColumnCategories = rootCategories.slice(0, halfLength);
  const rightColumnCategories = rootCategories.slice(halfLength);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* STICKY HEADER - Always visible */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          {/* Top Row: Title + Progress */}
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold">Product Categorization</h1>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-base">
                {currentIndex + 1} / {products.length}
              </Badge>
              <Badge variant="outline" className="text-base">
                {progressPercent}% Done
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                className="gap-2"
              >
                <Keyboard className="w-4 h-4" />
                Shortcuts
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* ACTION BUTTONS - Always visible */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                size="sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleSkip}
                disabled={currentIndex === products.length - 1}
                size="sm"
              >
                Skip
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={handleDeleteProduct}
                disabled={saving}
                size="sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || !primaryCategory}
                className="bg-accent hover:bg-accent/90"
                size="lg"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save & Next'}
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentIndex === products.length - 1}
                size="sm"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Keyboard Shortcuts Tooltip */}
          {showKeyboardShortcuts && (
            <div className="mt-3 p-3 bg-slate-100 rounded-lg text-sm">
              <p className="font-semibold mb-2">Keyboard Shortcuts:</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                <div><kbd className="px-2 py-1 bg-white rounded border">Ctrl+S</kbd> Save & Next</div>
                <div><kbd className="px-2 py-1 bg-white rounded border">Ctrl+→</kbd> Next Product</div>
                <div><kbd className="px-2 py-1 bg-white rounded border">Ctrl+←</kbd> Previous Product</div>
                <div><kbd className="px-2 py-1 bg-white rounded border">Ctrl+D</kbd> Skip Product</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: Product Info (1/3 width) */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5" />
                Product Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Product Image */}
              {currentProduct.images && currentProduct.images.length > 0 ? (
                <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden">
                  <Image
                    src={currentProduct.images[0]}
                    alt={currentProduct.title_en}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">No image</p>
                </div>
              )}

              {/* Product Details */}
              <div className="space-y-2 pt-2 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">SKU</p>
                  <p className="font-mono font-semibold text-sm">{currentProduct.sku}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Product Name</p>
                  <p className="font-semibold text-sm line-clamp-2">{currentProduct.title_en}</p>
                </div>

                {currentProduct.supplier && (
                  <div>
                    <p className="text-xs text-muted-foreground">Supplier</p>
                    <Badge variant="secondary" className="text-xs">{currentProduct.supplier}</Badge>
                  </div>
                )}

                {currentProduct.description_en && (
                  <div>
                    <p className="text-xs text-muted-foreground">Description</p>
                    <p className="text-xs line-clamp-3">{currentProduct.description_en}</p>
                  </div>
                )}
              </div>

              {/* Image Management Section */}
              <div className="space-y-3 pt-3 border-t">
                <Label className="text-xs font-semibold">Product Images</Label>
                
                {/* Current Images */}
                {currentProduct.images && currentProduct.images.length > 0 ? (
                  <div className="space-y-2">
                    {currentProduct.images.map((imageUrl, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-slate-100 rounded">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={imageUrl}
                            alt={`Product ${idx + 1}`}
                            fill
                            className="object-contain rounded"
                          />
                        </div>
                        <p className="text-xs flex-1 truncate">{imageUrl}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveImage(idx)}
                          disabled={saving}
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No images</p>
                )}

                {/* Add New Image */}
                <div className="space-y-2">
                  <Label className="text-xs">Add Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjslYtSS4U4IWH9P9NgLJnnxAOyN01z1eqi3doJ2XY8xYsG79-gCekbMkse3mJ1OFkPardYR7w3JUs1AtPNvbzbKNs8Wr4m3eozh01wjJHsVTiNJFKki6iGrcgiOf7gyhAdU1vfJiamA31q/w1200-h630-p-k-no-nu/upload-image-from-url-using-php-with-ajax-blog.jpg"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="text-xs h-8"
                      disabled={uploadingImage}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddImage}
                      disabled={uploadingImage || !newImageUrl.trim()}
                      className="h-8 whitespace-nowrap"
                    >
                      <Upload className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: Category Assignment (2/3 width) */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Assign Categories</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select primary (required) and additional categories
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Primary & Secondary Dropdowns - Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                {/* Primary Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    Primary Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={primaryCategory || undefined}
                    onValueChange={(value) => {
                      setPrimaryCategory(value);
                      const newSelected = new Set(selectedCategories);
                      newSelected.add(value);
                      setSelectedCategories(newSelected);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select primary..." />
                    </SelectTrigger>
                    <SelectContent>
                      {rootCategories.map(rootCat => {
                        const children = childCategories.filter(c => c.parent_id === rootCat.id);
                        return (
                          <div key={rootCat.id}>
                            <SelectItem value={rootCat.id}>
                              📁 {rootCat.name_en}
                            </SelectItem>
                            {children.map(childCat => (
                              <SelectItem key={childCat.id} value={childCat.id} className="pl-8">
                                📄 {childCat.name_en}
                              </SelectItem>
                            ))}
                          </div>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Secondary Category */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">
                      2nd Category <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                    </Label>
                    {secondaryCategory && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSecondaryCategory(null);
                          const newSelected = new Set(selectedCategories);
                          newSelected.delete(secondaryCategory);
                          setSelectedCategories(newSelected);
                        }}
                        className="h-6 text-xs text-muted-foreground hover:text-red-600"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <Select
                    value={secondaryCategory || undefined}
                    onValueChange={(value) => {
                      if (value === 'none') {
                        setSecondaryCategory(null);
                        return;
                      }
                      if (value === primaryCategory) {
                        toast.error('Secondary must differ from primary');
                        return;
                      }
                      setSecondaryCategory(value || null);
                      if (value) {
                        const newSelected = new Set(selectedCategories);
                        newSelected.add(value);
                        setSelectedCategories(newSelected);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select 2nd..." />
                    </SelectTrigger>
                    <SelectContent>
                      {secondaryCategory && (
                        <SelectItem value="none" className="text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <X className="w-3 h-3" />
                            None (Remove 2nd Category)
                          </span>
                        </SelectItem>
                      )}
                      {rootCategories.map(rootCat => {
                        const children = childCategories.filter(c => c.parent_id === rootCat.id);
                        return (
                          <div key={rootCat.id}>
                            {rootCat.id !== primaryCategory && (
                              <SelectItem value={rootCat.id}>
                                📁 {rootCat.name_en}
                              </SelectItem>
                            )}
                            {children.map(childCat => 
                              childCat.id !== primaryCategory && (
                                <SelectItem key={childCat.id} value={childCat.id} className="pl-8">
                                  📄 {childCat.name_en}
                                </SelectItem>
                              )
                            )}
                          </div>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Categories - TWO COLUMNS */}
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Additional Categories <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                </Label>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 max-h-[300px] overflow-y-auto p-3 border rounded-lg bg-slate-50">
                  {/* LEFT COLUMN */}
                  <div className="space-y-1">
                    {leftColumnCategories.map(rootCat => {
                      const children = childCategories.filter(c => c.parent_id === rootCat.id);
                      const isSelected = selectedCategories.has(rootCat.id);
                      const isPrimary = primaryCategory === rootCat.id;
                      const isSecondary = secondaryCategory === rootCat.id;

                      return (
                        <div key={rootCat.id} className="space-y-0.5">
                          {/* Root Category */}
                          <div className="flex items-center gap-2 py-1">
                            <Checkbox
                              id={`cat-${rootCat.id}`}
                              checked={isSelected}
                              disabled={isPrimary || isSecondary}
                              onCheckedChange={() => {
                                if (!isPrimary && !isSecondary) {
                                  handleCategoryToggle(rootCat.id);
                                }
                              }}
                              className="h-4 w-4"
                            />
                            <label
                              htmlFor={`cat-${rootCat.id}`}
                              className={`text-sm font-medium cursor-pointer ${(isPrimary || isSecondary) ? 'opacity-50' : ''}`}
                            >
                              📁 {rootCat.name_en}
                              {isPrimary && <Badge variant="default" className="ml-1 text-xs bg-accent">1st</Badge>}
                              {isSecondary && <Badge variant="secondary" className="ml-1 text-xs">2nd</Badge>}
                            </label>
                          </div>

                          {/* Child Categories */}
                          {children.map(childCat => {
                            const isChildSelected = selectedCategories.has(childCat.id);
                            const isChildPrimary = primaryCategory === childCat.id;
                            const isChildSecondary = secondaryCategory === childCat.id;

                            return (
                              <div key={childCat.id} className="flex items-center gap-2 py-1 pl-4">
                                <Checkbox
                                  id={`cat-${childCat.id}`}
                                  checked={isChildSelected}
                                  disabled={isChildPrimary || isChildSecondary}
                                  onCheckedChange={() => {
                                    if (!isChildPrimary && !isChildSecondary) {
                                      handleCategoryToggle(childCat.id);
                                    }
                                  }}
                                  className="h-3.5 w-3.5"
                                />
                                <label
                                  htmlFor={`cat-${childCat.id}`}
                                  className={`text-xs cursor-pointer ${(isChildPrimary || isChildSecondary) ? 'opacity-50' : ''}`}
                                >
                                  📄 {childCat.name_en}
                                  {isChildPrimary && <Badge variant="default" className="ml-1 text-[10px] bg-accent">1st</Badge>}
                                  {isChildSecondary && <Badge variant="secondary" className="ml-1 text-[10px]">2nd</Badge>}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-1">
                    {rightColumnCategories.map(rootCat => {
                      const children = childCategories.filter(c => c.parent_id === rootCat.id);
                      const isSelected = selectedCategories.has(rootCat.id);
                      const isPrimary = primaryCategory === rootCat.id;
                      const isSecondary = secondaryCategory === rootCat.id;

                      return (
                        <div key={rootCat.id} className="space-y-0.5">
                          {/* Root Category */}
                          <div className="flex items-center gap-2 py-1">
                            <Checkbox
                              id={`cat-${rootCat.id}`}
                              checked={isSelected}
                              disabled={isPrimary || isSecondary}
                              onCheckedChange={() => {
                                if (!isPrimary && !isSecondary) {
                                  handleCategoryToggle(rootCat.id);
                                }
                              }}
                              className="h-4 w-4"
                            />
                            <label
                              htmlFor={`cat-${rootCat.id}`}
                              className={`text-sm font-medium cursor-pointer ${(isPrimary || isSecondary) ? 'opacity-50' : ''}`}
                            >
                              📁 {rootCat.name_en}
                              {isPrimary && <Badge variant="default" className="ml-1 text-xs bg-accent">1st</Badge>}
                              {isSecondary && <Badge variant="secondary" className="ml-1 text-xs">2nd</Badge>}
                            </label>
                          </div>

                          {/* Child Categories */}
                          {children.map(childCat => {
                            const isChildSelected = selectedCategories.has(childCat.id);
                            const isChildPrimary = primaryCategory === childCat.id;
                            const isChildSecondary = secondaryCategory === childCat.id;

                            return (
                              <div key={childCat.id} className="flex items-center gap-2 py-1 pl-4">
                                <Checkbox
                                  id={`cat-${childCat.id}`}
                                  checked={isChildSelected}
                                  disabled={isChildPrimary || isChildSecondary}
                                  onCheckedChange={() => {
                                    if (!isChildPrimary && !isChildSecondary) {
                                      handleCategoryToggle(childCat.id);
                                    }
                                  }}
                                  className="h-3.5 w-3.5"
                                />
                                <label
                                  htmlFor={`cat-${childCat.id}`}
                                  className={`text-xs cursor-pointer ${(isChildPrimary || isChildSecondary) ? 'opacity-50' : ''}`}
                                >
                                  📄 {childCat.name_en}
                                  {isChildPrimary && <Badge variant="default" className="ml-1 text-[10px] bg-accent">1st</Badge>}
                                  {isChildSecondary && <Badge variant="secondary" className="ml-1 text-[10px]">2nd</Badge>}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Summary of Selected Categories */}
              {(primaryCategory || selectedCategories.size > 0) && (
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm font-semibold mb-2">Selected Categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {primaryCategory && (
                      <Badge variant="default" className="bg-accent">
                        ★ {categories.find(c => c.id === primaryCategory)?.name_en}
                      </Badge>
                    )}
                    {secondaryCategory && (
                      <Badge variant="secondary">
                        2nd: {categories.find(c => c.id === secondaryCategory)?.name_en}
                      </Badge>
                    )}
                    {Array.from(selectedCategories)
                      .filter(catId => catId !== primaryCategory && catId !== secondaryCategory)
                      .map(catId => {
                        const cat = categories.find(c => c.id === catId);
                        return cat ? (
                          <Badge key={catId} variant="outline">
                            {cat.name_en}
                          </Badge>
                        ) : null;
                      })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
