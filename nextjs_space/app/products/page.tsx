import { Metadata } from 'next'
import { ProductsClient } from './products-client'
import { ProductsHeader } from './products-header'

export const metadata: Metadata = {
  title: 'Professional Acoustic & Vibration Measurement Equipment | Sound Level Meters, Noise Monitors, Vibration Analyzers | Placid Asia',
  description: 'Explore our comprehensive catalog of professional acoustic measurement equipment, sound level meters, environmental noise monitors, vibration analyzers, and acoustic test systems. Authorized distributor of Norsonic, SoundPLAN, Bedrock, and leading brands in Thailand and Southeast Asia. Find the perfect solution for building acoustics, environmental noise monitoring, industrial noise control, and vibration analysis.',
  keywords: [
    'acoustic measurement equipment',
    'sound level meters',
    'noise measurement instruments',
    'vibration analysis equipment',
    'environmental noise monitors',
    'building acoustics testing',
    'acoustic test equipment',
    'sound measurement devices',
    'class 1 sound level meter',
    'class 2 sound level meter',
    'real-time analyzer',
    'FFT analyzer',
    'acoustic camera',
    'noise dosimeter',
    'vibration meter',
    'tapping machine',
    'reverberation time meter',
    'sound intensity probe',
    'noise monitoring system',
    'construction noise monitoring',
    'industrial noise measurement',
    'environmental noise assessment',
    'building acoustics compliance',
    'vibration monitoring',
    'occupational noise exposure',
    'airport noise monitoring',
    'Norsonic sound level meters',
    'SoundPLAN software',
    'Bedrock vibration meters',
    'Convergence instruments',
    'Profound noise monitors',
    'acoustic equipment Thailand',
    'sound measurement equipment Bangkok',
    'noise monitoring Southeast Asia',
    'vibration analysis Thailand',
  ],
  alternates: {
    canonical: 'https://www.placid.asia/products',
    languages: {
      'en': 'https://www.placid.asia/products',
      'th': 'https://www.placid.asia/products',
    },
  },
  openGraph: {
    title: 'Professional Acoustic & Vibration Measurement Equipment - Placid Asia',
    description: 'Browse our complete range of sound level meters, noise monitors, vibration analyzers, and acoustic test systems from world-leading manufacturers. Authorized distributor in Thailand and Southeast Asia.',
    url: 'https://www.placid.asia/products',
    siteName: 'Placid Asia',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.placid.asia/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Placid Asia - Professional Acoustic Measurement Equipment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Acoustic & Vibration Equipment - Placid Asia',
    description: 'Complete catalog of sound level meters, noise monitors, and vibration analysis equipment from leading manufacturers.',
    images: ['https://www.placid.asia/og-image.jpg'],
  },
}

export default function ProductsPage() {
  return (
    <>
      <ProductsHeader />
      <ProductsClient />
    </>
  )
}
