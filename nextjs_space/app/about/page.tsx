
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
      demos: {
        title: 'Product Demonstrations & Hands-On Experience',
        description: 'Experience our acoustic measurement solutions firsthand. We offer comprehensive product demonstrations to help you make informed decisions about the right equipment for your needs.',
        services: [
          {
            title: 'On-Site Product Demonstrations',
            description: 'Our technical experts bring equipment directly to your facility for hands-on evaluation.',
            features: [
              'Test equipment in your actual working environment',
              'Compare multiple models side-by-side',
              'Demonstrate specific measurement scenarios',
              'No-obligation trial period available',
              'Custom application testing'
            ]
          },
          {
            title: 'Virtual Product Consultations',
            description: 'Connect with our experts remotely for detailed product walkthroughs and technical guidance.',
            features: [
              'Live online demonstrations via video call',
              'Screen sharing for software features',
              'Technical specification review',
              'Application suitability assessment',
              'Flexible scheduling for your convenience'
            ]
          }
        ]
      },
      qualifications: {
        title: 'Team Expertise & Qualifications',
        description: 'Our team consists of highly qualified acoustic engineers and measurement specialists with extensive industry experience and professional certifications.',
        areas: [
          {
            title: 'Acoustic Engineering',
            description: 'Degree-qualified acoustic engineers with 10+ years of practical experience in industrial, environmental, and building acoustics.'
          },
          {
            title: 'Technical Training',
            description: 'Factory-certified by leading manufacturers including Norsonic, Sound Technology, and other global acoustic brands.'
          },
          {
            title: 'Measurement Standards',
            description: 'Expert knowledge of ISO, IEC, ANSI, and Thai regulatory standards for acoustic measurement and testing.'
          }
        ],
        certifications: {
          title: 'Professional Certifications & Standards',
          list: [
            'ISO 16283 Building Acoustics',
            'IEC 61672 Sound Level Meters',
            'ISO 9612 Occupational Noise',
            'ISO 3382 Room Acoustics',
            'ISO 1996 Environmental Noise',
            'NVLAP Calibration Standards',
            'Thai Ministry of Industry Compliance',
            'Occupational Safety Certification'
          ]
        }
      },
      delivery: {
        title: 'Fast Delivery from Bangkok',
        description: 'With our Bangkok headquarters and efficient logistics network, we ensure prompt delivery of equipment throughout Thailand and the Asia Pacific region.',
        features: [
          {
            value: '1-2',
            title: 'Days to Bangkok',
            description: 'Express delivery within Bangkok metropolitan area'
          },
          {
            value: '2-3',
            title: 'Days Nationwide',
            description: 'Fast shipping to all provinces across Thailand'
          },
          {
            value: '3-7',
            title: 'Days Regional',
            description: 'International delivery to Asia Pacific countries'
          }
        ],
        coverage: {
          title: 'Delivery Coverage',
          regions: [
            'Bangkok & Surrounding Areas',
            'Central Thailand',
            'Northern Thailand',
            'Northeastern Thailand (Isaan)',
            'Southern Thailand',
            'Eastern Seaboard',
            'Singapore, Malaysia, Vietnam',
            'Indonesia, Philippines, Myanmar'
          ]
        }
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
      demos: {
        title: 'การสาธิตผลิตภัณฑ์และประสบการณ์แบบเห็นจริง',
        description: 'สัมผัสโซลูชันการวัดเสียงของเราด้วยตนเอง เราเสนอการสาธิตผลิตภัณฑ์อย่างครอบคลุมเพื่อช่วยให้คุณตัดสินใจเลือกอุปกรณ์ที่เหมาะสมกับความต้องการของคุณ',
        services: [
          {
            title: 'การสาธิตผลิตภัณฑ์ในสถานที่',
            description: 'ผู้เชี่ยวชาญทางเทคนิคของเรานำอุปกรณ์ไปยังสถานที่ของคุณโดยตรงเพื่อการประเมินแบบเห็นจริง',
            features: [
              'ทดสอบอุปกรณ์ในสภาพแวดล้อมการทำงานจริงของคุณ',
              'เปรียบเทียบหลายรุ่นแบบเคียงข้าง',
              'สาธิตสถานการณ์การวัดเฉพาะ',
              'มีช่วงทดลองใช้โดยไม่มีภาระผูกพัน',
              'การทดสอบตามการใช้งานแบบกำหนดเอง'
            ]
          },
          {
            title: 'การให้คำปรึกษาผลิตภัณฑ์แบบเสมือนจริง',
            description: 'เชื่อมต่อกับผู้เชี่ยวชาญของเราจากระยะไกลสำหรับการแนะนำผลิตภัณฑ์โดยละเอียดและคำแนะนำทางเทคนิค',
            features: [
              'การสาธิตสดออนไลน์ผ่านวิดีโอคอล',
              'การแชร์หน้าจอสำหรับฟีเจอร์ซอฟต์แวร์',
              'การทบทวนข้อมูลจำเพาะทางเทคนิค',
              'การประเมินความเหมาะสมของการใช้งาน',
              'ตารางเวลาที่ยืดหยุ่นตามความสะดวกของคุณ'
            ]
          }
        ]
      },
      qualifications: {
        title: 'ความเชี่ยวชาญและคุณสมบัติของทีมงาน',
        description: 'ทีมงานของเราประกอบด้วยวิศวกรเสียงและผู้เชี่ยวชาญด้านการวัดที่มีคุณสมบัติสูงพร้อมประสบการณ์ในอุตสาหกรรมอย่างกว้างขวางและการรับรองระดับมืออาชีพ',
        areas: [
          {
            title: 'วิศวกรรมอะคูสติก',
            description: 'วิศวกรเสียงที่มีวุฒิการศึกษาพร้อมประสบการณ์จริง 10+ ปีในด้านอะคูสติกอุตสาหกรรม สิ่งแวดล้อม และอาคาร'
          },
          {
            title: 'การฝึกอบรมทางเทคนิค',
            description: 'ได้รับการรับรองจากโรงงานโดยผู้ผลิตชั้นนำรวมถึง Norsonic, Sound Technology และแบรนด์เสียงระดับโลกอื่นๆ'
          },
          {
            title: 'มาตรฐานการวัด',
            description: 'ความรู้ผู้เชี่ยวชาญในมาตรฐาน ISO, IEC, ANSI และข้อกำหนดของไทยสำหรับการวัดและทดสอบเสียง'
          }
        ],
        certifications: {
          title: 'การรับรองและมาตรฐานระดับมืออาชีพ',
          list: [
            'ISO 16283 อะคูสติกอาคาร',
            'IEC 61672 เครื่องวัดระดับเสียง',
            'ISO 9612 เสียงรบกวนในการทำงาน',
            'ISO 3382 อะคูสติกห้อง',
            'ISO 1996 เสียงรบกวนสิ่งแวดล้อม',
            'มาตรฐานการสอบเทียบ NVLAP',
            'การปฏิบัติตามกระทรวงอุตสาหกรรมไทย',
            'การรับรองความปลอดภัยในการทำงาน'
          ]
        }
      },
      delivery: {
        title: 'จัดส่งเร็วจากกรุงเทพฯ',
        description: 'ด้วยสำนักงานใหญ่ในกรุงเทพฯและเครือข่ายโลจิสติกส์ที่มีประสิทธิภาพ เรารับประกันการจัดส่งอุปกรณ์ที่รวดเร็วทั่วประเทศไทยและภูมิภาคเอเชียแปซิฟิก',
        features: [
          {
            value: '1-2',
            title: 'วันถึงกรุงเทพฯ',
            description: 'จัดส่งด่วนภายในพื้นที่กรุงเทพมหานคร'
          },
          {
            value: '2-3',
            title: 'วันทั่วประเทศ',
            description: 'จัดส่งเร็วไปทุกจังหวัดทั่วประเทศไทย'
          },
          {
            value: '3-7',
            title: 'วันในภูมิภาค',
            description: 'จัดส่งระหว่างประเทศไปยังประเทศในเอเชียแปซิฟิก'
          }
        ],
        coverage: {
          title: 'พื้นที่การจัดส่ง',
          regions: [
            'กรุงเทพฯและพื้นที่ใกล้เคียง',
            'ภาคกลาง',
            'ภาคเหนือ',
            'ภาคตะวันออกเฉียงเหนือ (อีสาน)',
            'ภาคใต้',
            'ชายฝั่งตะวันออก',
            'สิงคโปร์ มาเลเซีย เวียดนาม',
            'อินโดนีเซีย ฟิลิปปินส์ เมียนมาร์'
          ]
        }
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

      {/* Product Demos */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">
              {currentContent.demos.title}
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg max-w-3xl mx-auto">
              {currentContent.demos.description}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {currentContent.demos.services.map((service, index) => (
                <Card key={index} className="border-2 hover:border-accent transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-primary">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Qualifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">
              {currentContent.qualifications.title}
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg max-w-3xl mx-auto">
              {currentContent.qualifications.description}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {currentContent.qualifications.areas.map((area, index) => (
                <Card key={index} className="border-2 hover:border-accent transition-all hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      {area.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 bg-gradient-to-r from-accent/5 to-accent/10 rounded-xl p-8 border-2 border-accent/20">
              <h3 className="text-xl font-semibold mb-4 text-center text-primary">
                {currentContent.qualifications.certifications.title}
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {currentContent.qualifications.certifications.list.map((cert, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-background rounded-lg p-4 shadow-sm">
                      <p className="font-medium text-primary">{cert}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fast Delivery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">
              {currentContent.delivery.title}
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              {currentContent.delivery.description}
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {currentContent.delivery.features.map((feature, index) => (
                <Card key={index} className="text-center border-2 hover:border-accent transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-accent mb-2">
                      {feature.value}
                    </div>
                    <h3 className="font-semibold mb-2 text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-center text-primary">
                  {currentContent.delivery.coverage.title}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentContent.delivery.coverage.regions.map((region, index) => (
                    <div key={index} className="flex items-center gap-3 bg-background/50 p-3 rounded-lg">
                      <Globe className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="font-medium">{region}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
              {currentContent.industries.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {currentContent.industries.list.map((industry, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-background p-4 rounded-lg hover:bg-accent/10 transition-colors"
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
