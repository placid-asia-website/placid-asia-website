
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the correct admin login page
    router.replace('/admin-login')
  }, [router])

  return (
    <div className="container mx-auto max-w-md px-4 py-16 text-center">
      <p className="text-muted-foreground">Redirecting to admin login...</p>
    </div>
  )
}
