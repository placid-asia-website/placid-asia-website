
"use client"

import { useLanguage } from '@/lib/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, Target, Users, Lightbulb, Award, Globe } from 'lucide-react'

export default function AboutPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: 'About Placid Asia',
      subtitle: 'Your Trusted Partner in Professional Acoustic Solutions',
      intro: 'Placid Asia is a leading supplier of professional acoustic measurement equipment and software solutions across the Asia Pacific region. We specialize in providing cutting-edge tools for sound measurement, vibration analysis, and acoustic testing.',
      mission: {
        title: 'Our Mission',
        description: 'To empower professionals with the most advanced and reliable acoustic measurement solutions, enabling them to make informed decisions and maintain the highest standards in their industries.'
      },
      vision: {
        title: 'Our Vision',
        description: 'To be the most trusted partner for acoustic solutions in Asia, recognized for our expertise, innovation, and commitment to customer success.'
      },
      values: {
        title: 'Our Core Values',
        items: [
          {
            icon: 'excellence',
            title: 'Excellence',
            description: 'We are committed to delivering only the highest quality products and services to our customers.'
          },
          {
            icon: 'innovation',
            title: 'Innovation',
            description: 'We continuously seek innovative solutions to meet the evolving needs of our clients.'
          },
          {
            icon: 'integrity',
            title: 'Integrity',
            description: 'We conduct our business with honesty, transparency, and ethical practices.'
          },
          {
            icon: 'support',
            title: 'Customer Support',
            description: 'We provide exceptional technical support and customer service to ensure your success.'
          }
        ]
      },
      expertise: {
        title: 'Our Expertise',
        description: 'With years of experience in the acoustic measurement industry, we have built strong partnerships with leading manufacturers including Norsonic, Sound Technology, and other world-class brands. Our team of experts provides comprehensive technical support, training, and consultation services.',
        areas: [
          'Acoustic Measurement Equipment',
          'Vibration Analysis Tools',
          'Sound Testing Solutions',
          'Environmental Monitoring',
          'Industrial Noise Control',
          'Building Acoustics'
        ]
      },
      industries: {
        title: 'Industries We Serve',
        list: [
          'Construction & Engineering',
          'Environmental Consulting',
          'Manufacturing & Industrial',
          'Research & Development',
          'Government & Regulatory Bodies',
          'Education & Training'
        ]
      },
      commitment: {
        title: 'Our Commitment',
        description: 'We are dedicated to helping our clients achieve their acoustic measurement goals through:',
        points: [
          'Premium quality products from trusted global brands',
          'Expert technical support and consultation',
          'Comprehensive training programs',
          'Competitive pricing and flexible solutions',
          'After-sales service and calibration support',
          'Regular updates on latest industry developments'
        ]
      },
      cta: {
        title: 'Partner with Us',
        description: 'Ready to elevate your acoustic measurement capabilities? Contact us today to discuss your requirements.',
        button: 'Contact Us'
      }
    },
    th: {
      title: 'เกี่ยวกับ Placid Asia',
      subtitle: 'พันธมิตรที่เชื่อถือได้ในโซลูชันอะคูสติกระดับมืออาชีพ',
      intro: 'Placid Asia เป็นผู้จัดจำหน่ายชั้นนำของอุปกรณ์วัดเสียงและซอฟต์แวร์ระดับมืออาชีพในภูมิภาคเอเชียแปซิฟิก เราเชี่ยวชาญในการจัดหาเครื่องมือที่ทันสมัยสำหรับการวัดเสียง การวิเคราะห์การสั่นสะเทือน และการทดสอบอะคูสติก',
      mission: {
        title: 'พันธกิจของเรา',
        description: 'เพื่อเสริมพลังให้ผู้เชี่ยวชาญด้วยโซลูชันการวัดเสียงที่ทันสมัยและเชื่อถือได้ที่สุด ช่วยให้พวกเขาสามารถตัดสินใจอย่างมีข้อมูลและรักษามาตรฐานสูงสุดในอุตสาหกรรมของตน'
      },
      vision: {
        title: 'วิสัยทัศน์ของเรา',
        description: 'เป็นพันธมิตรที่เชื่อถือได้มากที่สุดสำหรับโซลูชันอะคูสติกในเอเชีย ได้รับการยอมรับในด้านความเชี่ยวชาญ นวัตกรรม และความมุ่งมั่นต่อความสำเร็จของลูกค้า'
      },
      values: {
        title: 'คุณค่าหลักของเรา',
        items: [
          {
            icon: 'excellence',
            title: 'ความเป็นเลิศ',
            description: 'เรามุ่งมั่นที่จะส่งมอบผลิตภัณฑ์และบริการที่มีคุณภาพสูงสุดแก่ลูกค้าของเรา'
          },
          {
            icon: 'innovation',
            title: 'นวัตกรรม',
            description: 'เราแสวงหาโซลูชันที่สร้างสรรค์อย่างต่อเนื่องเพื่อตอบสนองความต้องการที่เปลี่ยนแปลงของลูกค้า'
          },
          {
            icon: 'integrity',
            title: 'ความซื่อสัตย์',
            description: 'เราดำเนินธุรกิจด้วยความซื่อสัตย์ โปร่งใส และมีจริยธรรม'
          },
          {
            icon: 'support',
            title: 'การสนับสนุนลูกค้า',
            description: 'เรามีการสนับสนุนทางเทคนิคและบริการลูกค้าที่ยอดเยี่ยมเพื่อให้แน่ใจว่าคุณจะประสบความสำเร็จ'
          }
        ]
      },
      expertise: {
        title: 'ความเชี่ยวชาญของเรา',
        description: 'ด้วยประสบการณ์หลายปีในอุตสาหกรรมการวัดเสียง เราได้สร้างความร่วมมือที่แข็งแกร่งกับผู้ผลิตชั้นนำรวมถึง Norsonic, Sound Technology และแบรนด์ระดับโลกอื่นๆ ทีมผู้เชี่ยวชาญของเราให้บริการสนับสนุนทางเทคนิค การฝึกอบรม และบริการให้คำปรึกษาอย่างครอบคลุม',
        areas: [
          'อุปกรณ์วัดเสียง',
          'เครื่องมือวิเคราะห์การสั่นสะเทือน',
          'โซลูชันการทดสอบเสียง',
          'การตรวจสอบสิ่งแวดล้อม',
          'การควบคุมเสียงในอุตสาหกรรม',
          'อะคูสติกในอาคาร'
        ]
      },
      industries: {
        title: 'อุตสาหกรรมที่เราให้บริการ',
        list: [
          'ก่อสร้างและวิศวกรรม',
          'ที่ปรึกษาด้านสิ่งแวดล้อม',
          'การผลิตและอุตสาหกรรม',
          'วิจัยและพัฒนา',
          'หน่วยงานรัฐและกำกับดูแล',
          'การศึกษาและฝึกอบรม'
        ]
      },
      commitment: {
        title: 'ความมุ่งมั่นของเรา',
        description: 'เรามุ่งมั่นที่จะช่วยให้ลูกค้าของเราบรรลุเป้าหมายการวัดเสียงผ่าน:',
        points: [
          'ผลิตภัณฑ์คุณภาพพรีเมียมจากแบรนด์ระดับโลกที่เชื่อถือได้',
          'การสนับสนุนทางเทคนิคและให้คำปรึกษาจากผู้เชี่ยวชาญ',
          'โปรแกรมการฝึกอบรมที่ครอบคลุม',
          'ราคาที่แข่งขันได้และโซลูชันที่ยืดหยุ่น',
          'บริการหลังการขายและการสนับสนุนการสอบเทียบ',
          'การอัพเดทเกี่ยวกับการพัฒนาล่าสุดในอุตสาหกรรมอย่างสม่ำเสมอ'
        ]
      },
      cta: {
        title: 'ร่วมงานกับเรา',
        description: 'พร้อมที่จะยกระดับความสามารถในการวัดเสียงของคุณแล้วหรือยัง? ติดต่อเราวันนี้เพื่อหารือเกี่ยวกับความต้องการของคุณ',
        button: 'ติดต่อเรา'
      }
    }
  }

  const currentContent = content[language as 'en' | 'th'] || content.en

  const iconComponents = {
    excellence: Award,
    innovation: Lightbulb,
    integrity: CheckCircle2,
    support: Users
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 highlight-yellow">
              {currentContent.title}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90">
              {currentContent.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              {currentContent.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-accent" />
                  <h2 className="text-2xl font-bold text-primary">
                    {currentContent.mission.title}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {currentContent.mission.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-8 w-8 text-accent" />
                  <h2 className="text-2xl font-bold text-primary">
                    {currentContent.vision.title}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {currentContent.vision.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {currentContent.values.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentContent.values.items.map((value, index) => {
              const IconComponent = iconComponents[value.icon as keyof typeof iconComponents]
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 hover:border-accent">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                      <IconComponent className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-primary">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">
              {currentContent.expertise.title}
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              {currentContent.expertise.description}
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentContent.expertise.areas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-background p-4 rounded-lg border-l-4 border-accent"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
              {currentContent.industries.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {currentContent.industries.list.map((industry, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="font-medium">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">
              {currentContent.commitment.title}
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              {currentContent.commitment.description}
            </p>
            <div className="space-y-3">
              {currentContent.commitment.points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-background p-4 rounded-lg border-l-4 border-accent"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {currentContent.cta.title}
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              {currentContent.cta.description}
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link href="/contact">{currentContent.cta.button}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
