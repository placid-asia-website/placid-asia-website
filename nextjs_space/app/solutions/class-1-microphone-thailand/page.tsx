import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Award, Settings, ShieldCheck, Zap, Globe } from 'lucide-react'
import { ProductGrid } from '@/components/product-grid'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Class 1 Measurement Microphones Thailand (PMP21 & PMP21-1) | Placid Asia',
  description: 'Professional IEC 61672 Class 1 measurement microphones for precision acoustic testing in Thailand. PMP21 and PMP21-1 free-field microphones with individual calibration certificates. Local support and calibration services.',
  keywords: [
    'Class 1 measurement microphone Thailand',
    'PMP21 microphone',
    'PMP21-1 microphone',
    'IEC 61672 Class 1',
    'IEC 61094-4 microphone',
    'precision measurement microphone',
    'free field microphone',
    '1/2 inch microphone',
    'calibrated microphone Thailand',
    'acoustic measurement microphone',
    'sound level meter microphone',
  ],
}

export default async function Class1MicrophoneHub() {
  // Fetch relevant products
  const products = await prisma.product.findMany({
    where: {
      active: true,
      OR: [
        { sku: { contains: 'PMP21', mode: 'insensitive' } },
        { title_en: { contains: 'measurement microphone', mode: 'insensitive' } },
        { category: { contains: 'Microphone', mode: 'insensitive' } },
      ],
    },
    take: 10,
  })

  const productsWithMedia = products.map((product) => ({
    ...product,
    images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
    pdfs: typeof product.pdfs === 'string' ? JSON.parse(product.pdfs) : product.pdfs,
  }))

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a Class 1 measurement microphone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Class 1 measurement microphone meets IEC 61672 Class 1 precision standards for sound level meters. It provides the highest accuracy for professional acoustic measurements, with tighter tolerances than Class 2 microphones. PMP21 and PMP21-1 are certified Class 1 microphones.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between PMP21 and PMP21-1?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both PMP21 and PMP21-1 are 1/2-inch prepolarized free-field measurement microphones meeting IEC 61094-4 standards. PMP21-1 is an enhanced version with improved specifications for extended frequency range and lower noise floor, ideal for demanding measurement applications.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do PMP21 microphones come with calibration certificates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all PMP21 and PMP21-1 microphones include individual factory calibration certificates with full frequency response data. Placid Asia also provides local calibration services and annual recalibration in Thailand for ongoing accuracy verification.',
        },
      },
      {
        '@type': 'Question',
        name: 'What applications require Class 1 microphones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Class 1 microphones are required for: environmental noise monitoring per Thai regulations, building acoustics testing to ISO 16283, industrial noise assessments, occupational noise exposure measurements, product noise emission testing, and acoustic research requiring highest precision.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is local support available in Thailand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Placid Asia provides comprehensive local support including: Thai language technical assistance, on-site calibration services, training, spare parts availability, and warranty support throughout Thailand and Southeast Asia.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">IEC 61672 Class 1 | IEC 61094-4</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Class 1 Measurement Microphones Thailand
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 font-light">
              ไมโครโฟนวัดระดับเสียงแม่นยำสูง Class 1 ประเทศไทย
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Professional IEC 61672 Class 1 measurement microphones (PMP21 & PMP21-1) for precision acoustic testing. 
              Individually calibrated with full certificates. Local support and calibration services throughout Thailand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link href="#products">View Microphones</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
                <Link href="/contact">Request Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose Class 1 Microphones?</h2>
            <p className="text-center text-muted-foreground mb-12">
              เหตุผลในการเลือกไมโครโฟน Class 1
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Award className="w-5 h-5 mr-2 text-accent" />
                    Highest Precision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    IEC 61672 Class 1 tolerance: ±1.0 dB across full frequency range (20 Hz - 20 kHz). Essential for legal compliance and certified measurements.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Official testing</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Regulatory compliance</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Research applications</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <ShieldCheck className="w-5 h-5 mr-2 text-accent" />
                    Individual Calibration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Every PMP21/PMP21-1 microphone is individually calibrated with traceable certificates showing actual frequency response and sensitivity.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Factory calibration</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Full documentation</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Annual recalibration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Globe className="w-5 h-5 mr-2 text-accent" />
                    Local Support Thailand
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive Thai language support, on-site calibration, training, and fast warranty service throughout Thailand.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Thai support team</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> On-site service</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Fast spare parts</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">PMP21 Series Specifications</h2>
            <p className="text-center text-muted-foreground mb-12">
              ข้อมูลจำเพาะทางเทคนิค PMP21
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>PMP21 Free Field Microphone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-semibold">Type:</span>
                    <span>1/2" Prepolarized Condenser</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-semibold">Standard:</span>
                    <span>IEC 61094-4 (Free Field)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-semibold">Frequency Range:</span>
                    <span>20 Hz - 20 kHz</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-semibold">Sensitivity:</span>
                    <span>~50 mV/Pa (typical)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-semibold">Dynamic Range:</span>
                    <span>25 dB(A) - 140 dB</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-semibold">Temperature Range:</span>
                    <span>-10°C to +50°C</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2">
                    <span className="font-semibold">Calibration:</span>
                    <span>Individual Certificate</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Applications & Compatibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Settings className="w-4 h-4 mr-2 text-accent" />
                      Compatible Sound Level Meters
                    </h4>
                    <ul className="text-sm space-y-1 ml-6">
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-600" /> Norsonic Nor150</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-600" /> Norsonic Nor145</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-600" /> Class 1 SLMs (standard preamp)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-accent" />
                      Typical Applications
                    </h4>
                    <ul className="text-sm space-y-1 ml-6">
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-blue-600" /> Environmental noise monitoring</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-blue-600" /> Building acoustics ISO 16283</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-blue-600" /> Industrial noise assessment</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-blue-600" /> Occupational exposure</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-blue-600" /> Product noise testing</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-blue-600" /> Acoustic research</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Available Microphones</h2>
            <p className="text-center text-muted-foreground mb-12">
              ไมโครโฟนที่มีจำหน่าย
            </p>

            {productsWithMedia.length > 0 ? (
              <ProductGrid products={productsWithMedia} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Contact us for detailed specifications and pricing for Class 1 measurement microphones.
                  </p>
                  <Button asChild>
                    <Link href="/contact">Request Information</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent/20 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Class 1 Microphones for Your Project?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our acoustic specialists can help you select the right microphone for your specific application. 
              We provide complete solutions including calibration, training, and ongoing support in Thailand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Get Expert Advice</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
