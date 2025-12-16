"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductGrid } from '@/components/product-grid'
import { useLanguage } from '@/lib/language-context'
import { 
  Zap, 
  Shield, 
  Award, 
  Headphones,
  BarChart3,
  Settings,
  ArrowRight
} from 'lucide-react'

interface HomeClientProps {
  featuredProducts: any[]
  categories: any[]
  totalProducts: number
}

export function HomeClient({ featuredProducts, categories, totalProducts }: HomeClientProps) {
  const { t, language } = useLanguage()

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: t('home.feature1Title'),
      description: t('home.feature1Desc')
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: t('home.feature2Title'),
      description: t('home.feature2Desc')
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: t('home.feature3Title'),
      description: t('home.feature3Desc')
    }
  ]

  const applicationAreas = [
    {
      icon: <Headphones className="h-6 w-6 text-accent" />,
      title: t('home.app1Title'),
      description: t('home.app1Desc')
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-accent" />,
      title: t('home.app2Title'),
      description: t('home.app2Desc')
    },
    {
      icon: <Settings className="h-6 w-6 text-accent" />,
      title: t('home.app3Title'),
      description: t('home.app3Desc')
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Company Name */}
            <div className="mb-6">
              <p className="text-lg lg:text-xl text-brand-yellow font-semibold tracking-wide uppercase mb-2">
                {t('home.companyNameEN')}
              </p>
              <p className="text-sm lg:text-base text-white/80">
                {t('home.companyNameTH')}
              </p>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              {t('home.heroTitle1')}
              <span className="block text-brand-yellow">{t('home.heroTitle2')}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/products">
                  {t('home.exploreProducts')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">{t('home.contactUs')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalProducts}+</div>
              <div className="text-sm text-muted-foreground">{t('home.statsProducts')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{categories.length}+</div>
              <div className="text-sm text-muted-foreground">{t('home.statsCategories')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-sm text-muted-foreground">{t('home.statsYears')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-sm text-muted-foreground">{t('home.statsCustomers')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('home.whyChooseTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.whyChooseSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('home.categoriesTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.categoriesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                          {language === 'th' && category.name_th ? category.name_th : category.name_en}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {category.product_count} {category.product_count === 1 ? t('home.product') : t('home.products')}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/categories">
                {t('home.viewAllCategories')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Application Areas */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('home.applicationAreasTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.applicationAreasSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {applicationAreas.map((area, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                  {area.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
                <p className="text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('home.featuredProducts')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.featuredProductsSubtitle')}
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <p className="text-center text-muted-foreground">No products available</p>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg">
              <Link href="/products">
                {t('home.exploreProducts')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
