
import { Product, Category, ContactInquiry, User } from '@prisma/client'

export interface ProductWithRelations extends Omit<Product, 'images' | 'pdfs'> {
  images: string[]
  pdfs: string[]
  features?: string[]
  applications?: string[]
  specifications?: Record<string, string | number>
}

export interface CategoryWithCount extends Category {}

export interface ContactInquiryData {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  product_sku?: string
  language: string
}

export interface CartItem {
  product_sku: string
  quantity: number
  product?: ProductWithRelations
}

export interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

export type UserRole = 'user' | 'admin'

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: string
    }
  }

  interface User {
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}
