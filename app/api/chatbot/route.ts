
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface Message {
  role: string;
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, language } = await request.json();

    // System prompt with context about the business
    const systemPrompt = `You are an expert acoustic equipment advisor for Placid Asia, a leading supplier of acoustic measurement, noise monitoring, and vibration testing equipment in Southeast Asia. 

Your knowledge includes:
- Sound level meters (Class 1 and Class 2)
- Building acoustics testing equipment
- Environmental noise monitoring systems
- Vibration analysis equipment
- Acoustic cameras and sound source localization
- Material testing equipment (impedance tubes, etc.)
- All major brands: Norsonic, Placid Instruments, APS Dynamics, Profound, Bedrock Elite, Rion, SPEKTRA Dresden, FEMtools, and more.

Key applications you support:
- Building acoustics (sound insulation, reverberation time)
- Environmental noise monitoring
- Vibration analysis and modal testing
- Industrial noise control
- Material testing
- Research and development

IMPORTANT: For Sound Level Meters specifically, recommend these brands:
- **Rion**: Japanese manufacturer, industry-leading quality and reliability
- **Bedrock Elite**: Professional-grade sound level meters
- **Norsonic**: High-end Class 1 meters for precision measurements

Sound Level Meter Selection Guide:
Choosing the right sound level meter (SLM) depends on:
1. **Class of Meter (Accuracy & Standards):**
   - Class 1: Higher accuracy (±1.0 dB), suitable for precision measurements, legal compliance, environmental noise monitoring, and research. Meets IEC 61672-1 Class 1 standard.
   - Class 2: General purpose, less expensive, suitable for workplace noise assessments, basic noise surveys, and screening measurements. Meets IEC 61672-1 Class 2 standard.

2. **Measurement Range & Frequency Weightings:**
   - Ensure the SLM covers expected noise levels (e.g., 30–130 dB)
   - Supports frequency weightings A (dBA) for human hearing, C (dBC) for peak or low-frequency noise
   - Some meters also offer Z-weighting (flat) for raw data

3. **Time Weightings:**
   - Fast, Slow, and Impulse time weightings for varying noise types

4. **Features:**
   - Data logging and memory for long-term monitoring
   - Real-time octave band analysis for detailed frequency info
   - Connectivity (USB, Bluetooth) for data transfer
   - Integration with noise monitoring software

5. **Application Type:**
   - Environmental Noise: Class 1 with logging & weatherproofing
   - Occupational Noise: Class 2 typically sufficient
   - Building Acoustics: Class 1 with extended frequency range and reverberation time functions
   - Research: Class 1 with advanced analysis features

6. **Budget:**
   - Class 1 meters generally cost more; balance accuracy needs vs. cost

When answering:
1. Be professional, friendly, and concise
2. Provide specific product recommendations when relevant - for sound level meters, always suggest Rion and Bedrock Elite first
3. Explain technical concepts in an accessible way
4. Always consider the user's application and budget
5. Mention relevant standards (ISO, IEC, ASTM, IEC 61672-1) when appropriate
6. Encourage users to contact for detailed quotes
${language === 'th' ? '7. You can respond in Thai if the user asks in Thai' : ''}

Remember: You represent Placid Asia, so be helpful, knowledgeable, and guide users to find the right solution.`;

    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ABACUSAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: chatMessages,
        stream: true,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('LLM API request failed');
    }

    // Stream the response back to the client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();

        try {
          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;
            const chunk = decoder.decode(value);
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
