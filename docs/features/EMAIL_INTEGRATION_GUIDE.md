# Email Integration Guide

## Overview
The newsletter campaign system now sends actual emails using SMTP configuration from the `website_settings` table.

## Current Setup
- **SMTP Provider**: Gmail (smtp.gmail.com:587)
- **From Address**: marlostudioa@gmail.com
- **Status**: ✅ Configured and Ready

## How It Works

### 1. Email Service (`backend/services/emailService.js`)
- Retrieves SMTP configuration from `website_settings` table
- Creates nodemailer transporter with database credentials
- Generates HTML and plain text email templates
- Sends individual emails to campaign recipients

### 2. Campaign Sending Flow
When you click "Send Campaign" in the admin panel:

1. Fetches all active subscribers (from both `user` and `newsletter` tables)
2. Retrieves SMTP configuration from `website_settings`
3. Parses campaign content (title, subject, content, media links, etc.)
4. Sends email to each subscriber individually
5. Tracks success/failure for each recipient
6. Updates campaign status to "sent" with recipient count

### 3. Email Template Features
Each campaign email includes:
- **Header**: Soul Felt Music branding with campaign subject
- **Main Content**: Campaign message (preserves formatting)
- **Additional Notes**: Optional message field
- **Media Attachments**:
  - 🎵 Audio player links
  - 🎬 Video links
  - Featured image display
- **External Links**: Clickable buttons for important links
- **Footer**: 
  - Copyright notice
  - Website link
  - Unsubscribe link

## API Endpoints

### Send Campaign
```
POST /api/newsletter/campaigns/:id/send
Headers: Authorization: Bearer {firebase-token}
```

**Response:**
```json
{
  "message": "Campaign sent successfully to 45 recipient(s)",
  "recipientCount": 45,
  "successCount": 45,
  "failedCount": 0
}
```

If some emails fail:
```json
{
  "message": "Campaign sent successfully to 43 recipient(s)",
  "recipientCount": 45,
  "successCount": 43,
  "failedCount": 2,
  "failedEmails": [
    { "email": "invalid@example.com", "error": "Invalid recipient" }
  ]
}
```

### Test Email Configuration
```
POST /api/newsletter/test-email
Headers: Authorization: Bearer {firebase-token}
Body: { "testEmail": "your-email@example.com" }
```

**Response:**
```json
{
  "message": "Test email sent successfully",
  "messageId": "<unique-message-id>",
  "to": "your-email@example.com"
}
```

## SMTP Configuration

### Database Schema
The `website_settings` table includes these SMTP fields:

```sql
smtp_host VARCHAR(255) DEFAULT 'smtp.gmail.com'
smtp_port INT DEFAULT 587
smtp_secure TINYINT(1) DEFAULT 0  -- false for STARTTLS
smtp_user VARCHAR(255)            -- Your email address
smtp_password VARCHAR(255)        -- Your email password or app password
```

### Updating SMTP Settings
You can update SMTP settings via the Admin Settings page or directly in the database:

```sql
UPDATE website_settings 
SET 
  smtp_host = 'smtp.gmail.com',
  smtp_port = 587,
  smtp_secure = 0,
  smtp_user = 'your-email@gmail.com',
  smtp_password = 'your-app-password'
WHERE id = 1;
```

### Gmail Setup (Recommended)
For Gmail SMTP:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to Google Account → Security → 2-Step Verification
   - Scroll to "App passwords"
   - Generate password for "Mail"
   - Use this 16-character password in `smtp_password` field

3. **Settings**:
   - Host: `smtp.gmail.com`
   - Port: `587`
   - Secure: `false` (uses STARTTLS)
   - User: Your Gmail address
   - Password: App password (not your regular password)

### Alternative SMTP Providers

#### SendGrid
```
smtp_host: smtp.sendgrid.net
smtp_port: 587
smtp_user: apikey
smtp_password: YOUR_API_KEY
smtp_secure: false
```

#### Amazon SES
```
smtp_host: email-smtp.us-east-1.amazonaws.com
smtp_port: 587
smtp_user: YOUR_SES_SMTP_USERNAME
smtp_password: YOUR_SES_SMTP_PASSWORD
smtp_secure: false
```

#### Custom SMTP Server
```
smtp_host: mail.yourdomain.com
smtp_port: 587 (or 465 for SSL)
smtp_user: noreply@yourdomain.com
smtp_password: YOUR_PASSWORD
smtp_secure: true (for port 465) or false (for port 587)
```

## Testing Email Delivery

### 1. Test SMTP Configuration
```bash
curl -X POST http://localhost:3001/api/newsletter/test-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -d '{"testEmail": "your-email@example.com"}'
```

### 2. Create Test Campaign
1. Go to Admin Panel → Newsletter
2. Click "Create New Campaign"
3. Fill in campaign details
4. Save as Draft

### 3. Send Test Campaign
1. Click "Send" button next to your test campaign
2. Check your inbox (and spam folder)
3. Verify email formatting and links

## Troubleshooting

### "Email settings not configured" Error
- Check that `smtp_user` and `smtp_password` are set in `website_settings` table
- Verify the values are not NULL

### Gmail "Less secure app" Error
- Gmail no longer supports "less secure apps"
- **Solution**: Use App Password (see Gmail Setup above)
- Never use your regular Gmail password

### Emails Going to Spam
- Add SPF record to your domain DNS:
  ```
  v=spf1 include:_spf.google.com ~all
  ```
- Add DKIM signature (advanced - requires Gmail/SendGrid configuration)
- Use a verified "From" address

### "Connection timeout" Error
- Check firewall rules (port 587 must be open)
- Verify `smtp_host` is correct
- Try alternative port (465 with `smtp_secure: true`)

### Some Emails Fail to Send
- Check `failedEmails` array in response
- Common causes:
  - Invalid email addresses
  - Recipient's mailbox full
  - Temporary network issues
- Failed recipients are still recorded in database

## Database Tables

### newsletter_campaigns
Stores campaign content and metadata.

### newsletter_campaign_recipients
Tracks email delivery for each recipient:
- `email`: Recipient email address
- `sent_at`: Timestamp when email was sent
- `opened_at`: Timestamp when email was opened (future feature)
- `clicked_at`: Timestamp when links were clicked (future feature)

### website_settings
Contains SMTP configuration used by email service.

## Future Enhancements

### Email Analytics (Planned)
- Track email opens with tracking pixel
- Track link clicks with redirect URLs
- Display open rate and click rate in analytics dashboard

### Email Templates (Planned)
- Multiple template designs
- Template preview before sending
- Custom HTML templates

### Scheduled Sending (Planned)
- Schedule campaigns for future delivery
- Recurring campaigns (monthly newsletters)
- Time zone optimization

### A/B Testing (Planned)
- Test different subject lines
- Test different content variations
- Automatic winner selection

## Security Notes

### Password Storage
- SMTP passwords are stored in plain text in `website_settings` table
- Consider encrypting sensitive fields in production
- Use environment variables for additional security layer
- Restrict database access to authorized users only

### Email Rate Limits
Gmail SMTP limits:
- **Free accounts**: 500 recipients per day
- **Google Workspace**: 2,000 recipients per day
- Consider using SendGrid or Amazon SES for larger lists

### Best Practices
- Always include unsubscribe link (required by CAN-SPAM Act)
- Honor unsubscribe requests immediately
- Don't send to purchased or scraped email lists
- Only send to users who explicitly opted in
- Monitor bounce rates and remove invalid addresses

## Support

For issues or questions:
1. Check server logs: `backend/server.js` console output
2. Test SMTP connection with test endpoint
3. Verify database SMTP settings are correct
4. Check email provider documentation for specific requirements

---

**Last Updated**: $(date +%Y-%m-%d)
**Version**: 1.0
**Status**: Production Ready ✅
