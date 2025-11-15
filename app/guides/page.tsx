
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { BookOpen, Clock, User } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buyer Guides | Placid Asia',
  description: 'Expert buyer guides to help you choose the right acoustic, noise, and vibration measurement equipment for your needs.',
  keywords: 'buyer guide, acoustic equipment guide, noise monitoring guide, vibration testing guide, how to choose',
};

// Guide data
const guides = [
  {
    slug: 'building-acoustics-testing-kit',
    title: 'Building Acoustics Testing Kit - Complete Buyer Guide',
    title_th: 'คู่มือการเลือกซื้อชุดทดสอบอะคูสติกอาคาร',
    description: 'Complete guide to selecting the right equipment for building acoustics measurements including sound insulation, reverberation time, and room acoustics testing.',
    description_th: 'คู่มือฉบับสมบูรณ์สำหรับการเลือกอุปกรณ์ที่เหมาะสมสำหรับการวัดอะคูสติกอาคาร รวมถึงการทดสอบฉนวนกันเสียง เวลาสะท้อน และการทดสอบอะคูสติกห้อง',
    readTime: '10 min read',
    level: 'Intermediate',
    category: 'Building Acoustics',
    image: '/guides/building-acoustics.jpg',
  },
  {
    slug: 'noise-monitoring-system',
    title: 'Noise Monitoring System - Comprehensive Selection Guide',
    title_th: 'คู่มือการเลือกระบบตรวจสอบเสียงรบกวน',
    description: 'Learn how to choose the right noise monitoring equipment for environmental compliance, construction sites, and industrial applications.',
    description_th: 'เรียนรู้วิธีเลือกอุปกรณ์ตรวจสอบเสียงรบกวนที่เหมาะสมสำหรับการปฏิบัติตามสิ่งแวดล้อม ไซต์ก่อสร้าง และการใช้งานในอุตสาหกรรม',
    readTime: '12 min read',
    level: 'Beginner to Intermediate',
    category: 'Environmental Monitoring',
    image: '/guides/noise-monitoring.jpg',
  },
  {
    slug: 'vibration-measurement-equipment',
    title: 'Vibration Measurement Equipment - Expert Buyer Guide',
    title_th: 'คู่มือการเลือกซื้ออุปกรณ์วัดการสั่นสะเทือน',
    description: 'Detailed guide to selecting vibration measurement equipment for modal analysis, condition monitoring, and structural testing.',
    description_th: 'คู่มือรายละเอียดสำหรับการเลือกอุปกรณ์วัดการสั่นสะเทือนสำหรับการวิเคราะห์โมดอล การตรวจสอบสภาพ และการทดสอบโครงสร้าง',
    readTime: '15 min read',
    level: 'Intermediate to Advanced',
    category: 'Vibration Analysis',
    image: '/guides/vibration-testing.jpg',
  },
  {
    slug: 'sound-level-meter-selection',
    title: 'Sound Level Meter Selection - Complete Guide',
    title_th: 'คู่มือการเลือกเครื่องวัดระดับเสียง',
    description: 'Everything you need to know about choosing the right sound level meter for your application, from basic to precision class instruments.',
    description_th: 'ทุกสิ่งที่คุณต้องรู้เกี่ยวกับการเลือกเครื่องวัดระดับเสียงที่เหมาะสมสำหรับการใช้งานของคุณ ตั้งแต่เครื่องมือระดับพื้นฐานไปจนถึงความแม่นยำสูง',
    readTime: '8 min read',
    level: 'Beginner',
    category: 'Sound Measurement',
    image: '/guides/sound-level-meter.jpg',
  },
  {
    slug: 'acoustic-camera-systems',
    title: 'Acoustic Camera Systems - Buying Guide',
    title_th: 'คู่มือการซื้อระบบกล้องอะคูสติก',
    description: 'Guide to selecting acoustic imaging systems for sound source localization, NVH testing, and product development.',
    description_th: 'คู่มือการเลือกระบบภาพอะคูสติกสำหรับการระบุตำแหน่งแหล่งกำเนิดเสียง การทดสอบ NVH และการพัฒนาผลิตภัณฑ์',
    readTime: '12 min read',
    level: 'Advanced',
    category: 'Advanced Measurement',
    image: '/guides/acoustic-camera.jpg',
  },
  {
    slug: 'material-testing-equipment',
    title: 'Material Testing Equipment - Selection Guide',
    title_th: 'คู่มือการเลือกอุปกรณ์ทดสอบวัสดุ',
    description: 'How to choose impedance tubes, reverberation rooms, and transmission loss equipment for material characterization.',
    description_th: 'วิธีเลือกท่อวัดอิมพีแดนซ์ ห้องสะท้อนเสียง และอุปกรณ์การสูญเสียการส่งผ่านสำหรับการจำแนดลักษณะวัสดุ',
    readTime: '10 min read',
    level: 'Intermediate',
    category: 'Material Testing',
    image: '/guides/material-testing.jpg',
  },
  {
    slug: 'sound-intensity-measurement',
    title: 'Sound Intensity Measurement - Complete Guide',
    title_th: 'คู่มือการวัดความเข้มเสียง',
    description: 'Comprehensive guide to sound intensity measurement techniques, equipment selection, and applications for noise source identification and sound power determination.',
    description_th: 'คู่มือฉบับสมบูรณ์สำหรับเทคนิคการวัดความเข้มเสียง การเลือกอุปกรณ์ และการใช้งานสำหรับการระบุแหล่งกำเนิดเสียงรบกวนและการกำหนดกำลังเสียง',
    readTime: '15 min read',
    level: 'Advanced',
    category: 'Advanced Measurement',
    image: '/guides/sound-intensity.jpg',
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Buyer Guides & Resources
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Expert guides to help you make informed decisions when selecting acoustic, noise, and vibration measurement equipment
            </p>
            <p className="text-lg text-white/80">
              คู่มือผู้เชี่ยวชาญเพื่อช่วยให้คุณตัดสินใจอย่างมีข้อมูลเมื่อเลือกอุปกรณ์วัดเสียง เสียงรบกวน และการสั่นสะเทือน
            </p>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Browse Our Guides
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center">
              From beginner to advanced, our comprehensive guides cover everything you need to know about selecting the right measurement equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {guides.map((guide) => (
              <Link 
                key={guide.slug} 
                href={`/guides/${guide.slug}`}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-accent group">
                  {/* Image Placeholder */}
                  <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-accent/40" />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-accent">
                      {guide.category}
                    </Badge>
                  </div>

                  <CardHeader>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {guide.readTime}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {guide.level}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-accent transition-colors">
                      {guide.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">
                      {guide.title_th}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {guide.description}
                    </p>
                    <div className="text-accent font-semibold text-sm group-hover:underline">
                      Read Guide →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use Our Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Use Our Buyer Guides?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">1</Badge>
                    Expert Knowledge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Written by experienced acoustic engineers with decades of hands-on experience in the field.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">2</Badge>
                    Practical Advice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Real-world recommendations based on actual applications and industry best practices.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">3</Badge>
                    Standards Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Equipment selection guidance based on international standards and certification requirements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">4</Badge>
                    Budget Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Options for different budget levels without compromising on quality and performance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team of experts is here to help you choose the perfect equipment for your specific needs and budget.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-8 py-3 bg-accent text-primary-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold"
          >
            Contact Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
