
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, MessageCircle, ExternalLink, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductGrid } from '@/components/product-grid'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { ContactForQuoteButton } from '@/components/contact-for-quote-button'
import { useLanguage } from '@/lib/language-context'
import { ProductWithRelations } from '@/lib/types'

interface ProductDetailClientProps {
  product: ProductWithRelations
  relatedProducts: ProductWithRelations[]
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { language, t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState(0)

  const images = product.images || []
  const pdfs = product.pdfs || []

  // Get features from product data or use defaults
  const keyFeatures = Array.isArray(product.features) && product.features.length > 0 
    ? product.features 
    : [
        'High precision measurement capabilities',
        'Professional-grade reliability',
        'Industry-standard compliance',
        'User-friendly operation',
        'Durable construction'
      ];
  
  // Get applications from product data or use defaults  
  const typicalApplications = Array.isArray(product.applications) && product.applications.length > 0
    ? product.applications
    : [
        'Environmental noise monitoring',
        'Building acoustics assessment',
        'Industrial noise control',
        'Research and development',
        'Quality control testing'
      ];
  
  // Get specifications from product data or use defaults
  const specificationsData = product.specifications && typeof product.specifications === 'object' 
    ? product.specifications 
    : {
        'Type': product.category || 'Professional Equipment',
        'Manufacturer': product.supplier || 'Industry Leading',
        'Standards Compliance': 'International Standards',
        'Application': 'Professional Use',
        'Warranty': 'Manufacturer Warranty Included'
      };
  
  const specifications = Object.entries(specificationsData).map(([parameter, specification]) => ({
    parameter,
    specification: String(specification)
  }));

  return (
    <div className="bg-background">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary transition-colors">
              {t('nav.products')}
            </Link>
            <span>/</span>
            <Link href={`/categories/${product.category}`} className="hover:text-primary transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.sku}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Link>
        </Button>

        {/* Product Header Section */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white border-2 border-muted rounded-lg overflow-hidden shadow-sm">
              {images?.[selectedImage] ? (
                <img
                  src={images[selectedImage]}
                  alt={language === 'en' ? product.title_en : product.title_th}
                  className="w-full h-full object-contain p-4"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted/30">
                  <FileText className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {images && images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white border-2 rounded-lg overflow-hidden hover:border-accent transition-colors ${
                      selectedImage === index ? 'border-accent ring-2 ring-accent/20' : 'border-muted'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title_en} ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Right Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title and Basic Info */}
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                {language === 'en' ? product.title_en : product.title_th}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {language === 'en' ? product.sku : product.title_th}
              </p>
              
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {t('categories.label')}: {product.category}
                </Badge>
                {pdfs && pdfs.length > 0 && (
                  <Badge variant="outline" className="text-sm">
                    <FileText className="h-3 w-3 mr-1" />
                    {pdfs.length} {t('product.documents')}
                  </Badge>
                )}
              </div>

              {/* Short Description */}
              <div className="prose prose-sm max-w-none mb-6">
                <p className="text-base leading-relaxed text-foreground">
                  {language === 'en' ? product.description_en : product.description_th}
                </p>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {product.has_pricing ? (
                <>
                  <AddToCartButton productSku={product.sku} />
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      {t('product.getInfo')}
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <ContactForQuoteButton productSku={product.sku} />
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      {t('product.contactPlacid')}
                    </Link>
                  </Button>
                </>
              )}
              
              {product.source_url && (
                <Button asChild variant="ghost" size="lg">
                  <a href={product.source_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    {t('product.manufacturerPage')}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="description" className="w-full mb-12">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="description" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-accent/10 px-6 py-3"
            >
              {t('product.description')}
            </TabsTrigger>
            <TabsTrigger 
              value="applications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-accent/10 px-6 py-3"
            >
              {t('product.applications')}
            </TabsTrigger>
            <TabsTrigger 
              value="features"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-accent/10 px-6 py-3"
            >
              {t('product.features')}
            </TabsTrigger>
            <TabsTrigger 
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-accent/10 px-6 py-3"
            >
              {t('product.specifications')}
            </TabsTrigger>
            <TabsTrigger 
              value="resources"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-accent/10 px-6 py-3"
            >
              {t('product.resources')}
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="description" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {t('product.overview')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-base leading-relaxed mb-4">
                    {language === 'en' ? product.description_en : product.description_th}
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === 'en' 
                      ? 'This product is a powerful solution designed to produce a uniform sound field for accurate measurements. Its construction design ensures consistent sound radiation in all directions, making it ideal for sound insulation tests. Despite its high sound power output of 123 dB, the unit weighs less than 5.3 kg and can operate for more than an hour on a single charge.'
                      : 'ผลิตภัณฑ์นี้เป็นโซลูชันที่ทรงพลังที่ออกแบบมาเพื่อสร้างสนามเสียงที่สม่ำเสมอสำหรับการวัดที่แม่นยำ การออกแบบโครงสร้างรับประกันการแผ่รังสีเสียงที่สอดคล้องกันในทุกทิศทาง ทำให้เหมาะสำหรับการทดสอบฉนวนกันเสียง แม้จะมีกำลังเสียงที่สูงถึง 123 เดซิเบล แต่หน่วยนี้มีน้ำหนักน้อยกว่า 5.3 กิโลกรัมและสามารถทำงานได้มากกว่าหนึ่งชั่วโมงต่อการชาร์จครั้งเดียว'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {t('product.applications')}
                  </CardTitle>
                  <CardDescription>
                    {t('product.applicationsDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {typicalApplications.map((app, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-base">{app}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {t('product.featuresTitle')}
                  </CardTitle>
                  <CardDescription>
                    {t('product.featuresDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                        <div className="rounded-full bg-accent/20 p-1 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-accent" />
                        </div>
                        <span className="text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {t('product.specsTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-accent/30">
                          <th className="text-left py-3 px-4 font-semibold bg-muted/50">
                            {t('product.parameter')}
                          </th>
                          <th className="text-left py-3 px-4 font-semibold bg-muted/50">
                            {t('product.specification')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {specifications.map((spec, index) => (
                          <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="py-3 px-4 font-medium text-primary">{spec.parameter}</td>
                            <td className="py-3 px-4">{spec.specification}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-accent">
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' 
                        ? 'For detailed specifications and compliance information, please visit the manufacturer\'s product page or download the resources below.'
                        : 'สำหรับข้อมูลจำเพาะโดยละเอียดและข้อมูลการปฏิบัติตาม โปรดไปที่หน้าผลิตภัณฑ์ของผู้ผลิตหรือดาวน์โหลดทรัพยากรด้านล่าง'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <FileText className="h-6 w-6 text-accent" />
                    {t('product.resources')}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Download product datasheets, manuals, and technical documentation'
                      : 'ดาวน์โหลดข้อมูลผลิตภัณฑ์ คู่มือ และเอกสารทางเทคนิค'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {pdfs && pdfs.length > 0 ? (
                    <div className="space-y-3">
                      {pdfs.map((pdf, index) => (
                        <Button
                          key={index}
                          asChild
                          variant="outline"
                          size="lg"
                          className="w-full justify-start hover:bg-accent/10 hover:border-accent transition-colors"
                        >
                          <a href={pdf} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-5 w-5 mr-3 text-accent" />
                            <div className="text-left">
                              <div className="font-semibold">
                                {language === 'en' ? `Product Datasheet ${index + 1}` : `ข้อมูลผลิตภัณฑ์ ${index + 1}`}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {language === 'en' ? 'PDF Document' : 'เอกสาร PDF'}
                              </div>
                            </div>
                            <ExternalLink className="h-4 w-4 ml-auto" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p>{language === 'en' ? 'No documents available for this product' : 'ไม่มีเอกสารสำหรับผลิตภัณฑ์นี้'}</p>
                    </div>
                  )}

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      {language === 'en' ? 'Need More Help?' : 'ต้องการความช่วยเหลือเพิ่มเติม?'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' 
                        ? 'Have any questions? See our FAQs below or get in touch.'
                        : 'มีคำถามใดๆ? ดูคำถามที่พบบ่อยด้านล่างหรือติดต่อเรา'}
                    </p>
                    <div className="flex gap-3">
                      <Button asChild variant="outline">
                        <Link href="/contact">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {language === 'en' ? 'Contact Support' : 'ติดต่อฝ่ายสนับสนุน'}
                        </Link>
                      </Button>
                      {product.source_url && (
                        <Button asChild variant="ghost">
                          <a href={product.source_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {language === 'en' ? 'Visit Manufacturer' : 'เยี่ยมชมผู้ผลิต'}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {/* Customer Questions Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">
              {language === 'en' ? 'Interested in this product?' : 'สนใจผลิตภัณฑ์นี้?'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Get more information about pricing, availability, and technical support'
                : 'รับข้อมูลเพิ่มเติมเกี่ยวกับราคา ความพร้อม และการสนับสนุนด้านเทคนิค'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link href={`/contact?product=${product.sku}`}>
                  {t('cart.requestQuote')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  {t('product.contactPlacid')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                {t('product.relatedProducts')}
              </h2>
              <Button asChild variant="ghost">
                <Link href={`/categories/${product.category}`}>
                  {language === 'en' ? 'View All' : 'ดูทั้งหมด'} →
                </Link>
              </Button>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  )
}
