
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendInquiryNotification, sendInquiryConfirmation } from '@/lib/email'

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      company,
      subject,
      message,
      product_sku,
      language = 'en'
    } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      )
    }

    // Save inquiry to database
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject,
        message,
        product_sku: product_sku || null,
        language,
        status: 'new'
      }
    })

    // Send email notifications (async, don't block response)
    Promise.all([
      sendInquiryNotification({
        name,
        email,
        subject,
        message,
        phone,
        company,
        product_sku,
      }),
      sendInquiryConfirmation({
        name,
        email,
        subject,
        message,
      }),
    ]).catch((error) => {
      console.error('Failed to send email notifications:', error);
    });

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', inquiryId: inquiry.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
