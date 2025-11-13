
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Building2, 
  Volume2, 
  Waves, 
  Construction, 
  Factory, 
  Wind, 
  Radio, 
  Microscope,
  LineChart,
  Boxes
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Applications | Placid Asia',
  description: 'Discover acoustic, noise, and vibration testing solutions for various applications including building acoustics, environmental monitoring, and industrial testing.',
  keywords: 'building acoustics, noise monitoring, vibration analysis, sound source location, material testing, environmental acoustics',
};

// Define application categories
const applications = [
  {
    slug: 'building-acoustics',
    icon: Building2,
    title_en: 'Building Acoustics',
    title_th: 'อะคูสติกอาคาร',
    description_en: 'Sound insulation testing, room acoustics measurement, and compliance verification for residential and commercial buildings.',
    description_th: 'การทดสอบฉนวนกันเสียง การวัดอะคูสติกห้อง และการตรวจสอบความสอดคล้องสำหรับอาคารที่พักอาศัยและอาคารพาณิชย์',
    applications: ['Airborne sound insulation', 'Impact sound insulation', 'Facade sound insulation', 'Reverberation time', 'Room acoustics'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    slug: 'environmental-noise-monitoring',
    icon: Wind,
    title_en: 'Environmental Noise Monitoring',
    title_th: 'การตรวจสอบเสียงรบกวนสิ่งแวดล้อม',
    description_en: 'Continuous noise monitoring for airports, highways, construction sites, and urban areas to ensure environmental compliance.',
    description_th: 'การตรวจสอบเสียงรบกวนอย่างต่อเนื่องสำหรับสนามบิน ทางหลวง ไซต์ก่อสร้าง และพื้นที่เมืองเพื่อให้มั่นใจในการปฏิบัติตามกฎระเบียบสิ่งแวดล้อม',
    applications: ['Airport noise monitoring', 'Traffic noise assessment', 'Construction noise monitoring', 'Industrial noise compliance', 'Community noise surveys'],
    color: 'from-green-500 to-green-600',
  },
  {
    slug: 'vibration-analysis',
    icon: Waves,
    title_en: 'Vibration Analysis & Testing',
    title_th: 'การวิเคราะห์และทดสอบการสั่นสะเทือน',
    description_en: 'Structural vibration measurement, modal analysis, and machinery condition monitoring for predictive maintenance.',
    description_th: 'การวัดการสั่นสะเทือนของโครงสร้าง การวิเคราะห์โมดอล และการตรวจสอบสภาพเครื่องจักรสำหรับการบำรุงรักษาเชิงป้องกัน',
    applications: ['Modal testing', 'Operating deflection shapes', 'Machinery vibration', 'Structural health monitoring', 'Human exposure to vibration'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    slug: 'sound-source-location',
    icon: Radio,
    title_en: 'Sound Source Location',
    title_th: 'การระบุตำแหน่งแหล่งกำเนิดเสียง',
    description_en: 'Acoustic imaging and beamforming to identify and visualize noise sources in products, vehicles, and industrial environments.',
    description_th: 'การถ่ายภาพอะคูสติกและบีมฟอร์มมิ่งเพื่อระบุและแสดงภาพแหล่งกำเนิดเสียงรบกวนในผลิตภัณฑ์ ยานพาหนะ และสภาพแวดล้อมอุตสาหกรรม',
    applications: ['Automotive NVH', 'Product noise source identification', 'HVAC noise analysis', 'Machinery diagnostics', 'Pass-by noise testing'],
    color: 'from-red-500 to-red-600',
  },
  {
    slug: 'industrial-noise-control',
    icon: Factory,
    title_en: 'Industrial Noise Control',
    title_th: 'การควบคุมเสียงรบกวนในอุตสาหกรรม',
    description_en: 'Workplace noise assessment, hearing conservation programs, and industrial noise reduction solutions.',
    description_th: 'การประเมินเสียงรบกวนในสถานที่ทำงาน โปรแกรมการอนุรักษ์การได้ยิน และโซลูชันการลดเสียงรบกวนในอุตสาหกรรม',
    applications: ['Occupational noise exposure', 'Hearing conservation', 'Machine noise emission', 'Noise mapping', 'Engineering controls'],
    color: 'from-orange-500 to-orange-600',
  },
  {
    slug: 'material-testing',
    icon: Boxes,
    title_en: 'Material Testing & Characterization',
    title_th: 'การทดสอบและจำแนกลักษณะวัสดุ',
    description_en: 'Acoustic material property measurement including absorption, transmission loss, and impedance testing.',
    description_th: 'การวัดคุณสมบัติอะคูสติกของวัสดุรวมถึงการดูดซับ การสูญเสียการส่งผ่าน และการทดสอบอิมพีแดนซ์',
    applications: ['Sound absorption measurement', 'Transmission loss testing', 'Impedance tube testing', 'Material characterization', 'Product development'],
    color: 'from-teal-500 to-teal-600',
  },
  {
    slug: 'room-field-acoustics',
    icon: Volume2,
    title_en: 'Room & Field Acoustics',
    title_th: 'อะคูสติกห้องและภาคสนาม',
    description_en: 'Concert hall acoustics, auditorium design verification, and outdoor sound propagation studies.',
    description_th: 'อะคูสติกห้องแสดงคอนเสิร์ต การตรวจสอบการออกแบบห้องประชุม และการศึกษาการแพร่กระจายเสียงกลางแจ้ง',
    applications: ['Concert hall acoustics', 'Auditorium design', 'Speech intelligibility', 'Outdoor sound propagation', 'Architectural acoustics'],
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    slug: 'research-development',
    icon: Microscope,
    title_en: 'Research & Development',
    title_th: 'การวิจัยและพัฒนา',
    description_en: 'Advanced acoustic research, product development, and specialized testing for academic and R&D applications.',
    description_th: 'การวิจัยอะคูสติกขั้นสูง การพัฒนาผลิตภัณฑ์ และการทดสอบเฉพาะทางสำหรับการใช้งานทางวิชาการและการวิจัยและพัฒนา',
    applications: ['Acoustic research', 'Psychoacoustics', 'Signal processing', 'Novel measurement techniques', 'Academic research'],
    color: 'from-pink-500 to-pink-600',
  },
  {
    slug: 'quality-control',
    icon: LineChart,
    title_en: 'Quality Control & Production',
    title_th: 'การควบคุมคุณภาพและการผลิต',
    description_en: 'Production line testing, quality assurance, and automated noise and vibration testing for manufacturing.',
    description_th: 'การทดสอบสายการผลิต การประกันคุณภาพ และการทดสอบเสียงและการสั่นสะเทือนอัตโนมัติสำหรับการผลิต',
    applications: ['Production line testing', 'End-of-line testing', 'Automated quality control', 'Product certification', 'Batch testing'],
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    slug: 'construction-demolition',
    icon: Construction,
    title_en: 'Construction & Demolition',
    title_th: 'การก่อสร้างและการรื้อถอน',
    description_en: 'Construction noise and vibration monitoring to ensure compliance and minimize impact on surrounding areas.',
    description_th: 'การตรวจสอบเสียงและการสั่นสะเทือนจากการก่อสร้างเพื่อให้มั่นใจในการปฏิบัติตามและลดผลกระทบต่อพื้นที่โดยรอบ',
    applications: ['Construction noise monitoring', 'Vibration damage assessment', 'Piling vibration', 'Blasting monitoring', 'Community impact assessment'],
    color: 'from-gray-500 to-gray-600',
  },
];

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Microscope className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Applications & Solutions
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Professional acoustic, noise, and vibration testing solutions for every application
            </p>
            <p className="text-lg text-white/80">
              โซลูชันการทดสอบอะคูสติก เสียงรบกวน และการสั่นสะเทือนระดับมืออาชีพสำหรับทุกการใช้งาน
            </p>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Find Solutions by Application
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of testing equipment and solutions tailored to your specific industry and application needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => {
              const IconComponent = app.icon;
              return (
                <Link 
                  key={app.slug} 
                  href={`/applications/${app.slug}`}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-accent group">
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl mb-2">{app.title_en}</CardTitle>
                      <p className="text-sm text-muted-foreground font-medium">{app.title_th}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {app.description_en}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-4">
                        {app.applications.slice(0, 3).map((item) => (
                          <Badge key={item} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                        {app.applications.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{app.applications.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Application-Specific Solutions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Choose Application-Specific Solutions?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">1</Badge>
                    Optimized Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Equipment and systems specifically designed and calibrated for your application deliver more accurate results and better value.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">2</Badge>
                    Compliance Ready
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Application-specific solutions ensure compliance with relevant standards (ISO, IEC, ASTM) for your industry.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">3</Badge>
                    Expert Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our application specialists provide expert consultation to ensure you select the right equipment for your specific needs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">4</Badge>
                    Complete Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get complete measurement systems with all necessary components, software, and accessories for your application.
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
            Need Help Choosing the Right Solution?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our application engineers can help you design a complete measurement system tailored to your specific requirements.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-8 py-3 bg-accent text-primary-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold"
          >
            Consult with Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
