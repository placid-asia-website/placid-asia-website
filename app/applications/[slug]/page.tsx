
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/product-grid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, Building2, Wind, Waves, Construction, Factory, Radio, Microscope, LineChart, Boxes, Volume2, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

// Application data (same as applications page)
const applicationData: Record<string, {
  icon: any;
  title_en: string;
  title_th: string;
  description_en: string;
  description_th: string;
  applications: string[];
  color: string;
  keywords: string[];
  standards: string[];
  benefits: string[];
}> = {
  'building-acoustics': {
    icon: Building2,
    title_en: 'Building Acoustics',
    title_th: 'อะคูสติกอาคาร',
    description_en: 'Comprehensive building acoustics testing and consulting services for residential, commercial, and hospitality projects. Our expert team provides sound insulation measurements, room acoustics analysis, facade testing, and compliance verification to meet international standards. We help architects, developers, and contractors deliver acoustically comfortable spaces that exceed regulatory requirements.',
    description_th: 'บริการทดสอบและให้คำปรึกษาด้านอะคูสติกอาคารอย่างครอบคลุมสำหรับโครงการที่พักอาศัย อาคารพาณิชย์ และอุตสาหกรรมการต้อนรับ ทีมผู้เชี่ยวชาญของเราให้บริการวัดฉนวนกันเสียง วิเคราะห์อะคูสติกห้อง ทดสอบผนังด้านหน้า และตรวจสอบความสอดคล้องเพื่อให้เป็นไปตามมาตรฐานสากล เราช่วยสถาปนิก นักพัฒนา และผู้รับเหมาส่งมอบพื้นที่ที่สะดวกสบายทางอะคูสติกซึ่งเกินข้อกำหนดด้านกฎระเบียบ',
    applications: ['Airborne sound insulation testing (walls, floors, partitions)', 'Impact sound insulation measurement (footfall noise)', 'Facade sound insulation (traffic & aircraft noise)', 'Reverberation time measurement (speech clarity)', 'Room acoustics optimization'],
    color: 'from-blue-500 to-blue-600',
    keywords: ['sound insulation', 'building acoustics', 'airborne noise', 'impact sound', 'reverberation', 'facade testing', 'acoustic compliance', 'residential acoustics', 'hotel acoustics', 'apartment sound testing', 'tapping machine', 'dodecahedron', 'sound source', 'sound level meter', 'building', 'room acoustics', 'construction'],
    standards: ['ISO 16283-1/2/3', 'ISO 3382-1/2/3', 'ASTM E90', 'ASTM E492', 'ASTM E336', 'BS 8233', 'WHO Guidelines'],
    benefits: [
      'Ensure full compliance with local and international building acoustics regulations',
      'Significantly improve occupant comfort, privacy, and wellbeing through optimized acoustic design',
      'Pre-completion testing verifies acoustic performance before handover, avoiding costly remediation',
      'Early identification and resolution of acoustic defects during construction',
      'Expert consulting supports acoustic design from concept to completion',
      'Detailed technical reports with remediation recommendations',
      'Protect property value and reduce complaints through superior acoustic quality'
    ],
  },
  'environmental-noise-monitoring': {
    icon: Wind,
    title_en: 'Environmental Noise Monitoring',
    title_th: 'การตรวจสอบเสียงรบกวนสิ่งแวดล้อม',
    description_en: 'Advanced continuous and long-term environmental noise monitoring solutions for airports, highways, construction sites, industrial facilities, and urban developments. Our automated monitoring systems provide 24/7 real-time noise data, compliance reporting, and early warning alerts to regulatory authorities and community stakeholders. Class 1 sound level meters with weather-resistant outdoor terminals ensure accurate measurements in all conditions.',
    description_th: 'โซลูชันการตรวจสอบเสียงรบกวนสิ่งแวดล้อมแบบต่อเนื่องและระยะยาวขั้นสูงสำหรับสนามบิน ทางหลวง ไซต์ก่อสร้าง สถานประกอบการอุตสาหกรรม และการพัฒนาเมือง ระบบตรวจสอบอัตโนมัติของเราให้ข้อมูลเสียงแบบเรียลไทม์ตลอด 24/7 รายงานการปฏิบัติตามข้อกำหนด และการแจ้งเตือนล่วงหน้าแก่หน่วยงานกำกับดูแลและผู้มีส่วนได้ส่วนเสียในชุมชน เครื่องวัดระดับเสียง Class 1 พร้อมเทอร์มินัลกลางแจ้งที่ทนฝนทนแดดรับประกันการวัดที่แม่นยำในทุกสภาพ',
    applications: ['Airport noise monitoring and flight path tracking', 'Highway and traffic noise assessment', 'Construction site noise compliance', 'Industrial facility boundary monitoring', 'Community noise complaint validation', 'Wind farm noise assessment', 'Railway noise monitoring'],
    color: 'from-green-500 to-green-600',
    keywords: ['environmental noise', 'noise monitoring', 'traffic noise', 'airport noise', 'community noise', 'continuous monitoring', 'noise mapping', 'long-term monitoring', 'noise compliance', 'automated monitoring', 'sound level meter', 'outdoor', 'environmental', 'terminal', 'noise monitor', 'weather', 'monitoring station'],
    standards: ['IEC 61672-1', 'ISO 1996-1/2', 'ISO 20906', 'EU END Directive', 'WHO Noise Guidelines', 'Thai Pollution Control Department Standards'],
    benefits: [
      '24/7 automated real-time noise level monitoring with web-based dashboard access',
      'Automated compliance reporting with customizable thresholds and instant email/SMS alerts',
      'Early warning system prevents exceedances and enables rapid response',
      'Long-term trend analysis identifies patterns and supports mitigation planning',
      'Weather-resistant outdoor terminals for year-round operation',
      'Integration with noise modeling software for predictive analysis',
      'Transparent data sharing builds community trust and demonstrates accountability'
    ],
  },
  'vibration-analysis': {
    icon: Waves,
    title_en: 'Vibration Analysis & Testing',
    title_th: 'การวิเคราะห์และทดสอบการสั่นสะเทือน',
    description_en: 'Complete vibration measurement, analysis, and testing services for structural dynamics, machinery diagnostics, and predictive maintenance programs. Our solutions include modal analysis, operating deflection shape (ODS) testing, machinery condition monitoring, and human exposure assessment. Advanced multi-channel data acquisition systems with high-precision accelerometers and sophisticated analysis software help engineers optimize designs, predict failures, and ensure safety compliance.',
    description_th: 'บริการวัด วิเคราะห์ และทดสอบการสั่นสะเทือนที่สมบูรณ์สำหรับพลศาสตร์โครงสร้าง การวินิจฉัยเครื่องจักร และโปรแกรมการบำรุงรักษาเชิงป้องกัน โซลูชันของเรารวมถึงการวิเคราะห์โมดอล การทดสอบรูปร่างการเสียรูประหว่างการทำงาน (ODS) การตรวจสอบสภาพเครื่องจักร และการประเมินการสัมผัสของมนุษย์ ระบบรับข้อมูลหลายช่องขั้นสูงพร้อมเซ็นเซอร์วัดความเร่งความแม่นยำสูงและซอฟต์แวร์วิเคราะห์ที่ซับซ้อนช่วยให้วิศวกรเพิ่มประสิทธิภาพการออกแบบ คาดการณ์ความล้มเหลว และรับประกันการปฏิบัติตามความปลอดภัย',
    applications: ['Modal testing and FRF measurements', 'Operating deflection shapes (ODS) visualization', 'Rotating machinery vibration diagnostics', 'Structural health monitoring (SHM)', 'Human whole-body vibration exposure', 'Hand-arm vibration assessment', 'Product vibration testing', 'Seismic vibration monitoring'],
    color: 'from-purple-500 to-purple-600',
    keywords: ['vibration', 'modal analysis', 'structural dynamics', 'condition monitoring', 'ODS', 'machinery diagnostics', 'predictive maintenance', 'accelerometer', 'frequency response', 'resonance testing', 'vibration meter', 'analyzer', 'shaker', 'sensor', 'transducer', 'structural', 'machinery'],
    standards: ['ISO 2631-1/2', 'ISO 5349-1/2', 'ISO 10816-1 to 7', 'ISO 7626', 'ISO 20816', 'VDI 2056', 'DIN 4150-3'],
    benefits: [
      'Predict equipment failures through early detection of abnormal vibration patterns',
      'Optimize preventive maintenance schedules based on actual machine condition',
      'Ensure worker safety compliance with whole-body and hand-arm vibration regulations',
      'Validate structural designs through experimental modal analysis and FEM correlation',
      'Identify resonance issues before they cause catastrophic failure',
      'Reduce unplanned downtime and extend equipment lifespan',
      'Comprehensive vibration analysis with frequency domain, time domain, and order tracking'
    ],
  },
  'sound-source-location': {
    icon: Radio,
    title_en: 'Sound Source Location',
    title_th: 'การระบุตำแหน่งแหล่งกำเนิดเสียง',
    description_en: 'Acoustic imaging and beamforming to identify and visualize noise sources in products, vehicles, and industrial environments.',
    description_th: 'การถ่ายภาพอะคูสติกและบีมฟอร์มมิ่งเพื่อระบุและแสดงภาพแหล่งกำเนิดเสียงรบกวนในผลิตภัณฑ์ ยานพาหนะ และสภาพแวดล้อมอุตสาหกรรม',
    applications: ['Automotive NVH', 'Product noise source identification', 'HVAC noise analysis', 'Machinery diagnostics', 'Pass-by noise testing'],
    color: 'from-red-500 to-red-600',
    keywords: ['acoustic camera', 'beamforming', 'sound source', 'NVH', 'noise localization'],
    standards: ['ISO 3745', 'ISO 9614', 'SAE J1470'],
    benefits: [
      'Visualize noise sources',
      'Identify problem areas quickly',
      'Optimize noise reduction',
      'Validate acoustic designs'
    ],
  },
  'industrial-noise-control': {
    icon: Factory,
    title_en: 'Industrial Noise Control',
    title_th: 'การควบคุมเสียงรบกวนในอุตสาหกรรม',
    description_en: 'Workplace noise assessment, hearing conservation programs, and industrial noise reduction solutions.',
    description_th: 'การประเมินเสียงรบกวนในสถานที่ทำงาน โปรแกรมการอนุรักษ์การได้ยิน และโซลูชันการลดเสียงรบกวนในอุตสาหกรรม',
    applications: ['Occupational noise exposure', 'Hearing conservation', 'Machine noise emission', 'Noise mapping', 'Engineering controls'],
    color: 'from-orange-500 to-orange-600',
    keywords: ['occupational noise', 'workplace noise', 'hearing protection', 'noise dosimetry', 'industrial hygiene'],
    standards: ['ISO 9612', 'ISO 4871', 'OSHA 1910.95', 'NIOSH'],
    benefits: [
      'Protect worker hearing',
      'Comply with regulations',
      'Reduce liability',
      'Improve productivity'
    ],
  },
  'material-testing': {
    icon: Boxes,
    title_en: 'Material Testing & Characterization',
    title_th: 'การทดสอบและจำแนกลักษณะวัสดุ',
    description_en: 'Acoustic material property measurement including absorption, transmission loss, and impedance testing.',
    description_th: 'การวัดคุณสมบัติอะคูสติกของวัสดุรวมถึงการดูดซับ การสูญเสียการส่งผ่าน และการทดสอบอิมพีแดนซ์',
    applications: ['Sound absorption measurement', 'Transmission loss testing', 'Impedance tube testing', 'Material characterization', 'Product development'],
    color: 'from-teal-500 to-teal-600',
    keywords: ['material testing', 'absorption coefficient', 'transmission loss', 'impedance tube', 'acoustic materials'],
    standards: ['ISO 10534', 'ISO 354', 'ASTM C384', 'ASTM E1050'],
    benefits: [
      'Characterize material properties',
      'Optimize product designs',
      'Verify supplier specifications',
      'Support R&D projects'
    ],
  },
  'room-field-acoustics': {
    icon: Volume2,
    title_en: 'Room & Field Acoustics',
    title_th: 'อะคูสติกห้องและภาคสนาม',
    description_en: 'Concert hall acoustics, auditorium design verification, and outdoor sound propagation studies.',
    description_th: 'อะคูสติกห้องแสดงคอนเสิร์ต การตรวจสอบการออกแบบห้องประชุม และการศึกษาการแพร่กระจายเสียงกลางแจ้ง',
    applications: ['Concert hall acoustics', 'Auditorium design', 'Speech intelligibility', 'Outdoor sound propagation', 'Architectural acoustics'],
    color: 'from-indigo-500 to-indigo-600',
    keywords: ['room acoustics', 'reverberation', 'speech intelligibility', 'acoustic design', 'sound propagation'],
    standards: ['ISO 3382', 'IEC 60268-16', 'ANSI S3.5'],
    benefits: [
      'Optimize acoustic performance',
      'Verify design predictions',
      'Ensure speech clarity',
      'Improve audience experience'
    ],
  },
  'research-development': {
    icon: Microscope,
    title_en: 'Research & Development',
    title_th: 'การวิจัยและพัฒนา',
    description_en: 'Advanced acoustic research, product development, and specialized testing for academic and R&D applications.',
    description_th: 'การวิจัยอะคูสติกขั้นสูง การพัฒนาผลิตภัณฑ์ และการทดสอบเฉพาะทางสำหรับการใช้งานทางวิชาการและการวิจัยและพัฒนา',
    applications: ['Acoustic research', 'Psychoacoustics', 'Signal processing', 'Novel measurement techniques', 'Academic research'],
    color: 'from-pink-500 to-pink-600',
    keywords: ['acoustic research', 'psychoacoustics', 'signal processing', 'R&D', 'innovation'],
    standards: ['Various research standards'],
    benefits: [
      'Access cutting-edge technology',
      'Flexible measurement solutions',
      'Expert technical support',
      'Customizable systems'
    ],
  },
  'quality-control': {
    icon: LineChart,
    title_en: 'Quality Control & Production',
    title_th: 'การควบคุมคุณภาพและการผลิต',
    description_en: 'Production line testing, quality assurance, and automated noise and vibration testing for manufacturing.',
    description_th: 'การทดสอบสายการผลิต การประกันคุณภาพ และการทดสอบเสียงและการสั่นสะเทือนอัตโนมัติสำหรับการผลิต',
    applications: ['Production line testing', 'End-of-line testing', 'Automated quality control', 'Product certification', 'Batch testing'],
    color: 'from-yellow-500 to-yellow-600',
    keywords: ['quality control', 'production testing', 'EOL testing', 'automated testing', 'manufacturing'],
    standards: ['ISO 9001', 'Six Sigma', 'Production standards'],
    benefits: [
      'Ensure product consistency',
      'Reduce defect rates',
      'Automate testing processes',
      'Improve efficiency'
    ],
  },
  'construction-demolition': {
    icon: Construction,
    title_en: 'Construction & Demolition',
    title_th: 'การก่อสร้างและการรื้อถอน',
    description_en: 'Construction noise and vibration monitoring to ensure compliance and minimize impact on surrounding areas.',
    description_th: 'การตรวจสอบเสียงและการสั่นสะเทือนจากการก่อสร้างเพื่อให้มั่นใจในการปฏิบัติตามและลดผลกระทบต่อพื้นที่โดยรอบ',
    applications: ['Construction noise monitoring', 'Vibration damage assessment', 'Piling vibration', 'Blasting monitoring', 'Community impact assessment'],
    color: 'from-gray-500 to-gray-600',
    keywords: ['construction noise', 'vibration monitoring', 'piling', 'blasting', 'structural damage'],
    standards: ['DIN 4150', 'BS 5228', 'ISO 4866'],
    benefits: [
      'Prevent structural damage',
      'Minimize community complaints',
      'Ensure compliance',
      'Protect sensitive structures'
    ],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const appData = applicationData[decodedSlug];
  
  if (!appData) {
    return {
      title: 'Application Not Found | Placid Asia',
    };
  }
  
  return {
    title: `${appData.title_en} | Applications | Placid Asia`,
    description: appData.description_en,
    keywords: `${appData.keywords.join(', ')}, acoustic testing, measurement equipment`,
  };
}

export default async function ApplicationDetailPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const appData = applicationData[decodedSlug];

  if (!appData) {
    notFound();
  }

  // Get all products and filter by application keywords
  const products = await prisma.product.findMany({
    where: {
      active: true,
    },
  });

  // Get all categories
  const allCategories = await prisma.category.findMany({
    where: {
      active: true,
    },
  });

  // Filter products based on application keywords or category
  const filteredProducts = products.filter((product) => {
    const lowerTitle = (product.title_en || '').toLowerCase();
    const lowerDesc = (product.description_en || '').toLowerCase();
    const category = allCategories.find(c => c.name_en === product.category);
    const lowerCategory = (category?.name_en || '').toLowerCase();
    
    // Check if any keyword matches
    return appData.keywords.some(keyword => 
      lowerTitle.includes(keyword.toLowerCase()) || 
      lowerDesc.includes(keyword.toLowerCase()) ||
      lowerCategory.includes(keyword.toLowerCase())
    );
  });

  // Map products to include parsed media
  const productsWithMedia = filteredProducts.map((product) => {
    return {
      ...product,
      images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
      pdfs: typeof product.pdfs === 'string' ? JSON.parse(product.pdfs) : product.pdfs,
    };
  });

  const IconComponent = appData.icon;

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          href="/applications" 
          className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Applications
        </Link>
      </div>

      {/* Application Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${appData.color} flex items-center justify-center mr-4`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {appData.title_en}
                </h1>
                <p className="text-lg text-white/80">{appData.title_th}</p>
              </div>
            </div>
            
            <p className="text-xl mb-4 text-white/90">
              {appData.description_en}
            </p>
            <p className="text-base text-white/80">
              {appData.description_th}
            </p>
          </div>
        </div>
      </section>

      {/* Key Applications */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Typical Applications</h3>
            <div className="flex flex-wrap gap-2">
              {appData.applications.map((app) => (
                <Badge key={app} variant="outline" className="text-sm">
                  {app}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits and Standards */}
      <section className="py-12 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-accent" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {appData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Standards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Badge className="w-6 h-6 mr-2 bg-accent" />
                  Relevant Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {appData.standards.map((standard) => (
                    <Badge key={standard} variant="secondary">
                      {standard}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Our equipment complies with international standards for {appData.title_en.toLowerCase()}.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Recommended Products for {appData.title_en}
          </h2>
          <p className="text-muted-foreground mb-8">
            {productsWithMedia.length} {productsWithMedia.length === 1 ? 'product' : 'products'} available for this application
          </p>
          {productsWithMedia.length > 0 ? (
            <ProductGrid products={productsWithMedia} />
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground mb-4">
                  We are currently updating our product catalog for this application.
                </p>
                <p className="text-sm text-muted-foreground">
                  Please contact us for product recommendations and availability.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Expert Guidance?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our application engineers have extensive experience in {appData.title_en.toLowerCase()} and can help you design the perfect measurement solution.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-8 py-3 bg-accent text-primary-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>
    </div>
  );
}
