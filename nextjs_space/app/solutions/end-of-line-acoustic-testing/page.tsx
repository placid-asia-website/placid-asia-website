import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProductGrid } from '@/components/product-grid'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'End-of-Line Acoustic Testing - Impedance Tube & Microphones | Placid Asia',
  description: 'Professional end-of-line acoustic testing solutions combining impedance tubes and measurement microphones for production quality control. ISO 10534-2 testing equipment for manufacturing facilities in Thailand.',
  keywords: ['end-of-line acoustic testing', 'production acoustic testing', 'impedance tube quality control', 'acoustic testing Thailand', 'manufacturing noise testing'],
}

export default async function EndOfLineTesting() {
  const products = await prisma.product.findMany({
    where: {
      active: true,
      OR: [
        { sku: { contains: 'IMPEDANCE', mode: 'insensitive' } },
        { sku: { contains: 'PMP21', mode: 'insensitive' } },
        { title_en: { contains: 'measurement microphone', mode: 'insensitive' } },
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
            End-of-Line Acoustic Testing Solutions
          </h1>
          <h2 className="text-2xl mb-6 font-light">ระบบทดสอบเสียงท้ายสายการผลิต</h2>
          <p className="text-lg mb-8">
            Complete acoustic testing systems combining impedance tubes and Class 1 microphones for production quality control.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <Link href="#products">View Equipment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white">
              <Link href="/contact">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="products" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Testing Equipment</h2>
          {productsWithMedia.length > 0 ? (
            <ProductGrid products={productsWithMedia} />
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="mb-4">Contact us for end-of-line acoustic testing solutions.</p>
                <Button asChild><Link href="/contact">Request Information</Link></Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </>
  )
}
