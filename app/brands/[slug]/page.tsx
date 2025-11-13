
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
  'norsonic-soundtec': {
    description_en: 'Combined premium acoustic and vibration measurement equipment from Norsonic and Soundtec.',
    description_th: 'อุปกรณ์วัดเสียงและการสั่นสะเทือนระดับพรีเมียมจาก Norsonic และ Soundtec',
    specialization_en: 'Complete Acoustic Solutions, Building Testing, Environmental Monitoring',
    specialization_th: 'โซลูชันอะคูสติกที่สมบูรณ์ การทดสอบอาคาร การตรวจสอบสิ่งแวดล้อม',
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
  
  // Convert slug to supplier name (handle both formats)
  let supplierName = decodedSlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Get products for this supplier
  let products = await prisma.product.findMany({
    where: {
      active: true,
      supplier: supplierName,
    },
  });

  // If no products found and slug is 'norsonic-soundtec', get products with null supplier
  if (products.length === 0 && decodedSlug === 'norsonic-soundtec') {
    products = await prisma.product.findMany({
      where: {
        active: true,
        OR: [
          { supplier: null },
          { supplier: 'Norsonic' },
          { supplier: 'Soundtec' },
        ],
      },
    });
    supplierName = 'Norsonic/Soundtec';
  }

  if (products.length === 0) {
    notFound();
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
