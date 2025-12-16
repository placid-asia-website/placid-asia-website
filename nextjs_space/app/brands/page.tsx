
import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Building2, ExternalLink, Package } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brands & Suppliers | Placid Asia',
  description: 'Explore our trusted brands and suppliers of acoustic testing, noise monitoring, and vibration analysis equipment.',
  keywords: 'acoustic equipment brands, noise monitoring suppliers, vibration analysis manufacturers, Norsonic, Soundtec, SPEKTRA Dresden, Placid Instruments',
};

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Brand information with descriptions
const brandInfo: Record<string, {
  description_en: string;
  description_th: string;
  website?: string;
  specialization_en: string;
  specialization_th: string;
}> = {
  'Norsonic': {
    description_en: 'World-leading manufacturer of precision sound and vibration measurement instruments.',
    description_th: 'ผู้ผลิตเครื่องมือวัดเสียงและการสั่นสะเทือนชั้นนำของโลก',
    website: 'https://www.norsonic.com',
    specialization_en: 'Sound Level Meters, Vibration Meters, Building Acoustics',
    specialization_th: 'เครื่องวัดระดับเสียง เครื่องวัดการสั่นสะเทือน อะคูสติกอาคาร',
  },
  'Soundtec': {
    description_en: 'European leader in acoustic testing equipment and sound insulation measurement systems.',
    description_th: 'ผู้นำในยุโรปด้านอุปกรณ์ทดสอบอะคูสติกและระบบวัดฉนวนกันเสียง',
    website: 'https://www.soundtec.eu',
    specialization_en: 'Building Acoustics, Sound Insulation, Impact Sound Testing',
    specialization_th: 'อะคูสติกอาคาร ฉนวนกันเสียง การทดสอบเสียงกระแทก',
  },
  'SPEKTRA Dresden': {
    description_en: 'German manufacturer of professional vibration measurement and modal analysis systems.',
    description_th: 'ผู้ผลิตเยอรมันของระบบวัดการสั่นสะเทือนและการวิเคราะห์โมดอลระดับมืออาชีพ',
    website: 'https://www.spektra-dresden.com',
    specialization_en: 'Vibration Analysis, Modal Testing, Structural Dynamics',
    specialization_th: 'การวิเคราะห์การสั่นสะเทือน การทดสอบโมดอล พลศาสตร์โครงสร้าง',
  },
  'Placid Instruments': {
    description_en: 'Innovative developers of acoustic impedance tubes and sound testing equipment.',
    description_th: 'ผู้พัฒนาท่อวัดอิมพีแดนซ์อะคูสติกและอุปกรณ์ทดสอบเสียงที่เป็นนวัตกรรม',
    website: 'https://www.placidinstruments.com',
    specialization_en: 'Impedance Tubes, Material Testing, Absorption Measurement',
    specialization_th: 'ท่อวัดอิมพีแดนซ์ การทดสอบวัสดุ การวัดการดูดซับเสียง',
  },
  'APS Dynamics': {
    description_en: 'Advanced provider of electro-dynamic shakers and vibration test systems.',
    description_th: 'ผู้ให้บริการขั้นสูงของเครื่องเขย่าแบบไฟฟ้าและระบบทดสอบการสั่นสะเทือน',
    website: 'https://www.apsdynamics.com',
    specialization_en: 'Vibration Shakers, Test Systems, Environmental Testing',
    specialization_th: 'เครื่องเขย่าสั่นสะเทือน ระบบทดสอบ การทดสอบสิ่งแวดล้อม',
  },
  'Profound': {
    description_en: 'Dutch specialists in environmental noise monitoring and smart city solutions.',
    description_th: 'ผู้เชี่ยวชาญชาวดัตช์ในการตรวจสอบเสียงรบกวนสิ่งแวดล้อมและโซลูชันเมืองอัจฉริยะ',
    website: 'https://www.profound.nl',
    specialization_en: 'Noise Monitoring, Smart City, Environmental Compliance',
    specialization_th: 'การตรวจสอบเสียงรบกวน เมืองอัจฉริยะ การปฏิบัติตามข้อกำหนดสิ่งแวดล้อม',
  },
  'Convergence Instruments': {
    description_en: 'Canadian innovators in audio and acoustic testing instruments.',
    description_th: 'ผู้สร้างนวัตกรรมชาวแคนาดาในเครื่องมือทดสอบเสียงและอะคูสติก',
    website: 'https://www.convergenceinstruments.com',
    specialization_en: 'Audio Testing, Acoustic Measurement, Signal Analysis',
    specialization_th: 'การทดสอบเสียง การวัดอะคูสติก การวิเคราะห์สัญญาณ',
  },
  'Bedrock Elite': {
    description_en: 'Specialized manufacturers of precision acoustic and vibration sensors.',
    description_th: 'ผู้ผลิตเฉพาะทางของเซ็นเซอร์อะคูสติกและการสั่นสะเทือนที่แม่นยำ',
    website: 'https://www.bedrock-elite.com',
    specialization_en: 'Sensors, Transducers, Precision Measurement',
    specialization_th: 'เซ็นเซอร์ ตัวแปลงสัญญาณ การวัดที่แม่นยำ',
  },
  'SoundPLAN': {
    description_en: 'Leading software developers for noise prediction and environmental acoustics.',
    description_th: 'ผู้พัฒนาซอฟต์แวร์ชั้นนำสำหรับการทำนายเสียงรบกวนและอะคูสติกสิ่งแวดล้อม',
    website: 'https://www.soundplan.eu',
    specialization_en: 'Noise Prediction, Mapping Software, Environmental Acoustics',
    specialization_th: 'การทำนายเสียงรบกวน ซอฟต์แวร์แผนที่เสียง อะคูสติกสิ่งแวดล้อม',
  },
  'Sarooma': {
    description_en: 'UK-based specialists in portable acoustic testing equipment.',
    description_th: 'ผู้เชี่ยวชาญในสหราชอาณาจักรด้านอุปกรณ์ทดสอบอะคูสติกแบบพกพา',
    website: 'https://www.sarooma.com',
    specialization_en: 'Portable Equipment, Field Testing, Building Acoustics',
    specialization_th: 'อุปกรณ์พกพา การทดสอบภาคสนาม อะคูสติกอาคาร',
  },
  'dBSea': {
    description_en: 'Marine and underwater acoustic measurement specialists.',
    description_th: 'ผู้เชี่ยวชาญด้านการวัดเสียงใต้น้ำและทางทะเล',
    website: 'https://www.dbsea.co.uk',
    specialization_en: 'Underwater Acoustics, Marine Monitoring, Hydrophones',
    specialization_th: 'อะคูสติกใต้น้ำ การตรวจสอบทางทะเล ไฮโดรโฟน',
  },
  'FEMtools': {
    description_en: 'Advanced finite element model correlation and updating software.',
    description_th: 'ซอฟต์แวร์ขั้นสูงสำหรับความสัมพันธ์และการอัปเดตแบบจำลองไฟไนต์เอลิเมนต์',
    website: 'https://www.femtools.com',
    specialization_en: 'FEM Analysis, Model Updating, Structural Simulation',
    specialization_th: 'การวิเคราะห์ FEM การอัปเดตโมเดล การจำลองโครงสร้าง',
  },
  'Soundinsight': {
    description_en: 'Acoustic consultancy and measurement service providers.',
    description_th: 'ผู้ให้บริการที่ปรึกษาและการวัดอะคูสติก',
    website: 'https://www.soundinsight.nl',
    specialization_en: 'Acoustic Consulting, Measurement Services, Analysis',
    specialization_th: 'ที่ปรึกษาอะคูสติก บริการวัด การวิเคราะห์',
  },
  'Sound of Numbers': {
    description_en: 'Innovative acoustic data analysis and visualization software.',
    description_th: 'ซอฟต์แวร์การวิเคราะห์และแสดงภาพข้อมูลอะคูสติกที่เป็นนวัตกรรม',
    website: 'https://www.soundofnumbers.net',
    specialization_en: 'Data Analysis, Visualization, Acoustic Software',
    specialization_th: 'การวิเคราะห์ข้อมูล การแสดงภาพ ซอฟต์แวร์อะคูสติก',
  },
  'SpotNoise': {
    description_en: 'Real-time noise monitoring and compliance tracking systems.',
    description_th: 'ระบบตรวจสอบเสียงรบกวนและติดตามการปฏิบัติตามแบบเรียลไทม์',
    website: 'https://www.spotnoise.com',
    specialization_en: 'Real-time Monitoring, Compliance, Noise Tracking',
    specialization_th: 'การตรวจสอบแบบเรียลไทม์ การปฏิบัติตาม การติดตามเสียงรบกวน',
  },
  'MMF (Metra Mess- und Frequenztechnik)': {
    description_en: 'German manufacturer of precision vibration meters and measurement equipment.',
    description_th: 'ผู้ผลิตเยอรมันของเครื่องวัดการสั่นสะเทือนที่แม่นยำและอุปกรณ์วัด',
    website: 'https://www.mmf.de',
    specialization_en: 'Vibration Meters, Measurement Instrumentation, Precision Testing',
    specialization_th: 'เครื่องวัดการสั่นสะเทือน เครื่องมือวัด การทดสอบที่แม่นยำ',
  },
  'NoiseQC': {
    description_en: 'Advanced quality control and production line noise testing systems.',
    description_th: 'ระบบควบคุมคุณภาพขั้นสูงและการทดสอบเสียงในสายการผลิต',
    website: 'https://www.noiseqc.com',
    specialization_en: 'Quality Control, Production Testing, Acoustic Screening',
    specialization_th: 'การควบคุมคุณภาพ การทดสอบการผลิต การคัดกรองอะคูสติก',
  },
};

export default async function BrandsPage() {
  // Get all products with suppliers
  const products = await prisma.product.findMany({
    where: {
      active: true,
    },
    select: {
      supplier: true,
      sku: true,
    },
  });

  // Count products by supplier
  const supplierCounts: Record<string, number> = {};
  products.forEach((product) => {
    // Only count products with a valid supplier
    if (product.supplier) {
      supplierCounts[product.supplier] = (supplierCounts[product.supplier] || 0) + 1;
    }
  });

  // Sort suppliers alphabetically
  const sortedSuppliers = Object.entries(supplierCounts)
    .sort(([a], [b]) => a.localeCompare(b))  // Alphabetic sorting
    .map(([supplier, count]) => ({ supplier, count }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Building2 className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Brands & Suppliers
            </h1>
            <p className="text-xl text-white/90 mb-4">
              We partner with world-leading manufacturers to bring you the finest acoustic, noise, and vibration testing equipment
            </p>
            <p className="text-lg text-white/80">
              เราร่วมงานกับผู้ผลิตชั้นนำระดับโลกเพื่อนำเสนออุปกรณ์ทดสอบอะคูสติก เสียงรบกวน และการสั่นสะเทือนที่ดีที่สุด
            </p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Trusted Brands ({sortedSuppliers.length})
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of products from industry-leading manufacturers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSuppliers.map(({ supplier, count }) => {
              const info = brandInfo[supplier];
              return (
                <Link 
                  key={supplier} 
                  href={`/brands/${encodeURIComponent(supplier.toLowerCase().replace(/\s+/g, '-'))}`}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-accent">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Building2 className="w-10 h-10 text-accent" />
                        <Badge variant="secondary" className="text-sm">
                          <Package className="w-3 h-3 mr-1" />
                          {count} {count === 1 ? 'Product' : 'Products'}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl mb-2">{supplier}</CardTitle>
                      {info && (
                        <div className="space-y-2">
                          <p className="text-sm text-accent font-semibold">
                            {info.specialization_en}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {info.specialization_th}
                          </p>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      {info ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-2">
                            {info.description_en}
                          </p>
                          <p className="text-xs text-muted-foreground mb-4">
                            {info.description_th}
                          </p>
                          {info.website && (
                            <div className="flex items-center text-accent hover:underline text-sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Official Website
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Premium acoustic and vibration testing equipment
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Brands */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Choose Our Brands
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">1</Badge>
                    Proven Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All our brands meet international standards (ISO, IEC) and are certified for professional use.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    แบรนด์ทั้งหมดของเราเป็นไปตามมาตรฐานสากล (ISO, IEC) และได้รับการรับรองสำหรับการใช้งานระดับมืออาชีพ
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">2</Badge>
                    Technical Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Direct support from manufacturers and our expert team for installation, calibration, and troubleshooting.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    การสนับสนุนโดยตรงจากผู้ผลิตและทีมผู้เชี่ยวชาญของเราสำหรับการติดตั้ง สอบเทียบ และแก้ไขปัญหา
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">3</Badge>
                    Latest Technology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Access to cutting-edge measurement technology with regular firmware and software updates.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    เข้าถึงเทคโนโลยีการวัดที่ทันสมัยพร้อมการอัปเดตเฟิร์มแวร์และซอฟต์แวร์เป็นประจำ
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge variant="outline" className="mr-3 text-accent border-accent">4</Badge>
                    Warranty & Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive warranty coverage and local service support throughout Thailand and Southeast Asia.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    การรับประกันที่ครอบคลุมและการบริการในพื้นที่ทั่วประเทศไทยและเอเชียตะวันออกเฉียงใต้
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
            Need Help Choosing the Right Brand?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team of experts can help you select the perfect equipment for your specific application and budget.
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
