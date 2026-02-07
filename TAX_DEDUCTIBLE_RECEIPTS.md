# 💰 Tax-Deductible Donation Receipts Guide

## Overview
If Shelter House Music is a registered 501(c)(3) nonprofit organization, donations are tax-deductible. This guide helps you configure proper receipts for donors.

---

## 📋 Legal Requirements for Tax-Deductible Receipts

According to IRS guidelines, donation receipts must include:

### Required Information:
1. **Organization Name**: Shelter House Music
2. **Organization's EIN** (Employer Identification Number)
3. **Donation Date**: When the contribution was received
4. **Donation Amount**: Dollar amount contributed
5. **Tax-Exempt Status Statement**: "This organization is tax-exempt under section 501(c)(3)"
6. **No Goods/Services Statement**: "No goods or services were provided in exchange for this contribution"
7. **Organization Contact Information**: Address, phone, email

### For Donations $250+:
- Must provide written acknowledgment
- Include statement: "No goods or services were provided in exchange for this contribution, other than intangible religious benefits"
- Donor must have receipt before filing tax return

### For Donations $75+ (if goods/services provided):
- State fair market value of goods/services received
- Indicate only amount exceeding value is deductible

---

## 🔧 Implementation Steps

### 1. Update Email Service

Add tax-deductible language to confirmation emails:

**File**: `/backend/services/emailService.js`

Find the `sendPurchaseConfirmationEmail` function and look for donation-specific email content. The email should include:

```javascript
// Tax-deductible statement for donations
const taxStatement = `
  <div style="background-color: #f0f9ff; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0;">
    <h3 style="margin: 0 0 8px 0; color: #1a1a1a;">Tax-Deductible Contribution</h3>
    <p style="margin: 0; font-size: 14px; color: #4a5568;">
      Shelter House Music is a tax-exempt nonprofit organization under section 501(c)(3) 
      of the Internal Revenue Code. EIN: XX-XXXXXXX
    </p>
    <p style="margin: 8px 0 0 0; font-size: 14px; color: #4a5568;">
      No goods or services were provided in exchange for this contribution, other than 
      intangible religious benefits. Please retain this receipt for your tax records.
    </p>
  </div>
`;
```

### 2. Add to Stripe Metadata

Already done! Your updated code includes:
```javascript
metadata: {
  organizationName: 'Shelter House Music',
  receiptDescription: 'Ministry Donation - Tax Deductible',
  isDonation: 'true',
}
```

### 3. Create Annual Donation Summaries

Add a new controller for annual receipts:

**File**: `/backend/controllers/donationReceiptController.js` (NEW)

```javascript
import db from '../config/db.js';
import { sendEmail } from '../services/emailService.js';

// Generate annual giving statement for a donor
export async function generateAnnualStatement(req, res) {
  try {
    const { email, year } = req.params;
    const userId = req.user?.userId;

    // Verify user is requesting their own statement
    if (req.user.email !== email) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Get all donations for the year
    const [oneTimeDonations] = await db.query(
      `SELECT 
        order_id,
        amount,
        purchased_at as donation_date,
        'One-Time' as type
      FROM purchases p
      WHERE customer_email = ?
        AND YEAR(purchased_at) = ?
        AND payment_status = 'succeeded'
        AND EXISTS (
          SELECT 1 FROM order_items oi 
          WHERE oi.purchase_id = p.id 
          AND oi.item_type = 'Donation'
        )
      ORDER BY purchased_at`,
      [email, year]
    );

    const [recurringDonations] = await db.query(
      `SELECT 
        stripe_subscription_id as order_id,
        amount * 12 as amount,
        created_at as donation_date,
        'Monthly Recurring' as type
      FROM recurring_donations
      WHERE donor_email = ?
        AND YEAR(created_at) = ?
        AND status IN ('active', 'cancelled')`,
      [email, year]
    );

    const allDonations = [...oneTimeDonations, ...recurringDonations];
    const totalAmount = allDonations.reduce((sum, d) => sum + parseFloat(d.amount), 0);

    // Send annual statement email
    await sendAnnualGivingStatement({
      email,
      year,
      donations: allDonations,
      totalAmount,
    });

    res.json({
      success: true,
      year,
      totalDonations: allDonations.length,
      totalAmount,
      donations: allDonations,
    });
  } catch (error) {
    console.error('Error generating annual statement:', error);
    res.status(500).json({ error: 'Failed to generate statement' });
  }
}
```

---

## 📧 Email Templates for Tax Receipts

### Immediate Donation Receipt
Sent automatically after each donation:

```html
Subject: Thank You for Your Gift to Shelter House Music

Dear [Donor Name],

Thank you for your generous donation of $[Amount] to Shelter House Music!

DONATION DETAILS:
- Date: [Date]
- Amount: $[Amount]
- Transaction ID: [Order ID]
- Payment Method: [Visa ending in 4242]

TAX INFORMATION:
Shelter House Music is a tax-exempt nonprofit organization under section 
501(c)(3) of the Internal Revenue Code. 

EIN: XX-XXXXXXX

No goods or services were provided in exchange for this contribution, other 
than intangible religious benefits. Please retain this receipt for your 
tax records.

Your support helps us create worship music and spread the Gospel through 
our ministry. We are grateful for your partnership!

Blessings,
The Shelter House Music Team

---
Questions? Contact us at support@shelterhousemusic.com
```

### Annual Giving Statement
Sent in January for previous year:

```html
Subject: Your 2025 Annual Giving Statement - Shelter House Music

Dear [Donor Name],

Thank you for your faithful support of Shelter House Music throughout 2025!

ANNUAL GIVING SUMMARY:
Total Donations: $[Total]
Number of Gifts: [Count]

DONATION HISTORY:
[Table of all donations with dates and amounts]

TAX INFORMATION:
Shelter House Music is a tax-exempt nonprofit organization under section 
501(c)(3) of the Internal Revenue Code. 

EIN: XX-XXXXXXX

No goods or services were provided in exchange for these contributions, 
other than intangible religious benefits. Please retain this statement 
for your tax records.

If you have any questions about this statement, please contact us at 
support@shelterhousemusic.com.

With gratitude for your partnership in ministry,
The Shelter House Music Team
```

---

## 🎯 Action Items

### If You ARE a 501(c)(3) Nonprofit:

- [ ] **Get your EIN** from your IRS determination letter
- [ ] **Add EIN to receipts** (update email templates)
- [ ] **Add 501(c)(3) statement** to all donation confirmation emails
- [ ] **Update website footer** with tax-exempt status
- [ ] **Create annual statement system** (January each year)
- [ ] **Keep records** for 7 years minimum
- [ ] **Consult with accountant** about specific requirements

### If You ARE NOT (yet) a 501(c)(3):

- [ ] **Do NOT claim tax-deductible status**
- [ ] **Remove tax language** from receipts
- [ ] **Consider applying** for 501(c)(3) status if appropriate
- [ ] **Use language like**: "Thank you for your support" (not "donation")
- [ ] **Consult attorney/accountant** about your organization's structure

---

## 🔐 Stripe-Specific Settings

### Add EIN to Stripe Account:
1. Stripe Dashboard → **Settings → Business settings**
2. Add **Tax ID** (your EIN)
3. This helps with reporting and compliance

### Enable Automatic Receipts:
1. **Settings → Checkout settings**
2. ✅ Enable "Send receipt emails"
3. Customize receipt email template with tax language

### Tax Reporting:
- Stripe provides 1099-K forms if you process $20,000+ and 200+ transactions
- Download annual reports: **Reports → Balance changes**
- Useful for your organization's tax filing

---

## ⚠️ Important Legal Disclaimers

### We Recommend:
1. **Consult with a CPA or tax attorney** familiar with nonprofit organizations
2. **Verify your tax-exempt status** before claiming deductibility
3. **Follow IRS guidelines** strictly (see IRS Publication 1771)
4. **Keep detailed records** of all donations
5. **Issue timely receipts** (before donor files taxes)

### IRS Resources:
- Publication 1771: Charitable Contributions - Substantiation and Disclosure Requirements
- Publication 526: Charitable Contributions
- Form 990: Annual nonprofit tax return
- IRS Nonprofit Portal: https://www.irs.gov/charities-non-profits

---

## 📊 Reporting Capabilities

### For Your Records:
Your database tracks all donations with:
- Donor email and name
- Donation amount and date
- Payment method (last 4 digits)
- Transaction/subscription IDs
- User account linkage

### Export Donation Data:
```sql
-- Annual donation report
SELECT 
  customer_name,
  customer_email,
  SUM(amount) as total_donations,
  COUNT(*) as donation_count,
  MIN(purchased_at) as first_donation,
  MAX(purchased_at) as last_donation
FROM purchases
WHERE YEAR(purchased_at) = 2025
  AND payment_status = 'succeeded'
  AND EXISTS (
    SELECT 1 FROM order_items 
    WHERE purchase_id = purchases.id 
    AND item_type = 'Donation'
  )
GROUP BY customer_email
ORDER BY total_donations DESC;
```

---

## 🎉 Benefits of Proper Tax Receipts

✅ **For Donors:**
- Can claim charitable deductions
- Reduces taxable income
- Encourages continued giving
- Professional record-keeping

✅ **For Your Ministry:**
- Builds donor trust
- IRS compliance
- Professional image
- Increased giving (tax incentive)
- Better donor relationships

---

## 📞 Questions?

**Not sure about your tax-exempt status?**
- Check with your founding documents
- Contact your accountant
- Apply for 501(c)(3) if eligible

**Need help implementing receipts?**
- Review the email service code
- Test with small donations first
- Send yourself test receipts

**Tax law questions?**
- Consult a CPA familiar with nonprofits
- Review IRS Publication 1771
- Contact IRS Exempt Organizations Division

---

**Remember**: This guide provides general information. Always consult with qualified legal and tax professionals for your specific situation.
