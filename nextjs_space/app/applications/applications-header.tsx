'use client';

import { useLanguage } from '@/lib/language-context';
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
  Boxes,
  CheckCircle
} from 'lucide-react';

export default function ApplicationsHeader() {
  const { language, t } = useLanguage();

  // Define application categories with translation keys
  const applications = [
    {
      slug: 'building-acoustics',
      icon: Building2,
      title: language === 'en' ? 'Building Acoustics' : 'อะคูสติกอาคาร',
      description: language === 'en' 
        ? 'Sound insulation testing, room acoustics measurement, and compliance verification for residential and commercial buildings.'
        : 'การทดสอบฉนวนกันเสียง การวัดอะคูสติกห้อง และการตรวจสอบความสอดคล้องสำหรับอาคารที่พักอาศัยและอาคารพาณิชย์',
      applications: language === 'en'
        ? ['Airborne sound insulation', 'Impact sound insulation', 'Facade sound insulation', 'Reverberation time', 'Room acoustics']
        : ['ฉนวนกันเสียงทางอากาศ', 'ฉนวนกันเสียงกระแทก', 'ฉนวนกันเสียงผนังอาคาร', 'เวลาสะท้อน', 'อะคูสติกห้อง'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      slug: 'environmental-noise-monitoring',
      icon: Wind,
      title: language === 'en' ? 'Environmental Noise Monitoring' : 'การตรวจสอบเสียงรบกวนสิ่งแวดล้อม',
      description: language === 'en'
        ? 'Continuous noise monitoring for airports, highways, construction sites, and urban areas to ensure environmental compliance.'
        : 'การตรวจสอบเสียงรบกวนอย่างต่อเนื่องสำหรับสนามบิน ทางหลวง ไซต์ก่อสร้าง และพื้นที่เมืองเพื่อให้มั่นใจในการปฏิบัติตามกฎระเบียบสิ่งแวดล้อม',
      applications: language === 'en'
        ? ['Airport noise monitoring', 'Traffic noise assessment', 'Construction noise monitoring', 'Industrial noise compliance', 'Community noise surveys']
        : ['การตรวจสอบเสียงรบกวนสนามบิน', 'การประเมินเสียงรบกวนจากการจราจร', 'การตรวจสอบเสียงรบกวนการก่อสร้าง', 'การปฏิบัติตามเสียงรบกวนอุตสาหกรรม', 'การสำรวจเสียงรบกวนชุมชน'],
      color: 'from-green-500 to-green-600',
    },
    {
      slug: 'vibration-analysis',
      icon: Waves,
      title: language === 'en' ? 'Vibration Analysis & Testing' : 'การวิเคราะห์และทดสอบการสั่นสะเทือน',
      description: language === 'en'
        ? 'Structural vibration testing, machinery condition monitoring, and modal analysis for industrial and civil engineering applications.'
        : 'การทดสอบการสั่นสะเทือนของโครงสร้าง การตรวจสอบสภาพเครื่องจักร และการวิเคราะห์โมดอลสำหรับการใช้งานทางวิศวกรรมอุตสาหกรรมและโยธา',
      applications: language === 'en'
        ? ['Machinery vibration monitoring', 'Structural health monitoring', 'Modal analysis', 'Human comfort assessment', 'Product testing']
        : ['การตรวจสอบการสั่นสะเทือนของเครื่องจักร', 'การตรวจสอบสุขภาพโครงสร้าง', 'การวิเคราะห์โมดอล', 'การประเมินความสะดวกสบายของมนุษย์', 'การทดสอบผลิตภัณฑ์'],
      color: 'from-purple-500 to-purple-600',
    },
    {
      slug: 'sound-source-location',
      icon: Radio,
      title: language === 'en' ? 'Sound Source Location' : 'การระบุตำแหน่งแหล่งกำเนิดเสียง',
      description: language === 'en'
        ? 'Acoustic camera systems and beamforming technology for identifying and localizing noise sources in complex environments.'
        : 'ระบบกล้องอะคูสติกและเทคโนโลยีบีมฟอร์มมิ่งสำหรับการระบุและกำหนดตำแหน่งแหล่งกำเนิดเสียงรบกวนในสภาพแวดล้อมที่ซับซ้อน',
      applications: language === 'en'
        ? ['Product noise testing', 'Pass-by noise analysis', 'HVAC noise identification', 'Industrial troubleshooting', 'Research & development']
        : ['การทดสอบเสียงรบกวนผลิตภัณฑ์', 'การวิเคราะห์เสียงรบกวนขณะผ่าน', 'การระบุเสียงรบกวน HVAC', 'การแก้ไขปัญหาอุตสาหกรรม', 'การวิจัยและพัฒนา'],
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      slug: 'material-testing',
      icon: Microscope,
      title: language === 'en' ? 'Acoustic Material Testing' : 'การทดสอบวัสดุอะคูสติก',
      description: language === 'en'
        ? 'Sound absorption and transmission loss measurement for building materials, acoustic panels, and noise control products.'
        : 'การวัดการดูดซับเสียงและการสูญเสียการส่งผ่านสำหรับวัสดุก่อสร้าง แผงอะคูสติก และผลิตภัณฑ์ควบคุมเสียงรบกวน',
      applications: language === 'en'
        ? ['Sound absorption testing', 'Transmission loss measurement', 'Material R&D', 'Product certification', 'Quality control']
        : ['การทดสอบการดูดซับเสียง', 'การวัดการสูญเสียการส่งผ่าน', 'การวิจัยและพัฒนาวัสดุ', 'การรับรองผลิตภัณฑ์', 'การควบคุมคุณภาพ'],
      color: 'from-orange-500 to-orange-600',
    },
    {
      slug: 'industrial-noise-control',
      icon: Factory,
      title: language === 'en' ? 'Industrial Noise Control' : 'การควบคุมเสียงรบกวนในอุตสาหกรรม',
      description: language === 'en'
        ? 'Comprehensive noise assessment and control solutions for manufacturing facilities, power plants, and industrial installations.'
        : 'โซลูชันการประเมินและควบคุมเสียงรบกวนแบบครบวงจรสำหรับโรงงานผลิต โรงไฟฟ้า และติดตั้งอุตสาหกรรม',
      applications: language === 'en'
        ? ['Occupational noise surveys', 'Noise exposure assessment', 'Engineering noise control', 'PPE selection', 'Compliance verification']
        : ['การสำรวจเสียงรบกวนในการทำงาน', 'การประเมินการสัมผัสเสียงรบกวน', 'การควบคุมเสียงรบกวนทางวิศวกรรม', 'การเลือก PPE', 'การตรวจสอบการปฏิบัติตาม'],
      color: 'from-red-500 to-red-600',
    },
    {
      slug: 'secondary-acoustic-calibration',
      icon: CheckCircle,
      title: language === 'en' ? 'Secondary Acoustic Calibration System' : 'ระบบสอบเทียบอะคูสติกระดับรอง',
      description: language === 'en'
        ? 'Professional acoustic calibration systems for sound level meter verification and microphone calibration per IEC standards.'
        : 'ระบบสอบเทียบอะคูสติกระดับมืออาชีพสำหรับการตรวจสอบเครื่องวัดระดับเสียงและการสอบเทียบไมโครโฟนตามมาตรฐาน IEC',
      applications: language === 'en'
        ? ['Sound level meter calibration', 'Microphone calibration', 'Laboratory verification', 'Field verification', 'Periodic verification']
        : ['การสอบเทียบเครื่องวัดระดับเสียง', 'การสอบเทียบไมโครโฟน', 'การตรวจสอบในห้องปฏิบัติการ', 'การตรวจสอบภาคสนาม', 'การตรวจสอบเป็นระยะ'],
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('applications.title')}
            </h1>
            <p className="text-xl text-white/90">
              {t('applications.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app) => {
              const Icon = app.icon;
              return (
                <Link key={app.slug} href={`/applications/${app.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl mb-2">{app.title}</CardTitle>
                      <CardDescription className="text-base">
                        {app.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {app.applications.slice(0, 5).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <Badge className="bg-accent text-primary font-medium">
                          {t('applications.viewDetails')} →
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
