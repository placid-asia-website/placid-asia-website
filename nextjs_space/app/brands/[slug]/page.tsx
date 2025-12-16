
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/product-grid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, Building2, ExternalLink, Package } from 'lucide-react';
import { Metadata } from 'next';

// Brand information (same as in brands page)
const brandInfo: Record<string, {
  description_en: string;
  description_th: string;
  website?: string;
  specialization_en: string;
  specialization_th: string;
}> = {
  'norsonic': {
    description_en: 'World-leading manufacturer of precision sound and vibration measurement instruments.',
    description_th: 'ผู้ผลิตเครื่องมือวัดเสียงและการสั่นสะเทือนชั้นนำของโลก',
    website: 'https://www.norsonic.com',
    specialization_en: 'Sound Level Meters, Vibration Meters, Building Acoustics',
    specialization_th: 'เครื่องวัดระดับเสียง เครื่องวัดการสั่นสะเทือน อะคูสติกอาคาร',
  },
  'soundtec': {
    description_en: 'European leader in acoustic testing equipment and sound insulation measurement systems.',
    description_th: 'ผู้นำในยุโรปด้านอุปกรณ์ทดสอบอะคูสติกและระบบวัดฉนวนกันเสียง',
    website: 'https://www.soundtec.eu',
    specialization_en: 'Building Acoustics, Sound Insulation, Impact Sound Testing',
    specialization_th: 'อะคูสติกอาคาร ฉนวนกันเสียง การทดสอบเสียงกระแทก',
  },
  'spektra-dresden': {
    description_en: 'German manufacturer of professional vibration measurement and modal analysis systems.',
    description_th: 'ผู้ผลิตเยอรมันของระบบวัดการสั่นสะเทือนและการวิเคราะห์โมดอลระดับมืออาชีพ',
    website: 'https://www.spektra-dresden.com',
    specialization_en: 'Vibration Analysis, Modal Testing, Structural Dynamics',
    specialization_th: 'การวิเคราะห์การสั่นสะเทือน การทดสอบโมดอล พลศาสตร์โครงสร้าง',
  },
  'placid-instruments': {
    description_en: 'Innovative developers of acoustic impedance tubes and sound testing equipment.',
    description_th: 'ผู้พัฒนาท่อวัดอิมพีแดนซ์อะคูสติกและอุปกรณ์ทดสอบเสียงที่เป็นนวัตกรรม',
    website: 'https://www.placidinstruments.com',
    specialization_en: 'Impedance Tubes, Material Testing, Absorption Measurement',
    specialization_th: 'ท่อวัดอิมพีแดนซ์ การทดสอบวัสดุ การวัดการดูดซับเสียง',
  },
  'aps-dynamics': {
    description_en: 'Advanced provider of electro-dynamic shakers and vibration test systems.',
    description_th: 'ผู้ให้บริการขั้นสูงของเครื่องเขย่าแบบไฟฟ้าและระบบทดสอบการสั่นสะเทือน',
    website: 'https://www.apsdynamics.com',
    specialization_en: 'Vibration Shakers, Test Systems, Environmental Testing',
    specialization_th: 'เครื่องเขย่าสั่นสะเทือน ระบบทดสอบ การทดสอบสิ่งแวดล้อม',
  },
  'profound': {
    description_en: 'Dutch specialists in environmental noise monitoring and smart city solutions.',
    description_th: 'ผู้เชี่ยวชาญชาวดัตช์ในการตรวจสอบเสียงรบกวนสิ่งแวดล้อมและโซลูชันเมืองอัจฉริยะ',
    website: 'https://www.profound.nl',
    specialization_en: 'Noise Monitoring, Smart City, Environmental Compliance',
    specialization_th: 'การตรวจสอบเสียงรบกวน เมืองอัจฉริยะ การปฏิบัติตามข้อกำหนดสิ่งแวดล้อม',
  },
  'convergence-instruments': {
    description_en: 'Canadian innovators in audio and acoustic testing instruments.',
    description_th: 'ผู้สร้างนวัตกรรมชาวแคนาดาในเครื่องมือทดสอบเสียงและอะคูสติก',
    website: 'https://www.convergenceinstruments.com',
    specialization_en: 'Audio Testing, Acoustic Measurement, Signal Analysis',
    specialization_th: 'การทดสอบเสียง การวัดอะคูสติก การวิเคราะห์สัญญาณ',
  },
  'bedrock-elite': {
    description_en: 'Specialized manufacturers of precision acoustic and vibration sensors.',
    description_th: 'ผู้ผลิตเฉพาะทางของเซ็นเซอร์อะคูสติกและการสั่นสะเทือนที่แม่นยำ',
    website: 'https://www.bedrock-elite.com',
    specialization_en: 'Sensors, Transducers, Precision Measurement',
    specialization_th: 'เซ็นเซอร์ ตัวแปลงสัญญาณ การวัดที่แม่นยำ',
  },
  'soundplan': {
    description_en: 'Leading software developers for noise prediction and environmental acoustics.',
    description_th: 'ผู้พัฒนาซอฟต์แวร์ชั้นนำสำหรับการทำนายเสียงรบกวนและอะคูสติกสิ่งแวดล้อม',
    website: 'https://www.soundplan.eu',
    specialization_en: 'Noise Prediction, Mapping Software, Environmental Acoustics',
    specialization_th: 'การทำนายเสียงรบกวน ซอฟต์แวร์แผนที่เสียง อะคูสติกสิ่งแวดล้อม',
  },
  'sarooma': {
    description_en: 'UK-based specialists in portable acoustic testing equipment.',
    description_th: 'ผู้เชี่ยวชาญในสหราชอาณาจักรด้านอุปกรณ์ทดสอบอะคูสติกแบบพกพา',
    website: 'https://www.sarooma.com',
    specialization_en: 'Portable Equipment, Field Testing, Building Acoustics',
    specialization_th: 'อุปกรณ์พกพา การทดสอบภาคสนาม อะคูสติกอาคาร',
  },
  'dbsea': {
    description_en: 'Marine and underwater acoustic measurement specialists.',
    description_th: 'ผู้เชี่ยวชาญด้านการวัดเสียงใต้น้ำและทางทะเล',
    website: 'https://www.dbsea.co.uk',
    specialization_en: 'Underwater Acoustics, Marine Monitoring, Hydrophones',
    specialization_th: 'อะคูสติกใต้น้ำ การตรวจสอบทางทะเล ไฮโดรโฟน',
  },
  'femtools': {
    description_en: 'Advanced finite element model correlation and updating software.',
    description_th: 'ซอฟต์แวร์ขั้นสูงสำหรับความสัมพันธ์และการอัปเดตแบบจำลองไฟไนต์เอลิเมนต์',
    website: 'https://www.femtools.com',
    specialization_en: 'FEM Analysis, Model Updating, Structural Simulation',
    specialization_th: 'การวิเคราะห์ FEM การอัปเดตโมเดล การจำลองโครงสร้าง',
  },
  'soundinsight': {
    description_en: 'Acoustic consultancy and measurement service providers.',
    description_th: 'ผู้ให้บริการที่ปรึกษาและการวัดอะคูสติก',
    website: 'https://www.soundinsight.nl',
    specialization_en: 'Acoustic Consulting, Measurement Services, Analysis',
    specialization_th: 'ที่ปรึกษาอะคูสติก บริการวัด การวิเคราะห์',
  },
  'sound-of-numbers': {
    description_en: 'Innovative acoustic data analysis and visualization software.',
    description_th: 'ซอฟต์แวร์การวิเคราะห์และแสดงภาพข้อมูลอะคูสติกที่เป็นนวัตกรรม',
    website: 'https://www.soundofnumbers.net',
    specialization_en: 'Data Analysis, Visualization, Acoustic Software',
    specialization_th: 'การวิเคราะห์ข้อมูล การแสดงภาพ ซอฟต์แวร์อะคูสติก',
  },
  'spotnoise': {
    description_en: 'Real-time noise monitoring and compliance tracking systems.',
    description_th: 'ระบบตรวจสอบเสียงรบกวนและติดตามการปฏิบัติตามแบบเรียลไทม์',
    website: 'https://www.spotnoise.com',
    specialization_en: 'Real-time Monitoring, Compliance, Noise Tracking',
    specialization_th: 'การตรวจสอบแบบเรียลไทม์ การปฏิบัติตาม การติดตามเสียงรบกวน',
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const brandName = decodedSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `${brandName} Products | Placid Asia`,
    description: `Explore ${brandName} acoustic and vibration testing equipment. Professional measurement solutions for building acoustics, noise monitoring, and vibration analysis.`,
    keywords: `${brandName}, acoustic equipment, noise measurement, vibration testing, ${decodedSlug}`,
  };
}

export default async function BrandDetailPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  
  // Handle special cases for brands that don't exist or are actually products
  // SonArchitect is a product by Sound of Numbers, not a brand
  if (decodedSlug === 'sonarchitect' || decodedSlug === 'son-architect') {
    // Show helpful message with links
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-accent/20 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Looking for SONarchitect?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              SONarchitect is a professional acoustic simulation software product, not a brand.
              It's manufactured by <strong>Sound of Numbers</strong>.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/brands/sound-of-numbers" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
              >
                <Building2 className="h-4 w-4" />
                View Sound of Numbers Brand
              </Link>
              <Link 
                href="/products/SONARCHITECT-SONARCHITECT" 
                className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-md hover:bg-accent/10"
              >
                <Package className="h-4 w-4" />
                View SONarchitect Product
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Rion brand doesn't exist in our catalog
  if (decodedSlug === 'rion') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-accent/20 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Rion Brand Not Available</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Rion products are not currently available in our catalog. We offer similar high-quality 
              sound level meters and acoustic measurement equipment from other leading manufacturers.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Recommended alternatives:</strong> Norsonic, Bedrock Elite, or contact us for assistance.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/brands" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
              >
                <Building2 className="h-4 w-4" />
                View All Brands
              </Link>
              <Link 
                href="/contact?subject=Rion Products Inquiry" 
                className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-md hover:bg-accent/10"
              >
                <ExternalLink className="h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Map of slug to supplier name variations
  const slugToSupplierMap: Record<string, string> = {
    'norsonic': 'Norsonic',
    'soundtec': 'Soundtec',
    'spektra-dresden': 'SPEKTRA Dresden',
    'placid-instruments': 'Placid Instruments',
    'aps-dynamics': 'APS Dynamics',
    'profound': 'Profound',
    'convergence-instruments': 'Convergence Instruments',
    'bedrock-elite': 'Bedrock Elite',
    'soundplan': 'SoundPLAN',
    'sarooma': 'Sarooma',
    'dbsea': 'dBSea',
    'femtools': 'FEMtools',
    'soundinsight': 'Soundinsight',
    'sound-of-numbers': 'Sound of Numbers',
    'spotnoise': 'SpotNoise',
  };

  // Get supplier name from mapping or convert slug
  let supplierName = slugToSupplierMap[decodedSlug] || decodedSlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Get products for this supplier
  let products = await prisma.product.findMany({
    where: {
      active: true,
      supplier: supplierName,
    },
  });

  if (products.length === 0) {
    notFound();
  }

  // Apply brand-specific sorting based on user feedback
  if (decodedSlug === 'norsonic') {
    // Norsonic: Sort by SKU, instruments first, then microphones/sensors, software, lastly accessories
    products.sort((a, b) => {
      const catA = (a.category || '').toLowerCase()
      const catB = (b.category || '').toLowerCase()
      const titleA = a.title_en.toLowerCase()
      const titleB = b.title_en.toLowerCase()
      
      // Priority: instruments > microphones/sensors > software > accessories/cables/cases
      const getPriority = (cat: string, title: string) => {
        if (cat.includes('sound level') || cat.includes('measurement') || cat.includes('analyzer')) return 1
        if (cat.includes('microphone') || cat.includes('sensor')) return 2
        if (cat.includes('software')) return 3
        if (cat.includes('case') || cat.includes('cable') || cat.includes('tripod') || cat.includes('adaptor') || title.includes('cable') || title.includes('case')) return 4
        return 2 // default to middle priority
      }
      
      const priorityA = getPriority(catA, titleA)
      const priorityB = getPriority(catB, titleB)
      
      if (priorityA !== priorityB) return priorityA - priorityB
      
      // Within same priority, sort by SKU
      return a.sku.localeCompare(b.sku)
    })
  } else if (decodedSlug === 'placid-instruments') {
    // Placid Instruments: impedance kit first, then microphones, then sets, then artificial head, then DAQs
    products.sort((a, b) => {
      const titleA = a.title_en.toLowerCase()
      const titleB = b.title_en.toLowerCase()
      
      const getPriority = (title: string) => {
        if (title.includes('impedance')) return 1
        if (title.includes('microphone') && !title.includes('set')) return 2
        if (title.includes('microphone') && title.includes('set')) return 3
        if (title.includes('sound power')) return 4
        if (title.includes('artificial head')) return 5
        if (title.includes('daq') || title.includes('data acquisition')) return 6
        if (title.includes('iepe') || title.includes('power supply')) return 7
        if (title.includes('array')) return 8
        return 9
      }
      
      const priorityA = getPriority(titleA)
      const priorityB = getPriority(titleB)
      
      return priorityA - priorityB
    })
  } else if (decodedSlug === 'aps-dynamics') {
    // APS Dynamics: Shakers first, then amplifiers
    products.sort((a, b) => {
      const titleA = a.title_en.toLowerCase()
      const titleB = b.title_en.toLowerCase()
      
      if (titleA.includes('shaker') && !titleB.includes('shaker')) return -1
      if (!titleA.includes('shaker') && titleB.includes('shaker')) return 1
      if (titleA.includes('amplifier') && !titleB.includes('amplifier')) return -1
      if (!titleA.includes('amplifier') && titleB.includes('amplifier')) return 1
      
      return a.sku.localeCompare(b.sku)
    })
  } else if (decodedSlug === 'convergence-instruments') {
    // Convergence: Use same sorting as convergenceinstruments.com (by product type)
    products.sort((a, b) => {
      const skuA = a.sku.toLowerCase()
      const skuB = b.sku.toLowerCase()
      
      // ACAM, NSRT, VSEW order
      if (skuA.includes('acam') && !skuB.includes('acam')) return -1
      if (!skuA.includes('acam') && skuB.includes('acam')) return 1
      if (skuA.includes('nsrt') && !skuB.includes('nsrt')) return -1
      if (!skuA.includes('nsrt') && skuB.includes('nsrt')) return 1
      if (skuA.includes('vsew') && !skuB.includes('vsew')) return -1
      if (!skuA.includes('vsew') && skuB.includes('vsew')) return 1
      
      return a.sku.localeCompare(b.sku)
    })
  }

  // Get all categories to build category breakdown
  const allCategories = await prisma.category.findMany({
    where: {
      active: true,
    },
  });

  // Map products to include parsed media
  const productsWithMedia = products.map((product) => {
    return {
      ...product,
      images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
      pdfs: typeof product.pdfs === 'string' ? JSON.parse(product.pdfs) : product.pdfs,
    };
  });

  const brandInfoData = brandInfo[decodedSlug] || brandInfo['norsonic-soundtec'];

  // Get category breakdown
  const categoryBreakdown: Record<string, number> = {};
  productsWithMedia.forEach((product) => {
    const catName = product.category || 'Uncategorized';
    categoryBreakdown[catName] = (categoryBreakdown[catName] || 0) + 1;
  });

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          href="/brands" 
          className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Brands
        </Link>
      </div>

      {/* Brand Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Building2 className="w-16 h-16 mr-4" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {supplierName}
                </h1>
                <Badge variant="secondary" className="text-lg">
                  <Package className="w-4 h-4 mr-2" />
                  {products.length} {products.length === 1 ? 'Product' : 'Products'}
                </Badge>
              </div>
            </div>
            
            {brandInfoData && (
              <>
                <p className="text-xl mb-4 font-semibold text-accent">
                  {brandInfoData.specialization_en}
                </p>
                <p className="text-lg mb-2 text-white/90">
                  {brandInfoData.description_en}
                </p>
                <p className="text-base text-white/80 mb-6">
                  {brandInfoData.description_th}
                </p>
                {brandInfoData.website && (
                  <a 
                    href={brandInfoData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-accent hover:underline text-lg"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Visit Official Website
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      {Object.keys(categoryBreakdown).length > 1 && (
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Product Categories</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(categoryBreakdown).map(([category, count]) => (
                  <Badge key={category} variant="outline" className="text-sm">
                    {category} ({count})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            All {supplierName} Products
          </h2>
          <ProductGrid products={productsWithMedia} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Technical Assistance?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team of experts can help you choose the right {supplierName} equipment for your specific needs.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-8 py-3 bg-accent text-primary-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
