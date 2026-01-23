// Contact form controller - handles contact form submissions and email sending
import pool from '../config/db.js';
import nodemailer from 'nodemailer';

/**
 * Submit contact form and send email
 * @route POST /api/contact/submit
 */
export async function submitContactForm(req, res) {
  try {
    const { name, email, inquiry_type, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !inquiry_type || !subject || !message) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Validate inquiry type
    if (!['general', 'artist', 'press'].includes(inquiry_type)) {
      return res.status(400).json({ error: 'Invalid inquiry type' });
    }
    
    // Get client info for logging
    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.headers['user-agent'];
    
    // Get email settings from database
    const [settings] = await pool.query(
      `SELECT 
        smtp_host, smtp_port, smtp_secure, smtp_user, smtp_password,
        contact_form_recipient, artist_submission_recipient, press_media_recipient,
        contact_form_auto_reply, contact_form_subject_prefix, business_name
      FROM website_settings 
      ORDER BY id DESC 
      LIMIT 1`
    );
    
    if (settings.length === 0 || !settings[0].smtp_user || !settings[0].smtp_password) {
      // Log submission even if email not configured
      await pool.query(
        `INSERT INTO contact_submissions 
        (name, email, inquiry_type, subject, message, ip_address, user_agent, status, error_message) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'failed', 'Email not configured')`,
        [name, email, inquiry_type, subject, message, ip_address, user_agent]
      );
      
      return res.status(500).json({ 
        error: 'Email service not configured. Please contact administrator.' 
      });
    }
    
    const config = settings[0];
    
    // Determine recipient based on inquiry type
    let recipient;
    switch (inquiry_type) {
      case 'artist':
        recipient = config.artist_submission_recipient || config.contact_form_recipient;
        break;
      case 'press':
        recipient = config.press_media_recipient || config.contact_form_recipient;
        break;
      default:
        recipient = config.contact_form_recipient;
    }
    
    if (!recipient) {
      await pool.query(
        `INSERT INTO contact_submissions 
        (name, email, inquiry_type, subject, message, ip_address, user_agent, status, error_message) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'failed', 'No recipient configured')`,
        [name, email, inquiry_type, subject, message, ip_address, user_agent]
      );
      
      return res.status(500).json({ 
        error: 'Recipient email not configured. Please contact administrator.' 
      });
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: config.smtp_host,
      port: config.smtp_port,
      secure: config.smtp_secure === 1 || config.smtp_secure === true,
      auth: {
        user: config.smtp_user,
        pass: config.smtp_password
      }
    });
    
    // Inquiry type labels
    const inquiryLabels = {
      general: 'General Inquiry',
      artist: 'Artist Submission',
      press: 'Press & Media'
    };
    
    // Email to business
    const businessEmailSubject = `${config.contact_form_subject_prefix || ''} ${inquiryLabels[inquiry_type]} - ${subject}`;
    const businessEmailBody = `
      <h2>New ${inquiryLabels[inquiry_type]}</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        Submitted on: ${new Date().toLocaleString()}<br>
        IP Address: ${ip_address}
      </p>
    `;
    
    try {
      // Send email to business
      await transporter.sendMail({
        from: `"${config.business_name || 'Contact Form'}" <${config.smtp_user}>`,
        to: recipient,
        replyTo: email,
        subject: businessEmailSubject,
        html: businessEmailBody
      });
      
      // Send auto-reply to customer if enabled
      if (config.contact_form_auto_reply) {
        const autoReplySubject = `Thank you for contacting ${config.business_name || 'us'}`;
        
        // Use custom message if available, otherwise use default
        let customMessage = config.auto_reply_message || 
          'We have received your {inquiry_type} and will get back to you as soon as possible.';
        
        // Replace variables in custom message
        customMessage = customMessage
          .replace(/{name}/g, name)
          .replace(/{inquiry_type}/g, inquiryLabels[inquiry_type].toLowerCase())
          .replace(/{business_name}/g, config.business_name || 'us');
        
        const autoReplyBody = `
          <h2>Thank you for your message!</h2>
          <p>Dear ${name},</p>
          <p>${customMessage.replace(/\n/g, '<br>')}</p>
          <p><strong>Your message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #aa2a46;">
            ${message.replace(/\n/g, '<br>')}
          </p>
          <p>Best regards,<br>${config.business_name || 'The Team'}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        `;
        
        await transporter.sendMail({
          from: `"${config.business_name || 'Contact Form'}" <${config.smtp_user}>`,
          to: email,
          subject: autoReplySubject,
          html: autoReplyBody
        });
      }
      
      // Log successful submission
      await pool.query(
        `INSERT INTO contact_submissions 
        (name, email, inquiry_type, subject, message, ip_address, user_agent, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'sent')`,
        [name, email, inquiry_type, subject, message, ip_address, user_agent]
      );
      
      res.json({ 
        success: true,
        message: 'Your message has been sent successfully!' 
      });
      
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // Log failed submission
      await pool.query(
        `INSERT INTO contact_submissions 
        (name, email, inquiry_type, subject, message, ip_address, user_agent, status, error_message) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'failed', ?)`,
        [name, email, inquiry_type, subject, message, ip_address, user_agent, emailError.message]
      );
      
      return res.status(500).json({ 
        error: 'Failed to send email. Please try again later or contact us directly.' 
      });
    }
    
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}

/**
 * Get contact submissions (Admin only)
 * @route GET /api/contact/submissions
 */
export async function getContactSubmissions(req, res) {
  try {
    const { limit = 50, offset = 0, status, inquiry_type } = req.query;
    
    let query = 'SELECT * FROM contact_submissions WHERE 1=1';
    const params = [];
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    if (inquiry_type) {
      query += ' AND inquiry_type = ?';
      params.push(inquiry_type);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const [submissions] = await pool.query(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM contact_submissions WHERE 1=1';
    const countParams = [];
    
    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }
    
    if (inquiry_type) {
      countQuery += ' AND inquiry_type = ?';
      countParams.push(inquiry_type);
    }
    
    const [countResult] = await pool.query(countQuery, countParams);
    
    res.json({
      submissions,
      total: countResult[0].total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ error: err.message });
  }
}