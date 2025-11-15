import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, Info, ShoppingCart } from 'lucide-react';
import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { ProductGrid } from '@/components/product-grid';

// Guide content data
const guideContent: Record<string, any> = {
  'building-acoustics-testing-kit': {
    title: 'Building Acoustics Testing Kit - Complete Buyer Guide',
    title_th: 'คู่มือการเลือกซื้อชุดทดสอบอะคูสติกอาคาร',
    readTime: '10 min read',
    level: 'Intermediate',
    lastUpdated: 'November 2025',
    
    introduction: {
      text: 'Building acoustics testing is essential for verifying sound insulation performance, room acoustics quality, and compliance with building regulations. This comprehensive guide will help you select the right equipment for your building acoustics measurements.',
      text_th: 'การทดสอบอะคูสติกอาคารเป็นสิ่งจำเป็นสำหรับการตรวจสอบประสิทธิภาพการกันเสียง คุณภาพอะคูสติกห้อง และการปฏิบัติตามกฎระเบียบอาคาร คู่มือฉบับสมบูรณ์นี้จะช่วยคุณเลือกอุปกรณ์ที่เหมาะสมสำหรับการวัดอะคูสติกอาคาร',
    },

    keyMeasurements: [
      {
        title: 'Airborne Sound Insulation',
        description: 'Measurement of sound reduction between spaces transmitted through the air (walls, floors, windows)',
        standard: 'ISO 16283-1, ASTM E336',
      },
      {
        title: 'Impact Sound Insulation',
        description: 'Assessment of floor/ceiling systems ability to reduce impact noise (footsteps, dropped objects)',
        standard: 'ISO 16283-2, ASTM E492',
      },
      {
        title: 'Façade Sound Insulation',
        description: 'Evaluation of building envelope performance against external noise sources',
        standard: 'ISO 16283-3, ASTM E966',
      },
      {
        title: 'Reverberation Time',
        description: 'Measurement of acoustic decay in rooms to assess speech intelligibility and music quality',
        standard: 'ISO 3382-2',
      },
    ],

    essentialEquipment: [
      {
        item: 'Sound Level Meter (Class 1 or 2)',
        details: 'Type 1 (precision) required for official testing, Type 2 acceptable for screening',
        priority: 'Essential',
      },
      {
        item: 'Omnidirectional Sound Source',
        details: '12-sided dodecahedron loudspeaker for standardized sound radiation',
        priority: 'Essential',
      },
      {
        item: 'Power Amplifier',
        details: 'Sufficient power output (typically 200W+) to generate required sound levels',
        priority: 'Essential',
      },
      {
        item: 'Tapping Machine',
        details: 'Standard impact source with 5 hammers for floor/ceiling testing',
        priority: 'Essential for floor testing',
      },
      {
        item: 'Tripod & Extension Poles',
        details: 'For positioning measurement microphone at multiple locations',
        priority: 'Essential',
      },
      {
        item: 'Calibrator',
        details: 'Class 1 acoustic calibrator for meter verification before and after measurements',
        priority: 'Essential',
      },
      {
        item: 'Building Acoustics Software',
        details: 'For automated measurements, real-time display, and report generation',
        priority: 'Highly Recommended',
      },
    ],

    budgetOptions: [
      {
        tier: 'Basic Package ($8,000 - $15,000)',
        includes: [
          'Class 2 sound level meter',
          'Dodecahedron sound source',
          'Small power amplifier (100W)',
          'Basic accessories',
        ],
        suitable: 'Screening measurements, basic compliance checks',
      },
      {
        tier: 'Professional Package ($20,000 - $35,000)',
        includes: [
          'Class 1 precision sound level meter',
          'High-power dodecahedron source',
          'Professional power amplifier (200W+)',
          'Tapping machine',
          'Building acoustics software',
          'Complete accessory set',
        ],
        suitable: 'Official testing, consultant work, comprehensive measurements',
      },
      {
        tier: 'Advanced Package ($40,000+)',
        includes: [
          'Multi-channel analyzer',
          'Multiple sound sources',
          'High-power amplification',
          'Complete impact sources',
          'Advanced software suite',
          'Extended frequency range equipment',
        ],
        suitable: 'Research, large-scale projects, specialized testing',
      },
    ],

    selectionCriteria: [
      {
        criterion: 'Frequency Range',
        consideration: 'Standard measurements: 100 Hz - 3.15 kHz, Extended: 50 Hz - 5 kHz for low-frequency issues',
      },
      {
        criterion: 'Accuracy Class',
        consideration: 'Class 1 for official/legal work, Class 2 acceptable for screening and internal QC',
      },
      {
        criterion: 'Software Integration',
        consideration: 'Automated measurement routines save time and reduce user errors in field testing',
      },
      {
        criterion: 'Portability',
        consideration: 'Consider weight and size for regular field work, especially for solo operators',
      },
      {
        criterion: 'Battery Life',
        consideration: 'Essential for full-day field work without access to mains power',
      },
    ],

    commonMistakes: [
      'Choosing Class 2 meter when Class 1 is required by local regulations',
      'Insufficient amplifier power for large rooms or high ambient noise',
      'Forgetting essential accessories like extension poles and microphone windscreens',
      'Not considering low-frequency capability when required by standards',
      'Overlooking software compatibility with existing equipment',
    ],

    tips: [
      'Always verify equipment meets your local building code requirements',
      'Consider rental for occasional use vs. purchase for regular testing',
      'Factor in calibration and service costs when budgeting',
      'Choose modular systems that can be expanded as needs grow',
      'Ensure adequate training in measurement standards and techniques',
    ],

    nextSteps: [
      'Review applicable standards and regulations for your region',
      'Determine required accuracy class and frequency range',
      'Assess measurement frequency and whether rental or purchase makes sense',
      'Contact suppliers for equipment demonstrations',
      'Budget for training and ongoing calibration',
    ],

    relatedProducts: ['sound level meter', 'building acoustics', 'sound source', 'tapping'],
  },

  'noise-monitoring-system': {
    title: 'Noise Monitoring System - Comprehensive Selection Guide',
    title_th: 'คู่มือการเลือกระบบตรวจสอบเสียงรบกวน',
    readTime: '12 min read',
    level: 'Beginner to Intermediate',
    lastUpdated: 'November 2025',
    
    introduction: {
      text: 'Environmental noise monitoring is critical for ensuring compliance with regulations, protecting communities, and managing noise impact from construction, industrial, and transportation sources. This guide will help you select an appropriate noise monitoring system.',
      text_th: 'การตรวจสอบเสียงรบกวนสิ่งแวดล้อมมีความสำคัญอย่างยิ่งในการรับประกันการปฏิบัติตามกฎระเบียบ การปกป้องชุมชน และการจัดการผลกระทบจากเสียงรบกวนจากการก่อสร้าง อุตสาหกรรม และแหล่งการขนส่ง คู่มือนี้จะช่วยคุณเลือกระบบตรวจสอบเสียงรบกวนที่เหมาะสม',
    },

    keyApplications: [
      {
        title: 'Construction Site Monitoring',
        description: 'Continuous monitoring to ensure compliance with noise limits and time restrictions',
        duration: 'Days to months',
      },
      {
        title: 'Airport Noise Management',
        description: 'Long-term monitoring around airports to track aircraft noise exposure',
        duration: 'Permanent installation',
      },
      {
        title: 'Industrial Facility Compliance',
        description: 'Boundary monitoring to verify compliance with environmental permits',
        duration: 'Permanent or campaign',
      },
      {
        title: 'Traffic Noise Assessment',
        description: 'Monitoring of road and rail noise impact on nearby communities',
        duration: 'Weeks to permanent',
      },
      {
        title: 'Community Complaint Investigation',
        description: 'Short-term monitoring to characterize reported noise issues',
        duration: 'Days to weeks',
      },
    ],

    essentialFeatures: [
      {
        feature: 'Weather Protection',
        details: 'IP65 or higher rating, all-weather enclosure for outdoor installation',
        importance: 'Critical',
      },
      {
        feature: 'Class 1 Meter',
        details: 'Precision-grade sound level meter for legal defensibility',
        importance: 'Highly Recommended',
      },
      {
        feature: 'Remote Access',
        details: 'Cellular, WiFi, or Ethernet connectivity for remote monitoring and data download',
        importance: 'Highly Recommended',
      },
      {
        feature: 'Data Storage',
        details: 'Sufficient memory for campaign duration (typically 30+ days of continuous recording)',
        importance: 'Essential',
      },
      {
        feature: 'Power Supply',
        details: 'Mains power with battery backup, or solar power for remote locations',
        importance: 'Essential',
      },
      {
        feature: 'Alert System',
        details: 'Real-time alerts via SMS/email when noise limits are exceeded',
        importance: 'Important',
      },
      {
        feature: 'Audio Recording',
        details: 'Triggered audio capture for noise event verification and analysis',
        importance: 'Important',
      },
    ],

    systemTypes: [
      {
        type: 'Portable Monitoring Station',
        description: 'Self-contained unit with tripod mounting, battery/solar power',
        bestFor: 'Short-term campaigns, flexible deployment, construction monitoring',
        priceRange: '$8,000 - $20,000',
      },
      {
        type: 'Permanent Monitoring Station',
        description: 'Weatherproof pole-mounted system with mains power and communications',
        bestFor: 'Long-term monitoring, airports, highways, industrial facilities',
        priceRange: '$15,000 - $40,000',
      },
      {
        type: 'Multi-Point Network',
        description: 'Connected array of monitoring stations with central data management',
        bestFor: 'Large projects, smart city applications, comprehensive coverage',
        priceRange: '$50,000+ (depends on number of stations)',
      },
    ],

    selectionCriteria: [
      {
        criterion: 'Monitoring Duration',
        consideration: 'Short-term: portable systems, Long-term: permanent installations',
      },
      {
        criterion: 'Location Access',
        consideration: 'Limited access or power: choose solar-powered with remote capabilities',
      },
      {
        criterion: 'Regulatory Requirements',
        consideration: 'Some jurisdictions require Class 1 meters and specific measurement parameters',
      },
      {
        criterion: 'Data Management',
        consideration: 'Consider cloud-based platforms vs. local software for data analysis',
      },
      {
        criterion: 'Expandability',
        consideration: 'Choose systems that can grow from single station to multi-point networks',
      },
    ],

    commonMistakes: [
      'Underestimating power requirements for long-term monitoring',
      'Not factoring in cellular data costs for remote connectivity',
      'Choosing equipment without proper weather protection',
      'Insufficient data storage capacity for the monitoring period',
      'Ignoring need for anti-theft and vandalism protection',
    ],

    tips: [
      'Select systems with proven field reliability and weather resistance',
      'Consider total cost of ownership including data plans and maintenance',
      'Ensure software generates reports in required format for your jurisdiction',
      'Plan for periodic on-site calibration and maintenance',
      'Choose equipment that can measure additional parameters (vibration, meteorology) if needed',
    ],

    nextSteps: [
      'Define monitoring objectives and duration',
      'Identify applicable noise regulations and limits',
      'Assess site conditions (power, internet, security)',
      'Determine budget including installation and ongoing costs',
      'Request demos or trial periods from vendors',
    ],

    relatedProducts: ['noise monitor', 'environmental', 'outdoor', 'terminal'],
  },
  
  'sound-intensity-measurement': {
    title: 'Sound Intensity Measurement - Complete Guide',
    title_th: 'คู่มือการวัดความเข้มเสียง',
    readTime: '15 min read',
    level: 'Advanced',
    lastUpdated: 'November 2025',
    
    introduction: {
      text: 'Sound intensity measurement is a powerful technique that allows engineers and acousticians to measure both the magnitude and direction of sound energy flow. Unlike traditional sound pressure measurements, intensity probes can determine sound power in situ, identify noise sources in complex environments, and work effectively even in the presence of high background noise.',
      text_th: 'การวัดความเข้มเสียงเป็นเทคนิคที่ทรงพลังที่ช่วยให้วิศวกรและนักอะคูสติกวัดทั้งขนาดและทิศทางของการไหลของพลังงานเสียง ต่างจากการวัดความดันเสียงแบบดั้งเดิม เครื่องวัดความเข้มสามารถกำหนดกำลังเสียงในสถานที่ ระบุแหล่งกำเนิดเสียงรบกวนในสภาพแวดล้อมที่ซับซ้อน และทำงานได้อย่างมีประสิทธิภาพแม้ในที่ที่มีเสียงพื้นหลังสูง',
    },

    keyMeasurements: [
      {
        title: 'Sound Power Determination',
        description: 'Measure sound power of machinery and equipment in situ without requiring special test facilities',
        standard: 'ISO 9614-1, ISO 9614-2, ISO 9614-3',
      },
      {
        title: 'Noise Source Identification',
        description: 'Pinpoint specific noise sources on complex machinery by mapping sound intensity distribution',
        standard: 'ISO 9614-2',
      },
      {
        title: 'Noise Path Analysis',
        description: 'Identify dominant transmission paths in vehicles, buildings, and industrial equipment',
        standard: 'ISO 9614',
      },
      {
        title: 'Transmission Loss Measurement',
        description: 'Evaluate sound insulation performance of panels, partitions, and enclosures',
        standard: 'ASTM E2249',
      },
    ],

    essentialEquipment: [
      {
        item: 'Sound Intensity Probe',
        details: 'Two-microphone probe with precise phase matching and calibrated spacer (typically 6mm, 12mm, 50mm spacers)',
        priority: 'Essential',
      },
      {
        item: 'Sound Intensity Analyzer',
        details: 'Real-time dual-channel FFT analyzer with intensity processing algorithms',
        priority: 'Essential',
      },
      {
        item: 'Intensity Calibrator',
        details: 'Specialized calibrator for verifying probe phase match and pressure-intensity index',
        priority: 'Essential',
      },
      {
        item: 'Measurement Software',
        details: 'Software for intensity mapping, sound power calculation, and data visualization',
        priority: 'Highly Recommended',
      },
      {
        item: 'Positioning System',
        details: 'Mechanical scanning frame or robotic arm for automated measurements (optional but valuable)',
        priority: 'Optional',
      },
    ],

    budgetOptions: [
      {
        tier: 'Entry System ($15,000 - $25,000)',
        includes: [
          'Basic intensity probe with one spacer',
          'Two-channel FFT analyzer',
          'Intensity calibrator',
          'Basic software',
        ],
        suitable: 'Occasional sound power measurements, educational purposes',
      },
      {
        tier: 'Professional System ($30,000 - $50,000)',
        includes: [
          'Precision intensity probe with multiple spacers',
          'Advanced real-time analyzer',
          'Professional calibrator',
          'Comprehensive software with mapping',
          'Accessories and carrying case',
        ],
        suitable: 'Regular consultancy work, R&D testing, product development',
      },
      {
        tier: 'Advanced System ($60,000+)',
        includes: [
          'Multi-probe capability',
          'Automated scanning system',
          'Integration with acoustic cameras',
          'Advanced visualization software',
          'Complete accessory set',
        ],
        suitable: 'Research institutions, automotive NVH, aerospace applications',
      },
    ],

    selectionCriteria: [
      {
        criterion: 'Frequency Range',
        consideration: 'Spacer selection crucial: 6mm for high freq (up to 6.3kHz), 12mm for mid freq (up to 3.15kHz), 50mm for low freq (down to 50Hz)',
      },
      {
        criterion: 'Phase Match',
        consideration: 'Microphone phase match must be within 0.2° - regular calibration essential for accuracy',
      },
      {
        criterion: 'Pressure-Intensity Index',
        consideration: 'Indicates measurement quality - should be < 7 dB for valid results, challenging in reverberant fields',
      },
      {
        criterion: 'Scanning Technique',
        consideration: 'Manual scanning requires skilled operator - automated systems ensure repeatability and reduce fatigue',
      },
      {
        criterion: 'Background Noise',
        consideration: 'Intensity method works well with high background noise - major advantage over sound pressure methods',
      },
    ],

    commonMistakes: [
      'Using incorrect spacer for measurement frequency range',
      'Failing to verify phase match before measurements',
      'Ignoring pressure-intensity index warnings',
      'Improper scanning speed and technique',
      'Inadequate measurement surface definition',
      'Not accounting for reactive intensity near sources',
    ],

    tips: [
      'Ensure analyzer has true intensity processing (not just simultaneous pressure measurement)',
      'Check microphone phase matching specifications - critical for accuracy',
      'Consider frequency range requirements before selecting spacer set',
      'Evaluate software capabilities for mapping and visualization',
      'Budget for regular calibration services and microphone maintenance',
      'Consider training requirements - intensity measurement requires skill',
    ],

    nextSteps: [
      'Define specific applications (sound power, source identification, etc.)',
      'Determine required frequency range for measurements',
      'Assess need for automated vs. manual scanning',
      'Budget for equipment, training, and ongoing calibration',
      'Review applicable standards (ISO 9614 series, ASTM E2249)',
      'Request demonstration from suppliers',
    ],

    relatedProducts: ['intensity probe', 'microphone', 'analyzer', 'vibration'],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const guide = guideContent[decodedSlug];
  
  if (!guide) {
    return {
      title: 'Guide Not Found | Placid Asia',
    };
  }
  
  return {
    title: `${guide.title} | Placid Asia`,
    description: guide.introduction.text.substring(0, 160),
    keywords: guide.relatedProducts.join(', '),
  };
}

export default async function GuideDetailPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const guide = guideContent[decodedSlug];

  if (!guide) {
    notFound();
  }

  // Fetch related products
  const products = await prisma.product.findMany({
    where: {
      active: true,
    },
    take: 100,
  });

  // Get all categories
  const allCategories = await prisma.category.findMany({
    where: {
      active: true,
    },
  });

  // Filter products based on related keywords
  const relatedProducts = products.filter((product) => {
    const category = allCategories.find(c => c.name_en === product.category);
    const searchText = `${product.title_en} ${product.description_en} ${category?.name_en || ''}`.toLowerCase();
    return guide.relatedProducts.some((keyword: string) => searchText.includes(keyword.toLowerCase()));
  }).slice(0, 6);

  const productsWithMedia = relatedProducts.map((product) => {
    return {
      ...product,
      images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
      pdfs: typeof product.pdfs === 'string' ? JSON.parse(product.pdfs) : product.pdfs,
    };
  });

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          href="/guides" 
          className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Guides
        </Link>
      </div>

      {/* Guide Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{guide.level}</Badge>
              <Badge variant="secondary">{guide.readTime}</Badge>
              <Badge variant="secondary">Updated: {guide.lastUpdated}</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {guide.title}
            </h1>
            <p className="text-lg text-white/80">{guide.title_th}</p>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-3">{guide.introduction.text}</p>
              <p className="text-sm text-muted-foreground italic">{guide.introduction.text_th}</p>
            </div>

            {/* Key Measurements or Applications */}
            {guide.keyMeasurements && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="w-6 h-6 mr-2 text-accent" />
                    Key Measurements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {guide.keyMeasurements.map((measurement: any, index: number) => (
                      <div key={index} className="border-l-4 border-accent pl-4">
                        <h4 className="font-semibold mb-1">{measurement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{measurement.description}</p>
                        <Badge variant="outline" className="text-xs">{measurement.standard}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {guide.keyApplications && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="w-6 h-6 mr-2 text-accent" />
                    Key Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {guide.keyApplications.map((app: any, index: number) => (
                      <div key={index} className="border-l-4 border-accent pl-4">
                        <h4 className="font-semibold mb-1">{app.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{app.description}</p>
                        <Badge variant="outline" className="text-xs">Duration: {app.duration}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Essential Equipment/Features */}
            {guide.essentialEquipment && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Essential Equipment</h2>
                <div className="space-y-3">
                  {guide.essentialEquipment.map((equipment: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2 flex items-center">
                              <CheckCircle className="w-5 h-5 mr-2 text-accent" />
                              {equipment.item}
                            </h4>
                            <p className="text-sm text-muted-foreground">{equipment.details}</p>
                          </div>
                          <Badge variant={equipment.priority === 'Essential' ? 'default' : 'secondary'} className="ml-4">
                            {equipment.priority}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {guide.essentialFeatures && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Essential Features</h2>
                <div className="space-y-3">
                  {guide.essentialFeatures.map((feature: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2 flex items-center">
                              <CheckCircle className="w-5 h-5 mr-2 text-accent" />
                              {feature.feature}
                            </h4>
                            <p className="text-sm text-muted-foreground">{feature.details}</p>
                          </div>
                          <Badge variant={feature.importance === 'Critical' || feature.importance === 'Essential' ? 'default' : 'secondary'} className="ml-4">
                            {feature.importance}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Budget Options or System Types */}
            {guide.budgetOptions && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Budget Options</h2>
                <div className="grid md:grid-cols-1 gap-4">
                  {guide.budgetOptions.map((option: any, index: number) => (
                    <Card key={index} className="border-2 hover:border-accent transition-colors">
                      <CardHeader>
                        <CardTitle className="text-xl">{option.tier}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-4">
                          {option.includes.map((item: string, i: number) => (
                            <li key={i} className="flex items-start text-sm">
                              <CheckCircle className="w-4 h-4 mr-2 text-accent mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="bg-muted/50 p-3 rounded">
                          <p className="text-sm font-semibold mb-1">Suitable for:</p>
                          <p className="text-sm text-muted-foreground">{option.suitable}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {guide.systemTypes && (
              <div>
                <h2 className="text-2xl font-bold mb-6">System Types</h2>
                <div className="space-y-4">
                  {guide.systemTypes.map((system: any, index: number) => (
                    <Card key={index} className="border-2">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center justify-between">
                          {system.type}
                          <Badge variant="secondary">{system.priceRange}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{system.description}</p>
                        <div className="bg-accent/10 p-3 rounded">
                          <p className="text-sm font-semibold mb-1">Best for:</p>
                          <p className="text-sm">{system.bestFor}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Selection Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>Selection Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {guide.selectionCriteria.map((criteria: any, index: number) => (
                    <div key={index}>
                      <h4 className="font-semibold mb-1">{criteria.criterion}</h4>
                      <p className="text-sm text-muted-foreground">{criteria.consideration}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Mistakes */}
            <Card className="border-yellow-500/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-yellow-500" />
                  Common Mistakes to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guide.commonMistakes.map((mistake: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-500 mr-2 mt-1">⚠</span>
                      <span className="text-sm">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pro Tips */}
            <Card className="border-accent/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-accent" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guide.tips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2">💡</span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2 text-accent" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {guide.nextSteps.map((step: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Badge className="mr-3 mt-0.5 flex-shrink-0" variant="outline">{index + 1}</Badge>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {productsWithMedia.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Recommended Products</h2>
              <ProductGrid products={productsWithMedia} />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Personalized Advice?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team can help you configure the perfect system for your specific application and budget.
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
