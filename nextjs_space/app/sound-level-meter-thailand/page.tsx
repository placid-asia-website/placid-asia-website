import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Award, Shield, ThumbsUp, TrendingDown, Zap, Phone, Mail } from 'lucide-react'
import { ProductGrid } from '@/components/product-grid'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'เครื่องวัดระดับเสียง (Sound Level Meter) คุณภาพสูง ราคาถูก | Placid Asia',
  description: 'เครื่องวัดระดับเสียง Sound Level Meter คุณภาพสูง ราคาถูก Class 1 และ Class 2 จากยี่ห้อชั้นนำ Norsonic, Bedrock Elite พร้อมบริการหลังการขาย รับรองมาตรฐาน IEC 61672 ส่งฟรีทั่วไทย',
  keywords: [
    'เครื่องวัดระดับเสียง',
    'sound level meter คุณภาพสูง',
    'sound level meter ราคาถูก',
    'เครื่องวัดเสียง class 1',
    'เครื่องวัดเสียง class 2',
    'sound level meter thailand',
    'เครื่องวัดเสียงรบกวน',
    'ราคาเครื่องวัดเสียง',
    'เครื่องวัดระดับเสียงราคาถูก',
    'sound level meter ราคา',
    'Norsonic Thailand',
    'Bedrock Elite Thailand',
    'IEC 61672',
    'ขายเครื่องวัดเสียง',
    'เครื่องวัดเสียงมือสอง',
  ],
}

export default async function SoundLevelMeterThailand() {
  // Fetch relevant products
  const products = await prisma.product.findMany({
    where: {
      active: true,
      OR: [
        { category: { contains: 'Sound Level Meter', mode: 'insensitive' } },
        { title_en: { contains: 'sound level meter', mode: 'insensitive' } },
        { title_en: { contains: 'noise meter', mode: 'insensitive' } },
        { sku: { contains: 'NOR', mode: 'insensitive' } },
        { supplier: { in: ['Norsonic', 'Bedrock Elite', 'Convergence Instruments'] } },
      ],
    },
    take: 20,
  })

  const productsWithMedia = products.map((product) => ({
    ...product,
    images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
    pdfs: typeof product.pdfs === 'string' ? JSON.parse(product.pdfs) : product.pdfs,
  }))

  // Filter for Class 1 and Class 2 specifically
  const class1Products = productsWithMedia.filter(p => 
    p.title_en.toLowerCase().includes('class 1') || 
    p.title_en.toLowerCase().includes('nor150') ||
    p.title_en.toLowerCase().includes('nor145')
  )

  const class2Products = productsWithMedia.filter(p => 
    p.title_en.toLowerCase().includes('class 2') ||
    p.title_en.toLowerCase().includes('nor140')
  )

  // FAQ Schema in Thai
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'เครื่องวัดระดับเสียง (Sound Level Meter) คืออะไร?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'เครื่องวัดระดับเสียง (Sound Level Meter) คือ อุปกรณ์วัดความดังของเสียงในหน่วยเดซิเบล (dB) ใช้ตรวจวัดระดับเสียงรบกวนในโรงงาน สำนักงาน ชุมชน และสภาพแวดล้อม เครื่องวัดเสียงมีหลายระดับคุณภาพ ได้แก่ Class 1 (ความแม่นยำสูงสุด) และ Class 2 (มาตรฐานทั่วไป) ตามมาตรฐาน IEC 61672',
        },
      },
      {
        '@type': 'Question',
        name: 'เครื่องวัดเสียง Class 1 และ Class 2 ต่างกันอย่างไร?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Class 1 มีความแม่นยำสูงกว่า (ความคลาดเคลื่อน ±1.0 dB) เหมาะสำหรับงานวิจัย การตรวจวัดอย่างเป็นทางการ และงานที่ต้องการความแม่นยำสูง Class 2 มีความแม่นยำปานกลาง (ความคลาดเคลื่อน ±1.5 dB) เหมาะสำหรับงานทั่วไป การตรวจสอบเบื้องต้น และงานที่ไม่ต้องการความแม่นยำสูงมาก ราคาของ Class 2 จะถูกกว่า Class 1',
        },
      },
      {
        '@type': 'Question',
        name: 'ราคาเครื่องวัดระดับเสียงอยู่ที่เท่าไหร่?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ราคาเครื่องวัดเสียงขึ้นอยู่กับคุณภาพและฟีเจอร์ เครื่อง Class 2 เริ่มต้นที่ประมาณ 30,000-80,000 บาท เครื่อง Class 1 อยู่ที่ประมาณ 100,000-300,000 บาท สำหรับรุ่นที่มีความสามารถครบครัน กรุณาติดต่อเราเพื่อขอใบเสนอราคาที่เหมาะสมกับงบประมาณของคุณ',
        },
      },
      {
        '@type': 'Question',
        name: 'ซื้อเครื่องวัดเสียงที่ไหนดี?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Placid Asia เป็นตัวแทนจำหน่ายเครื่องวัดระดับเสียงจากยี่ห้อชั้นนำ Norsonic และ Bedrock Elite พร้อมบริการหลังการขายในประเทศไทย รับประกันสินค้าแท้ มีใบรับรองการสอบเทียบ (Calibration Certificate) บริการซ่อมบำรุง และการฝึกอบรมการใช้งาน',
        },
      },
      {
        '@type': 'Question',
        name: 'ต้องสอบเทียบเครื่องวัดเสียงบ่อยแค่ไหน?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'แนะนำให้สอบเทียบเครื่องวัดเสียงอย่างน้อยปีละ 1 ครั้ง หรือตามข้อกำหนดของมาตรฐานที่เกี่ยวข้อง การสอบเทียบจะช่วยรับรองความแม่นยำของการวัด เรามีบริการสอบเทียบภายในประเทศไทย ไม่ต้องส่งต่างประเทศ ประหยัดเวลาและค่าใช้จ่าย',
        },
      },
      {
        '@type': 'Question',
        name: 'Norsonic และ Bedrock Elite ยี่ห้อไหนดีกว่ากัน?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Norsonic เป็นแบรนด์ระดับโลกจากนอร์เวย์ มีความแม่นยำสูง ฟีเจอร์ครบครัน เหมาะสำหรับงานวิจัยและงานมืออาชีพ Bedrock Elite เป็นแบรนด์จากจีน มีคุณภาพดี ราคาประหยัดกว่า เหมาะสำหรับงานทั่วไปและองค์กรที่มีงบประมาณจำกัด ทั้งสองยี่ห้อได้มาตรฐาน IEC 61672',
        },
      },
    ],
  }

  // Product Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: productsWithMedia.slice(0, 10).map((product, index) => ({
      '@type': 'Product',
      position: index + 1,
      name: product.title_th || product.title_en,
      description: product.description_th || product.description_en,
      image: (product.images as string[])[0] || '/og-image.png',
      brand: {
        '@type': 'Brand',
        name: product.supplier || 'Placid Asia',
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'THB',
        seller: {
          '@type': 'Organization',
          name: 'Placid Asia',
        },
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero Section - Thai First */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">✓ รับประกันของแท้ | ✓ ส่งฟรีทั่วไทย | ✓ บริการหลังการขาย</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              เครื่องวัดระดับเสียง คุณภาพสูง ราคาถูก
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 font-light">
              Sound Level Meter มาตรฐาน IEC 61672 Class 1 & Class 2
            </h2>
            <p className="text-lg mb-4">
              จำหน่ายเครื่องวัดเสียงรบกวนจากยี่ห้อชั้นนำ <strong>Norsonic</strong> และ <strong>Bedrock Elite</strong>
            </p>
            <p className="text-md mb-8 opacity-90">
              พร้อมใบรับรองการสอบเทียบ (Calibration Certificate) | บริการซ่อมบำรุง | การฝึกอบรม
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link href="#products">ดูเครื่องวัดเสียงทั้งหมด</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
                <Link href="/contact">ขอใบเสนอราคา</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
                <a href="tel:+66819641982">โทร 081-964-1982</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Thai Focus */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">ทำไมต้องซื้อเครื่องวัดเสียงกับ Placid Asia?</h2>
            <p className="text-center text-muted-foreground mb-12">
              เราไม่ได้ขายแค่เครื่อง แต่ให้บริการครบวงจร
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingDown className="w-5 h-5 mr-2 text-green-600" />
                    ราคาถูก คุ้มค่า
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    เราเป็นตัวแทนจำหน่ายโดยตรงจากผู้ผลิต ราคาดีที่สุด ไม่มีนายหน้า ไม่มีค่าคอมมิชชั่นแอบแฝง
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> ราคาพิเศษสำหรับองค์กรรัฐ/เอกชน</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> ส่งฟรีทั่วประเทศไทย</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> ผ่อนชำระได้ (สำหรับนิติบุคคล)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Award className="w-5 h-5 mr-2 text-accent" />
                    คุณภาพสูง มาตรฐานสากล
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    เครื่องทุกเครื่องผ่านการรับรองมาตรฐาน IEC 61672 Class 1 และ Class 2 พร้อมใบ Calibration Certificate
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> รับประกันของแท้ 100%</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> ใบรับรองการสอบเทียบจากโรงงาน</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> ตรวจสอบความถูกต้องได้</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    บริการหลังการขายในไทย
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    ทีมช่างผู้เชี่ยวชาญพร้อมให้บริการทั่วประเทศไทย ไม่ต้องส่งซ่อมต่างประเทศ
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> สอบเทียบในไทย ประหยัดเวลา</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> ซ่อมบำรุงโดยทีมมืออาชีพ</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> ฝึกอบรมการใช้งานฟรี</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Class 1 vs Class 2 Comparison */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">เลือกเครื่องวัดเสียงแบบไหนดี?</h2>
            <p className="text-center text-muted-foreground mb-12">
              เปรียบเทียบ Class 1 และ Class 2 ให้เหมาะกับงานของคุณ
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-accent">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-accent">แนะนำสำหรับมืออาชีพ</Badge>
                  <CardTitle className="text-2xl">เครื่องวัดเสียง Class 1</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">ความแม่นยำสูงสุด ±1.0 dB</h4>
                    <p className="text-sm text-muted-foreground">เหมาะสำหรับงานที่ต้องการความแม่นยำระดับมืออาชีพ</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">งานที่เหมาะสม:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> งานวิจัยและพัฒนา (R&D)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> การตรวจวัดตามกฎหมาย</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> EIA (การประเมินผลกระทบสิ่งแวดล้อม)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Building Acoustics (ISO 16283)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> งานที่ต้องใช้ในศาล</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">ตัวอย่างรุ่นยอดนิยม:</h4>
                    <p className="text-sm">Norsonic Nor150, Nor145 | Bedrock Elite I9</p>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="#class1-products">ดูเครื่อง Class 1</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-blue-600">ประหยัด คุ้มค่า</Badge>
                  <CardTitle className="text-2xl">เครื่องวัดเสียง Class 2</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">ความแม่นยำมาตรฐาน ±1.5 dB</h4>
                    <p className="text-sm text-muted-foreground">เหมาะสำหรับงานทั่วไปและการตรวจสอบเบื้องต้น ราคาประหยัด</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">งานที่เหมาะสม:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-600" /> การตรวจสอบเสียงรบกวนในโรงงาน</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-600" /> ความปลอดภัยในการทำงาน (OSH)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-600" /> งานสำรวจเบื้องต้น</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-600" /> การตรวจสอบภายในองค์กร</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-600" /> โครงการที่มีงบประมาณจำกัด</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">ตัวอย่างรุ่นยอดนิยม:</h4>
                    <p className="text-sm">Norsonic Nor140 | Bedrock Elite BTB65</p>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#class2-products">ดูเครื่อง Class 2</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Class 1 Products */}
      {class1Products.length > 0 && (
        <section id="class1-products" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">เครื่องวัดเสียง Class 1 (ความแม่นยำสูงสุด)</h2>
              <p className="text-center text-muted-foreground mb-12">
                สำหรับงานมืออาชีพ งานวิจัย และงานตามกฎหมาย
              </p>
              <ProductGrid products={class1Products} />
            </div>
          </div>
        </section>
      )}

      {/* Class 2 Products */}
      {class2Products.length > 0 && (
        <section id="class2-products" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">เครื่องวัดเสียง Class 2 (ราคาประหยัด)</h2>
              <p className="text-center text-muted-foreground mb-12">
                คุณภาพดี ราคาถูก เหมาะสำหรับงานทั่วไป
              </p>
              <ProductGrid products={class2Products} />
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">เครื่องวัดระดับเสียงทั้งหมด</h2>
            <p className="text-center text-muted-foreground mb-12">
              Sound Level Meter จากยี่ห้อชั้นนำ มีให้เลือกหลากหลาย
            </p>

            {productsWithMedia.length > 0 ? (
              <ProductGrid products={productsWithMedia} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    กรุณาติดต่อเราเพื่อขอข้อมูลและใบเสนอราคาเครื่องวัดระดับเสียง
                  </p>
                  <Button asChild>
                    <Link href="/contact">ติดต่อเรา</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">แบรนด์เครื่องวัดเสียงที่เราจำหน่าย</h2>
            <p className="text-center text-muted-foreground mb-12">
              ตัวแทนจำหน่ายอย่างเป็นทางการในประเทศไทย
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-6 h-6 mr-2 text-accent" />
                    Norsonic (นอร์เวย์)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    แบรนด์ชั้นนำระดับโลกจากประเทศนอร์เวย์ มีชื่อเสียงด้านความแม่นยำและความทนทาน ใช้งานโดยสถาบันวิจัยและองค์กรชั้นนำทั่วโลก
                  </p>
                  <ul className="text-sm space-y-1 mb-4">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Norsonic Nor150 (รุ่นท็อป Class 1)</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Norsonic Nor145 (Class 1 ฟีเจอร์ครบ)</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Norsonic Nor140 (Class 2 ประหยัด)</li>
                  </ul>
                  <Button asChild variant="outline">
                    <Link href="/brands/norsonic">ดูผลิตภัณฑ์ Norsonic</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="w-6 h-6 mr-2 text-blue-600" />
                    Bedrock Elite (จีน)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    แบรนด์คุณภาพจากประเทศจีน ผ่านมาตรฐาน IEC 61672 ราคาประหยัดกว่า แต่คุณภาพไม่ด้อยกว่า เหมาะสำหรับองค์กรที่ต้องการเครื่องวัดเสียงหลายเครื่อง
                  </p>
                  <ul className="text-sm space-y-1 mb-4">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Bedrock I9 (Class 1 ราคาดี)</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Bedrock BTB65 (Class 2 + Talkback)</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Bedrock BTB115 (Class 1 บันทึกเสียง)</li>
                  </ul>
                  <Button asChild variant="outline">
                    <Link href="/brands/bedrock-elite">ดูผลิตภัณฑ์ Bedrock Elite</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Thai */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">คำถามที่พบบ่อย (FAQ)</h2>
            <p className="text-center text-muted-foreground mb-12">
              คำตอบสำหรับคำถามที่ลูกค้ามักจะถาม
            </p>

            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.acceptedAnswer.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent/20 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">พร้อมที่จะซื้อเครื่องวัดเสียงแล้วหรือยัง?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              ติดต่อเราวันนี้เพื่อรับคำปรึกษาจากผู้เชี่ยวชาญ และใบเสนอราคาพิเศษ<br />
              <strong>โทร: 081-964-1982</strong> | <strong>อีเมล: info@placid.asia</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link href="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  ส่งข้อความถึงเรา
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+66819641982">
                  <Phone className="w-5 h-5 mr-2" />
                  โทรเลย 081-964-1982
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">ดูสินค้าทั้งหมด</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
