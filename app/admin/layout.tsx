
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { AdminSignOutButton } from '@/components/admin-signout-button'
import { headers } from 'next/headers'
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  MessageSquare,
  Users,
  ArrowLeft
} from 'lucide-react'

export const dynamic = "force-dynamic"

const adminNavigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="h-4 w-4" />
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: <Package className="h-4 w-4" />
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: <FolderOpen className="h-4 w-4" />
  },
  {
    name: 'Inquiries',
    href: '/admin/inquiries',
    icon: <MessageSquare className="h-4 w-4" />
  },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current pathname
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || headersList.get('referer') || ''
  
  // Skip authentication check for login page to prevent redirect loop
  const isLoginPage = pathname.includes('/admin/login')
  
  if (!isLoginPage) {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'admin') {
      redirect('/admin/login')
    }
  }
  
  // If it's the login page, render without the admin layout wrapper
  if (isLoginPage) {
    return <>{children}</>
  }

  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-lg font-semibold">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {session.user.name}
              </span>
              <AdminSignOutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r min-h-[calc(100vh-4rem)]">
          <div className="p-4">
            <div className="space-y-2">
              {adminNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
