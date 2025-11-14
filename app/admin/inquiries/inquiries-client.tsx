
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Building, Calendar, Package, Send, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Inquiry {
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
  createdAt: string;
  updatedAt: string;
}

export function InquiriesClient({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'replied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'closed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReply = async (inquiryId: string) => {
    if (!replyMessage.trim()) {
      toast.error('Please enter a reply message');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'replied',
          replyMessage: replyMessage.trim(),
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        
        // Update local state
        setInquiries(inquiries.map(inq => 
          inq.id === inquiryId ? { ...inq, status: 'replied', updatedAt: updated.updatedAt } : inq
        ));

        toast.success('Reply sent successfully!');
        setReplyingTo(null);
        setReplyMessage('');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Reply error:', error);
      toast.error('Failed to send reply. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (inquiryId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updated = await response.json();
        
        setInquiries(inquiries.map(inq => 
          inq.id === inquiryId ? { ...inq, status: newStatus, updatedAt: updated.updatedAt } : inq
        ));

        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (inquiries.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No inquiries yet</h3>
          <p className="text-muted-foreground">
            Customer inquiries will appear here when submitted
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inquiry) => (
        <Card key={inquiry.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{inquiry.subject}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {inquiry.name} • {new Date(inquiry.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge className={getStatusColor(inquiry.status)}>
                {inquiry.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <a href={`mailto:${inquiry.email}`} className="hover:underline">
                  {inquiry.email}
                </a>
              </div>
              {inquiry.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href={`tel:${inquiry.phone}`} className="hover:underline">
                    {inquiry.phone}
                  </a>
                </div>
              )}
              {inquiry.company && (
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{inquiry.company}</span>
                </div>
              )}
              {inquiry.product_sku && (
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href={`/products/${inquiry.product_sku}`} target="_blank" className="hover:underline">
                    Product: {inquiry.product_sku}
                  </a>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium mb-2">Message:</h4>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded whitespace-pre-wrap">
                {inquiry.message}
              </p>
            </div>

            {replyingTo === inquiry.id ? (
              <div className="space-y-3 border-t pt-4">
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={5}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleReply(inquiry.id)}
                    disabled={isSubmitting}
                    size="sm"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Reply'}
                  </Button>
                  <Button
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyMessage('');
                    }}
                    variant="outline"
                    size="sm"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 border-t pt-4">
                <Button
                  onClick={() => setReplyingTo(inquiry.id)}
                  size="sm"
                  variant="default"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Reply
                </Button>
                {inquiry.status === 'new' && (
                  <Button
                    onClick={() => handleStatusChange(inquiry.id, 'replied')}
                    size="sm"
                    variant="outline"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark Replied
                  </Button>
                )}
                {inquiry.status !== 'closed' && (
                  <Button
                    onClick={() => handleStatusChange(inquiry.id, 'closed')}
                    size="sm"
                    variant="outline"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Close
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
