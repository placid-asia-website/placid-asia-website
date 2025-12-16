import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { InquiriesClient } from './inquiries-client';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/admin-login');
  }

  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Serialize dates for client component
  const serializedInquiries = inquiries.map((inquiry: { 
    id: string; 
    name: string; 
    email: string; 
    phone: string | null; 
    company: string | null; 
    subject: string; 
    message: string; 
    product_sku: string | null; 
    language: string; 
    status: string; 
    createdAt: Date; 
    updatedAt: Date; 
  }) => ({
    ...inquiry,
    createdAt: inquiry.createdAt.toISOString(),
    updatedAt: inquiry.updatedAt.toISOString(),
  }));

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customer Inquiries</h1>
        <p className="text-muted-foreground">
          Manage customer inquiries and product requests
        </p>
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>New ({inquiries.filter((i: { status: string }) => i.status === 'new').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Replied ({inquiries.filter((i: { status: string }) => i.status === 'replied').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Closed ({inquiries.filter((i: { status: string }) => i.status === 'closed').length})</span>
          </div>
        </div>
      </div>

      <InquiriesClient initialInquiries={serializedInquiries} />
    </div>
  );
}
