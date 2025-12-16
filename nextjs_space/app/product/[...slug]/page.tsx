import { redirect } from 'next/navigation'

export default function OldProductPage({ params }: { params: { slug: string[] } }) {
  // Redirect old /product/ URLs to /products/
  // This handles any legacy URLs that Google might have indexed
  const slug = params.slug.join('/')
  redirect(`/products/${slug}`)
}
