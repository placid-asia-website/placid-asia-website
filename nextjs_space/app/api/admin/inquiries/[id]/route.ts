
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db';
import { sendEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

// GET single inquiry
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const inquiry = await prisma.contactInquiry.findUnique({
      where: { id: params.id },
    });

    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('Failed to fetch inquiry:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiry' }, { status: 500 });
  }
}

// PUT update inquiry (status, notes, etc.)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, replyMessage } = body;

    // Validate status
    if (status && !['new', 'replied', 'closed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const inquiry = await prisma.contactInquiry.findUnique({
      where: { id: params.id },
    });

    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    // Update inquiry status
    const updated = await prisma.contactInquiry.update({
      where: { id: params.id },
      data: {
        status: status || inquiry.status,
        updatedAt: new Date(),
      },
    });

    // If replying, send email to customer
    if (replyMessage && replyMessage.trim()) {
      const emailResult = await sendEmail({
        to: [{ email: inquiry.email, name: inquiry.name }],
        subject: `Re: ${inquiry.subject} - Placid Asia`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #003F62 0%, #005580 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
              .original-message { background: #f0f7ff; padding: 15px; border-left: 4px solid #D4A032; margin: 20px 0; }
              .reply-box { background: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">Placid Asia Response</h1>
              </div>
              
              <div class="content">
                <p>Dear ${inquiry.name},</p>
                
                <p>Thank you for contacting Placid Asia. Here is our response to your inquiry:</p>
                
                <div class="reply-box">
                  ${replyMessage.replace(/\n/g, '<br>')}
                </div>
                
                <div class="original-message">
                  <p style="margin: 0 0 10px;"><strong>Your Original Message:</strong></p>
                  <p style="margin: 0;"><strong>Subject:</strong> ${inquiry.subject}</p>
                  <p style="margin: 10px 0 0;">${inquiry.message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <p>If you have any further questions, please don't hesitate to reach out to us.</p>
                
                <p>Best regards,<br><strong>Placid Asia Team</strong></p>
              </div>
              
              <div class="footer">
                <p><strong>Placid Asia Equipment Co., Ltd.</strong></p>
                <p>Email: info@placid.asia | Website: www.placid.asia</p>
                <p>Phone: +66 (0)2-XXX-XXXX</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      if (!emailResult.success) {
        console.error('Failed to send reply email:', emailResult.message);
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update inquiry:', error);
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}
