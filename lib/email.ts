
import * as SibApiV3Sdk from '@sendinblue/client'
import fs from 'fs'
import path from 'path'

// Load Brevo API key from environment or auth secrets
function getBrevoApiKey(): string {
  // First try environment variable
  if (process.env.BREVO_API_KEY) {
    return process.env.BREVO_API_KEY
  }

  // Fallback to auth secrets file (development only)
  if (process.env.NODE_ENV === 'development') {
    try {
      const secretsPath = path.join(process.env.HOME || '/home/ubuntu', '.config/abacusai_auth_secrets.json')
      if (fs.existsSync(secretsPath)) {
        const secrets = JSON.parse(fs.readFileSync(secretsPath, 'utf-8'))
        return secrets?.brevo?.secrets?.api_key?.value || ''
      }
    } catch (error) {
      console.error('Error loading Brevo API key from secrets:', error)
    }
  }

  return ''
}

const apiKey = getBrevoApiKey()

if (!apiKey) {
  console.warn('Brevo API key not found. Email functionality will not work.')
}

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey)

export interface EmailOptions {
  to: string
  subject: string
  htmlContent: string
  textContent?: string
  senderName?: string
  senderEmail?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!apiKey) {
    console.error('Cannot send email: Brevo API key not configured')
    return false
  }

  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    
    sendSmtpEmail.sender = {
      name: options.senderName || 'Placid Asia',
      email: options.senderEmail || 'noreply@placid.asia'
    }
    
    sendSmtpEmail.to = [{ email: options.to }]
    sendSmtpEmail.subject = options.subject
    sendSmtpEmail.htmlContent = options.htmlContent
    
    if (options.textContent) {
      sendSmtpEmail.textContent = options.textContent
    }

    await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log(`Email sent successfully to ${options.to}`)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

export async function sendQuoteRequestEmail(cartItems: any[], customerInfo?: any) {
  const productsHtml = cartItems.map(item => `
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.product.sku}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.product.title_en}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
    </tr>
  `).join('')

  const customerHtml = customerInfo ? `
    <h3>Customer Information:</h3>
    <p><strong>Name:</strong> ${customerInfo.name || 'N/A'}</p>
    <p><strong>Email:</strong> ${customerInfo.email || 'N/A'}</p>
    <p><strong>Phone:</strong> ${customerInfo.phone || 'N/A'}</p>
    <p><strong>Company:</strong> ${customerInfo.company || 'N/A'}</p>
    <p><strong>Message:</strong> ${customerInfo.message || 'N/A'}</p>
  ` : ''

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th { background-color: #003F62; color: white; padding: 10px; text-align: left; }
          td { padding: 10px; border: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <h2>New Quote Request from Placid Asia Website</h2>
        ${customerHtml}
        <h3>Requested Products:</h3>
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${productsHtml}
          </tbody>
        </table>
        <p style="margin-top: 20px; color: #666;">
          This email was automatically generated from the Placid Asia website cart system.
        </p>
      </body>
    </html>
  `

  return sendEmail({
    to: 'info@placid.asia',
    subject: `New Quote Request - ${cartItems.length} Product(s)`,
    htmlContent,
    senderName: 'Placid Asia Website',
    senderEmail: 'noreply@placid.asia'
  })
}

export async function sendChatTranscriptEmail(transcript: any[], userInfo?: any) {
  const messagesHtml = transcript.map((msg, index) => `
    <div style="margin-bottom: 15px; padding: 10px; background-color: ${msg.role === 'user' ? '#f0f0f0' : '#e8f4f8'}; border-radius: 5px;">
      <strong style="color: ${msg.role === 'user' ? '#003F62' : '#D4A032'};">
        ${msg.role === 'user' ? 'Customer' : 'AI Assistant'}:
      </strong>
      <p style="margin: 5px 0 0 0;">${msg.content}</p>
    </div>
  `).join('')

  const userHtml = userInfo ? `
    <h3>User Information:</h3>
    <p><strong>Email:</strong> ${userInfo.email || 'Not provided'}</p>
    <p><strong>Language:</strong> ${userInfo.language || 'Not specified'}</p>
  ` : ''

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        <h2>Chat Transcript from Placid Asia Website</h2>
        ${userHtml}
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <h3>Conversation:</h3>
        <div style="margin-top: 20px;">
          ${messagesHtml}
        </div>
        <p style="margin-top: 20px; color: #666;">
          This email was automatically generated from the Placid Asia website chatbot.
        </p>
      </body>
    </html>
  `

  return sendEmail({
    to: 'info@placid.asia',
    subject: `Chat Transcript - ${new Date().toLocaleDateString()}`,
    htmlContent,
    senderName: 'Placid Asia Chatbot',
    senderEmail: 'noreply@placid.asia'
  })
}

export async function sendNewsletterSubscription(email: string, name?: string) {
  const htmlContent = `
    <html>
      <body>
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p style="margin-top: 20px; color: #666;">
          This email was automatically generated from the Placid Asia website newsletter signup.
        </p>
      </body>
    </html>
  `

  return sendEmail({
    to: 'info@placid.asia',
    subject: `New Newsletter Subscription - ${email}`,
    htmlContent,
    senderName: 'Placid Asia Website',
    senderEmail: 'noreply@placid.asia'
  })
}
