"use client"

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Truck, Shield, HeadphonesIcon, ArrowRight } from 'lucide-react'

export function ProductsHeader() {
  const { t } = useLanguage()

  return (
    <>
      {/* SEO-Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-[#003F62] to-[#002840] text-white py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-[#D4A032] text-white border-none">
              {t('products.heroBadge')}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t('products.heroTitle')}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              {t('products.heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="border-white text-white">
                {t('products.badge100Products')}
              </Badge>
              <Badge variant="outline" className="border-white text-white">
                {t('products.badge15Brands')}
              </Badge>
              <Badge variant="outline" className="border-white text-white">
                {t('products.badgeISO')}
              </Badge>
              <Badge variant="outline" className="border-white text-white">
                {t('products.badgeSupport')}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Products Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">{t('products.whyChooseTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('products.whyChooseSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-[#D4A032] bg-opacity-10 p-4 rounded-full">
                  <CheckCircle2 className="h-8 w-8 text-[#D4A032]" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('products.card1Title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('products.card1Desc')}
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-[#D4A032] bg-opacity-10 p-4 rounded-full">
                  <Shield className="h-8 w-8 text-[#D4A032]" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('products.card2Title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('products.card2Desc')}
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-[#D4A032] bg-opacity-10 p-4 rounded-full">
                  <HeadphonesIcon className="h-8 w-8 text-[#D4A032]" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('products.card3Title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('products.card3Desc')}
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-[#D4A032] bg-opacity-10 p-4 rounded-full">
                  <Truck className="h-8 w-8 text-[#D4A032]" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('products.card4Title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('products.card4Desc')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">{t('products.browseByCategoryTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('products.browseByCategorySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/categories/sound-analyzers" className="block hover:scale-105 transition-transform">
              <Card className="p-6 border-l-4 border-l-[#D4A032] h-full hover:shadow-xl transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold mb-3 flex items-center justify-between">
                  {t('products.slm.title')}
                  <ArrowRight className="h-5 w-5 text-[#D4A032]" />
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('products.slm.desc')}
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• {t('products.slm.bullet1')}</li>
                  <li>• {t('products.slm.bullet2')}</li>
                  <li>• {t('products.slm.bullet3')}</li>
                  <li>• {t('products.slm.bullet4')}</li>
                </ul>
              </Card>
            </Link>

            <Link href="/categories/environmental-monitoring" className="block hover:scale-105 transition-transform">
              <Card className="p-6 border-l-4 border-l-[#D4A032] h-full hover:shadow-xl transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold mb-3 flex items-center justify-between">
                  {t('products.noise.title')}
                  <ArrowRight className="h-5 w-5 text-[#D4A032]" />
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('products.noise.desc')}
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• {t('products.noise.bullet1')}</li>
                  <li>• {t('products.noise.bullet2')}</li>
                  <li>• {t('products.noise.bullet3')}</li>
                  <li>• {t('products.noise.bullet4')}</li>
                </ul>
              </Card>
            </Link>

            <Link href="/categories/vibration-meters" className="block hover:scale-105 transition-transform">
              <Card className="p-6 border-l-4 border-l-[#D4A032] h-full hover:shadow-xl transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold mb-3 flex items-center justify-between">
                  {t('products.vibration.title')}
                  <ArrowRight className="h-5 w-5 text-[#D4A032]" />
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('products.vibration.desc')}
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• {t('products.vibration.bullet1')}</li>
                  <li>• {t('products.vibration.bullet2')}</li>
                  <li>• {t('products.vibration.bullet3')}</li>
                  <li>• {t('products.vibration.bullet4')}</li>
                </ul>
              </Card>
            </Link>

            <Link href="/categories/acoustic-material-testing" className="block hover:scale-105 transition-transform">
              <Card className="p-6 border-l-4 border-l-[#D4A032] h-full hover:shadow-xl transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold mb-3 flex items-center justify-between">
                  {t('products.material.title')}
                  <ArrowRight className="h-5 w-5 text-[#D4A032]" />
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('products.material.desc')}
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• {t('products.material.bullet1')}</li>
                  <li>• {t('products.material.bullet2')}</li>
                  <li>• {t('products.material.bullet3')}</li>
                  <li>• {t('products.material.bullet4')}</li>
                </ul>
              </Card>
            </Link>

            <Link href="/categories/acoustic-calibrators" className="block hover:scale-105 transition-transform">
              <Card className="p-6 border-l-4 border-l-[#D4A032] h-full hover:shadow-xl transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold mb-3 flex items-center justify-between">
                  {t('products.calibration.title')}
                  <ArrowRight className="h-5 w-5 text-[#D4A032]" />
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('products.calibration.desc')}
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• {t('products.calibration.bullet1')}</li>
                  <li>• {t('products.calibration.bullet2')}</li>
                  <li>• {t('products.calibration.bullet3')}</li>
                  <li>• {t('products.calibration.bullet4')}</li>
                </ul>
              </Card>
            </Link>

            <Link href="/categories/microphones" className="block hover:scale-105 transition-transform">
              <Card className="p-6 border-l-4 border-l-[#D4A032] h-full hover:shadow-xl transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold mb-3 flex items-center justify-between">
                  {t('products.sensors.title')}
                  <ArrowRight className="h-5 w-5 text-[#D4A032]" />
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('products.sensors.desc')}
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• {t('products.sensors.bullet1')}</li>
                  <li>• {t('products.sensors.bullet2')}</li>
                  <li>• {t('products.sensors.bullet3')}</li>
                  <li>• {t('products.sensors.bullet4')}</li>
                </ul>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
