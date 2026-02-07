# 🚀 Stripe Donation Setup - Quick Start

## Your 15-Minute Setup Checklist

Follow these steps to configure Stripe for donations. Detailed explanations are in [STRIPE_DONATION_SETUP.md](./STRIPE_DONATION_SETUP.md).

---

## ✅ Step 1: Get Your API Keys (2 minutes)

1. Go to https://dashboard.stripe.com
2. Toggle **Test Mode** ON (top right)
3. Navigate to: **Developers → API keys**
4. Copy these keys:
   - **Publishable key**: `pk_test_xxxxx`
   - **Secret key**: `sk_test_xxxxx`

---

## ✅ Step 2: Update Environment Variables (3 minutes)

### Backend `.env` file:
```bash
# Add/update these lines:
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx  # (Get in Step 3)
```

### Frontend `.env` or `.env.local` file:
```bash
# Add/update this line:
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
```

⚠️ **Never commit these keys to GitHub!**

---

## ✅ Step 3: Setup Webhooks (5 minutes)

1. In Stripe Dashboard: **Developers → Webhooks**
2. Click **Add endpoint**
3. Enter endpoint URL:
   - **Local dev**: `http://localhost:3001/api/payments/webhook`
   - **Production**: `https://your-backend.onrender.com/api/payments/webhook`

4. Select events to send:
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

5. Click **Add endpoint**
6. Copy the **Signing secret** (looks like `whsec_xxxxx`)
7. Add to backend `.env`: `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`

---

## ✅ Step 4: Configure Business Profile (3 minutes)

Navigate to: **Settings → Business settings**

### Update These Fields:
```
Business Name: Shelter House Music
Business Type: Nonprofit / Religious Organization
Email: support@shelterhousemusic.com
Website: https://your-website.com
```

### Set Statement Descriptor:
Navigate to: **Settings → Public details → Statement descriptors**
```
Statement Descriptor: SHELTER HOUSE
Shortened Descriptor: SHELTER*
```

This is how charges appear on donor credit card statements.

---

## ✅ Step 5: Enable Payment Methods (2 minutes)

Navigate to: **Settings → Payment methods**

Enable these:
```
✅ Cards (Visa, Mastercard, Amex, Discover)
✅ Apple Pay
✅ Google Pay
✅ Link (Stripe's 1-click checkout)
```

Optional for large donations:
```
□ ACH Direct Debit
□ Cash App Pay
```

---

## ✅ Step 6: Test Your Setup (5 minutes)

### Start Your Servers:
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### Test a Donation:
1. Open: http://localhost:5173
2. Go to **Support Ministry** page
3. Enter test donation amount: $25
4. Use test card:
   ```
   Card: 4242 4242 4242 4242
   Expiry: 12/28
   CVC: 123
   ZIP: 12345
   ```
5. Complete donation
6. Check Stripe Dashboard → **Payments** to see the test payment

### Test Recurring Donation:
1. Check "Make this monthly" checkbox
2. You must be logged in (requirement for security)
3. Complete subscription setup
4. Check **Customers → Subscriptions** in Stripe Dashboard

---

## 🎯 What We Just Did

✅ **Code Improvements Made:**
- Added donation-specific metadata to all transactions
- Set statement descriptors ("SHELTER DONATION" on bank statements)
- Added tax-deductible language to descriptions
- Enhanced receipt emails with ministry information
- Improved tracking for reporting and analytics

✅ **Stripe Dashboard Configured:**
- Test mode API keys connected
- Webhooks configured for payment notifications
- Business profile set up for ministry
- Payment methods enabled for donors
- Statement descriptors set for clarity

---

## 🚀 Going Live (When Ready)

When you're ready to accept real donations:

### 1. Switch to Live Mode:
1. Stripe Dashboard → Toggle **Test Mode** OFF
2. Navigate to: **Developers → API keys**
3. Copy **Live** keys:
   - `pk_live_xxxxx` → Frontend env
   - `sk_live_xxxxx` → Backend env

### 2. Update Webhooks:
- Create new webhook endpoint with production URL
- Copy new signing secret
- Update `STRIPE_WEBHOOK_SECRET` in production backend

### 3. Activate Stripe Account:
- Click "Activate your account" button
- Complete business verification
- Connect bank account for payouts
- Submit required documentation

### 4. Test with Real Card:
- Make a $1 test donation with your own card
- Verify email receipt
- Check database records
- Refund the test donation if needed

---

## 🔍 Verify Everything Works

### Check These Work:
- [ ] One-time donations process successfully
- [ ] Recurring donations require login
- [ ] Email confirmations sent to donors
- [ ] Donations appear in database
- [ ] Stripe webhooks trigger (check logs)
- [ ] Statement descriptor shows correctly

### Stripe Dashboard Checks:
- [ ] Payments appear in **Payments** tab
- [ ] Subscriptions show in **Customers** tab
- [ ] Webhooks show successful deliveries
- [ ] Business name displays correctly

---

## 📞 Need Help?

### Common Issues:

**"Payment processing not configured"**
- Check `STRIPE_SECRET_KEY` is set in backend `.env`
- Make sure it's not the example value
- Restart backend server after updating

**"Webhook signature verification failed"**
- Check `STRIPE_WEBHOOK_SECRET` is correct
- Make sure URL matches exactly
- For local dev, use Stripe CLI (see below)

**"Recurring donations require login"**
- This is by design for security
- Users must create account first
- See [RECURRING_DONATIONS_AUTH.md](./RECURRING_DONATIONS_AUTH.md)

### Local Webhook Testing:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3001/api/payments/webhook

# This gives you a webhook secret starting with whsec_
# Use this in your .env file for local testing
```

---

## 📚 Full Documentation

- **Complete Guide**: [STRIPE_DONATION_SETUP.md](./STRIPE_DONATION_SETUP.md)
- **Recurring Donations**: [RECURRING_DONATIONS_GUIDE.md](./RECURRING_DONATIONS_GUIDE.md)
- **Environment Setup**: [RENDER_ENV_VARS.md](./RENDER_ENV_VARS.md)
- **Deployment**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 🎉 You're All Set!

Your donation system is now configured with:
- ✅ Secure payment processing via Stripe
- ✅ One-time and recurring donations
- ✅ Automatic receipt emails
- ✅ Tax-deductible donation language
- ✅ Clear bank statement descriptors
- ✅ Professional checkout experience

**Start accepting donations and supporting your ministry! 🙏**
