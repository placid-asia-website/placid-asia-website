
export const dynamic = "force-dynamic"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import { Chatbot } from '@/components/chatbot'
import { GoogleAnalytics } from '@/components/google-analytics'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: 'Placid Asia - Professional Acoustic Solutions & Sound Testing Equipment Thailand',
    template: '%s | Placid Asia'
  },
  description: 'Thailand\'s #1 supplier of professional acoustic equipment: Class 1 sound level meters, acoustic cameras, NoiseQC quality control systems, noise monitoring & vibration meters. Authorized distributor for Norsonic, Convergence, PLACID, Soundtec across Southeast Asia. Expert solutions for environmental monitoring, industrial testing & factory quality control.',
  keywords: [
    // Equipment Categories
    'acoustic measurement equipment',
    'sound level meters',
    'noise dosimeters',
    'vibration analyzers',
    'acoustic calibrators',
    'noise monitoring systems',
    'building acoustics equipment',
    'Class 1 microphones',
    'acoustic cameras',
    'vibration meters',
    'DAQ systems',
    
    // Applications
    'environmental noise monitoring',
    'industrial noise measurement',
    'occupational noise assessment',
    'room acoustics testing',
    'sound insulation testing',
    'vibration analysis',
    'NoiseQC quality control',
    'end-of-line testing',
    'factory noise monitoring',
    
    // Locations & Services
    'acoustic equipment Thailand',
    'sound measurement Bangkok',
    'acoustic testing Asia Pacific',
    'professional sound equipment supplier',
    'NoiseQC Thailand',
    'quality control Thailand',
    
    // Industry Terms
    'acoustic engineering',
    'noise control solutions',
    'sound testing instruments',
    'professional audio measurement',
    'product quality control',
    'acoustic signature analysis',
  ],
  authors: [{ name: 'Placid Asia', url: 'https://www.placid.asia' }],
  creator: 'Placid Asia',
  publisher: 'Placid Asia',
  category: 'Industrial Equipment & Instrumentation',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'th': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['th_TH'],
    url: '/',
    title: 'Placid Asia - Professional Acoustic Solutions & Sound Testing Equipment',
    description: 'Leading supplier of acoustic measurement equipment, sound level meters, and noise monitoring solutions in Thailand and Asia Pacific region.',
    siteName: 'Placid Asia',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Placid Asia - Professional Acoustic Measurement Equipment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Placid Asia - Professional Acoustic Solutions',
    description: 'Leading supplier of acoustic measurement equipment and sound testing solutions in Thailand and Asia Pacific region.',
    images: ['/og-image.jpg'],
    creator: '@placidasia',
    site: '@placidasia',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.jpg',
  },
  manifest: '/manifest.json',
  verification: {
    // Add your verification codes when available
    google: '',
    // yandex: '',
    // bing: '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Enhanced Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Placid Asia Co., Ltd',
    alternateName: 'บริษัท เพลซิด เอเซีย จำกัด',
    description: 'Leading supplier of acoustic measurement equipment, NoiseQC quality control systems, and sound testing solutions in Thailand and Asia Pacific',
    url: 'https://placid.asia',
    logo: 'https://placid.asia/logo.jpg',
    image: 'https://placid.asia/og-image.jpg',
    email: 'info@placid.asia',
    telephone: '+66819641982',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '129, 129 Village no.5, Bangpoo Industrial Estate (Soi 5A)',
      addressLocality: 'Muang Samut Prakan',
      addressRegion: 'Samut Prakan',
      postalCode: '10280',
      addressCountry: 'TH'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '13.5893',
      longitude: '100.7355'
    },
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+66819641982',
      contactType: 'sales',
      email: 'info@placid.asia',
      availableLanguage: ['en', 'th'],
      areaServed: ['TH', 'MY', 'SG', 'ID', 'VN', 'PH', 'SG', 'LA', 'MM', 'KH']
    }, {
      '@type': 'ContactPoint',
      telephone: '+66819641982',
      contactType: 'customer service',
      email: 'info@placid.asia',
      availableLanguage: ['en', 'th'],
      areaServed: ['TH', 'MY', 'SG', 'ID', 'VN', 'PH', 'SG', 'LA', 'MM', 'KH']
    }, {
      '@type': 'ContactPoint',
      telephone: '+66819641982',
      contactType: 'technical support',
      email: 'info@placid.asia',
      availableLanguage: ['en', 'th'],
      areaServed: ['TH', 'MY', 'SG', 'ID', 'VN', 'PH', 'SG', 'LA', 'MM', 'KH']
    }],
    sameAs: [
      'https://www.facebook.com/placid.asia/',
      'https://www.linkedin.com/company/placid-asia',
      'https://www.youtube.com/@placidasia'
    ],
    foundingDate: '2010',
    keywords: 'acoustic measurement equipment, sound level meters, vibration analyzers, noise monitoring, building acoustics, NoiseQC, quality control, Thailand',
    priceRange: '$$-$$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Acoustic Measurement Equipment',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Sound Level Meters & Noise Dosimeters',
          itemListElement: [{
            '@type': 'Product',
            name: 'Class 1 Sound Level Meters',
            description: 'Professional grade Class 1 sound level meters for environmental and occupational noise monitoring'
          }, {
            '@type': 'Product',
            name: 'Noise Dosimeters',
            description: 'Personal noise dosimeters for workplace noise exposure assessment'
          }]
        },
        {
          '@type': 'OfferCatalog',
          name: 'NoiseQC Quality Control Systems',
          itemListElement: [{
            '@type': 'Product',
            name: 'NoiseQC End-of-Line Testing',
            description: 'Automated quality control systems using acoustic signature analysis for manufacturing'
          }]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Acoustic Cameras & Analysis',
          itemListElement: [{
            '@type': 'Product',
            name: 'Acoustic Cameras',
            description: 'Real-time sound source localization and visualization systems'
          }]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Vibration Analysis Equipment',
          itemListElement: [{
            '@type': 'Product',
            name: 'Vibration Meters & Analyzers',
            description: 'Professional vibration measurement and analysis equipment'
          }]
        }
      ]
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '13.7563',
        longitude: '100.5018'
      },
      geoRadius: '2000000'
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        {/* Hreflang tags for bilingual content */}
        <link rel="alternate" hrefLang="en" href="https://placid.asia" />
        <link rel="alternate" hrefLang="th" href="https://placid.asia" />
        <link rel="alternate" hrefLang="x-default" href="https://placid.asia" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        <Analytics />
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <Chatbot />
        </Providers>
      </body>
    </html>
  )
}
