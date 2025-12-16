
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search, ArrowLeft, Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-muted p-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold">404 - Page Not Found</CardTitle>
          <CardDescription className="text-lg mt-2">
            Sorry, we couldn't find the page you're looking for.
            <br />
            <span className="text-sm">
              ขออภัย เราไม่พบหน้าที่คุณต้องการ
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/" className="block">
              <Button variant="default" className="w-full h-auto py-4 px-6 flex-col items-start gap-2">
                <Home className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Go Home</div>
                  <div className="text-xs opacity-80">Return to homepage</div>
                </div>
              </Button>
            </Link>
            <Link href="/products" className="block">
              <Button variant="outline" className="w-full h-auto py-4 px-6 flex-col items-start gap-2">
                <Package className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Browse Products</div>
                  <div className="text-xs opacity-80">Explore our catalog</div>
                </div>
              </Button>
            </Link>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Popular Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <Link href="/categories/sound-level-meters">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Sound Level Meters
                </Button>
              </Link>
              <Link href="/categories/vibration-analyzers">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Vibration Analyzers
                </Button>
              </Link>
              <Link href="/categories/noise-monitoring">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Noise Monitoring
                </Button>
              </Link>
              <Link href="/brands">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  View All Brands
                </Button>
              </Link>
              <Link href="/applications">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Applications
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>If you believe this is an error, please contact us at</p>
            <a href="mailto:info@placid.asia" className="text-primary hover:underline font-medium">
              info@placid.asia
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
