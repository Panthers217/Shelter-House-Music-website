# Quick Start: Testing Purchase Confirmation Emails

## Prerequisites Checklist

Before testing, ensure you have:

- [ ] **Email Provider Configured** in database (`website_settings` table)
- [ ] **Backend Server Running** on port 3001
- [ ] **Frontend Running** on port 5173 (for download links)
- [ ] **Stripe Webhook Configured** (for end-to-end testing)

## Option 1: Test Email System Directly (Fastest)

### Step 1: Configure Your Email

Edit `/backend/scripts/testPurchaseEmail.js` line 8:
```javascript
customer_email: 'YOUR_ACTUAL_EMAIL@example.com', // ⚠️ CHANGE THIS
```

### Step 2: Run Test Script

```bash
cd /workspaces/Soul-Felt-Music-site/backend
node scripts/testPurchaseEmail.js
```

### Expected Output:
```
✅ SUCCESS! Email sent successfully!
📧 Details:
- Recipient: your-email@example.com
- Message ID: <...>
```

### Troubleshooting:
```
❌ ERROR: Email settings not configured
→ Configure email in Admin Settings or database

❌ ERROR: SMTP authentication failed
→ Check username/password in website_settings
→ For Gmail: Use App Password, not regular password
```

## Option 2: End-to-End Purchase Flow Test

### Step 1: Start All Services

**Terminal 1 - Backend:**
```bash
cd /workspaces/Soul-Felt-Music-site/backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd /workspaces/Soul-Felt-Music-site/frontend
npm run dev
```

**Terminal 3 - Stripe Webhook (Development):**
```bash
stripe listen --forward-to localhost:3001/api/payments/webhook
```

### Step 2: Make Test Purchase

1. Open browser: http://localhost:5173
2. Add items to cart (track or album)
3. Proceed to checkout
4. Use Stripe test card: `4242 4242 4242 4242`
5. Complete payment

### Step 3: Verify Email

Check backend console for:
```
✅ Updated purchase record for payment pi_...
✅ Sent purchase confirmation email to customer@email.com
📧 Message ID: <...>
```

Check your email inbox for confirmation!

## Email Configuration Quick Reference

### Gmail (Development)

**Step 1: Enable App Password**
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to https://myaccount.google.com/apppasswords
4. Generate App Password for "Mail"
5. Copy 16-character password

**Step 2: Configure Database**
```sql
UPDATE website_settings SET
  email_provider = 'smtp',
  smtp_host = 'smtp.gmail.com',
  smtp_port = 587,
  smtp_secure = 0,
  smtp_user = 'your-email@gmail.com',
  smtp_password = 'your-16-char-app-password',
  email_from_name = 'Soul Felt Music',
  email_reply_to = 'support@yourdomain.com',
  contact_email = 'support@yourdomain.com'
WHERE id = 1;
```

**Step 3: Test**
```bash
node scripts/testPurchaseEmail.js
```

### Resend (Production - Recommended)

**Step 1: Sign Up**
1. Go to https://resend.com
2. Create free account (100 emails/day free)
3. Verify your domain
4. Get API key

**Step 2: Configure Database**
```sql
UPDATE website_settings SET
  email_provider = 'resend',
  email_api_key = 're_your_api_key_here',
  smtp_user = 'noreply@yourdomain.com',
  email_from_name = 'Soul Felt Music',
  email_reply_to = 'support@yourdomain.com',
  contact_email = 'support@yourdomain.com'
WHERE id = 1;
```

**Step 3: Test**
```bash
node scripts/testPurchaseEmail.js
```

## Verifying Email Content

Your customers will receive an email with:

### ✅ For Digital Purchases (Tracks/Albums):
- Order confirmation details
- **Download button** → Links to `/purchase-history` page
- Instructions for downloading individual tracks or ZIP files
- Note about link expiration (can regenerate anytime)

### ✅ For Physical Merchandise:
- Order confirmation details
- **Shipping address** displayed
- Estimated delivery time (5-7 business days)
- Note about shipping confirmation email

### ✅ For Mixed Orders (Digital + Physical):
- Both download section and shipping section shown
- Clear separation between digital and physical items

## What Customers See

**Email Preview:**

```
┌─────────────────────────────────────────┐
│   🎵 Order Confirmed!                   │
│   Thank you for your purchase           │
│   [Purple gradient header]              │
├─────────────────────────────────────────┤
│ Hi John Doe,                            │
│                                          │
│ Thank you for your order! Your order    │
│ has been successfully processed.        │
│                                          │
│ ┌───────────────────────────────────┐  │
│ │ ORDER DETAILS                     │  │
│ │ Order Number: ORDER-1234567890    │  │
│ │ Order Date: Nov 2, 2025, 10:30 AM │  │
│ │ Total Amount: $49.97              │  │
│ └───────────────────────────────────┘  │
│                                          │
│ ┌───────────────────────────────────┐  │
│ │ 🎶 Your Digital Downloads         │  │
│ │ Your purchased music is ready!    │  │
│ │                                    │  │
│ │  [Download Your Music] (button)   │  │
│ └───────────────────────────────────┘  │
│                                          │
│ ORDER SUMMARY                            │
│ ├─ Summer Vibes Collection             │
│ │  [Digital Album] by DJ Sunset         │
│ │  $19.99                               │
│ ├─ Midnight Dreams                     │
│ │  [Track] by The Dreamers              │
│ │  $9.99                                │
│ └─ Band T-Shirt (Medium)               │
│    [Merchandise] by Soul Felt Music     │
│    $19.99                               │
│                                          │
│ Total: $49.97                           │
└─────────────────────────────────────────┘
```

## Common Issues & Solutions

### Issue: "Email settings not configured"
**Solution:** Run SQL to configure email provider (see above)

### Issue: "SMTP authentication failed"
**Solution:** 
- Gmail: Use App Password, not regular password
- Check username/password are correct
- Verify SMTP host and port

### Issue: Emails going to spam
**Solution:**
- Use professional provider (Resend, SendGrid)
- Verify domain with SPF/DKIM records
- Test with https://mail-tester.com

### Issue: Download button not working
**Solution:**
- Check `FRONTEND_URL` in `.env` file
- Should be: `http://localhost:5173` (dev) or `https://yourdomain.com` (prod)
- User must be logged in to see purchase history

### Issue: No email after purchase
**Solution:**
1. Check backend console for errors
2. Verify Stripe webhook is receiving events
3. Check `payment_intent.succeeded` event is configured
4. Verify `STRIPE_WEBHOOK_SECRET` is correct

## Testing Email Design

Want to see how your email looks?

### Test Different Scenarios:

**Digital Only:**
```javascript
// In testPurchaseEmail.js, keep only:
items: [
  { item_type: 'Digital Album', ... },
  { item_type: 'Track', ... }
]
```

**Physical Only:**
```javascript
items: [
  { item_type: 'Merchandise', ... },
  { item_type: 'Physical Album', ... }
]
```

**Mixed:**
```javascript
items: [
  { item_type: 'Digital Album', ... },
  { item_type: 'Merchandise', ... }
]
```

### Preview in Different Email Clients:
1. Gmail (web + mobile)
2. Outlook
3. Apple Mail
4. Yahoo Mail

## Environment Variables Required

```bash
# .env file in /backend/
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173  # or production domain
```

## Documentation

For complete details, see:
- [`PURCHASE_EMAIL_IMPLEMENTATION.md`](./PURCHASE_EMAIL_IMPLEMENTATION.md) - Full implementation guide
- [`EMAIL_PROVIDER_SETUP.md`](./EMAIL_PROVIDER_SETUP.md) - Provider-specific setup
- [`STRIPE_SETUP.md`](./STRIPE_SETUP.md) - Stripe webhook configuration

## Quick Commands

```bash
# Test email system
cd backend && node scripts/testPurchaseEmail.js

# Start backend with logs
cd backend && npm start

# Start frontend
cd frontend && npm run dev

# Test Stripe webhook locally
stripe listen --forward-to localhost:3001/api/payments/webhook

# Trigger test payment
stripe trigger payment_intent.succeeded

# Check email settings in database
mysql -h your-host -u user -p -e "SELECT email_provider, smtp_host, smtp_user FROM website_settings;"
```

## Support Checklist

Before asking for help, verify:
- [ ] Email provider configured in database
- [ ] Backend server running without errors
- [ ] `.env` file has required variables
- [ ] Ran test script: `node scripts/testPurchaseEmail.js`
- [ ] Checked backend console logs
- [ ] Checked spam/junk folder
- [ ] Verified email credentials are correct

---

**Ready to Go?** Run: `node backend/scripts/testPurchaseEmail.js`

**Need Help?** See `PURCHASE_EMAIL_IMPLEMENTATION.md` for troubleshooting
