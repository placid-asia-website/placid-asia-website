
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-6">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold">Something Went Wrong</CardTitle>
          <CardDescription className="text-lg mt-2">
            We encountered an unexpected error.
            <br />
            <span className="text-sm">
              เกิดข้อผิดพลาดที่ไม่คาดคิด
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error.message && (
            <div className="bg-muted p-4 rounded-lg border">
              <p className="text-sm font-mono text-muted-foreground break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={reset}
              variant="default"
              className="w-full h-auto py-4 px-6 flex-col items-start gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Try Again</div>
                <div className="text-xs opacity-80">Reload the page</div>
              </div>
            </Button>
            <Link href="/" className="block">
              <Button
                variant="outline"
                className="w-full h-auto py-4 px-6 flex-col items-start gap-2"
              >
                <Home className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Go Home</div>
                  <div className="text-xs opacity-80">Return to homepage</div>
                </div>
              </Button>
            </Link>
          </div>

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>If this problem persists, please contact our support team:</p>
            <div className="space-y-1">
              <a
                href="mailto:info@placid.asia"
                className="text-primary hover:underline font-medium block"
              >
                info@placid.asia
              </a>
              <a
                href="tel:+6628xxxxxxx"
                className="text-primary hover:underline font-medium block"
              >
                +66 (0)2-XXX-XXXX
              </a>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2 text-sm">Quick Links:</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/products">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Browse Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Contact Us
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Categories
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  About Us
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
