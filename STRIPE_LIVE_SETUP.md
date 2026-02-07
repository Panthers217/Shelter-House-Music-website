# 🚀 Stripe Live Setup - Accept Real Donations

## How to Switch from Test Mode to Live Mode

This guide shows you how to start accepting real donations with real transactions (not test mode).

---

## Step 1: Get Your LIVE API Keys (2 minutes)

1. Go to https://dashboard.stripe.com
2. **Toggle from "Test mode" to "Live mode"** (switch in top right corner)
3. Navigate to: **Developers → API keys**
4. Copy your **Live Secret Key** (starts with `sk_live_...`)
5. Copy your **Live Publishable Key** (starts with `pk_live_...`)

⚠️ **NEVER share or commit these keys to GitHub!**

---

## Step 2: Update Your Environment Variables

### Backend Environment Variables

**File:** `/backend/.env`

```bash
# Replace your test key with live key
STRIPE_SECRET_KEY=sk_live_YOUR_ACTUAL_LIVE_KEY_HERE

# You'll add this after Step 3
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET_HERE
```

### Frontend Environment Variables

**File:** `/frontend/.env` or `/frontend/.env.production`

```bash
# Replace your test key with live key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_ACTUAL_LIVE_KEY_HERE
```

---

## Step 3: Set Up Live Webhook (5 minutes)

### Create Live Webhook Endpoint

1. In Stripe Dashboard (**Live mode**), go to **Developers → Webhooks**
2. Click **"Add endpoint"** button
3. Enter your production URL:
   ```
   https://your-backend-domain.com/api/payments/webhook
   ```
   Example: `https://shelter-house-backend.onrender.com/api/payments/webhook`

4. Click **"Select events"** and choose these:
   ```
   ✅ payment_intent.succeeded
   ✅ payment_intent.payment_failed
   ✅ payment_intent.canceled
   ✅ customer.subscription.created
   ✅ customer.subscription.updated
   ✅ customer.subscription.deleted
   ✅ invoice.payment_succeeded
   ✅ invoice.payment_failed
   ```

5. Click **"Add endpoint"**

6. Copy the **Signing secret** (starts with `whsec_...`)

7. Add to your backend `.env` file:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET_HERE
   ```

---

## Step 4: Activate Your Stripe Account

Before accepting real payments, Stripe requires account activation.

### Required Information:

1. **Business Information**
   - Legal business name
   - Business type (Individual, Company, Nonprofit)
   - Business address
   - Phone number
   - Website URL

2. **Bank Account Details**
   - Bank name
   - Routing number
   - Account number
   - Account holder name

3. **Tax Information**
   - EIN (Employer Identification Number) OR
   - SSN (for sole proprietors)

4. **Identity Verification**
   - May need to upload ID or business documents

### How to Activate:

1. Go to: https://dashboard.stripe.com/settings/account
2. Look for **"Activate your account"** banner or button
3. Complete all required fields
4. Submit for review
5. Wait for approval (usually 1-2 business days)

---

## Step 5: Test with Real Card (Safely!)

### First Real Transaction Test

Use **your own credit/debit card** for a small test donation:

1. **Start your servers** with live keys:
   ```bash
   # Terminal 1 - Backend
   cd /workspaces/Shelter-House-Music-website/backend
   npm start
   
   # Terminal 2 - Frontend
   cd /workspaces/Shelter-House-Music-website/frontend
   npm run dev
   ```

2. **Make a $1.00 test donation**
   - Visit your donation page
   - Enter $1.00 amount
   - Use your own card
   - Complete the donation

3. **Verify Everything Works**
   - Check Stripe Dashboard → Payments (see the $1 charge)
   - Check your email for confirmation
   - Check database for donation record
   - Verify webhook was received (Dashboard → Webhooks → Events)

4. **Refund Yourself (Optional)**
   - Dashboard → Payments
   - Find your $1 payment
   - Click payment → Click "Refund"
   - Select full refund

---

## ⚠️ IMPORTANT: Pre-Launch Checklist

### Security Requirements

Before accepting real donations, verify:

- [ ] Live API keys stored in `.env` files ONLY
- [ ] `.env` files listed in `.gitignore`
- [ ] Never committed keys to GitHub
- [ ] Frontend uses HTTPS (not HTTP)
- [ ] Backend uses HTTPS (not HTTP)
- [ ] Webhook endpoint is secured
- [ ] Error messages don't expose secrets

### Legal Requirements

Ensure you have:

- [ ] Terms of Service page on website
- [ ] Privacy Policy page on website
- [ ] Refund/cancellation policy stated
- [ ] Contact information (email, phone)
- [ ] Business name matches Stripe account
- [ ] Appropriate disclaimers about tax-deductibility

### Technical Requirements

Verify:

- [ ] Production domain configured
- [ ] SSL certificate active (HTTPS)
- [ ] Database backups enabled
- [ ] Error logging configured
- [ ] Email service working
- [ ] All environment variables set

---

## 🔄 Switching Back to Test Mode

If you need to go back to testing without real charges:

### Switch in Stripe Dashboard:
1. Toggle **"Test mode"** ON (top right)
2. Go to **Developers → API keys**
3. Copy test keys (`sk_test_...` and `pk_test_...`)

### Update Environment Variables:
```bash
# Backend .env
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY

# Frontend .env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_KEY
```

### Restart Servers:
```bash
# Kill existing servers (Ctrl+C)
# Then restart with test keys
npm start  # or npm run dev
```

---

## 💰 Understanding Live Transaction Fees

### Standard Rates (Before Nonprofit Status):
- **2.9% + $0.30** per successful transaction
- No monthly fees
- No setup fees
- Charged per transaction only

### Example Costs:
```
$10 donation:   Fee = $0.59  (You receive $9.41)
$25 donation:   Fee = $1.03  (You receive $23.97)
$50 donation:   Fee = $1.75  (You receive $48.25)
$100 donation:  Fee = $3.20  (You receive $96.80)
```

### After 501(c)(3) Approval:
- **2.2% + $0.30** per transaction
- Apply at: https://stripe.com/nonprofits
- Requires IRS determination letter

---

## 📊 Monitoring Live Transactions

### Stripe Dashboard Locations:

**View Payments:**
- Dashboard → **Payments**
- See all successful donations
- Filter by date, amount, status

**View Customers:**
- Dashboard → **Customers**
- See recurring donors
- View subscription details

**View Events:**
- Dashboard → **Developers → Events**
- See all webhook events
- Debug failed webhooks

**Download Reports:**
- Dashboard → **Reports**
- Balance changes
- Payouts
- Tax forms (1099-K if applicable)

---

## 🎯 Post-Launch Checklist

After going live with real donations:

### First 24 Hours:
- [ ] Monitor Stripe Dashboard for payments
- [ ] Check webhook deliveries are successful
- [ ] Verify confirmation emails sending
- [ ] Test on multiple devices/browsers
- [ ] Check database records populating

### First Week:
- [ ] Review all transactions daily
- [ ] Respond to any donor questions
- [ ] Monitor for any failed payments
- [ ] Check bank account for payouts
- [ ] Review any Stripe notifications

### First Month:
- [ ] Review monthly reports
- [ ] Calculate total fees paid
- [ ] Evaluate donor retention
- [ ] Consider implementing improvements
- [ ] Plan for 501(c)(3) application

---

## 🚨 Common Issues & Solutions

### "Payment declined" errors:
- Donor's card may be declined by bank
- Try different payment method
- Check for typos in card details
- Contact donor's bank if persistent

### Webhook not receiving events:
- Verify endpoint URL is correct
- Check endpoint is publicly accessible
- Ensure HTTPS (not HTTP)
- Review webhook signing secret
- Check server logs for errors

### Money not arriving in bank:
- Payouts typically take 2-7 business days
- First payout may take longer (up to 14 days)
- Check Dashboard → Balance → Payouts
- Verify bank account is correctly linked

### High fees seeming excessive:
- Standard until nonprofit approval
- Apply for discount after 501(c)(3)
- Consider "cover fees" option for donors
- Research nonprofit pricing: stripe.com/nonprofits

---

## 📞 Getting Help

### Stripe Support:
- **Email**: support@stripe.com
- **Dashboard**: Help button (bottom right)
- **Phone**: Available in dashboard for activated accounts
- **Documentation**: https://stripe.com/docs

### Emergency Issues:
- Dashboard → Help → Contact Support
- Select "Urgent" for critical payment issues
- Provide transaction IDs for faster help

---

## 🎉 You're Ready to Accept Real Donations!

### Final Steps:
1. ✅ Live API keys configured
2. ✅ Webhook endpoint set up
3. ✅ Stripe account activated
4. ✅ Test transaction successful
5. ✅ Security checklist complete

### Start Accepting Donations:
- Deploy to production (if not already)
- Announce to your supporters
- Share donation page link
- Post on social media
- Send email to mailing list

**Your ministry is now ready to receive financial support! 🙏**

---

## Related Documentation

- [STRIPE_QUICK_START.md](./STRIPE_QUICK_START.md) - Initial setup guide
- [STRIPE_DONATION_SETUP.md](./STRIPE_DONATION_SETUP.md) - Complete configuration
- [STRIPE_NONPROFIT_TIMING.md](./STRIPE_NONPROFIT_TIMING.md) - When to apply for nonprofit pricing
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploying to production
- [RENDER_ENV_VARS.md](./RENDER_ENV_VARS.md) - Backend environment setup
- [NETLIFY_ENV_VARS.md](./NETLIFY_ENV_VARS.md) - Frontend environment setup
