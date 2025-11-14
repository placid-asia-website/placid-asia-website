
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

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: 'Placid Asia - Professional Acoustic Solutions & Sound Testing Equipment Thailand',
    template: '%s | Placid Asia'
  },
  description: 'Leading supplier of acoustic measurement equipment, sound level meters, vibration analysis tools, and noise monitoring solutions in Thailand and Asia Pacific. Professional instruments for environmental testing, industrial noise control, building acoustics, and occupational health.',
  keywords: [
    // Equipment Categories
    'acoustic measurement equipment',
    'sound level meters',
    'noise dosimeters',
    'vibration analyzers',
    'acoustic calibrators',
    'noise monitoring systems',
    'building acoustics equipment',
    
    // Applications
    'environmental noise monitoring',
    'industrial noise measurement',
    'occupational noise assessment',
    'room acoustics testing',
    'sound insulation testing',
    'vibration analysis',
    
    // Locations & Services
    'acoustic equipment Thailand',
    'sound measurement Bangkok',
    'acoustic testing Asia Pacific',
    'professional sound equipment supplier',
    
    // Industry Terms
    'acoustic engineering',
    'noise control solutions',
    'sound testing instruments',
    'professional audio measurement',
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
        url: '/og-image.png',
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
    images: ['/og-image.png'],
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
  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Placid Asia',
    description: 'Leading supplier of acoustic measurement equipment and sound testing solutions in Thailand and Asia Pacific',
    url: 'https://www.placid.asia',
    logo: '/logo.jpg',
    image: '/og-image.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangkok',
      addressCountry: 'TH'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+66-2-xxx-xxxx',
      contactType: 'sales',
      availableLanguage: ['English', 'Thai']
    },
    sameAs: [
      // Add your social media profiles when available
      // 'https://www.facebook.com/placidasia',
      // 'https://www.linkedin.com/company/placidasia',
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
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
