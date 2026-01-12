# Email Provider Setup Guide

Your email system now supports multiple providers! You can choose between SMTP and API-based services.

## How to Configure

1. Go to **Admin Panel** → **Settings** → **Email** tab
2. Select your preferred **Email Service Provider** from the dropdown
3. Fill in the required credentials
4. Save settings

The email provider will be used **throughout your entire application**, including:
- Newsletter campaigns
- Contact form emails
- Any future email features

## Supported Providers

### 1. SMTP (Default) - Universal
**Use with:** Gmail, Outlook, Office365, or any custom SMTP server

**Required Fields:**
- Email Provider: `SMTP`
- Sender Name: Your organization name
- SMTP Host: `smtp.gmail.com` (or your provider's SMTP host)
- SMTP Port: `587` (TLS) or `465` (SSL)
- Use SSL/TLS: Check for port 465, uncheck for 587
- SMTP Username: Your email address
- SMTP Password: Your email password or app password

**Gmail Setup:**
1. Enable 2-Factor Authentication
2. Generate App Password: Google Account → Security → 2-Step Verification → App passwords
3. Use the 16-character app password in SMTP Password field

---

### 2. Resend ⭐ Recommended
**Website:** https://resend.com  
**Free Tier:** 100 emails/day, 3,000 emails/month

**Required Fields:**
- Email Provider: `Resend`
- Sender Name: Your organization name
- API Key: Your Resend API key
- SMTP Username: Email from verified domain (e.g., `noreply@yourdomain.com`)

**Setup Steps:**
1. Sign up at https://resend.com
2. Add and verify your domain
3. Create an API key in dashboard
4. Use a verified domain email as SMTP Username

**Advantages:**
- Simple API
- Excellent deliverability
- Modern dashboard
- Affordable pricing

---

### 3. SendGrid
**Website:** https://sendgrid.com  
**Free Tier:** 100 emails/day

**Required Fields:**
- Email Provider: `SendGrid`
- Sender Name: Your organization name
- API Key: Your SendGrid API key
- SMTP Username: Your email address

**Setup Steps:**
1. Sign up at SendGrid
2. Verify sender email or domain
3. Create API key in Settings → API Keys
4. Use your verified email as SMTP Username

---

### 4. Mailgun
**Website:** https://mailgun.com  
**Free Tier:** 5,000 emails/month (first 3 months)

**Required Fields:**
- Email Provider: `Mailgun`
- Sender Name: Your organization name
- API Key: Your Mailgun API key
- SMTP Username: `postmaster@your-mailgun-domain.com`

**Setup Steps:**
1. Sign up at Mailgun
2. Add and verify your domain
3. Get API key from Settings → API Keys
4. Use the Mailgun domain username

---

### 5. Postmark
**Website:** https://postmarkapp.com  
**Free Tier:** 100 emails/month

**Required Fields:**
- Email Provider: `Postmark`
- Sender Name: Your organization name
- API Key: Your Postmark server API token

**Setup Steps:**
1. Sign up at Postmark
2. Create a server
3. Add verified sender signature or domain
4. Get server API token from API Tokens tab

---

### 6. Amazon SES (SMTP)
**Website:** https://aws.amazon.com/ses  
**Pricing:** $0.10 per 1,000 emails (very cheap!)

**Required Fields:**
- Email Provider: `Amazon SES (SMTP)`
- Sender Name: Your organization name
- SMTP Username: Your SES SMTP username
- SMTP Password: Your SES SMTP password

**Setup Steps:**
1. Sign up for AWS account
2. Request production access (if needed)
3. Verify domain or email in SES console
4. Create SMTP credentials in SES console
5. Use SMTP credentials in settings

---

## Testing Your Configuration

After configuring your email provider:

1. Go to **Admin Panel** → **Newsletter** → **Campaigns**
2. Create a test campaign
3. Use the "Send Test Email" button (if available)
4. Or send to a small test list first

You can also test via API:
```bash
curl -X POST http://localhost:3001/api/newsletter/test-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -d '{"testEmail": "your-email@example.com"}'
```

---

## Switching Providers

You can switch between providers at any time:

1. Go to Email Settings
2. Change "Email Provider" dropdown
3. Fill in new provider's credentials
4. Save

**Note:** Make sure your new provider's "From" email is verified before sending campaigns.

---

## Troubleshooting

### "Email settings not configured" error
- Check that API key or SMTP credentials are filled in
- Verify the correct provider is selected

### Emails not received
- Check spam/junk folder
- Verify sender email/domain with your provider
- Check provider dashboard for delivery logs
- Ensure you're within free tier limits

### "Invalid credentials" error
- Double-check API key or password
- For Gmail: Use App Password, not regular password
- For Resend: Verify domain email matches verified domain

### Rate limit errors
- Check your provider's daily/monthly limits
- Upgrade plan if needed
- Spread campaigns over time

---

## Provider Comparison

| Provider | Free Tier | Best For | Setup Difficulty |
|----------|-----------|----------|------------------|
| **Resend** | 3,000/mo | Modern apps, verified domains | Easy |
| **SMTP (Gmail)** | 500/day | Quick start, small lists | Easy |
| **SendGrid** | 100/day | Marketing emails | Medium |
| **Mailgun** | 5,000/mo (3 months) | Developer-friendly | Medium |
| **Amazon SES** | Pay-as-go ($0.10/1k) | Large scale, low cost | Hard |
| **Postmark** | 100/mo | Transactional emails | Easy |

---

## Recommendations

**Small Newsletter (< 500 subscribers):**
- Use Gmail SMTP (free, easy setup)
- Or Resend (better deliverability)

**Growing Newsletter (500-5,000 subscribers):**
- Use Resend or Mailgun
- Consider upgrading to paid plan

**Large Newsletter (> 5,000 subscribers):**
- Use Amazon SES (most cost-effective)
- Or SendGrid/Mailgun paid plans

---

## Security Notes

- API keys and passwords are stored in your database
- Only admins can access email settings
- Never share your API keys publicly
- Rotate API keys periodically
- Use environment variables for additional security (optional)

---

**Need Help?** 
- Check provider's documentation
- Test with small lists first
- Monitor delivery rates in provider dashboard
- Contact provider support if issues persist
