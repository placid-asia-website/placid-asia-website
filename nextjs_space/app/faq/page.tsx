"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { HelpCircle, MessageCircle } from 'lucide-react';
import ChatbotTriggerButton from '@/components/chatbot-trigger-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/lib/language-context';

const faqCategories = [
  {
    category: 'General Questions',
    questions: [
      {
        q: 'What types of acoustic equipment do you supply?',
        a: 'We supply a comprehensive range of acoustic measurement equipment including sound level meters, building acoustics testing systems, environmental noise monitors, vibration analyzers, acoustic cameras, material testing equipment, and complete measurement solutions from leading manufacturers like Norsonic, Soundtec, SPEKTRA Dresden, and more.',
      },
      {
        q: 'Do you provide training and technical support?',
        a: 'Yes! We offer comprehensive training programs for all equipment, including on-site training, remote sessions, and hands-on workshops. Our technical support team provides ongoing assistance with measurement standards, equipment operation, and troubleshooting.',
      },
      {
        q: 'What is your warranty and service policy?',
        a: 'All equipment comes with manufacturer warranty (typically 1-3 years depending on the product). We provide local service support, calibration services, and have direct relationships with all manufacturers for technical support and repairs.',
      },
      {
        q: 'Can I rent equipment instead of purchasing?',
        a: 'Yes, we offer equipment rental services for short-term projects and trials. This is ideal for occasional use or when evaluating equipment before purchase. Contact us for rental rates and availability.',
      },
    ],
  },
  {
    category: 'Technical Questions',
    questions: [
      {
        q: 'What is the difference between Class 1 and Class 2 sound level meters?',
        a: 'Class 1 (Type 1) meters are precision instruments with tighter tolerances (±1 dB), required for legal/official measurements and compliance work. Class 2 (Type 2) meters have wider tolerances (±1.5 dB) and are suitable for screening, internal quality control, and general noise surveys. The choice depends on your application and local regulations.',
      },
      {
        q: 'How often does equipment need calibration?',
        a: 'Most acoustic equipment requires annual calibration to maintain accuracy and compliance. Field calibration should be performed before and after each measurement using an acoustic calibrator. We provide calibration certificates traceable to national standards.',
      },
      {
        q: 'What standards do your products comply with?',
        a: 'Our equipment complies with international standards including IEC 61672 (sound level meters), ISO 16283 (building acoustics), ISO 1996 (environmental noise), ISO 2631 (vibration), and relevant ASTM standards. Specific compliance depends on the product.',
      },
      {
        q: 'Can the equipment be used in tropical climates?',
        a: 'Yes! All our equipment is suitable for tropical conditions. Many products have IP65 or higher weather protection ratings. We also provide advice on proper storage, maintenance, and protection in high humidity and temperature environments.',
      },
    ],
  },
  {
    category: 'Building Acoustics',
    questions: [
      {
        q: 'What equipment do I need for building acoustics testing?',
        a: 'A basic kit includes: Class 1 or 2 sound level meter, omnidirectional sound source (dodecahedron), power amplifier, tapping machine (for floors), tripod, calibrator, and building acoustics software. We can recommend specific configurations based on your needs.',
      },
      {
        q: 'Which standards apply to building acoustics testing?',
        a: 'Main standards include ISO 16283 series (field measurements), ISO 717 (rating methods), ISO 3382 (room acoustics), and local building codes. Requirements vary by country and building type.',
      },
      {
        q: 'Do you offer complete building acoustics packages?',
        a: 'Yes, we offer ready-to-use packages including all necessary equipment, carrying cases, and software. These are configured for specific applications (residential, commercial, research) and different budget levels.',
      },
    ],
  },
  {
    category: 'Noise Monitoring',
    questions: [
      {
        q: 'What is the difference between portable and permanent noise monitors?',
        a: 'Portable monitors are battery/solar-powered, self-contained units ideal for short-term campaigns (days to weeks). Permanent monitors are mains-powered, pole-mounted systems for long-term installations (months to years) with remote access and data management capabilities.',
      },
      {
        q: 'Can noise monitors send real-time alerts?',
        a: 'Yes, most modern noise monitoring systems can send automated alerts via SMS, email, or app notifications when noise levels exceed preset thresholds. This is useful for construction sites and industrial facilities.',
      },
      {
        q: 'How is data stored and accessed?',
        a: 'Data can be stored locally on the device and/or uploaded to cloud platforms via cellular, WiFi, or Ethernet. Modern systems offer web-based dashboards for remote monitoring, automated reporting, and data export.',
      },
    ],
  },
  {
    category: 'Ordering & Delivery',
    questions: [
      {
        q: 'How do I request a quote?',
        a: 'You can request quotes through our website, by email, or phone. Provide details about your application, required measurements, and budget. We will provide recommendations and detailed quotations including equipment, accessories, training, and support.',
      },
      {
        q: 'What are the payment terms?',
        a: 'We accept bank transfers, letters of credit, and payment terms can be discussed for established customers. For government and institutional buyers, we can work with your procurement processes.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Delivery time depends on product availability. Stock items typically ship within 3-5 business days. Custom configurations or special order items may take 2-4 weeks. International shipping from manufacturers typically takes 4-8 weeks.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship throughout Southeast Asia and beyond. We handle all export documentation, customs clearance, and can arrange delivery to your site. Shipping costs and import duties vary by location.',
      },
    ],
  },
  {
    category: 'After-Sales Support',
    questions: [
      {
        q: 'What after-sales support do you provide?',
        a: 'We provide technical support, calibration services, firmware/software updates, spare parts, repairs, and equipment upgrades. Our team is available for ongoing consultation and troubleshooting.',
      },
      {
        q: 'Where can equipment be serviced?',
        a: 'We have service capabilities in Bangkok and can arrange service for most equipment. For complex repairs, equipment may need to be returned to the manufacturer. We handle all logistics and keep you informed throughout the process.',
      },
      {
        q: 'Do you offer software updates?',
        a: 'Yes, most equipment includes free software updates for the first year. Extended software maintenance packages are available for continued access to new features, bug fixes, and measurement standards updates.',
      },
    ],
  },
];

export default function FAQPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('faq.title')}
            </h1>
            <p className="text-xl text-white/90 mb-4">
              {t('faq.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center mb-6">
                  <Badge className="text-lg px-4 py-2 bg-accent">
                    {category.category}
                  </Badge>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="border rounded-lg px-6 bg-card"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-semibold pr-4">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-accent/50">
              <CardHeader className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-accent" />
                <CardTitle className="text-2xl mb-2">
                  {t('faq.stillHaveQuestions')}
                </CardTitle>
                <p className="text-muted-foreground">
                  {t('faq.subtitle')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold"
                  >
                    {t('faq.contactUs')}
                  </Link>
                  <ChatbotTriggerButton />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">Explore More Resources</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/guides"
                className="p-4 bg-card rounded-lg border hover:border-accent transition-colors"
              >
                <h4 className="font-semibold mb-2">Buyer Guides</h4>
                <p className="text-sm text-muted-foreground">
                  Comprehensive equipment selection guides
                </p>
              </Link>
              <Link
                href="/applications"
                className="p-4 bg-card rounded-lg border hover:border-accent transition-colors"
              >
                <h4 className="font-semibold mb-2">Applications</h4>
                <p className="text-sm text-muted-foreground">
                  Find solutions for your specific needs
                </p>
              </Link>
              <Link
                href="/products"
                className="p-4 bg-card rounded-lg border hover:border-accent transition-colors"
              >
                <h4 className="font-semibold mb-2">Product Catalog</h4>
                <p className="text-sm text-muted-foreground">
                  Browse our complete equipment range
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
