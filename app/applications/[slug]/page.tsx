
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
    description_en: 'Sound insulation testing, room acoustics measurement, and compliance verification for residential and commercial buildings.',
    description_th: 'การทดสอบฉนวนกันเสียง การวัดอะคูสติกห้อง และการตรวจสอบความสอดคล้องสำหรับอาคารที่พักอาศัยและอาคารพาณิชย์',
    applications: ['Airborne sound insulation', 'Impact sound insulation', 'Facade sound insulation', 'Reverberation time', 'Room acoustics'],
    color: 'from-blue-500 to-blue-600',
    keywords: ['sound insulation', 'building acoustics', 'airborne noise', 'impact sound', 'reverberation'],
    standards: ['ISO 16283', 'ISO 3382', 'ASTM E90', 'ASTM E492'],
    benefits: [
      'Ensure compliance with building regulations',
      'Improve occupant comfort and privacy',
      'Verify acoustic performance before handover',
      'Identify and resolve acoustic defects'
    ],
  },
  'environmental-noise-monitoring': {
    icon: Wind,
    title_en: 'Environmental Noise Monitoring',
    title_th: 'การตรวจสอบเสียงรบกวนสิ่งแวดล้อม',
    description_en: 'Continuous noise monitoring for airports, highways, construction sites, and urban areas to ensure environmental compliance.',
    description_th: 'การตรวจสอบเสียงรบกวนอย่างต่อเนื่องสำหรับสนามบิน ทางหลวง ไซต์ก่อสร้าง และพื้นที่เมืองเพื่อให้มั่นใจในการปฏิบัติตามกฎระเบียบสิ่งแวดล้อม',
    applications: ['Airport noise monitoring', 'Traffic noise assessment', 'Construction noise monitoring', 'Industrial noise compliance', 'Community noise surveys'],
    color: 'from-green-500 to-green-600',
    keywords: ['environmental noise', 'noise monitoring', 'traffic noise', 'airport noise', 'community noise'],
    standards: ['IEC 61672', 'ISO 1996', 'ISO 20906'],
    benefits: [
      'Real-time noise level tracking',
      'Automated compliance reporting',
      'Early warning alerts',
      'Long-term trend analysis'
    ],
  },
  'vibration-analysis': {
    icon: Waves,
    title_en: 'Vibration Analysis & Testing',
    title_th: 'การวิเคราะห์และทดสอบการสั่นสะเทือน',
    description_en: 'Structural vibration measurement, modal analysis, and machinery condition monitoring for predictive maintenance.',
    description_th: 'การวัดการสั่นสะเทือนของโครงสร้าง การวิเคราะห์โมดอล และการตรวจสอบสภาพเครื่องจักรสำหรับการบำรุงรักษาเชิงป้องกัน',
    applications: ['Modal testing', 'Operating deflection shapes', 'Machinery vibration', 'Structural health monitoring', 'Human exposure to vibration'],
    color: 'from-purple-500 to-purple-600',
    keywords: ['vibration', 'modal analysis', 'structural dynamics', 'condition monitoring', 'ODS'],
    standards: ['ISO 2631', 'ISO 5349', 'ISO 10816', 'ISO 7626'],
    benefits: [
      'Predict equipment failures',
      'Optimize maintenance schedules',
      'Ensure worker safety',
      'Validate structural designs'
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
