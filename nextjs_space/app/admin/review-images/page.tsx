
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  sku: string;
  title_en: string;
  supplier: string;
  images: string[];
}

interface Review {
  sku: string;
  productName: string;
  supplier: string;
  status: 'correct' | 'wrong';
  currentImage: string;
  correctImage: string | null;
}

export default function ReviewImagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [correctUrl, setCorrectUrl] = useState('');
  const [showWrongSection, setShowWrongSection] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin-login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?page=1&limit=1000');
      const data = await response.json();
      setProducts(data.products || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      setLoading(false);
    }
  };

  const currentProduct = products[currentIndex];
  const currentImageUrl = currentProduct?.images?.[0] || '';
  const progress = products.length > 0 ? ((currentIndex + 1) / products.length) * 100 : 0;
  const correctCount = reviews.filter(r => r.status === 'correct').length;
  const wrongCount = reviews.filter(r => r.status === 'wrong').length;
  const pendingCount = products.length - reviews.length;

  const markCorrect = () => {
    if (!currentProduct) return;
    
    setReviews([...reviews, {
      sku: currentProduct.sku,
      productName: currentProduct.title_en,
      supplier: currentProduct.supplier,
      status: 'correct',
      currentImage: currentImageUrl,
      correctImage: null
    }]);
    
    nextProduct();
  };

  const markWrong = () => {
    setShowWrongSection(true);
  };

  const submitWrong = () => {
    if (!correctUrl.trim() || !correctUrl.startsWith('http')) {
      toast.error('Please enter a valid URL starting with http:// or https://');
      return;
    }

    if (!currentProduct) return;

    setReviews([...reviews, {
      sku: currentProduct.sku,
      productName: currentProduct.title_en,
      supplier: currentProduct.supplier,
      status: 'wrong',
      currentImage: currentImageUrl,
      correctImage: correctUrl.trim()
    }]);

    setCorrectUrl('');
    setShowWrongSection(false);
    nextProduct();
  };

  const cancelWrong = () => {
    setShowWrongSection(false);
    setCorrectUrl('');
  };

  const nextProduct = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowWrongSection(false);
      setCorrectUrl('');
    } else {
      toast.success('Review complete!');
    }
  };

  const prevProduct = () => {
    if (currentIndex > 0) {
      if (reviews.length > 0 && reviews.length > currentIndex) {
        setReviews(reviews.slice(0, -1));
      }
      setCurrentIndex(currentIndex - 1);
      setShowWrongSection(false);
      setCorrectUrl('');
    }
  };

  const skipProduct = () => {
    nextProduct();
  };

  const openImageInNewTab = () => {
    if (currentImageUrl) {
      // Handle relative URLs
      const fullUrl = currentImageUrl.startsWith('http') 
        ? currentImageUrl 
        : `https://placid-asia-u7rs6k.abacusai.app${currentImageUrl}`;
      window.open(fullUrl, '_blank');
    }
  };

  const downloadReport = () => {
    const wrongImages = reviews.filter(r => r.status === 'wrong');
    let report = '='.repeat(80) + '\n';
    report += 'PRODUCT IMAGE REVIEW REPORT - PLACID ASIA\n';
    report += 'Generated: ' + new Date().toLocaleString() + '\n';
    report += '='.repeat(80) + '\n\n';
    
    report += 'SUMMARY:\n';
    report += '-'.repeat(80) + '\n';
    report += `Total Products Reviewed: ${reviews.length}\n`;
    report += `✅ Correct Images: ${correctCount}\n`;
    report += `❌ Images Needing Fix: ${wrongCount}\n\n`;
    
    if (wrongImages.length > 0) {
      report += '\n' + '='.repeat(80) + '\n';
      report += 'IMAGES THAT NEED FIXING\n';
      report += '='.repeat(80) + '\n\n';
      
      wrongImages.forEach((item, index) => {
        report += `${index + 1}. SKU: ${item.sku}\n`;
        report += `   Product: ${item.productName}\n`;
        report += `   Supplier: ${item.supplier}\n`;
        report += `   Current Image: ${item.currentImage}\n`;
        report += `   Correct Image: ${item.correctImage}\n`;
        report += '-'.repeat(80) + '\n\n';
      });
    }
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `image-review-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-8">
        <Card className="p-8 text-center">
          <p className="text-gray-600">No products found to review.</p>
        </Card>
      </div>
    );
  }

  if (currentIndex >= products.length) {
    return (
      <div className="p-8">
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Complete!</h2>
          <p className="text-gray-600 mb-6">You've reviewed all {products.length} products.</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{correctCount}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-red-600">{wrongCount}</div>
              <div className="text-sm text-gray-600">Need Fixing</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{reviews.length}</div>
              <div className="text-sm text-gray-600">Total Reviewed</div>
            </div>
          </div>

          <Button onClick={downloadReport} size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download Report
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🖼️ Product Image Review</h1>
        <p className="text-gray-600">Review product images and report incorrect ones</p>
      </div>

      {/* Progress */}
      <Card className="p-6 mb-6">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress: {currentIndex + 1} / {products.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{correctCount}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{wrongCount}</div>
            <div className="text-sm text-gray-600">Wrong</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{pendingCount}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
      </Card>

      {/* Product Card */}
      <Card className="p-6 mb-6">
        {/* Product Info */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              SKU: <span className="text-gray-900">{currentProduct.sku}</span>
            </span>
            <Badge>{currentProduct.supplier}</Badge>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {currentProduct.title_en}
          </h2>
        </div>

        {/* Current Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Image:
          </label>
          <div className="bg-gray-100 p-3 rounded-lg mb-3">
            <code className="text-xs break-all">{currentImageUrl || 'No image'}</code>
          </div>

          {/* Image Preview */}
          <div className="relative w-full aspect-video bg-blue-50 rounded-lg mb-3 overflow-hidden border-2 border-blue-200">
            <div className="flex flex-col items-center justify-center h-full text-gray-700 p-8">
              <ExternalLink className="h-16 w-16 text-blue-500 mb-4" />
              <p className="text-center mb-2 font-bold text-lg">Click the button below to view the image</p>
              <p className="text-center text-sm text-gray-600 mb-4">
                Images open in a new tab for easy viewing
              </p>
              <div className="bg-white px-4 py-2 rounded-md border border-gray-300">
                <code className="text-xs text-gray-600">
                  {currentImageUrl ? (currentImageUrl.length > 60 ? currentImageUrl.substring(0, 60) + '...' : currentImageUrl) : 'No URL'}
                </code>
              </div>
            </div>
          </div>

          <Button 
            onClick={openImageInNewTab}
            className="w-full"
            variant="outline"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Image in New Tab
          </Button>
        </div>

        {/* Review Buttons */}
        <div className="space-y-4">
          {!showWrongSection && (
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={markCorrect}
                className="bg-green-500 hover:bg-green-600"
                size="lg"
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Image is Correct
              </Button>
              <Button
                onClick={markWrong}
                className="bg-red-500 hover:bg-red-600"
                size="lg"
              >
                <XCircle className="mr-2 h-5 w-5" />
                Image is Wrong
              </Button>
            </div>
          )}

          {/* Wrong Image Section */}
          {showWrongSection && (
            <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📎 Paste the correct image URL here:
              </label>
              <Input
                type="text"
                value={correctUrl}
                onChange={(e) => setCorrectUrl(e.target.value)}
                placeholder="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhj0HJar5YK9xgbj-K5FqJX4SLGRP8n0REtStl8SF0fdgbQNPehoM3KS31adpsdaDnlZhwS1_TIQ3Mua1C7q_k72Z1BjKrNnK4FvOTE6FJPUewGhfWN9LhkjOUs53Ij0vmR0_18DBa0sEBr/s1332/get-valid-url-web-address-for-a-google-photo-by-using-blogger.png"
                className="mb-3"
              />
              <div className="text-xs text-gray-600 mb-3">
                <p className="font-bold">How to get the correct URL:</p>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                  <li>Go to supplier website</li>
                  <li>Find the product image</li>
                  <li>Right-click image → "Copy Image Address"</li>
                  <li>Paste above</li>
                </ol>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={submitWrong}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  Submit
                </Button>
                <Button
                  onClick={cancelWrong}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4">
            <Button
              onClick={prevProduct}
              disabled={currentIndex === 0}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={skipProduct}
              variant="outline"
              className="flex-1"
            >
              Skip
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
