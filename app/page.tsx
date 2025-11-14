
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductGrid } from '@/components/product-grid'
import { prisma } from '@/lib/db'
import { 
  Zap, 
  Shield, 
  Award, 
  Headphones,
  BarChart3,
  Settings,
  ArrowRight
} from 'lucide-react'

export const dynamic = "force-dynamic"

export default async function HomePage() {
  // Get featured products and categories
  const [featuredProductsRaw, categories, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      take: 8
    }),
    prisma.category.findMany({
      where: { active: true },
      orderBy: { product_count: 'desc' },
      take: 6
    }),
    prisma.product.count({ where: { active: true } })
  ])

  // Convert raw products to proper format
  const featuredProducts = featuredProductsRaw.map(product => ({
    ...product,
    images: Array.isArray(product.images) ? product.images as string[] : [],
    pdfs: Array.isArray(product.pdfs) ? product.pdfs as string[] : []
  }))

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Precision Measurement",
      description: "High-accuracy instruments for professional acoustic and vibration analysis"
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Industry Standards",
      description: "Certified equipment meeting international measurement standards"
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: "Expert Support",
      description: "Technical expertise and comprehensive after-sales support"
    }
  ]

  const applicationAreas = [
    {
      icon: <Headphones className="h-6 w-6 text-accent" />,
      title: "Environmental Monitoring",
      description: "Noise pollution assessment and environmental compliance"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-accent" />,
      title: "Industrial Testing",
      description: "Quality control and product development testing"
    },
    {
      icon: <Settings className="h-6 w-6 text-accent" />,
      title: "Research & Development",
      description: "Advanced acoustic research and scientific applications"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Professional Acoustic
              <span className="block text-brand-yellow">Measurement Solutions</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              Precision instruments for sound measurement, vibration analysis, and acoustic testing across industries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">Contact Us</Link>
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
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{categories.length}+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Placid Asia?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leading supplier of professional acoustic measurement equipment with comprehensive solutions
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
              Product Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive range of acoustic measurement equipment
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
                          {category.name_en}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {category.name_th}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {category.product_count} {category.product_count === 1 ? 'product' : 'products'}
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
                View All Categories
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
              Application Areas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our equipment serves diverse industries and applications
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
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our latest and most popular acoustic measurement equipment
            </p>
          </div>

          <ProductGrid products={featuredProducts} />

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what our clients say about our equipment and service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Dr. Somchai Rattanakul',
                title: 'Acoustic Consultant, Bangkok',
                company: 'Acoustic Solutions Thailand',
                quote: 'Placid Asia has been our go-to supplier for building acoustics equipment. Their technical support and product knowledge are exceptional.',
                rating: 5,
              },
              {
                name: 'Jennifer Wong',
                title: 'Environmental Engineer',
                company: 'EcoNoise Consultants',
                quote: 'The noise monitoring systems we purchased have been incredibly reliable. The automated reporting saves us countless hours.',
                rating: 5,
              },
              {
                name: 'Prof. Thawatchai Niyomphong',
                title: 'Research Director',
                company: 'University Acoustics Lab',
                quote: 'Outstanding equipment quality and expert guidance. They helped us set up a complete vibration analysis laboratory.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">
                    "{testimonial.quote}"
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    <p className="text-sm text-accent font-medium">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
