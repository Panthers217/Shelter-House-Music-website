import nodemailer from "nodemailer";
import pool from "../config/db.js";
import { Resend } from 'resend';


/**
 * Get email configuration from website_settings
 */
async function getEmailConfig() {
  try {
    const [settings] = await pool.query(
      `SELECT 
        email_provider, 
        email_api_key, 
        email_from_name, 
        email_reply_to,
        smtp_host, 
        smtp_port, 
        smtp_secure, 
        smtp_user, 
        smtp_password, 
        contact_email 
      FROM website_settings 
      LIMIT 1`
    );

    if (settings.length === 0) {
      throw new Error("Email settings not configured in Admin Settings");
    }

    const config = settings[0];
    const provider = config.email_provider || "smtp";

    // Validate based on provider
    if (provider === "smtp") {
      if (!config.smtp_user || !config.smtp_password) {
        throw new Error(
          "SMTP settings not configured. Please configure SMTP username and password."
        );
      }
    } else {
      // API-based providers need an API key
      if (!config.email_api_key) {
        throw new Error(
          `${provider.toUpperCase()} API key not configured. Please add your API key in Email Settings.`
        );
      }
    }

    return config;
  } catch (error) {
    console.error("Error fetching email config:", error);
    throw error;
  }
}

/**
 * Create email transporter based on provider
 */
async function createTransporter() {
  const config = await getEmailConfig();
  const provider = config.email_provider || "smtp";

  // SMTP (default) - works with Gmail, Outlook, SendGrid SMTP, etc.
  if (provider === "smtp") {
    return nodemailer.createTransport({
      host: config.smtp_host,
      port: config.smtp_port,
      secure: config.smtp_secure,
      auth: {
        user: config.smtp_user,
        pass: config.smtp_password,
      },
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
    });
  }

  // Resend SDK - https://resend.com
  if (provider === "resend") {
    const resend = new Resend(config.email_api_key);
    return {
      sendMail: async (mailOptions) => {
        try {
          console.log('📧 Raw mailOptions.from:', mailOptions.from);
          console.log('📧 Raw mailOptions.to:', mailOptions.to);
          
          // Extract email from "Name <email@domain.com>" format or use as-is
          let fromEmail = mailOptions.from;
          if (fromEmail.includes('<')) {
            fromEmail = fromEmail.match(/<(.+?)>/)?.[1] || fromEmail;
          }
          
          let toEmail = mailOptions.to;
          if (toEmail.includes('<')) {
            toEmail = toEmail.match(/<(.+?)>/)?.[1] || toEmail;
          }
          
          console.log('📧 Parsed fromEmail:', fromEmail);
          console.log('📧 Parsed toEmail:', toEmail);
          
          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(fromEmail)) {
            throw new Error(`Invalid from email format: ${fromEmail}`);
          }
          if (!emailRegex.test(toEmail)) {
            throw new Error(`Invalid to email format: ${toEmail}`);
          }
          
          const result = await resend.emails.send({
            from: fromEmail,
            to: [toEmail],
            subject: mailOptions.subject,
            html: mailOptions.html,
            text: mailOptions.text,
            reply_to: mailOptions.replyTo
          });
          
          console.log('✅ Resend email sent:', result);
          
          // Return nodemailer-compatible response
          return {
            messageId: result.id,
            accepted: [toEmail],
            response: 'OK'
          };
        } catch (error) {
          console.error('❌ Resend send error:', error);
          throw error;
        }
      }
    };
  }

  // SendGrid API via SMTP
  if (provider === "sendgrid") {
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: config.email_api_key,
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });
  }

  // Mailgun SMTP
  if (provider === "mailgun") {
    return nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: config.smtp_user || "postmaster@your-domain.com",
        pass: config.email_api_key,
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });
  }

  // Postmark
  if (provider === "postmark") {
    return nodemailer.createTransport({
      host: "smtp.postmarkapp.com",
      port: 587,
      secure: false,
      auth: {
        user: config.email_api_key,
        pass: config.email_api_key,
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });
  }

  // AWS SES SMTP
  if (provider === "ses-smtp") {
    return nodemailer.createTransport({
      host: `email-smtp.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com`,
      port: 587,
      secure: false,
      auth: {
        user: config.smtp_user,
        pass: config.smtp_password,
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });
  }

  throw new Error(`Unsupported email provider: ${provider}`);
}

/**
 * Get sender email address based on provider
 */
export async function getSenderEmail() {
  const config = await getEmailConfig();
  const provider = config.email_provider || "smtp";

  // For most providers, use smtp_user as the from address
  // For Resend and some others, you might need a verified domain email
  if (provider === "resend" && config.contact_email) {
    return config.contact_email;
  }

  return (
    config.smtp_user || config.contact_email || "noreply@soulfeltmusic.com"
  );
}

/**
 * Send newsletter campaign to a single recipient
 */
export async function sendNewsletterEmail(recipientEmail, campaign, fromEmail) {
  const transporter = await createTransporter();
  const config = await getEmailConfig();

  // Use configured from name and reply-to
  const fromName = config.email_from_name || "Soul Felt Music";
  const replyTo = config.email_reply_to || fromEmail;

  // Build HTML email content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${campaign.subject}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #aa2a46 0%, #8a1f36 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #fff;
          padding: 30px;
          border: 1px solid #ddd;
        }
        .message {
          background: #f9f9f9;
          padding: 20px;
          border-left: 4px solid #aa2a46;
          margin: 20px 0;
        }
        .media-section {
          margin: 20px 0;
          padding: 15px;
          background: #f5f5f5;
          border-radius: 5px;
        }
        .links {
          margin: 20px 0;
        }
        .link-item {
          display: block;
          padding: 10px 15px;
          margin: 10px 0;
          background: #aa2a46;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          text-align: center;
        }
        .footer {
          background: #f9f9f9;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-radius: 0 0 10px 10px;
        }
        .unsubscribe {
          margin-top: 20px;
          font-size: 11px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Shelter House Music</h1>
        <p>${campaign.subject}</p>
      </div>
      
      <div class="content">
        <div style="white-space: pre-wrap;">${campaign.content}</div>
        
        ${
          campaign.message
            ? `
          <div class="message">
            <strong>Additional Notes:</strong><br>
            ${campaign.message}
          </div>
        `
            : ""
        }
        
        ${
          campaign.audio_url
            ? `
          <div class="media-section">
            <strong>🎵 Featured Audio:</strong><br>
            <a href="${campaign.audio_url}" target="_blank">Listen Now</a>
          </div>
        `
            : ""
        }
        
        ${
          campaign.video_url
            ? `
          <div class="media-section">
            <strong>🎬 Featured Video:</strong><br>
            <a href="${campaign.video_url}" target="_blank">Watch Now</a>
          </div>
        `
            : ""
        }
        
        ${
          campaign.external_links && campaign.external_links.length > 0
            ? `
          <div class="links">
            <strong>🔗 Important Links:</strong><br>
            ${campaign.external_links
              .map(
                (link) => `
              <a href="${link.url}" class="link-item" target="_blank">${link.title}</a>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
        
        ${
          campaign.featured_image
            ? `
          <div style="text-align: center; margin: 20px 0;">
            <img src="${campaign.featured_image}" alt="Featured" style="max-width: 100%; border-radius: 10px;">
          </div>
        `
            : ""
        }
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} Shelter House Music. All rights reserved.</p>
        <div class="unsubscribe">
          <a href="${
            process.env.FRONTEND_URL || "https://soulfeltmusic.com"
          }" style="color: #666;">Visit our website</a>
          <br><br>
          You're receiving this because you subscribed to Shelter House Music newsletter.
          <br>
          <a href="${
            process.env.FRONTEND_URL || "https://soulfeltmusic.com"
          }?unsubscribe=${encodeURIComponent(
    recipientEmail
  )}" style="color: #aa2a46;">Unsubscribe</a>
        </div>
      </div>
    </body>
    </html>
  `;

  // Plain text version
  const textContent = `
${campaign.subject}

${campaign.content}

${campaign.message ? `\nAdditional Notes:\n${campaign.message}\n` : ""}

${campaign.audio_url ? `\n🎵 Featured Audio: ${campaign.audio_url}\n` : ""}

${campaign.video_url ? `\n🎬 Featured Video: ${campaign.video_url}\n` : ""}

${
  campaign.external_links && campaign.external_links.length > 0
    ? `\n🔗 Links:\n${campaign.external_links
        .map((l) => `${l.title}: ${l.url}`)
        .join("\n")}\n`
    : ""
}

---
© ${new Date().getFullYear()} Soul Felt Music
Visit: ${process.env.FRONTEND_URL || "https://soulfeltmusic.com"}
Unsubscribe: ${
    process.env.FRONTEND_URL || "https://soulfeltmusic.com"
  }?unsubscribe=${encodeURIComponent(recipientEmail)}
  `;

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: recipientEmail,
    replyTo: replyTo,
    subject: campaign.subject,
    text: textContent,
    html: htmlContent,
  };

  return await transporter.sendMail(mailOptions);
}

/**
 * Generate modern HTML email template for purchase confirmation
 * @param {Object} data - Email data
 * @returns {string} HTML email template
 */
function generatePurchaseEmailTemplate(data) {
  const {
    customerName,
    orderId,
    orderDate,
    items,
    totalAmount,
    businessName,
    hasDigitalItems,
    hasMerchandise,
    shippingAddress,
    downloadUrl,
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      color: #333;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #aa2a46 0%, #8a1f36 100%);
      padding: 40px 30px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .header p {
      margin: 10px 0 0;
      font-size: 16px;
      opacity: 0.95;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: #333;
    }
    .order-info {
      background-color: #f9f9f9;
      border-left: 4px solid #aa2a46;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .order-info h2 {
      margin: 0 0 15px;
      font-size: 16px;
      color: #aa2a46;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .order-info p {
      margin: 8px 0;
      font-size: 14px;
      line-height: 1.6;
    }
    .order-info strong {
      color: #333;
      font-weight: 600;
    }
    .items-section {
      margin: 30px 0;
    }
    .items-section h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 25px;
      font-weight: 700;
    }
    .item {
      background-color: #ffffff;
      border: 1px solid #e8e8e8;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 15px;
      display: inline-block;
      align-items: flex-start;
      gap: 20px;
      transition: box-shadow 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .item:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .item:last-child {
      margin-bottom: 0;
    }
    .item-image {
      width: 120px;
      height: 120px;
      min-width: 120px;
      min-height: 120px;
      object-fit: cover;
      border-radius: 10px;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 2px solid #f0f0f0;
    }
    .item-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 15px;
      margin-bottom: 4px;
    }
    .item-details {
      flex: 1;
    }
    .item-title {
      font-size: 1rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 8px;
      line-height: 1.3;
      word-wrap: break-word;
    }
    .item-type {
      display: flex;
      background: linear-gradient(135deg, #aa2a46 0%, #8a1f36 100%);
      color: #ffffff;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .item-artist {
      font-size: 15px;
      color: #666;
      font-weight: 500;
      margin-top: 4px;
    }
    .item-quantity {
      font-size: 14px;
      color: #999;
      margin-top: 4px;
    }
    .item-price {
      padding-left: 10%;
      font-size: 22px;
      font-weight: 700;
      color: #aa2a46;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .item-actions {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
    }
    .download-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #aa2a46 0%, #8a1f36 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 3px 10px rgba(170, 42, 70, 0.3);
      transition: all 0.3s ease;
    }
    .download-button:hover {
      box-shadow: 0 5px 15px rgba(170, 42, 70, 0.4);
      transform: translateY(-1px);
    }
    .download-icon {
      font-size: 16px;
    }
    .download-hint {
      font-size: 13px;
      color: #888;
      margin-top: 8px;
      line-height: 1.5;
    }
    .total-section {
      background-color: #f9f9f9;
      padding: 20px;
      margin: 30px 0;
      border-radius: 4px;
      text-align: right;
    }
    .total-section p {
      margin: 10px 0;
      font-size: 18px;
    }
    .total-section strong {
      font-size: 24px;
      color: #aa2a46;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #aa2a46 0%, #8a1f36 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 15px 40px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      margin: 20px 0;
      box-shadow: 0 4px 15px rgba(170, 42, 70, 0.3);
      transition: all 0.3s ease;
    }
    .cta-button:hover {
      box-shadow: 0 6px 20px rgba(170, 42, 70, 0.4);
    }
    .download-section {
      background-color: #fff9e6;
      border: 2px solid #ffd700;
      padding: 25px;
      margin: 25px 0;
      border-radius: 8px;
      text-align: center;
    }
    .download-section h3 {
      margin: 0 0 15px;
      color: #aa2a46;
      font-size: 20px;
    }
    .download-section p {
      margin: 10px 0;
      font-size: 14px;
      color: #666;
    }
    .shipping-section {
      background-color: #e8f5e9;
      border: 2px solid #4caf50;
      padding: 25px;
      margin: 25px 0;
      border-radius: 8px;
    }
    .shipping-section h3 {
      margin: 0 0 15px;
      color: #2e7d32;
      font-size: 18px;
    }
    .shipping-section p {
      margin: 8px 0;
      font-size: 14px;
      line-height: 1.6;
      color: #333;
    }
    .note {
      background-color: #f0f7ff;
      border-left: 4px solid #2196F3;
      padding: 15px 20px;
      margin: 20px 0;
      font-size: 14px;
      line-height: 1.6;
      color: #555;
    }
    .footer {
      background-color: #333;
      color: #ffffff;
      padding: 30px;
      text-align: center;
      font-size: 13px;
      line-height: 1.8;
    }
    .footer a {
      color: #aa2a46;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .divider {
      height: 2px;
      background: linear-gradient(to right, transparent, #aa2a46, transparent);
      margin: 30px 0;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 30px 20px;
      }
      .header {
        padding: 30px 20px;
      }
      .header h1 {
        font-size: 24px;
      }
      .item {
        flex-direction: column;
        align-items: flex-start;
        padding: 15px;
      }
      .item-image {
        width: 100%;
        height: auto;
        max-width: 100%;
        aspect-ratio: 1;
      }
      .item-header {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
      }
      .item-price {
        padding-left: 10%;
        margin-top: 10px;
        font-size: 20px;
      }
      .download-button {
        width: 100%;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <h1>🎵 Order Confirmed!</h1>
      <p>Thank you for your purchase</p>
    </div>
    
    <!-- Content -->
    <div class="content">
      <p class="greeting">Hi ${customerName},</p>
      
      <p>Thank you for your order! We're excited to share our music with you. Your order has been successfully processed.</p>
      
      <!-- Order Information -->
      <div class="order-info">
        <h2>Order Details</h2>
        <p><strong>Order Number:</strong> ${orderId}</p>
        <p><strong>Order Date:</strong> ${orderDate}</p>
        <p><strong>Total Amount:</strong> $${totalAmount}</p>
      </div>
      
      ${
        hasDigitalItems
          ? `
      <!-- Digital Downloads -->
      <div class="download-section">
        <h3>🎶 Your Digital Downloads</h3>
        <p>Your purchased music is ready to download!</p>
        <p style="font-size: 14px; color: #666; margin: 15px 0;">
          Click the secure download links below to access your purchased music.<br>
          Each link is personalized to your account and verifies your purchase.<br>
          You can also access all your purchases anytime from your purchase history.
        </p>
        <p style="margin: 20px 0;">
          <a href="${downloadUrl}" class="cta-button">
            View Purchase History
          </a>
        </p>
      </div>
      
      <div class="note">
        <strong>📥 Download Instructions:</strong><br>
        • Click the secure download links in your Order Summary below<br>
        • Links are personalized and verify your purchase automatically<br>
        • Downloads remain accessible through your purchase history<br>
        • Access your downloads anytime from your account
      </div>
      `
          : ""
      }
      
      ${
        hasMerchandise && shippingAddress
          ? `
      <!-- Shipping Information -->
      <div class="shipping-section">
        <h3>📦 Shipping Details</h3>
        <p><strong>Your order will be shipped to:</strong></p>
        <p>
          ${shippingAddress.line1 || shippingAddress.address || ""}<br>
          ${shippingAddress.line2 ? `${shippingAddress.line2}<br>` : ""}
          ${shippingAddress.city || ""}, ${shippingAddress.state || ""} ${
              shippingAddress.postal_code || shippingAddress.zipCode || ""
            }<br>
          ${shippingAddress.country || ""}
        </p>
        <p style="margin-top: 15px;">
          <strong>Estimated Delivery:</strong> 5-7 business days
        </p>
      </div>
      
      <div class="note">
        <strong>📮 Shipping Note:</strong><br>
        You will receive a shipping confirmation email with tracking information once your order ships.
      </div>
      `
          : ""
      }
      
      <div class="divider"></div>
      
      <!-- Items List -->
      <div class="items-section">
        <h2>🛒 Order Summary</h2>
        ${items
          .map(
            (item) => `
          <div class="item">
            ${
              item.image_url
                ? `
              <img src="${item.image_url}" alt="${item.item_title}" class="item-image">
            `
                : ""
            }
            <div class="item-content">
              <div class="item-header">
                <div class="item-details">
                  <div class="item-title">${item.item_title}</div>
                  <span class="item-type">${item.item_type}</span>
                  <div class="item-artist">♫ ${
                    item.item_type === 'Merchandise' 
                      ? (item.merch_type || 'General Merchandise')
                      : `by ${item.artist_name || "Unknown Artist"}`
                  }</div>
                  ${
                    item.quantity > 1
                      ? `<div class="item-quantity">Quantity: ${item.quantity}</div>`
                      : ""
                  }
                </div>
                <div class="item-price">$${parseFloat(item.price).toFixed(
                  2
                )}</div>
              </div>
              ${
                item.secure_download_url
                  ? `
                <div class="item-actions">
                  <a href="${item.secure_download_url}" class="download-button">
                    <span class="download-icon">${item.item_title}⬇️</span>
                    <span>Download Now</span>
                  </a>
                  ${
                    item.item_type === "Digital Album"
                      ? `
                    <p class="download-hint">
                      ℹ️ This album contains multiple tracks. Click above to access all downloads.
                    </p>
                  `
                      : ""
                  }
                </div>
              `
                  : ""
              }
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      
      <!-- Total -->
      <div class="total-section">
        <p>Total: <strong>$${totalAmount}</strong></p>
      </div>
      
      <div class="divider"></div>
      
      <p>If you have any questions about your order, please don't hesitate to contact us.</p>
      
      <p style="margin-top: 30px;">
        Best regards,<br>
        <strong>${businessName}</strong>
      </p>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p><strong>${businessName}</strong></p>
      <p>This email was sent to confirm your purchase.</p>
      <p>Need help? Contact us at <a href="mailto:${
        data.businessEmail || "support@example.com"
      }">${data.businessEmail || "support@example.com"}</a></p>
      <p style="margin-top: 20px; opacity: 0.8; font-size: 12px;">
        © ${new Date().getFullYear()} ${businessName}. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Send purchase confirmation email with download links
 * @param {Object} purchaseData - Purchase data from database
 * @returns {Promise<Object>} Result of email sending
 */
export async function sendPurchaseConfirmationEmail(purchaseData) {
  try {
    const config = await getEmailConfig();
    const transporter = await createTransporter();
    const fromEmail = await getSenderEmail();
    const fromName = config.email_from_name || "Soul Felt Music";

    const {
      customer_email,
      customer_name,
      order_id,
      purchased_at,
      amount,
      items,
      shipping_address,
    } = purchaseData;

    // Determine if order has digital items or merchandise
    const hasDigitalItems = items.some(
      (item) => item.item_type === "Track" || item.item_type === "Digital Album"
    );

    const hasMerchandise = items.some(
      (item) =>
        item.item_type === "Merchandise" || item.item_type === "Physical Album"
    );

    // Parse shipping address if it's a string
    let parsedShippingAddress = null;
    if (shipping_address) {
      try {
        parsedShippingAddress =
          typeof shipping_address === "string"
            ? JSON.parse(shipping_address)
            : shipping_address;

        // Normalize address format (handle both our format and Stripe format)
        if (parsedShippingAddress) {
          // Convert our format to Stripe format if needed
          if (parsedShippingAddress.address && !parsedShippingAddress.line1) {
            parsedShippingAddress.line1 = parsedShippingAddress.address;
          }
          if (
            parsedShippingAddress.zipCode &&
            !parsedShippingAddress.postal_code
          ) {
            parsedShippingAddress.postal_code = parsedShippingAddress.zipCode;
          }
        }

        // Check if address has actual values (not just empty strings)
        const hasValidAddress =
          parsedShippingAddress &&
          (parsedShippingAddress.line1 ||
            parsedShippingAddress.address ||
            parsedShippingAddress.city ||
            parsedShippingAddress.state ||
            parsedShippingAddress.postal_code ||
            parsedShippingAddress.zipCode);

        if (!hasValidAddress) {
          // console.log("⚠️  Shipping address object exists but is empty");
          parsedShippingAddress = null;
        } else {
          // console.log(
          //   "✅ Valid shipping address found:",
          //   parsedShippingAddress
          // );
        }
      } catch (e) {
        console.error("❌ Error parsing shipping address:", e);
      }
    } else {
      // console.log("⚠️  No shipping address provided in purchase data");
    }

    // Generate secure download links for digital items
    const itemsWithDownloadLinks = items.map((item) => {
      if (item.item_type === "Track" || item.item_type === "Digital Album") {
        // Remove trailing slash from FRONTEND_URL to prevent double slashes
        const baseUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, '');
        // Create a secure download link that will verify purchase and generate signed URL
        const secureDownloadUrl = `${baseUrl}/download?type=${encodeURIComponent(
          item.item_type
        )}&id=${item.item_id}&email=${encodeURIComponent(customer_email)}`;

        console.log(`🔗 Generated download URL for ${item.item_title}: ${secureDownloadUrl}`);

        return {
          ...item,
          secure_download_url: secureDownloadUrl,
          track_title: item.item_title,
        };
      }
      return item;
    });

    // Generate download URL (points to purchase history page)
    // Remove trailing slash from FRONTEND_URL to prevent double slashes
    const downloadUrl = `${
      (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, '')
    }/purchase-history`;

    // Format order date
    const orderDate = new Date(purchased_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Generate email HTML
    const emailHtml = generatePurchaseEmailTemplate({
      customerName: customer_name,
      orderId: order_id,
      orderDate: orderDate,
      items: itemsWithDownloadLinks,
      totalAmount: parseFloat(amount).toFixed(2),
      businessName: config.email_from_name || "Soul Felt Music",
      businessEmail: config.contact_email || config.smtp_user,
      hasDigitalItems,
      hasMerchandise,
      shippingAddress: parsedShippingAddress,
      downloadUrl,
    });

    // Generate plain text version
    let textContent = `Order Confirmation - ${order_id}\n\n`;
    textContent += `Hi ${customer_name},\n\n`;
    textContent += `Thank you for your order! Your order has been successfully processed.\n\n`;
    textContent += `ORDER DETAILS\n`;
    textContent += `Order Number: ${order_id}\n`;
    textContent += `Order Date: ${orderDate}\n`;
    textContent += `Total Amount: $${parseFloat(amount).toFixed(2)}\n\n`;

    if (hasDigitalItems) {
      textContent += `YOUR DIGITAL DOWNLOADS\n`;
      textContent += `Your purchased music is ready to download!\n`;
      textContent += `Download Link: ${downloadUrl}\n\n`;
      textContent += `• Click the link to access your purchase history\n`;
      textContent += `• Download individual tracks or entire albums as ZIP files\n`;
      textContent += `• Your downloads are available anytime\n\n`;
    }

    if (hasMerchandise && parsedShippingAddress) {
      textContent += `SHIPPING DETAILS\n`;
      textContent += `Your order will be shipped to:\n`;
      textContent += `${
        parsedShippingAddress.line1 || parsedShippingAddress.address || ""
      }\n`;
      if (parsedShippingAddress.line2)
        textContent += `${parsedShippingAddress.line2}\n`;
      textContent += `${parsedShippingAddress.city || ""}, ${
        parsedShippingAddress.state || ""
      } ${
        parsedShippingAddress.postal_code || parsedShippingAddress.zipCode || ""
      }\n`;
      textContent += `${parsedShippingAddress.country || ""}\n`;
      textContent += `Estimated Delivery: 5-7 business days\n\n`;
    }

    textContent += `ORDER SUMMARY\n`;
    itemsWithDownloadLinks.forEach((item) => {
      textContent += `- ${item.item_title} (${item.item_type}) ${
        item.item_type === 'Merchandise' 
          ? (item.merch_type || 'General Merchandise')
          : `by ${item.artist_name || 'Unknown Artist'}`
      }\n`;
      textContent += `  $${parseFloat(item.price).toFixed(2)}`;
      if (item.quantity > 1) textContent += ` x ${item.quantity}`;
      textContent += `\n`;

      // Add secure download links for digital items
      if (item.secure_download_url) {
        textContent += `  Secure Download: ${item.secure_download_url}\n`;
      }
    });
    textContent += `\nTotal: $${parseFloat(amount).toFixed(2)}\n\n`;
    textContent += `Best regards,\n${
      config.email_from_name || "Soul Felt Music"
    }`;

    // Send email
    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: customer_email,
      replyTo: config.email_reply_to || fromEmail,
      subject: `Order Confirmation - ${order_id}`,
      text: textContent,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    // console.log(`✅ Purchase confirmation email sent to ${customer_email}`);
    // console.log(`📧 Message ID: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
      recipient: customer_email,
    };
  } catch (error) {
    console.error("❌ Error sending purchase confirmation email:", error);
    throw error;
  }
}

/**
 * Test email configuration
 */
export async function testEmailConfig(testRecipient) {
  const config = await getEmailConfig();
  const transporter = await createTransporter();
  const fromEmail = await getSenderEmail();
  const fromName = config.email_from_name || "Soul Felt Music";

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: testRecipient,
    replyTo: config.email_reply_to || fromEmail,
    subject: "Test Email - Shelter House Music",
    text: `This is a test email from Soul Felt Music newsletter system.\n\nProvider: ${
      config.email_provider || "smtp"
    }`,
    html: `<p>This is a test email from Soul Felt Music newsletter system.</p><p><strong>Provider:</strong> ${
      config.email_provider || "smtp"
    }</p>`,
  };

  return await transporter.sendMail(mailOptions);
}

export default {
  sendNewsletterEmail,
  sendPurchaseConfirmationEmail,
  testEmailConfig,
  getSenderEmail,
};
