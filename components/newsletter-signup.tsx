
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/lib/language-context';
import { Mail, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterSignup() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error(language === 'th' ? 'กรุณาใส่อีเมลที่ถูกต้อง' : 'Please enter a valid email');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
        setName('');
        toast.success(
          language === 'th' 
            ? 'สมัครสมาชิกสำเร็จ! ขอบคุณที่สนใจข่าวสารของเรา' 
            : 'Successfully subscribed! Thank you for joining our newsletter.'
        );
      } else {
        if (data.message?.includes('already subscribed') || data.message?.includes('Unique constraint')) {
          toast.error(
            language === 'th'
              ? 'อีเมลนี้ได้สมัครสมาชิกแล้ว'
              : 'This email is already subscribed.'
          );
        } else {
          toast.error(data.message || (language === 'th' ? 'เกิดข้อผิดพลาด' : 'Something went wrong'));
        }
      }
    } catch (error) {
      toast.error(language === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Mail className="h-5 w-5 text-accent" />
          {language === 'th' ? 'รับข่าวสารล่าสุด' : 'Stay Updated'}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {language === 'th' 
            ? 'สมัครรับข้อมูลผลิตภัณฑ์ใหม่และโปรโมชั่นพิเศษ' 
            : 'Subscribe for new products and exclusive offers'}
        </p>
      </div>

      {isSuccess ? (
        <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span className="text-sm text-green-500">
            {language === 'th' ? 'สมัครสมาชิกเรียบร้อยแล้ว!' : 'Successfully subscribed!'}
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder={language === 'th' ? 'อีเมลของคุณ' : 'Your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-accent hover:bg-accent/90 text-primary"
            >
              {isLoading ? (language === 'th' ? 'กำลังส่ง...' : 'Sending...') : (language === 'th' ? 'สมัคร' : 'Subscribe')}
            </Button>
          </div>
          <Input
            type="text"
            placeholder={language === 'th' ? 'ชื่อของคุณ (ไม่บังคับ)' : 'Your name (optional)'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            {language === 'th' 
              ? 'เราเคารพความเป็นส่วนตัวของคุณ ยกเลิกได้ทุกเมื่อ' 
              : 'We respect your privacy. Unsubscribe anytime.'}
          </p>
        </form>
      )}
    </div>
  );
}
