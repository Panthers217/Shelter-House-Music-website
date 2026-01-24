# Monthly Recurring Donations System

## Overview
This system allows donors to set up recurring monthly donations to Shelter House Music ministry through Stripe Subscriptions. All credit card information is securely stored by Stripe, not in the database.

## Database Table

### `recurring_donations`
Located in: `/database/migrations/008_create_recurring_donations.sql`

**Columns:**
- `id` (INT, PK, AUTO_INCREMENT) - Internal database ID
- `stripe_subscription_id` (VARCHAR(255), UNIQUE) - Stripe subscription ID (reference to Stripe)
- `stripe_customer_id` (VARCHAR(255)) - Stripe customer ID (reference to Stripe)
- `donor_name` (VARCHAR(255)) - Donor's full name
- `donor_email` (VARCHAR(255)) - Donor's email address
- `amount` (DECIMAL(10,2)) - Monthly donation amount in dollars
- `status` (ENUM: 'active', 'cancelled', 'paused', 'past_due') - Current status
- `next_billing_date` (DATE) - Next scheduled billing date
- `created_at` (TIMESTAMP) - When subscription was created
- `updated_at` (TIMESTAMP) - Last update timestamp
- `cancelled_at` (TIMESTAMP) - When subscription was cancelled (if applicable)

**Indexes:**
- `idx_email` on `donor_email`
- `idx_stripe_customer` on `stripe_customer_id`
- `idx_status` on `status`

**Migration Status:** ✅ Applied to database

---

## Backend Implementation

### Controller: `/backend/controllers/subscriptionController.js`

**Functions:**

1. **createSubscription**
   - Creates a new recurring donation subscription via Stripe
   - Creates or retrieves Stripe customer
   - Attaches payment method to customer
   - Creates Stripe Price and Subscription
   - Saves subscription to database
   - Returns subscription ID, customer ID, status, and next billing date

2. **getUserSubscriptions**
   - Retrieves all subscriptions for a given email address
   - Enriches data with current Stripe status
   - Returns array of subscriptions

3. **updateSubscription**
   - Updates monthly donation amount
   - Creates new Stripe price
   - Updates subscription in Stripe (takes effect next billing cycle)
   - Updates database record
   - No proration - change takes effect on next billing date

4. **cancelSubscription**
   - Cancels subscription at end of current period (donor gets what they paid for)
   - Updates Stripe subscription with `cancel_at_period_end: true`
   - Updates database status to 'cancelled'
   - Returns cancellation effective date

5. **reactivateSubscription**
   - Reactivates a cancelled subscription (before period ends)
   - Updates Stripe subscription with `cancel_at_period_end: false`
   - Updates database status to 'active'

### Routes: `/backend/routes/subscriptions.js`

**API Endpoints:**
- `POST /api/subscriptions/create` - Create new recurring donation
- `GET /api/subscriptions/user/:email` - Get subscriptions by email
- `PUT /api/subscriptions/:id/amount` - Update monthly amount
- `DELETE /api/subscriptions/:id` - Cancel subscription
- `POST /api/subscriptions/:id/reactivate` - Reactivate cancelled subscription

**Registered in:** `/backend/server.js` as `/api/subscriptions`

---

## Frontend Implementation

### Support Ministry Page: `/frontend/src/pages/SupportMinistry.jsx`

**Features:**
- Embedded Stripe checkout using CardElement (stays on site)
- Donor information collection (name, email)
- Suggested amounts ($25, $50, $100, $250)
- Custom amount input
- **Monthly recurring donation checkbox** - key feature
- Ministry-focused content sections
- Shelter House brand styling

**Payment Flow:**
1. **One-time donations:**
   - Creates payment intent via `/api/payments/create-payment-intent`
   - Confirms card payment with Stripe
   - Redirects to confirmation page with payment details

2. **Recurring donations (when checkbox is checked):**
   - Creates payment method first using `stripe.createPaymentMethod()`
   - Sends payment method ID to `/api/subscriptions/create`
   - Backend creates Stripe customer and subscription
   - Redirects to confirmation page with subscription details

### Manage Subscriptions Page: `/frontend/src/pages/ManageSubscriptions.jsx`

**Features:**
- Email-based subscription lookup
- View all active and cancelled subscriptions
- Display subscription details:
  - Monthly amount
  - Status badge (active, cancelled, paused, past_due)
  - Start date
  - Next billing date
  - Cancellation date (if applicable)

**Management Actions:**
- **Change Amount:** Edit monthly donation amount (inline form)
- **Cancel Subscription:** Cancel with confirmation dialog
- **Reactivate:** Restore a cancelled subscription

**User Experience:**
- Search by email to find subscriptions
- Color-coded status badges
- Confirmation dialogs for destructive actions
- Success/error toasts for all operations
- Link to support email for help

### Donation Confirmation Page: `/frontend/src/pages/DonationConfirmation.jsx`

**Updated Features:**
- Detects if donation is recurring vs one-time
- Shows different messaging for recurring donations
- Displays next billing date for subscriptions
- Includes "Manage Subscription" button for recurring donors
- Lists what happens next (different for recurring)

### Routes Added: `/frontend/src/App.jsx`
- `/support-ministry` - Donation page (already existed)
- `/donation-confirmation` - Thank you page (already existed, enhanced)
- `/manage-subscriptions` - New subscription management portal

---

## Stripe Integration

### Subscription Creation Flow
1. User fills out donation form with recurring checkbox checked
2. Frontend creates payment method using Stripe.js
3. Backend creates or retrieves Stripe customer by email
4. Backend attaches payment method to customer
5. Backend creates Stripe Price for the donation amount
6. Backend creates Stripe Subscription with the price
7. Subscription automatically charges on billing cycle
8. Subscription details saved to database

### Payment Method Storage
- ❌ Credit card info is **NEVER** stored in database
- ✅ Payment method is stored securely by Stripe
- ✅ Database only stores Stripe IDs for reference
- ✅ Uses Stripe's `save_default_payment_method: 'on_subscription'`

### Subscription Updates
- Amount changes take effect on next billing cycle (no proration)
- Cancellations take effect at end of current period
- Reactivations restore subscription immediately

---

## Security & Compliance

**Database:**
- No credit card numbers stored
- Only Stripe reference IDs stored
- Indexed for fast queries by email and status

**Stripe:**
- Payment methods stored in Stripe's PCI-compliant vault
- SSL/TLS encryption for all API calls
- Customer IDs used for secure reference

**Frontend:**
- Stripe Elements for secure card input
- No card data touches your servers
- PCI DSS compliant by design

---

## User Journey

### Setting Up Monthly Support
1. Visit `/support-ministry`
2. Fill out name and email
3. Select or enter donation amount
4. ✅ Check "Make this a monthly gift"
5. Enter card details in embedded Stripe form
6. Submit donation
7. Redirected to `/donation-confirmation` with subscription details
8. Receive email receipt from Stripe

### Managing Monthly Support
1. Visit `/manage-subscriptions`
2. Enter email address used for donation
3. View all subscriptions
4. Choose action:
   - **Change Amount:** Click "Change Amount", enter new amount, update
   - **Cancel:** Click "Cancel Subscription", confirm, subscription ends at period end
   - **Reactivate:** Click "Reactivate" on cancelled subscription

### Email Receipts
- Automatic receipts from Stripe for each charge
- Monthly billing on the same day each month
- Clear description: "Monthly Ministry Support"

---

## Testing Checklist

### One-Time Donations
- [ ] Submit $25 one-time donation
- [ ] Submit custom amount one-time donation
- [ ] Verify payment in Stripe Dashboard
- [ ] Check confirmation page displays correctly
- [ ] Verify email receipt received

### Recurring Donations
- [ ] Submit $50 monthly donation with checkbox checked
- [ ] Verify subscription created in Stripe Dashboard
- [ ] Check `recurring_donations` table has new record
- [ ] Verify confirmation page shows monthly language
- [ ] Check next billing date is ~30 days out

### Subscription Management
- [ ] Search for subscription by email
- [ ] View subscription details
- [ ] Change monthly amount from $50 to $100
- [ ] Verify change in Stripe Dashboard
- [ ] Cancel subscription
- [ ] Verify status changes to 'cancelled' in database
- [ ] Reactivate cancelled subscription

### Error Handling
- [ ] Try invalid credit card
- [ ] Try amount less than $1
- [ ] Try submitting without email
- [ ] Try updating non-existent subscription

---

## Configuration Required

### Environment Variables (Backend)
```
STRIPE_SECRET_KEY=sk_test_... or sk_live_...
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
DB_PORT=3306
```

### Environment Variables (Frontend)
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... or pk_live_...
VITE_API_URL=http://localhost:5000 or https://your-api-domain.com
```

---

## Future Enhancements

### Potential Features
1. **Email notifications:**
   - Subscription confirmation email
   - Monthly thank you emails
   - Cancellation confirmation
   - Renewal reminders

2. **User accounts:**
   - Dashboard to view all donations
   - Download tax receipts
   - Update payment method

3. **Admin dashboard:**
   - View all recurring donors
   - See monthly recurring revenue
   - Track subscription metrics
   - Export donor list

4. **Stripe webhooks:**
   - Handle payment failures automatically
   - Update database when Stripe subscription changes
   - Send notifications on subscription events

5. **Donation tiers:**
   - Named giving levels (Bronze, Silver, Gold)
   - Special perks for monthly supporters
   - Donor wall or recognition page

---

## Support & Maintenance

### Database Maintenance
- Run migration: `node -e "import('mysql2/promise')...` (see migration commands)
- Backup table regularly: `mysqldump ... recurring_donations`
- Monitor table growth and performance

### Stripe Dashboard
- Monitor subscriptions at: https://dashboard.stripe.com/subscriptions
- View customers at: https://dashboard.stripe.com/customers
- Check failed payments in billing section

### Common Issues
1. **Subscription not appearing:**
   - Check Stripe Dashboard first
   - Verify database connection
   - Check for API errors in backend logs

2. **Payment failed:**
   - Stripe will retry automatically
   - Customer notified by Stripe
   - Status updates to 'past_due' in database

3. **Can't find subscription:**
   - Verify email is exact match
   - Check for typos in email address
   - Search Stripe Dashboard manually

---

## Contact Information

**For donor support:**
- Email: support@shelterhousemusic.com
- Help page: `/manage-subscriptions` (includes support email)

**For technical issues:**
- Check Stripe Dashboard
- Review backend logs
- Verify environment variables
- Test with Stripe test cards

---

## Summary

✅ **Database table created** for tracking subscriptions
✅ **Backend API implemented** for Stripe subscription management
✅ **Frontend pages created** for donations and management
✅ **Stripe integration complete** with secure payment processing
✅ **No credit card storage** - all handled by Stripe
✅ **Full CRUD operations** - create, read, update, cancel, reactivate
✅ **User-friendly interface** with ministry-focused language

**Next Steps:**
1. Test with Stripe test cards
2. Configure email notifications (optional)
3. Set up Stripe webhooks (recommended)
4. Deploy to production
5. Switch to live Stripe keys
