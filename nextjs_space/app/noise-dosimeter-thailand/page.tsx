import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Award, Shield, Users, Clock, AlertTriangle, Phone, Mail, Zap } from 'lucide-react'
import { ProductGrid } from '@/components/product-grid'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'รู้จักเครื่องวัดเสียงสะสม Noise Dosimeter - Norsonic (นีโอนิคส์) | Placid Asia',
  description: 'คู่มือครบวงจรเครื่องวัดเสียงสะสม (Personal Noise Dosimeter) จาก Norsonic นีโอนิคส์ ยี่ห้อชั้นนำจากนอร์เวย์ เพื่อวัดระดับเสียงรบกวนที่พนักงานได้รับ ความปลอดภัยในการทำงาน (OSH) ราคาถูกที่สุดในไทย',
  keywords: [
    'เครื่องวัดเสียงสะสม',
    'noise dosimeter',
    'personal noise dosimeter',
    'noise dosimeter thailand',
    'เครื่องวัดเสียงสะสมไทย',
    'Norsonic dosimeter',
    'Norsonic นีโอนิคส์',
    'นีโอนิคส์ เครื่องวัดเสียง',
    'รู้จักเครื่องวัดเสียงสะสม',
    'วัดเสียงรบกวนพนักงาน',
    'ความปลอดภัยในการทำงาน',
    'occupational noise exposure',
    'OSH noise monitoring',
    'เครื่องวัดความดังสะสม',
    'Norsonic Nor143',
    'Norsonic Nor141',
    'วัดเสียง 24 ชั่วโมง',
    'เครื่องวัดเสียงบุคคล',
  ],
}

export default async function NoiseDosimeterThailand() {
  // Fetch Norsonic dosimeter products
  const products = await prisma.product.findMany({
    where: {
      active: true,
      OR: [
        { title_en: { contains: 'dosimeter', mode: 'insensitive' } },
        { title_en: { contains: 'Nor14', mode: 'insensitive' } },
        { sku: { contains: 'NOR14', mode: 'insensitive' } },
        { category: { contains: 'Dosimeter', mode: 'insensitive' } },
        { 
          AND: [
            { supplier: 'Norsonic' },
            { title_en: { contains: 'personal', mode: 'insensitive' } }
          ]
        },
      ],
    },
    take: 15,
  })

  const productsWithMedia = products.map((product) => ({
    ...product,
    images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
    pdfs: typeof product.pdfs === 'string' ? JSON.parse(product.pdfs) : product.pdfs,
  }))

  // FAQ Schema in Thai
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'เครื่องวัดเสียงสะสม (Noise Dosimeter) คืออะไร?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'เครื่องวัดเสียงสะสม (Personal Noise Dosimeter) เป็นอุปกรณ์ขนาดเล็กที่พนักงานสวมติดกับตัว เพื่อวัดระดับเสียงที่พนักงานได้รับตลอดวันทำงาน บันทึกข้อมูลได้ 24 ชั่วโมง ใช้ตรวจวัดความปลอดภัยในการทำงาน (OSH) เพื่อป้องกันความเสี่ยงหายต่อสุขภาพของพนักงาน',
        },
      },
      {
        '@type': 'Question',
        name: 'ทำไมต้องใช้เครื่องวัดเสียงสะสม?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'เครื่องวัดเสียงสะสมช่วยให้คุณเข้าใจระดับเสียงที่พนักงานได้รับจริง แตกต่างจากการวัดระดับเสียงทั่วไป (Sound Level Meter) เครื่อง Dosimeter ติดกับตัวพนักงานตลอดวัน บันทึกค่า Dose (ปริมาณเสียงสะสม) และความเสี่ยงหายที่เกิดขึ้นกับหูของพนักงาน ช่วยให้องค์กรปฏิบัติตามกฎหมายความปลอดภัยในการทำงาน',
        },
      },
      {
        '@type': 'Question',
        name: 'Norsonic (นีโอนิคส์) คือแบรนด์อะไร?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Norsonic (นีโอนิคส์) เป็นผู้ผลิตเครื่องมือวัดเสียงและการสั่นสะเทือนชั้นนำจากประเทศนอร์เวย์ มีประสบการณ์มากกว่า 50 ปี ในการผลิตอุปกรณ์วัดความดังของเสียงและการสั่ตสะเทือนคุณภาพสูง เครื่องวัดเสียงสะสมของ Norsonic มีความทนทาน แม่นยำสูง และใช้งานโดยองค์กรชั้นนำและสถาบันวิจัยทั่วโลก',
        },
      },
      {
        '@type': 'Question',
        name: 'เครื่องวัดเสียงสะสม Norsonic รุ่นไหนแนะนำ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'รุ่นยอดนิยมคือ Norsonic Nor143 (รุ่นมาตรฐาน) และ Norsonic Nor141 (รุ่นพื้นฐาน) ทั้งสองรุ่นมีความสามารถบันทึกได้ 24 ชั่วโมง ขนาดเล็ก น้ำหนักเบา มีหน้าจอแสดงผล ค่า Dose, LAeq, SEL, Peak ตั้งค่า Threshold และ Exchange Rate ได้ตามมาตรฐานต่างๆ ทั้ง ISO, OSHA, ACGIH',
        },
      },
      {
        '@type': 'Question',
        name: 'ราคาเครื่องวัดเสียงสะสมเท่าไหร่?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ราคาเครื่องวัดเสียงสะสม Norsonic เริ่มต้นประมาณ 80,000-150,000 บาท ขึ้นอยู่กับรุ่นและความสามารถ ราคานี้คุ้มค่าสำหรับองค์กรที่ต้องการความปลอดภัยในการทำงาน พร้อมรับประกันจากผู้ผลิต บริการหลังการขายในไทย และการสอบเทียบบำรุงรักษา',
        },
      },
      {
        '@type': 'Question',
        name: 'กฎหมายกำหนดว่าอย่างไร?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ตามกฎกระทรวงแรงงาน พ.ศ. 2561 กำหนดว่า ลูกจ้างจะต้องไม่ได้รับเสียงเกิน 85 dBA ต่อวัน 8 ชั่วโมงต่อเนื่อง นายจ้างต้องจัดให้ลูกจ้างมีอุปกรณ์ป้องกันหู ตรวจวัดสุขภาพ และจัดการพื้นที่ทำงาน การวัดด้วยเครื่องวัดเสียงสะสมช่วยให้องค์กรปฏิบัติตามกฎหมายได้',
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

      {/* Hero Section - Thai First */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">✓ Norsonic จากนอร์เวย์ | ✓ บริการหลังการขายครบวงจร | ✓ ราคาที่ดีที่สุด</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              รู้จักเครื่องวัดเสียงสะสม
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 font-light">
              Personal Noise Dosimeter จาก Norsonic (นีโอนิคส์)
            </h2>
            <p className="text-lg mb-4">
              เครื่องวัดระดับเสียงที่พนักงานได้รับตลอดวัน สำหรับความปลอดภัยในการทำงาน (OSH)
            </p>
            <p className="text-md mb-8 opacity-90">
              บันทึกได้ 24 ชั่วโมง | ราคาถูกที่สุดในไทย | พร้อมการสอบเทียบ
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link href="#products">ดูเครื่อง Dosimeter</Link>
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

      {/* What is Noise Dosimeter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">เครื่องวัดเสียงสะสมคืออะไร?</h2>
            <p className="text-center text-muted-foreground mb-12">
              ทำความเข้าใจการทำงานและหน้าที่ของเครื่องวัดเสียงสะสม
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2 text-accent" />
                    พนักงานสวมติดตัว
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    เครื่องขนาดเล็ก น้ำหนักเบา สวมติดกับตัวพนักงานได้ตลอดวัน ไม่รบกวนการทำงาน
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    บันทึก 24 ชั่วโมง
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    วัดและบันทึกข้อมูลได้ตลอดทั้งวัน ค่า Dose, LAeq, SEL, Peak เป็นต้น
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    ป้องกันความเสี่ยงหาย
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    ช่วยองค์กรปฏิบัติตามกฎหมาย OSH ป้องกันหูของพนักงาน
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-accent/5 border-accent">
              <CardHeader>
                <CardTitle className="text-xl">ส่วนประกอบของระบบ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      ไมโครโฟน
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      วัดระดับเสียงที่เข้าไปในหูของพนักงาน
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      หน่วยความจำ (Memory)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      บันทึกข้อมูลได้ตลอด 24 ชั่วโมงหลายวัน
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      หน้าจอแสดงผล
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      แสดงข้อมูลแบบกราฟ ค่า Dose, LAeq, SEL
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      Software วิเคราะห์
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ดาวน์โหลดข้อมูล สร้างรายงาน
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Norsonic */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">ทำไมต้องเลือก Norsonic (นีโอนิคส์)?</h2>
            <p className="text-center text-muted-foreground mb-12">
              เหตุผลที่ทำให้ Norsonic เป็นแบรนด์ชั้นนำ
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-6 h-6 mr-2 text-accent" />
                    แบรนด์ระดับโลก
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Norsonic จากนอร์เวย์ เป็นผู้ผลิตมากกว่า 50 ปี
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> ใช้งานโดยองค์กรชั้นนำทั่วโลก</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> มาตรฐาน IEC/ISO/ANSI</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> ความทนทานและความแม่นยำสูง</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-blue-600" />
                    ความสามารถครบครัน
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    ฟีเจอร์ครบครันที่ต้องการ
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> วัดค่าหลายพารามิเตอร์พร้อมกัน</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> รองรับมาตรฐาน ISO, OSHA, ACGIH</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Software วิเคราะห์ข้อมูลฟรี</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">เครื่องวัดเสียงสะสม Norsonic</h2>
            <p className="text-center text-muted-foreground mb-12">
              Personal Noise Dosimeter จากนอร์เวย์ คุณภาพสูง ราคาถูก
            </p>

            {productsWithMedia.length > 0 ? (
              <ProductGrid products={productsWithMedia} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    กรุณาติดต่อเราเพื่อขอข้อมูลและใบเสนอราคาเครื่องวัดเสียงสะสม
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

      {/* Applications */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">ใช้งานในอุตสาหกรรมใดบ้าง?</h2>
            <p className="text-center text-muted-foreground mb-12">
              เครื่องวัดเสียงสะสมเหมาะสำหรับทุกประเภทอุตสาหกรรม
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">โรงงานอุตสาหกรรม</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    วัดระดับเสียงที่พนักงานได้รับในโรงงานผลิต เครื่องจักร เครื่องกล
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">งานก่อสร้าง</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    ตรวจวัดเสียงรบกวนจากเครื่องจักรก่อสร้าง เครื่องตอกเสาเข็ม เครื่องเจาะ
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">สนามบิน</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    วัดระดับเสียงที่พนักงานภาคพื้นได้รับจากเครื่องบิน
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">เหมืองแร่</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    ติดตามระดับเสียงของคนงานที่ทำงานในพื้นที่เสี่ยง
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">งานบันเทิง</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    วัดระดับเสียงที่เจ้าหน้าที่คอนเสิร์ต ดีเจ ได้รับ
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">อุตสาหกรรมอื่นๆ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    โรงพยาบาล โรงแรม ห้างสรรพสินค้า คลังสินค้า
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* Legal Compliance */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-4">กฎหมายกำหนดว่าอย่างไร?</h3>
                <p className="mb-4 text-muted-foreground">
                  ตามกฎกระทรวงแรงงาน พ.ศ. 2561 กำหนดว่า:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>ลูกจ้างจะต้อง<strong>ไม่ได้รับเสียงเกิน 85 dBA</strong> ต่อวัน 8 ชั่วโมงต่อเนื่อง</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>นายจ้างต้อง<strong>จัดให้มีอุปกรณ์ป้องกันหู</strong> เมื่อเสียงเกิน 85 dBA</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>ต้องมีการ<strong>ตรวจวัดสุขภาพ</strong>ของลูกจ้างอย่างสม่ำเสมอ</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>ต้องมีการ<strong>จัดการพื้นที่ทำงาน</strong>ให้ปลอดภัย ลดเสียงรบกวน</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  การใช้เครื่องวัดเสียงสะสม (Noise Dosimeter) ช่วยให้องค์กรปฏิบัติตามกฎหมายได้อย่างถูกต้อง
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent/20 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">พร้อมที่จะซื้อเครื่องวัดเสียงสะสมแล้วหรือยัง?</h2>
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
              <Button size="lg" variant="outline" asChild>
                <Link href="/brands/norsonic">เรียนรู้เพิ่มเติมเกี่ยวกับ Norsonic</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}