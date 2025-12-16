import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, FileText, Waves, Target, Zap, Shield } from 'lucide-react'
import { ProductGrid } from '@/components/product-grid'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Impedance Tube ISO 10534-2 & ASTM E2611 - Complete Testing Solution | Placid Asia',
  description: 'Professional impedance tube systems for sound absorption coefficient and transmission loss measurement per ISO 10534-2 and ASTM E2611. Turnkey solutions with local support in Thailand. Kundt tube testing equipment for acoustic material characterization.',
  keywords: [
    'impedance tube ISO 10534-2',
    'ASTM E2611 impedance tube',
    'Kundt tube',
    'sound absorption coefficient measurement',
    'transmission loss testing',
    'acoustic material testing Thailand',
    'impedance tube system',
    'two-microphone method',
    'transfer function method',
    'acoustic impedance measurement',
  ],
}

export default async function ImpedanceTubeHub() {
  // Fetch relevant products
  const products = await prisma.product.findMany({
    where: {
      active: true,
      OR: [
        { sku: { contains: 'IMPEDANCE', mode: 'insensitive' } },
        { sku: { contains: 'PKT', mode: 'insensitive' } },
        { title_en: { contains: 'impedance tube', mode: 'insensitive' } },
        { title_en: { contains: 'Kundt', mode: 'insensitive' } },
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
        name: 'What is ISO 10534-2 impedance tube testing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ISO 10534-2 defines the transfer function method for measuring sound absorption coefficient and impedance using a two-microphone impedance tube (Kundt tube). This standardized method provides accurate acoustic material characterization in controlled laboratory conditions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between ISO 10534-2 and ASTM E2611?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ISO 10534-2 and ASTM E2611 are harmonized standards that both describe the two-microphone transfer function method for impedance tube testing. ASTM E2611 is the US equivalent, with nearly identical requirements to ISO 10534-2, ensuring international compatibility of test results.',
        },
      },
      {
        '@type': 'Question',
        name: 'What can be measured with an impedance tube?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Impedance tubes can measure: sound absorption coefficient (normal incidence), acoustic impedance, reflection coefficient, transmission loss (with two tubes), and complex acoustic properties of porous materials, perforated panels, and resonators.',
        },
      },
      {
        '@type': 'Question',
        name: 'What size impedance tube do I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tube diameter determines frequency range: 100mm tubes cover 500-6400 Hz, 29mm tubes cover 1000-6400 Hz. For full range (50-6400 Hz), a dual-tube system with both large (100mm) and small (29mm) tubes is recommended per ISO 10534-2 requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is calibration included with impedance tube systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Placid Asia provides complete turnkey systems including: factory calibration certificates, reference materials for verification, microphone phase matching documentation, and local calibration support in Thailand.',
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
            <Badge variant="secondary" className="mb-4">ISO 10534-2 | ASTM E2611</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Impedance Tube Testing Systems
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 font-light">
              ระบบทดสอบท่อค่าอิมพีแดนซ์ มาตรฐาน ISO 10534-2 และ ASTM E2611
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Professional acoustic material characterization using the two-microphone transfer function method. 
              Complete turnkey solutions with local support and calibration services in Thailand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link href="#products">View Solutions</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
                <Link href="/contact">Request Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Standards & Applications */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Standards & Applications</h2>
            <p className="text-center text-muted-foreground mb-12">
              มาตรฐานและการประยุกต์ใช้งาน
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-accent" />
                    Compliance Standards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">ISO 10534-2:1998</p>
                      <p className="text-sm text-muted-foreground">
                        Acoustics - Determination of sound absorption coefficient and impedance using standing wave tubes - Part 2: Transfer-function method
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">ASTM E2611-19</p>
                      <p className="text-sm text-muted-foreground">
                        Standard Test Method for Normal Incidence Determination of Porous Material Acoustical Properties Based on the Transfer Matrix Method
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">ISO 10534-1:1996</p>
                      <p className="text-sm text-muted-foreground">
                        Standing wave ratio method (reference for historical comparisons)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-6 h-6 mr-2 text-accent" />
                    Key Applications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Acoustic Material R&D</p>
                      <p className="text-sm text-muted-foreground">
                        Development and characterization of sound absorbers, porous materials, perforated panels
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Quality Control Testing</p>
                      <p className="text-sm text-muted-foreground">
                        Production verification, batch testing, material consistency checks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Building Material Certification</p>
                      <p className="text-sm text-muted-foreground">
                        Third-party testing labs, acoustic product certification, performance validation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose ISO 10534-2 Method?</h2>
            <p className="text-center text-muted-foreground mb-12">
              เหตุผลในการเลือกวิธี ISO 10534-2
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                    Fast & Accurate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Digital signal processing enables rapid measurements with excellent repeatability and low uncertainty (typically ±0.02 for absorption coefficient)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Waves className="w-5 h-5 mr-2 text-blue-600" />
                    Broad Frequency Range
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Dual-tube systems cover 50 Hz to 6400 Hz, capturing full acoustic performance of materials from low to high frequencies
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    Internationally Recognized
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Harmonized ISO/ASTM standards ensure global acceptance of test results for certification and research publications
                  </p>
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
            <h2 className="text-3xl font-bold text-center mb-4">Impedance Tube Solutions</h2>
            <p className="text-center text-muted-foreground mb-12">
              Complete systems including tubes, microphones, software, and calibration
            </p>

            {productsWithMedia.length > 0 ? (
              <ProductGrid products={productsWithMedia} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Contact us for detailed product specifications and quotations for impedance tube systems.
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
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact our acoustic testing specialists for expert consultation on impedance tube systems. 
              We provide complete turnkey solutions with installation, training, and local calibration support in Thailand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Request Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/guides">View Testing Guides</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
