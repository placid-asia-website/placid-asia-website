
"use client"

import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    // Force a page refresh to update content
    window.location.reload()
  }

  const handleButtonClick = () => {
    // Toggle between languages on direct button click
    const newLang = language === 'en' ? 'th' : 'en'
    handleLanguageChange(newLang)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 px-2" 
          title="Toggle language"
          onClick={handleButtonClick}
        >
          <Globe className="h-4 w-4" />
          <span className="ml-2 text-sm font-medium">
            {language === 'th' ? 'ไทย' : 'EN'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('th')}>
          ไทย (Thai)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
