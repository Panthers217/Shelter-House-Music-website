# 🎁 Stripe Configuration for Donation-Based Application

## Complete Setup Guide for Shelter House Music Ministry

This guide will help you configure your Stripe business account specifically for accepting donations and charitable contributions.

---

## 📋 Table of Contents
1. [Stripe Dashboard Setup](#1-stripe-dashboard-setup)
2. [Business Profile Configuration](#2-business-profile-configuration)
3. [Tax Settings for Donations](#3-tax-settings-for-donations)
4. [Product Setup](#4-product-setup)
5. [Checkout Customization](#5-checkout-customization)
6. [Webhook Configuration](#6-webhook-configuration)
7. [Statement Descriptors](#7-statement-descriptors)
8. [Code Configuration](#8-code-configuration)
9. [Testing Your Setup](#9-testing-your-setup)

---

## 1. Stripe Dashboard Setup

### Access Your Stripe Dashboard
1. Go to https://dashboard.stripe.com
2. Login with your business account credentials

### Switch to Test Mode First
- Toggle "Test mode" switch (top right) to ON
- Complete all setup in test mode before going live
- This allows you to test without real transactions

---

## 2. Business Profile Configuration

### Set Business Information
**Navigate to:** Settings → Business settings → Public business information

Configure the following:

#### **Business Details**
```
Business Name: Shelter House Music
Business Description: Christian music ministry dedicated to creating 
                      worship music and supporting spiritual growth 
                      through donations
Website: https://your-production-domain.com
Support Email: support@shelterhousemusic.com
Support Phone: Your ministry phone number
```

#### **Business Type**
- Select: **Nonprofit** or **Religious Organization** (if applicable)
- This may give you access to special features and lower fees

#### **Colors & Branding**
Upload your logo and set brand colors:
```
Primary Color: #10b981 (Shelter House Green)
Background Color: #1a1a1a (Dark background)
```

---

## 3. Tax Settings for Donations

### Configure Tax Collection
**Navigate to:** Settings → Tax settings

#### For US-Based Nonprofits:
1. **Tax ID Configuration**
   - Add your EIN (Employer Identification Number)
   - Mark organization as tax-exempt if applicable

2. **Tax Exempt Status**
   - If you have 501(c)(3) status, upload documentation
   - This may qualify you for reduced Stripe fees

3. **Automatic Tax Calculation**
   - **For donations:** Generally NOT taxable
   - Set tax collection to "Manual" or "Not applicable"
   - Donations are typically not subject to sales tax

#### Important Notes:
- Donations are generally NOT taxable transactions
- Merchandise sales ARE taxable and handled separately
- Consult your accountant for specific tax requirements

---

## 4. Product Setup

You don't need to manually create products - your code creates them dynamically. However, you can set defaults:

### Product Categories
**Navigate to:** Products → Product catalog

Your app creates these automatically:
- ✅ **One-Time Ministry Support** (donations)
- ✅ **Monthly Ministry Support** (recurring donations)
- ✅ Individual merchandise items (if selling products)

### Recommended Settings:
1. Set default product descriptions
2. Add product images (ministry logo)
3. Set statement descriptors (see section 7)

---

## 5. Checkout Customization

### Customize Checkout Experience
**Navigate to:** Settings → Checkout settings

#### **Checkout Display**
```
✅ Show email collection (required)
✅ Show phone number collection (optional)
✅ Show billing address collection (optional for donations)
✅ Show shipping address collection (only for merchandise)
```

#### **Payment Methods**
Enable these payment methods:
```
✅ Cards (Visa, Mastercard, Amex, Discover)
✅ Apple Pay
✅ Google Pay
✅ Link (Stripe's one-click checkout)
□ ACH Direct Debit (optional - good for large donations)
□ Cash App Pay (optional)
```

#### **Branding**
- Upload your ministry logo
- Set accent color to match your brand (#10b981)
- Add custom messaging: "Your donation supports our ministry"

#### **Receipt Emails**
```
✅ Send receipt emails automatically
✅ Include custom footer with ministry information
✅ Add tax-deductible language (if applicable)
```

---

## 6. Webhook Configuration

### Setup Webhooks for Payment Processing
**Navigate to:** Developers → Webhooks

#### **For Development (Local Testing)**
```
Endpoint URL: http://localhost:3001/api/payments/webhook
Description: Local dev webhook
Events to send:
  ✅ payment_intent.succeeded
  ✅ payment_intent.payment_failed
  ✅ payment_intent.canceled
  ✅ customer.subscription.created
  ✅ customer.subscription.updated
  ✅ customer.subscription.deleted
  ✅ invoice.payment_succeeded
  ✅ invoice.payment_failed
```

#### **For Production (After Deployment)**
```
Endpoint URL: https://your-backend-domain.com/api/payments/webhook
Description: Production webhook
Events to send: (same as above)
```

#### **Get Your Webhook Secret**
1. After creating webhook, copy the signing secret
2. It looks like: `whsec_xxxxxxxxxxxxx`
3. Add to your `.env` file: `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`

---

## 7. Statement Descriptors

### Configure How Charges Appear on Bank Statements
**Navigate to:** Settings → Public details → Statement descriptors

#### **Recommended Descriptors for Donations**
```
Statement Descriptor: SHELTER HOUSE
Shortened Descriptor: SHELTER*
Website: shelterhousemusic.com
```

#### Why This Matters:
- Donors see "SHELTER HOUSE" on their bank statement
- Prevents confusion and chargebacks
- Builds trust and brand recognition
- Required: Max 22 characters, alphanumeric only

#### **Dynamic Descriptors in Code**
Your payment intents include custom descriptions:
- One-time: "Ministry Donation ORDER-xxxxx"
- Recurring: "Monthly Ministry Support"
- Merchandise: "Order ORDER-xxxxx - Track, Album, etc."

---

## 8. Code Configuration

### Update Environment Variables

#### Backend `.env` file:
```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx  # Get from Stripe Dashboard
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx # Get from Webhooks section

# Optional: Enhanced Donation Features
STRIPE_STATEMENT_DESCRIPTOR=SHELTER HOUSE
STRIPE_ALLOW_TAX_EXEMPT=true
```

#### Frontend `.env` file:
```bash
# Stripe Public Key
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx # Get from Stripe Dashboard
```

### Get Your API Keys
**Navigate to:** Developers → API keys

#### Test Mode Keys:
- **Publishable key**: `pk_test_xxxxx` → Frontend
- **Secret key**: `sk_test_xxxxx` → Backend

#### Live Mode Keys (When Ready for Production):
- **Publishable key**: `pk_live_xxxxx` → Frontend
- **Secret key**: `sk_live_xxxxx` → Backend

⚠️ **NEVER commit secret keys to GitHub!**

---

## 9. Testing Your Setup

### Use Test Cards
**Navigate to:** Developers → Testing

#### Successful Payment:
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/28)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

#### Failed Payment:
```
Card Number: 4000 0000 0000 0002
```

#### Requires Authentication (3D Secure):
```
Card Number: 4000 0025 0000 3155
```

### Test Checklist:
```
□ One-time donation ($25) - Success
□ Custom amount donation ($17.50) - Success
□ Recurring monthly donation ($50) - Success
□ Payment failure handling
□ Email confirmations sent
□ Database records created
□ Webhook events received
```

---

## 🎯 Enhanced Features for Donations

### Code Improvements Made:

1. **✅ Donation Metadata Enhancement**
   - Added `isDonation: true` flag to all donation transactions
   - Improved tracking and reporting

2. **✅ Custom Descriptions**
   - One-time: "Ministry Donation"
   - Recurring: "Monthly Ministry Support"
   - Clear distinction from merchandise

3. **✅ Customer Information Tracking**
   - Stores email, name, and user_id
   - Links donations to registered users
   - Guest checkout supported

4. **✅ Recurring Donation Management**
   - Full CRUD operations (Create, Read, Update, Delete)
   - Authentication required for security
   - Prorated updates optional

---

## 🚀 Going Live Checklist

When you're ready to accept real donations:

### 1. Verify Business Information
```
□ Legal business name correct
□ Tax ID / EIN added
□ Bank account connected for payouts
□ Business address verified
```

### 2. Switch to Live Mode
```
□ Update STRIPE_SECRET_KEY to sk_live_xxxxx
□ Update VITE_STRIPE_PUBLIC_KEY to pk_live_xxxxx
□ Update STRIPE_WEBHOOK_SECRET to live webhook secret
□ Test end-to-end with real card (small amount)
```

### 3. Activate Account
**Navigate to:** Activate account button (top right)
```
□ Submit required business documentation
□ Verify bank account
□ Wait for Stripe approval (1-2 business days)
```

### 4. Compliance
```
□ Add privacy policy link
□ Add terms of service link
□ Display tax-exempt status (if applicable)
□ Add refund policy
```

---

## 💡 Additional Recommendations

### 1. **Donor Dashboard**
Consider adding a donor portal where supporters can:
- View donation history
- Manage recurring donations
- Download tax receipts
- Update payment methods

### 2. **Impact Reporting**
Show donors the impact of their support:
- Track total donations
- Share ministry updates
- Send quarterly reports

### 3. **Donation Tiers**
Create suggested giving levels:
- $25/month - Friend of Shelter House
- $50/month - Ministry Partner  
- $100/month - Sustaining Partner
- $250/month - Leadership Circle

### 4. **Matching Campaigns**
Enable special campaigns:
- Holiday giving drives
- Matching gift challenges
- Project-specific fundraising

---

## 📞 Support Resources

### Stripe Documentation
- Payment Intents: https://stripe.com/docs/payments/payment-intents
- Subscriptions: https://stripe.com/docs/billing/subscriptions/overview
- Webhooks: https://stripe.com/docs/webhooks

### Stripe Support
- Dashboard: Help → Contact Support
- Email: support@stripe.com
- Phone: Available in dashboard

### Your Implementation Files
- Backend Payment Controller: `/backend/controllers/paymentController.js`
- Backend Subscription Controller: `/backend/controllers/subscriptionController.js`
- Frontend Donation Page: `/frontend/src/pages/SupportMinistry.jsx`
- Database Schema: `/database/migrations/008_create_recurring_donations.sql`

---

## 🔒 Security Best Practices

1. **Never expose secret keys**
   - Keep `sk_test_` and `sk_live_` keys in `.env` only
   - Add `.env` to `.gitignore`

2. **Use webhook signatures**
   - Always verify webhook signatures
   - Prevents fake payment notifications

3. **Validate amounts**
   - Server-side validation of all amounts
   - Prevent negative or zero donations

4. **Secure user data**
   - Never store credit card data
   - Let Stripe handle all PCI compliance

5. **Monitor for fraud**
   - Enable Stripe Radar (fraud detection)
   - Set up alerts for suspicious activity

---

## ✅ Quick Start Commands

```bash
# Install Stripe CLI for local webhook testing
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/api/payments/webhook

# Test a payment
stripe payment_intents create \
  --amount=2500 \
  --currency=usd \
  --payment-method-types card
```

---

**Need Help?** Review the related documentation:
- [RECURRING_DONATIONS_GUIDE.md](./RECURRING_DONATIONS_GUIDE.md)
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- [RENDER_ENV_VARS.md](./RENDER_ENV_VARS.md)

**Questions?** Check your Stripe Dashboard or contact Stripe Support!
