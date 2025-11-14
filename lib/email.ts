
// Email utility functions using Brevo API
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3';

interface EmailParams {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  sender?: { email: string; name: string };
}

export async function sendEmail(params: EmailParams) {
  if (!BREVO_API_KEY) {
    console.warn('BREVO_API_KEY not configured. Skipping email send.');
    return { success: false, message: 'Email service not configured' };
  }

  const payload = {
    sender: params.sender || {
      email: 'info@placid.asia',
      name: 'Placid Asia',
    },
    to: params.to,
    subject: params.subject,
    htmlContent: params.htmlContent,
    textContent: params.textContent || params.htmlContent.replace(/<[^>]*>/g, ''),
  };

  try {
    const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Brevo API error:', error);
      return { success: false, message: error.message || 'Failed to send email' };
    }

    const result = await response.json();
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error('Email send error:', error);
    return { success: false, message: error.message };
  }
}

// Send welcome email to new newsletter subscribers
export async function sendWelcomeEmail(email: string, name?: string | null) {
  const displayName = name || 'Valued Customer';
  
  return sendEmail({
    to: [{ email, name: name || undefined }],
    subject: 'Welcome to Placid Asia Newsletter | ยินดีต้อนรับสู่จดหมายข่าว Placid Asia',
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
          .button { display: inline-block; padding: 12px 30px; background: #D4A032; color: #003F62; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .divider { border-top: 2px solid #D4A032; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Welcome to Placid Asia!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">ยินดีต้อนรับสู่ Placid Asia!</p>
          </div>
          
          <div class="content">
            <p>Dear ${displayName},</p>
            
            <p>Thank you for subscribing to our newsletter! We're excited to keep you updated on:</p>
            
            <ul>
              <li>🎯 <strong>New Product Launches</strong> - Be the first to know about cutting-edge audio equipment</li>
              <li>📊 <strong>Technical Insights</strong> - Expert guides and application notes</li>
              <li>🎁 <strong>Exclusive Offers</strong> - Special promotions for subscribers</li>
              <li>📰 <strong>Industry News</strong> - Latest trends in acoustics & vibration analysis</li>
            </ul>
            
            <div class="divider"></div>
            
            <p style="font-family: 'Sarabun', Arial, sans-serif;">เรียน ${displayName},</p>
            
            <p style="font-family: 'Sarabun', Arial, sans-serif;">ขอบคุณที่สมัครรับจดหมายข่าวของเรา! เราจะส่งข้อมูลเหล่านี้ให้คุณ:</p>
            
            <ul style="font-family: 'Sarabun', Arial, sans-serif;">
              <li>🎯 <strong>ผลิตภัณฑ์ใหม่</strong> - อัพเดตอุปกรณ์เสียงล่าสุด</li>
              <li>📊 <strong>ความรู้เชิงเทคนิค</strong> - คู่มือและบทความจากผู้เชี่ยวชาญ</li>
              <li>🎁 <strong>โปรโมชั่นพิเศษ</strong> - ข้อเสนอสำหรับสมาชิก</li>
              <li>📰 <strong>ข่าวสารอุตสาหกรรม</strong> - เทรนด์การวัดเสียงและการสั่นสะเทือน</li>
            </ul>
            
            <center>
              <a href="https://www.placid.asia/products" class="button">Browse Our Products / ดูผลิตภัณฑ์</a>
            </center>
            
            <p>If you have any questions, feel free to contact us at <a href="mailto:info@placid.asia">info@placid.asia</a></p>
          </div>
          
          <div class="footer">
            <p><strong>Placid Asia Equipment Co., Ltd.</strong></p>
            <p>Professional Audio & Vibration Analysis Solutions</p>
            <p><a href="https://www.placid.asia/newsletter/unsubscribe">Unsubscribe</a> | <a href="https://www.placid.asia/contact">Contact Us</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

// Send notification email when new contact inquiry is received
export async function sendInquiryNotification(inquiry: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string | null;
  company?: string | null;
  product_sku?: string | null;
}) {
  return sendEmail({
    to: [{ email: 'info@placid.asia', name: 'Placid Asia Admin' }],
    subject: `New Contact Inquiry: ${inquiry.subject}`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 15px; }
          .label { font-weight: bold; color: #003F62; display: inline-block; min-width: 120px; }
          .value { color: #333; }
          .header { background: linear-gradient(135deg, #003F62 0%, #005580 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .message-box { background: #f5f5f5; padding: 15px; border-left: 4px solid #D4A032; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">🔔 New Contact Inquiry</h2>
            <p style="margin: 5px 0 0; opacity: 0.9;">มีข้อความติดต่อใหม่</p>
          </div>
          
          <div class="card">
            <h3 style="margin-top: 0; color: #003F62;">Contact Information</h3>
            <p><span class="label">Name:</span> <span class="value">${inquiry.name}</span></p>
            <p><span class="label">Email:</span> <span class="value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></span></p>
            ${inquiry.phone ? `<p><span class="label">Phone:</span> <span class="value">${inquiry.phone}</span></p>` : ''}
            ${inquiry.company ? `<p><span class="label">Company:</span> <span class="value">${inquiry.company}</span></p>` : ''}
            ${inquiry.product_sku ? `<p><span class="label">Product SKU:</span> <span class="value">${inquiry.product_sku}</span></p>` : ''}
          </div>
          
          <div class="card">
            <h3 style="margin-top: 0; color: #003F62;">Subject</h3>
            <p>${inquiry.subject}</p>
          </div>
          
          <div class="card">
            <h3 style="margin-top: 0; color: #003F62;">Message</h3>
            <div class="message-box">
              ${inquiry.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://www.placid.asia/admin/inquiries" style="display: inline-block; padding: 12px 30px; background: #D4A032; color: #003F62; text-decoration: none; border-radius: 5px; font-weight: bold;">
              View in Admin Panel
            </a>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

// Send confirmation email to customer
export async function sendInquiryConfirmation(inquiry: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return sendEmail({
    to: [{ email: inquiry.email, name: inquiry.name }],
    subject: 'We Received Your Inquiry - Placid Asia | เราได้รับข้อความของคุณแล้ว',
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
          .highlight { background: #f0f7ff; padding: 15px; border-left: 4px solid #D4A032; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Thank You for Contacting Us!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">ขอบคุณที่ติดต่อเรา!</p>
          </div>
          
          <div class="content">
            <p>Dear ${inquiry.name},</p>
            
            <p>We have received your inquiry and will respond within <strong>1-2 business days</strong>.</p>
            
            <div class="highlight">
              <p style="margin: 0;"><strong>Subject:</strong> ${inquiry.subject}</p>
            </div>
            
            <p style="font-family: 'Sarabun', Arial, sans-serif; border-top: 2px solid #D4A032; padding-top: 20px; margin-top: 30px;">
              เรียน ${inquiry.name},
            </p>
            
            <p style="font-family: 'Sarabun', Arial, sans-serif;">
              เราได้รับข้อความของคุณแล้ว และจะตอบกลับภายใน <strong>1-2 วันทำการ</strong>
            </p>
            
            <p>For urgent inquiries, please call us at <strong>+66 (0)2-XXX-XXXX</strong></p>
            <p style="font-family: 'Sarabun', Arial, sans-serif;">สำหรับเรื่องด่วน โทร <strong>+66 (0)2-XXX-XXXX</strong></p>
            
            <p style="margin-top: 30px;">Best regards,<br><strong>Placid Asia Team</strong></p>
          </div>
          
          <div class="footer">
            <p><strong>Placid Asia Equipment Co., Ltd.</strong></p>
            <p>Email: info@placid.asia | Website: www.placid.asia</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

// Send quote request notification
export async function sendQuoteRequestNotification(cart: {
  items: Array<{
    sku: string;
    title_en: string;
    title_th: string;
    quantity: number;
  }>;
  customer: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
  };
}) {
  const itemsList = cart.items.map(item => 
    `<li>${item.title_en} (SKU: ${item.sku}) - Qty: ${item.quantity}</li>`
  ).join('');

  return sendEmail({
    to: [{ email: 'info@placid.asia', name: 'Placid Asia Admin' }],
    subject: `New Quote Request from ${cart.customer.name}`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 15px; }
          .header { background: linear-gradient(135deg, #003F62 0%, #005580 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          ul { background: #f5f5f5; padding: 15px 15px 15px 35px; border-left: 4px solid #D4A032; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">💼 New Quote Request</h2>
          </div>
          
          <div class="card">
            <h3 style="margin-top: 0; color: #003F62;">Customer Information</h3>
            <p><strong>Name:</strong> ${cart.customer.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${cart.customer.email}">${cart.customer.email}</a></p>
            ${cart.customer.phone ? `<p><strong>Phone:</strong> ${cart.customer.phone}</p>` : ''}
            ${cart.customer.company ? `<p><strong>Company:</strong> ${cart.customer.company}</p>` : ''}
          </div>
          
          <div class="card">
            <h3 style="margin-top: 0; color: #003F62;">Requested Products</h3>
            <ul>${itemsList}</ul>
          </div>
          
          ${cart.customer.message ? `
          <div class="card">
            <h3 style="margin-top: 0; color: #003F62;">Additional Message</h3>
            <p>${cart.customer.message.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://www.placid.asia/admin/inquiries" style="display: inline-block; padding: 12px 30px; background: #D4A032; color: #003F62; text-decoration: none; border-radius: 5px; font-weight: bold;">
              View in Admin Panel
            </a>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

// Alias for backward compatibility
export async function sendQuoteRequestEmail(cartItems: any[], customerInfo: any) {
  return sendQuoteRequestNotification({
    items: cartItems,
    customer: customerInfo,
  });
}

// Send chat transcript via email
export async function sendChatTranscriptEmail(transcript: any[], userInfo?: any) {
  const transcriptHtml = transcript.map(msg => 
    `<div style="margin: 10px 0; padding: 10px; background: ${msg.role === 'user' ? '#f0f7ff' : '#f5f5f5'}; border-radius: 5px;">
      <strong style="color: ${msg.role === 'user' ? '#003F62' : '#666'};">${msg.role === 'user' ? 'User' : 'Assistant'}:</strong><br>
      ${msg.content.replace(/\n/g, '<br>')}
    </div>`
  ).join('');

  return sendEmail({
    to: [{ email: userInfo?.email || 'info@placid.asia', name: userInfo?.name || 'Admin' }],
    subject: 'Chat Transcript - Placid Asia',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #003F62 0%, #005580 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">💬 Chat Transcript</h2>
            <p style="margin: 5px 0 0; opacity: 0.9;">Your conversation with Placid Asia</p>
          </div>
          ${transcriptHtml}
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; text-align: center;">
            <p style="margin: 0;"><strong>Placid Asia Equipment Co., Ltd.</strong></p>
            <p style="margin: 5px 0 0;">Email: info@placid.asia | Website: www.placid.asia</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}
