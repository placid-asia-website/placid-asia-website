
"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { NewsletterSignup } from './newsletter-signup'

export function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.categories'), href: '/categories' },
    { name: t('nav.brands'), href: '/brands' },
    { name: t('nav.applications'), href: '/applications' },
    { name: 'Buyer Guides', href: '/guides' },
    { name: 'FAQ', href: '/faq' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {/* Company Info */}
            <div>
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/logo.jpg"
                  alt="Placid Asia"
                  width={180}
                  height={50}
                  className="h-10 w-auto"
                />
              </Link>
              <h3 className="text-lg font-semibold mb-3">
                {t('footer.about')}
              </h3>
              <p className="text-sm text-muted-foreground leading-6">
                {t('footer.description')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {t('footer.links')}
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {t('footer.contact')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p>info@placid.asia</p>
                    <p>sales@placid.asia</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p>+66 (0) 2-xxx-xxxx</p>
                    <p>+66 (0) 8x-xxx-xxxx</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Bangkok, Thailand
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <NewsletterSignup />
            </div>
          </div>
        </div>

        <div className="border-t py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Placid Asia. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  )
}
