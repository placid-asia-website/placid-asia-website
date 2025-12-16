
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { ProductDetailClient } from './product-detail-client'

export const dynamic = "force-dynamic"

interface ProductPageProps {
  params: { sku: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { 
      sku: decodeURIComponent(params.sku),
      active: true 
    }
  })

  if (!product) {
    notFound()
  }

  // Get related products from same category
  const relatedProductsRaw = await prisma.product.findMany({
    where: {
      category: product.category,
      sku: { not: product.sku },
      active: true
    },
    take: 4
  })

  // Convert raw products to proper format
  const relatedProducts = relatedProductsRaw.map(product => ({
    ...product,
    images: Array.isArray(product.images) ? product.images as string[] : [],
    pdfs: Array.isArray(product.pdfs) ? product.pdfs as string[] : []
  }))

  // Convert product to the format expected by client
  // Parse images from JSON string
  let parsedImages: string[] = []
  try {
    if (typeof product.images === 'string') {
      const parsed = JSON.parse(product.images)
      parsedImages = Array.isArray(parsed) 
        ? parsed.map((img: any) => typeof img === 'string' ? img : img.url) 
        : []
    } else if (Array.isArray(product.images)) {
      parsedImages = product.images.map((img: any) => typeof img === 'string' ? img : img.url)
    }
  } catch (e) {
    console.error('Error parsing product images:', e)
  }

  // Parse PDFs from JSON string  
  let parsedPdfs: string[] = []
  try {
    if (typeof product.pdfs === 'string') {
      const parsed = JSON.parse(product.pdfs)
      parsedPdfs = Array.isArray(parsed) ? parsed : []
    } else if (Array.isArray(product.pdfs)) {
      parsedPdfs = product.pdfs as string[]
    }
  } catch (e) {
    console.error('Error parsing product pdfs:', e)
  }
  
  const productData = {
    ...product,
    images: parsedImages,
    pdfs: parsedPdfs
  }

  // Enhanced Product structured data for SEO
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title_en,
    description: product.description_en,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.supplier || 'Placid Asia'
    },
    category: product.category,
    image: (product.images as string[])[0] || '/og-image.png',
    url: `https://placid.asia/products/${product.sku}`,
    manufacturer: {
      '@type': 'Organization',
      name: product.supplier || 'Placid Asia',
      url: 'https://placid.asia'
    },
    offers: product.has_pricing ? {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'THB',
      seller: {
        '@type': 'Organization',
        name: 'Placid Asia',
        url: 'https://placid.asia'
      }
    } : {
      '@type': 'Offer',
      availability: 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'Placid Asia',
        url: 'https://placid.asia'
      }
    }
  }

  // Add specific properties for key products
  if (product.sku.includes('IMPEDANCE') || product.sku.includes('PKT')) {
    Object.assign(baseStructuredData, {
      applicationCategory: 'Acoustic Testing Equipment',
      audience: {
        '@type': 'Audience',
        audienceType: 'Acoustic Engineers, Materials Testing Labs, R&D Facilities'
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Compliance Standard',
          value: 'ISO 10534-2, ASTM E2611'
        },
        {
          '@type': 'PropertyValue',
          name: 'Application',
          value: 'Sound Absorption Coefficient Measurement, Transmission Loss Testing'
        }
      ]
    })
  }

  if (product.sku.includes('PMP21') || product.sku === 'PMP21') {
    Object.assign(baseStructuredData, {
      applicationCategory: 'Measurement Microphones',
      audience: {
        '@type': 'Audience',
        audienceType: 'Acoustic Engineers, Noise Control Consultants, Environmental Testing Labs'
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Microphone Type',
          value: 'Free Field, IEC 61094-4 Compliant'
        },
        {
          '@type': 'PropertyValue',
          name: 'Class',
          value: 'IEC 61672 Class 1'
        },
        {
          '@type': 'PropertyValue',
          name: 'Calibration',
          value: 'Individually Calibrated'
        }
      ]
    })
  }

  if (product.sku.includes('SPE-PLUS') || product.sku.includes('SPE+')) {
    Object.assign(baseStructuredData, {
      '@type': 'SoftwareApplication',
      applicationCategory: 'Environmental Noise Software',
      operatingSystem: 'Windows',
      audience: {
        '@type': 'Audience',
        audienceType: 'Acoustic Consultants, Environmental Engineers, Urban Planners, EIA Specialists'
      },
      featureList: [
        'Unlimited Noise Sources and Receivers',
        'Road, Railway, and Industrial Noise Calculation',
        '3D Visualization and Modeling',
        'Multi-threaded Processing',
        'Grid Noise Maps and Contour Lines',
        'Building Acoustics Module',
        'Facade Noise Mapping',
        'OpenStreetMap Integration',
        '3D Directivity Modeling',
        'ISO 9613-2 Compliance',
        'CNOSSOS-EU Standard',
        'RLS-19 Standard'
      ],
      softwareRequirements: 'Windows PC with multi-core processor',
      applicationSubCategory: 'Noise Mapping and Sound Propagation Analysis',
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Standards Supported',
          value: 'ISO 9613-2, CNOSSOS-EU, RLS-19, RLS-90, NMPB 2008, TNM 3.0, Schall 03'
        },
        {
          '@type': 'PropertyValue',
          name: 'Calculation Types',
          value: 'Single Point, Limit Contour Lines, Grid Noise Maps'
        },
        {
          '@type': 'PropertyValue',
          name: 'License Type',
          value: 'Annual Subscription (Plus Version)'
        },
        {
          '@type': 'PropertyValue',
          name: 'Key Features',
          value: 'Unlimited model size, Multithreading, 3D visualization, Building Acoustics'
        }
      ]
    })
  }

  const structuredData = baseStructuredData;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetailClient product={productData} relatedProducts={relatedProducts} />
    </>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { 
      sku: decodeURIComponent(params.sku),
      active: true 
    }
  })

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    }
  }

  // Parse images JSON properly
  let productImages: string[] = []
  try {
    if (typeof product.images === 'string') {
      const parsed = JSON.parse(product.images)
      productImages = Array.isArray(parsed) 
        ? parsed.map((img: any) => typeof img === 'string' ? img : img.url) 
        : []
    } else if (Array.isArray(product.images)) {
      productImages = product.images.map((img: any) => typeof img === 'string' ? img : img.url)
    }
  } catch (e) {
    console.error('Error parsing product images:', e)
  }
  
  const firstImage = productImages[0] || '/og-image.png'
  
  // Enhanced SEO for specific key products
  let seoTitle = `${product.title_en} (${product.sku})`
  let seoDescription = product.description_en.substring(0, 160) + '... Professional acoustic measurement equipment from Placid Asia.'
  let seoKeywords = [
    product.title_en,
    product.sku,
    product.category,
    'acoustic measurement',
    'sound testing equipment',
    'professional instruments',
    'Thailand',
    'Asia Pacific'
  ]

  // Impedance Tube specific SEO
  if (product.sku.includes('IMPEDANCE') || product.sku.includes('PKT')) {
    seoTitle = `Impedance Tube for ISO 10534-2 & ASTM E2611 Testing | Placid Asia`
    seoDescription = `Turnkey impedance tube for sound absorption and transmission loss testing to ISO 10534-2 and ASTM E2611. Local support and calibration in Thailand. ${product.title_en}`
    seoKeywords = [
      'impedance tube ISO 10534-2',
      'ASTM E2611 impedance tube',
      'sound absorption testing',
      'transmission loss measurement',
      'Kundt tube',
      'acoustic material testing',
      'impedance tube Thailand',
      product.sku,
      ...seoKeywords
    ]
  }

  // PMP21 specific SEO
  if (product.sku.includes('PMP21') || product.sku === 'PMP21') {
    seoTitle = `PMP21 Class 1 Measurement Microphone IEC 61094-4 | Placid Asia`
    seoDescription = `½" prepolarized free-field measurement microphone for IEC 61672 Class 1 sound level meters and precision acoustic tests. Individually calibrated. Professional measurement microphones Thailand.`
    seoKeywords = [
      'PMP21 microphone',
      'Class 1 measurement microphone',
      'IEC 61094-4 microphone',
      'IEC 61672 Class 1',
      'free field microphone',
      'measurement microphone Thailand',
      '1/2 inch microphone',
      'calibrated microphone',
      product.sku,
      ...seoKeywords
    ]
  }

  // ANGEL Dosimeter specific SEO
  if (product.sku.includes('ANGEL') || product.sku.includes('PLACID-ANGEL')) {
    seoTitle = `PLACID ANGEL Personal Noise Dosimeter | Workplace Noise Monitoring Thailand`
    seoDescription = `Professional personal noise dosimeter for occupational noise exposure monitoring. Compact, lightweight, and IEC 61252 compliant. Ideal for workplace safety and hearing conservation programs in Thailand.`
    seoKeywords = [
      'ANGEL dosimeter',
      'personal noise dosimeter',
      'noise dosimeter Thailand',
      'workplace noise monitoring',
      'occupational noise exposure',
      'hearing conservation',
      'IEC 61252',
      'noise dose meter',
      'personal sound exposure meter',
      'industrial noise monitoring',
      'worker noise exposure',
      product.sku,
      ...seoKeywords
    ]
  }

  // LivePad specific SEO
  if (product.sku.includes('LIVEPAD') || product.title_en.toLowerCase().includes('livepad')) {
    seoTitle = `Soundtec LivePad Acoustic Measurement System | Real-time Analysis Thailand`
    seoDescription = `Advanced real-time acoustic analysis system with multi-channel capability. Perfect for building acoustics, environmental noise monitoring, and vibration testing. LivePad by Soundtec - available in Thailand.`
    seoKeywords = [
      'LivePad',
      'Soundtec LivePad',
      'real-time acoustic analyzer',
      'multi-channel analyzer',
      'acoustic measurement system',
      'building acoustics software',
      'noise monitoring system',
      'vibration analyzer',
      'LivePad Thailand',
      'Soundtec Thailand',
      product.sku,
      ...seoKeywords
    ]
  }

  // 24-channel DAQ specific SEO
  if (product.sku.includes('24-CHANNEL') || product.title_en.toLowerCase().includes('24 channel')) {
    seoTitle = `24 Channel Data Acquisition System | Soundtec DAQ for Dynamic Signals Thailand`
    seoDescription = `High-performance 24-channel data acquisition module for dynamic signal measurement. Ideal for NVH testing, vibration analysis, and multi-point acoustic measurements. Soundtec quality in Thailand.`
    seoKeywords = [
      '24 channel DAQ',
      '24-channel data acquisition',
      'multi-channel DAQ',
      'dynamic signal analyzer',
      'Soundtec DAQ',
      'vibration data acquisition',
      'NVH testing equipment',
      'acoustic data acquisition',
      'multi-point measurement',
      'DAQ Thailand',
      product.sku,
      ...seoKeywords
    ]
  }

  // NSRTW_MK4 Wireless Sound Level Meter specific SEO
  if (product.sku.includes('NSRTW_MK4') || product.sku.includes('NSRTW-MK4')) {
    seoTitle = `Convergence NSRTW MK4 Wireless Sound Level Meter | MQTT IoT Noise Monitoring Thailand`
    seoDescription = `Professional wireless sound level meter with MQTT connectivity for IoT noise monitoring. Real-time data logging, remote access, and cloud integration. Convergence Instruments NSRTW MK4 - Industrial grade noise monitoring in Thailand.`
    seoKeywords = [
      'NSRTW MK4',
      'NSRTW_MK4',
      'wireless sound level meter',
      'MQTT sound level meter',
      'IoT noise monitoring',
      'wireless noise monitor',
      'remote noise monitoring',
      'MEMS microphone',
      'Convergence Instruments',
      'industrial noise monitoring',
      'environmental noise logger',
      'wireless noise logger',
      'cloud noise monitoring',
      'MQTT IoT sensor',
      'smart noise monitoring',
      'noise monitoring Thailand',
      product.sku,
      ...seoKeywords
    ]
  }

  // VSEW_MK4 Wireless Vibration Sensor specific SEO
  if (product.sku.includes('VSEW_MK4') || product.sku.includes('VSEW-MK4')) {
    seoTitle = `Convergence VSEW MK4 8g Wireless Vibration Sensor | MEMS Accelerometer IoT Monitoring Thailand`
    seoDescription = `Industrial wireless vibration sensor with MEMS accelerometer technology. 8g measurement range, MQTT connectivity for IoT integration. Perfect for machinery monitoring, predictive maintenance, and structural health monitoring. Convergence VSEW MK4 available in Thailand.`
    seoKeywords = [
      'VSEW MK4',
      'VSEW_MK4',
      'wireless vibration sensor',
      'MEMS accelerometer',
      'MQTT vibration sensor',
      'IoT vibration monitoring',
      'wireless accelerometer',
      '8g vibration sensor',
      'Convergence Instruments',
      'machinery vibration monitoring',
      'predictive maintenance sensor',
      'wireless vibration logger',
      'industrial vibration sensor',
      'structural health monitoring',
      'condition monitoring sensor',
      'smart vibration sensor',
      'vibration monitoring Thailand',
      'MEMS sensor Thailand',
      product.sku,
      ...seoKeywords
    ]
  }

  // SoundPLAN essential Plus (SPe+) specific SEO
  if (product.sku.includes('SPE-PLUS') || product.sku.includes('SPE+') || product.title_en.toLowerCase().includes('soundplan essential')) {
    seoTitle = `SoundPLAN essential Plus (SPe+) | Professional Noise Mapping Software Thailand`
    seoDescription = `Comprehensive noise mapping and sound propagation analysis software. Create detailed noise maps for roads, railways, and industrial sources. Supports international standards (ISO 9613-2, CNOSSOS-EU, RLS-19). 3D modeling, facade noise mapping, and Building Acoustics module. Ideal for EIA, urban planning, and noise control studies in Thailand and ASEAN.`
    seoKeywords = [
      'SoundPLAN essential',
      'SoundPLAN essential Plus',
      'SPe+',
      'noise mapping software',
      'sound propagation software',
      'acoustic software Thailand',
      'environmental noise modeling',
      'noise prediction software',
      'EIA software Thailand',
      'noise mapping Thailand',
      'ISO 9613-2 software',
      'CNOSSOS-EU calculation',
      'RLS-19 noise software',
      'road noise modeling',
      'railway noise calculation',
      'industrial noise mapping',
      'facade noise mapping',
      'building acoustics software',
      '3D noise visualization',
      'OpenStreetMap integration',
      'noise control software',
      'urban planning noise',
      'environmental impact assessment',
      'noise consultant software',
      'acoustic engineering software',
      'SoundPLAN Thailand',
      'noise mapping ASEAN',
      'professional acoustic software',
      'multithreading noise calculation',
      'grid noise maps',
      'limit contour lines',
      product.sku,
      ...seoKeywords
    ]
  }
  
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    alternates: {
      canonical: `/products/${product.sku}`,
    },
    openGraph: {
      title: `${product.title_en} - Professional Acoustic Equipment`,
      description: product.description_en.substring(0, 160),
      type: 'website',
      url: `/products/${product.sku}`,
      images: productImages.map(img => ({
        url: img,
        width: 800,
        height: 600,
        alt: product.title_en,
      })),
      siteName: 'Placid Asia',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title_en,
      description: product.description_en.substring(0, 160),
      images: [firstImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}
