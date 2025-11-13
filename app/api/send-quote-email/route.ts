
import { NextRequest, NextResponse } from 'next/server'
import { sendQuoteRequestEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cartItems, customerInfo } = body

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'No cart items provided' },
        { status: 400 }
      )
    }

    const success = await sendQuoteRequestEmail(cartItems, customerInfo)

    if (success) {
      return NextResponse.json({ message: 'Quote request email sent successfully' })
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in send-quote-email route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
