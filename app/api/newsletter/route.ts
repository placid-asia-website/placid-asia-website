
import { NextRequest, NextResponse } from 'next/server'
import { sendNewsletterSubscription } from '@/lib/email'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      )
    }

    // Save to database
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        name: name || null,
        subscribed_at: new Date()
      }
    })

    // Send notification email
    await sendNewsletterSubscription(email, name)

    return NextResponse.json({ message: 'Successfully subscribed to newsletter' })
  } catch (error) {
    console.error('Error in newsletter route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
