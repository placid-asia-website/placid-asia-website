
import { NextRequest, NextResponse } from 'next/server'
import { sendChatTranscriptEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transcript, userInfo } = body

    if (!transcript || transcript.length === 0) {
      return NextResponse.json(
        { error: 'No transcript provided' },
        { status: 400 }
      )
    }

    const success = await sendChatTranscriptEmail(transcript, userInfo)

    if (success) {
      return NextResponse.json({ message: 'Chat transcript email sent successfully' })
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in send-chat-transcript route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
