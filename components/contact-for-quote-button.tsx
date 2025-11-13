
"use client"

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface ContactForQuoteButtonProps {
  productSku: string
  className?: string
}

export function ContactForQuoteButton({ productSku, className }: ContactForQuoteButtonProps) {
  const { t } = useLanguage()
  const router = useRouter()

  const handleContactForQuote = () => {
    router.push(`/contact?product=${encodeURIComponent(productSku)}`)
  }

  return (
    <Button variant="secondary" onClick={handleContactForQuote} className={cn(className)}>
      <MessageCircle className="h-4 w-4 mr-2" />
      {t('products.contactForQuote')}
    </Button>
  )
}
