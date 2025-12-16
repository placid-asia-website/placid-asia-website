import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProductGrid } from '@/components/product-grid'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Factory Noise Monitoring Systems Thailand - Industrial Noise Control | Placid Asia',
  description: 'Professional noise monitoring systems for factories and industrial facilities in Thailand. Continuous environmental noise monitoring, worker exposure assessment, and regulatory compliance solutions.',
  keywords: ['factory noise monitoring Thailand', 'industrial noise monitoring', 'noise monitoring system', 'environmental noise monitoring', 'occupational noise assessment Thailand'],
}

export default async function FactoryNoiseMonitoring() {
  const products = await prisma.product.findMany({
    where: {
      active: true,
      OR: [
        { category: { contains: 'Environmental Monitoring', mode: 'insensitive' } },
        { title_en: { contains: 'monitoring', mode: 'insensitive' } },
        { title_en: { contains: 'dosimeter', mode: 'insensitive' } },
      ],
    },
    take: 10,
  })

  const productsWithMedia = products.map((product) => ({
    ...product,
    images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
    pdfs: typeof product.pdfs === 'string' ? JSON.parse(product.pdfs) : product.pdfs,
  }))

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Noise Monitoring Systems for Factories in Thailand
          </h1>
          <h2 className="text-2xl mb-6 font-light">ระบบตรวจวัดเสียงรบกวนสำหรับโรงงานในประเทศไทย</h2>
          <p className="text-lg mb-8">
            Professional continuous noise monitoring solutions for industrial facilities, worker safety, and environmental compliance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <Link href="#products">View Solutions</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white">
              <Link href="/contact">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="products" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Noise Monitoring Solutions</h2>
          {productsWithMedia.length > 0 ? (
            <ProductGrid products={productsWithMedia} />
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="mb-4">Contact us for factory noise monitoring solutions.</p>
                <Button asChild><Link href="/contact">Request Information</Link></Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </>
  )
}
