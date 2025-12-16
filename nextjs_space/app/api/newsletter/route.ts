
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { message: 'This email is already subscribed' },
          { status: 409 }
        );
      } else {
        // Reactivate existing subscription
        await prisma.newsletterSubscriber.update({
          where: { email: email.toLowerCase().trim() },
          data: { active: true, name: name || existing.name },
        });
        return NextResponse.json({ message: 'Subscription reactivated successfully' });
      }
    }

    // Create new subscriber
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase().trim(),
        name: name?.trim() || null,
        active: true,
      },
    });

    // Send welcome email via Brevo (async, don't block response)
    sendWelcomeEmail(subscriber.email, subscriber.name).catch((error) => {
      console.error('Failed to send welcome email:', error);
    });

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
      subscriber: {
        email: subscriber.email,
        name: subscriber.name,
      },
    });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint for admin to retrieve subscribers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    const where = active === 'true' ? { active: true } : active === 'false' ? { active: false } : {};

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { subscribed_at: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        subscribed_at: true,
        active: true,
      },
    });

    return NextResponse.json({
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error('Failed to fetch subscribers:', error);
    return NextResponse.json(
      { message: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
