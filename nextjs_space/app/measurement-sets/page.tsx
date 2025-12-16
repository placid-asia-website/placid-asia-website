
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  CheckCircle2,
  FileText,
  Headphones,
  Activity,
  Settings,
  Waves
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Complete Measurement Sets | Professional Acoustic & Vibration Systems | Placid Asia',
  description: 'Professional turnkey measurement systems configured to your specifications. Sound intensity, sound power, building acoustics, and vibration analysis sets compliant with ISO and ASTM standards. Custom solutions on request.',
  keywords: [
    'sound intensity measurement system',
    'sound power measurement kit',
    'building acoustics test equipment',
    'complete vibration analysis system',
    'ISO 9614 sound intensity',
    'ISO 3382 building acoustics',
    'ISO 140 sound insulation',
    'ASTM E90 airborne sound',
    'turnkey acoustic measurement',
    'Norsonic Nor150',
    'custom measurement solutions',
    'acoustic testing package',
    'Thailand acoustic equipment'
  ]
}

const measurementSets = [
  {
    title: 'Sound Intensity Measurement Systems',
    icon: <Waves className="h-10 w-10 text-accent" />,
    description: 'Complete sound intensity measurement systems for sound source identification and sound power determination. Perfect for noisy environments where traditional sound pressure methods are impractical.',
    applications: [
      'Sound power determination in situ',
      'Noise source identification and ranking',
      'Sound transmission loss measurements',
      'Product development and quality control',
      'Environmental noise assessment'
    ],
    standards: [
      'ISO 9614-1: Sound Intensity - Discrete Point Method',
      'ISO 9614-2: Sound Intensity - Scanning Method',
      'ISO 9614-3: Sound Intensity - Precision Method',
      'IEC 61043: Electroacoustic Instrumentation for Sound Intensity'
    ],
    typicalConfiguration: [
      'Precision sound intensity probe (e.g., Norsonic Nor150)',
      'Class 1 sound level analyzer with intensity module',
      'Matched microphone pair with phase verification',
      'Intensity calibrator',
      'Analysis and reporting software',
      'Field accessories and carrying case'
    ]
  },
  {
    title: 'Sound Power Measurement Sets',
    icon: <Activity className="h-10 w-10 text-accent" />,
    description: 'Turnkey systems for accurate sound power determination using sound pressure or sound intensity methods. Ideal for product certification, quality control, and compliance testing.',
    applications: [
      'Product sound power rating',
      'Machinery noise certification',
      'Comparative product testing',
      'Quality control in manufacturing',
      'Environmental compliance verification'
    ],
    standards: [
      'ISO 3741: Reverberation Room Method (Precision)',
      'ISO 3744: Enveloping Surface Method (Engineering)',
      'ISO 3745: Anechoic Chamber Method (Precision)',
      'ISO 3746: Survey Method',
      'ISO 9614-1/2/3: Sound Intensity Methods'
    ],
    typicalConfiguration: [
      'Precision sound level meters (Class 1)',
      'Multiple measurement microphones',
      'Sound intensity probe option',
      'Environmental sensors (temperature, humidity, pressure)',
      'Measurement software with ISO compliance',
      'Calibration equipment'
    ]
  },
  {
    title: 'Building Acoustics Test Equipment',
    icon: <Headphones className="h-10 w-10 text-accent" />,
    description: 'Professional systems for airborne and impact sound insulation testing in buildings. Complete solutions for acoustic consultants, testing laboratories, and building inspectors.',
    applications: [
      'Airborne sound insulation testing',
      'Impact sound insulation measurements',
      'Façade sound insulation evaluation',
      'Room acoustic parameter measurement',
      'Building acoustic compliance verification'
    ],
    standards: [
      'ISO 140 series: Field & Laboratory Sound Insulation',
      'ISO 717: Rating of Sound Insulation',
      'ISO 3382: Room Acoustics - Measurement Parameters',
      'ASTM E90: Laboratory Airborne Sound Transmission',
      'ASTM E336: Impact Sound Transmission',
      'ASTM E1332: Façade Sound Insulation'
    ],
    typicalConfiguration: [
      'Dual-channel sound analyzers',
      'Omnidirectional sound source',
      'Tapping machine for impact testing',
      'Precision microphones with preamps',
      'MLS/impulse sound source',
      'Building acoustics software package',
      'Transportation and field cases'
    ]
  },
  {
    title: 'Vibration Analysis Systems',
    icon: <Settings className="h-10 w-10 text-accent" />,
    description: 'Complete vibration measurement and analysis systems for structural dynamics, machine condition monitoring, and predictive maintenance. Scalable from basic monitoring to advanced modal analysis.',
    applications: [
      'Machine condition monitoring',
      'Structural modal analysis',
      'Vibration isolation verification',
      'Human vibration exposure assessment',
      'Balancing and alignment diagnostics'
    ],
    standards: [
      'ISO 2041: Vibration and Shock Vocabulary',
      'ISO 5348: Mechanical Mounting of Accelerometers',
      'ISO 10816: Mechanical Vibration - Machine Evaluation',
      'ISO 20816: Rotating Machinery Vibration',
      'ISO 2631: Human Exposure to Whole-Body Vibration',
      'ISO 8041: Human Response to Vibration'
    ],
    typicalConfiguration: [
      'Multi-channel vibration analyzer',
      'Triaxial IEPE accelerometers',
      'Impact hammer for modal testing',
      'Signal conditioning and power supply',
      'FFT and ODS analysis software',
      'Magnetic and adhesive mounting accessories',
      'Rugged transport case'
    ]
  },
  {
    title: 'Custom Measurement Solutions',
    icon: <FileText className="h-10 w-10 text-accent" />,
    description: 'Every measurement challenge is unique. Our team works with you to configure the perfect system combining acoustic, vibration, and environmental sensors tailored to your specific testing requirements.',
    applications: [
      'Multi-domain measurements (acoustic + vibration + environmental)',
      'Long-term monitoring systems',
      'Specialized industry applications',
      'Research and development projects',
      'Combined field and laboratory systems'
    ],
    standards: [
      'Application-specific standard compliance',
      'Custom calibration and verification protocols',
      'Industry-specific testing requirements',
      'International and regional regulations'
    ],
    typicalConfiguration: [
      'Modular system design based on requirements',
      'Mix of acoustic and vibration sensors',
      'Synchronized multi-channel acquisition',
      'Weather-resistant outdoor enclosures',
      'Remote monitoring and data logging',
      'Custom analysis and reporting software',
      'Training and technical support included'
    ]
  }
]

export default function MeasurementSetsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#003F62] to-[#005580] text-white py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-[#D4A032] text-white border-none">
              Turnkey Solutions
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Complete Measurement Sets
            </h1>
            <p className="text-xl text-blue-50 mb-6">
              Professional measurement systems configured to your exact specifications. From sound intensity and sound power determination to building acoustics and vibration analysis - we provide complete, standards-compliant solutions ready for immediate deployment.
            </p>
            <p className="text-lg text-blue-100 mb-8">
              Every measurement set is carefully assembled with compatible, calibrated equipment from leading manufacturers including Norsonic, Sound Technology, SPEKTRA Dresden, and others. Systems comply with relevant ISO and ASTM standards for your industry.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#D4A032] hover:bg-[#B8882A] text-white">
                <Link href="/contact">
                  Request Custom Configuration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/products">
                  Browse Individual Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Complete Sets */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Complete Measurement Sets?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Save time and eliminate compatibility concerns with professionally configured systems
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">Pre-Configured</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All components tested and verified to work together seamlessly
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">Standards Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configured to meet relevant ISO, ASTM, IEC, and industry standards
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">Cost Effective</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Better value than purchasing components individually
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Technical consultation, training, and after-sales support included
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Measurement Systems */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Available Measurement Systems
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional measurement sets for every application - configured on request to match your specific testing requirements
            </p>
          </div>

          <div className="space-y-12">
            {measurementSets.map((set, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Title and Description */}
                    <div className="lg:col-span-1">
                      <div className="mb-4">{set.icon}</div>
                      <h3 className="text-2xl font-bold mb-4">{set.title}</h3>
                      <p className="text-muted-foreground mb-6">{set.description}</p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/contact">
                          Request Configuration
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    {/* Middle Column - Applications and Standards */}
                    <div className="lg:col-span-1 space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3 flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-accent mr-2" />
                          Typical Applications
                        </h4>
                        <ul className="space-y-2">
                          {set.applications.map((app, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <span className="mr-2 mt-1">•</span>
                              <span>{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {set.standards.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center">
                            <FileText className="h-5 w-5 text-accent mr-2" />
                            Relevant Standards
                          </h4>
                          <ul className="space-y-2">
                            {set.standards.map((standard, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start">
                                <span className="mr-2 mt-1">•</span>
                                <span>{standard}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Typical Configuration */}
                    <div className="lg:col-span-1">
                      <h4 className="font-semibold text-lg mb-3 flex items-center">
                        <Settings className="h-5 w-5 text-accent mr-2" />
                        Typical Configuration
                      </h4>
                      <ul className="space-y-2">
                        {set.typicalConfiguration.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">
                          Configuration Note
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          Actual configuration depends on your specific requirements. Contact us for a customized proposal.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Order Your Measurement Set</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple 4-step process to get your custom-configured measurement system
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#003F62] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Contact Us</h3>
              <p className="text-sm text-muted-foreground">
                Describe your measurement needs, applications, and any specific standards requirements
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#003F62] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Consultation</h3>
              <p className="text-sm text-muted-foreground">
                Our technical team reviews your requirements and recommends the optimal configuration
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#003F62] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Proposal</h3>
              <p className="text-sm text-muted-foreground">
                Receive detailed quotation with system specifications, pricing, and delivery timeline
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#003F62] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Delivery & Training</h3>
              <p className="text-sm text-muted-foreground">
                System delivered, installed, and your team trained on proper operation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#003F62] to-[#005580] text-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Configure Your Perfect Measurement System?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact our technical team today. We'll help you select the right equipment, ensure compliance with relevant standards, and provide a complete turnkey solution for your measurement needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#D4A032] hover:bg-[#B8882A] text-white">
              <Link href="/contact">
                Request Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/products">
                Browse Products
              </Link>
            </Button>
          </div>
          <div className="mt-8 text-sm text-blue-200">
            <p>📞 Phone: (+66) 0819641982 | ✉️ Email: info@placid.asia | 💬 Line: @placid</p>
          </div>
        </div>
      </section>
    </div>
  )
}
