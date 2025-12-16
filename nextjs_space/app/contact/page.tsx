
"use client"

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-context'

export default function ContactPage() {
  const { language, t } = useLanguage()
  const searchParams = useSearchParams()
  const productSku = searchParams?.get('product')

  // Zoho form URLs - switch based on language
  const zohoFormEN = 'https://forms.zohopublic.com/rosmolenopscontrolgm1/form/PlacidAsia/formperma/RvcCvKpqGvp6gwkhVPwuK4Q9JVafC9KLcR1Q1xjPP6k'
  const zohoFormTH = 'https://forms.zohopublic.com/rosmolenopscontrolgm1/form/PlacidAsia/formperma/RvcCvKpqGvp6gwkhVPwuK4Q9JVafC9KLcR1Q1xjPP6k?zf_lang=th'

  const formUrl = language === 'th' ? zohoFormTH : zohoFormEN

  useEffect(() => {
    if (productSku) {
      console.log('Product inquiry for:', productSku)
    }
  }, [productSku])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  {t('contact.sendMessage')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('contact.formDescription') || 'Fill out the form below and we\'ll get back to you as soon as possible.'}
                </CardDescription>
                {productSku && (
                  <div className="mt-3 p-3 bg-accent/10 rounded-md border border-accent/20">
                    <p className="text-sm">
                      <span className="font-semibold text-accent">{t('contact.productSku')}:</span> 
                      <span className="ml-2 font-mono">{productSku}</span>
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-6">
                {/* Embedded Zoho Form */}
                <div className="w-full rounded-lg overflow-hidden border border-border/50">
                  <iframe
                    aria-label="Placid Asia Contact Form"
                    frameBorder="0"
                    style={{
                      height: '1200px',
                      width: '100%',
                      border: 'none',
                    }}
                    src={formUrl}
                    title="Contact Form"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar - Takes 1 column */}
          <div className="space-y-6">
            {/* Contact Details Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardTitle>{t('contact.info')}</CardTitle>
                <CardDescription>
                  {t('contact.infoDescription') || 'You can also reach us through these channels'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-lg bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{t('contact.email.label')}</p>
                    <a
                      href="mailto:info@placid.asia"
                      className="text-sm text-primary hover:text-accent transition-colors block"
                    >
                      info@placid.asia
                    </a>
                    <a
                      href="mailto:sales@placid.asia"
                      className="text-sm text-primary hover:text-accent transition-colors block"
                    >
                      sales@placid.asia
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-lg bg-accent/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{t('contact.phone.label')}</p>
                    <p className="text-sm text-muted-foreground">(+66) 0819641982</p>
                    <p className="text-sm text-muted-foreground mt-1">Line: @placid</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-lg bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{t('contact.address')}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t('contact.address.value')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-br from-accent/5 to-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  {t('contact.businessHours')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 rounded-md hover:bg-accent/5 transition-colors">
                    <span className="font-medium">{t('contact.monday-friday')}</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md hover:bg-accent/5 transition-colors">
                    <span className="font-medium">{t('contact.saturday')}</span>
                    <span className="text-muted-foreground">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md hover:bg-accent/5 transition-colors">
                    <span className="font-medium">{t('contact.sunday')}</span>
                    <span className="text-accent font-medium">{t('contact.closed')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us Card */}
            <Card className="shadow-lg bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg">
                  {t('contact.whyChooseUs') || 'Why Choose Placid Asia?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>{t('contact.reason1') || 'Fast response within 24 hours'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>{t('contact.reason2') || 'Expert technical support'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>{t('contact.reason3') || 'Tailored solutions for your needs'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>{t('contact.reason4') || 'Long-term partnership commitment'}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
