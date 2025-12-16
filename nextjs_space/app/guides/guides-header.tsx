'use client';

import { useLanguage } from '@/lib/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { BookOpen, Clock, User } from 'lucide-react';

export default function GuidesHeader() {
  const { language, t } = useLanguage();

  // Guide data
  const guides = [
    {
      slug: 'building-acoustics-testing-kit',
      title: language === 'en' 
        ? 'Building Acoustics Testing Kit - Complete Buyer Guide'
        : 'คู่มือการเลือกซื้อชุดทดสอบอะคูสติกอาคาร',
      description: language === 'en'
        ? 'Complete guide to selecting the right equipment for building acoustics measurements including sound insulation, reverberation time, and room acoustics testing.'
        : 'คู่มือฉบับสมบูรณ์สำหรับการเลือกอุปกรณ์ที่เหมาะสมสำหรับการวัดอะคูสติกอาคาร รวมถึงการทดสอบฉนวนกันเสียง เวลาสะท้อน และการทดสอบอะคูสติกห้อง',
      readTime: '10 min read',
      level: t('guides.intermediate'),
      category: 'Building Acoustics',
      image: '/guides/building-acoustics.jpg',
    },
    {
      slug: 'noise-monitoring-system',
      title: language === 'en'
        ? 'Noise Monitoring System - Comprehensive Selection Guide'
        : 'คู่มือการเลือกระบบตรวจสอบเสียงรบกวน',
      description: language === 'en'
        ? 'Learn how to choose the right noise monitoring equipment for environmental compliance, construction sites, and industrial applications.'
        : 'เรียนรู้วิธีเลือกอุปกรณ์ตรวจสอบเสียงรบกวนที่เหมาะสมสำหรับการปฏิบัติตามสิ่งแวดล้อม ไซต์ก่อสร้าง และการใช้งานในอุตสาหกรรม',
      readTime: '12 min read',
      level: 'Beginner to ' + t('guides.intermediate'),
      category: 'Environmental Monitoring',
      image: '/guides/noise-monitoring.jpg',
    },
    {
      slug: 'vibration-measurement-equipment',
      title: language === 'en'
        ? 'Vibration Measurement Equipment - Expert Buyer Guide'
        : 'คู่มือการเลือกซื้ออุปกรณ์วัดการสั่นสะเทือน',
      description: language === 'en'
        ? 'Detailed guide to selecting vibration measurement equipment for modal analysis, condition monitoring, and structural testing.'
        : 'คู่มือรายละเอียดสำหรับการเลือกอุปกรณ์วัดการสั่นสะเทือนสำหรับการวิเคราะห์โมดอล การตรวจสอบสภาพ และการทดสอบโครงสร้าง',
      readTime: '15 min read',
      level: t('guides.intermediate') + ' to ' + t('guides.advanced'),
      category: 'Vibration Analysis',
      image: '/guides/vibration-testing.jpg',
    },
    {
      slug: 'sound-level-meter-selection',
      title: language === 'en'
        ? 'Sound Level Meter Selection - How to Choose'
        : 'คู่มือการเลือกเครื่องวัดระดับเสียง',
      description: language === 'en'
        ? 'Essential guide to choosing between Class 1 and Class 2 sound level meters for your specific noise measurement requirements.'
        : 'คู่มือสำคัญสำหรับการเลือกระหว่างเครื่องวัดระดับเสียงคลาส 1 และคลาส 2 สำหรับความต้องการการวัดเสียงรบกวนของคุณ',
      readTime: '8 min read',
      level: t('guides.beginner'),
      category: 'Sound Level Meters',
      image: '/guides/slm-selection.jpg',
    },
    {
      slug: 'acoustic-camera-systems',
      title: language === 'en'
        ? 'Acoustic Camera Systems - Selection Guide'
        : 'คู่มือระบบกล้องอะคูสติก',
      description: language === 'en'
        ? 'Comprehensive guide to acoustic imaging systems for noise source identification and sound visualization applications.'
        : 'คู่มือสมบูรณ์สำหรับระบบภาพอะคูสติกสำหรับการระบุแหล่งกำเนิดเสียงรบกวนและการแสดงเสียงด้วยภาพ',
      readTime: '12 min read',
      level: t('guides.advanced'),
      category: 'Sound Source Localization',
      image: '/guides/acoustic-camera.jpg',
    },
    {
      slug: 'material-testing-equipment',
      title: language === 'en'
        ? 'Material Testing Equipment - Complete Guide'
        : 'คู่มืออุปกรณ์ทดสอบวัสดุ',
      description: language === 'en'
        ? 'Guide to selecting impedance tube systems and other equipment for acoustic material property measurement and testing.'
        : 'คู่มือสำหรับการเลือกระบบท่อวัดความต้านทานและอุปกรณ์อื่นๆ สำหรับการวัดและทดสอบคุณสมบัติของวัสดุอะคูสติก',
      readTime: '10 min read',
      level: t('guides.intermediate') + ' to ' + t('guides.advanced'),
      category: 'Material Testing',
      image: '/guides/material-testing.jpg',
    },
    {
      slug: 'sound-intensity-measurement',
      title: language === 'en'
        ? 'Sound Intensity Measurement - Complete Guide'
        : 'คู่มือการวัดความเข้มของเสียง',
      description: language === 'en'
        ? 'Comprehensive guide to sound intensity measurement systems, techniques, and applications for noise source analysis.'
        : 'คู่มือสมบูรณ์สำหรับระบบวัดความเข้มของเสียง เทคนิค และการใช้งานสำหรับการวิเคราะห์แหล่งกำเนิดเสียงรบกวน',
      readTime: '14 min read',
      level: t('guides.intermediate') + ' to ' + t('guides.advanced'),
      category: 'Sound Intensity',
      image: '/guides/sound-intensity.jpg',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <BookOpen className="w-16 h-16 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('guides.title')}
            </h1>
            <p className="text-xl text-white/90">
              {t('guides.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{guide.readTime}</span>
                      <span className="mx-2">•</span>
                      <Badge variant="outline" className="text-xs">
                        {guide.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">
                      {guide.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-3">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        {guide.category}
                      </Badge>
                      <span className="text-accent font-medium">
                        {t('guides.readGuide')} →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
