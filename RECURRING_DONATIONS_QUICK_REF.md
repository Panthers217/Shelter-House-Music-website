# 🎯 Recurring Donations Quick Reference

## Database
**Table:** `recurring_donations`
**Key Fields:** stripe_subscription_id, stripe_customer_id, donor_email, amount, status

## API Endpoints
```
POST   /api/subscriptions/create              - Create subscription
GET    /api/subscriptions/user/:email         - Get user subscriptions
PUT    /api/subscriptions/:id/amount          - Update amount
DELETE /api/subscriptions/:id                 - Cancel subscription
POST   /api/subscriptions/:id/reactivate      - Reactivate subscription
```

## Frontend Routes
```
/support-ministry          - Donation page (with recurring checkbox)
/donation-confirmation     - Thank you page
/manage-subscriptions      - Management portal
```

## Key Features
✅ Embedded Stripe checkout (CardElement)
✅ Monthly recurring via Stripe Subscriptions
✅ No credit card storage (Stripe handles it)
✅ Cancel/update/reactivate subscriptions
✅ Email-based subscription lookup
✅ Ministry-focused language throughout

## Test Flow
1. Go to `/support-ministry`
2. Fill form, check "Make this a monthly gift"
3. Enter test card: `4242 4242 4242 4242`
4. Submit → Redirects to confirmation
5. Go to `/manage-subscriptions`
6. Enter email to find subscription
7. Try changing amount or cancelling

## Stripe Test Cards
```
Success:      4242 4242 4242 4242
Decline:      4000 0000 0000 0002
Insufficient: 4000 0000 0000 9995
```

## Important Notes
- Amount changes take effect NEXT billing cycle (no proration)
- Cancellations end at current period end (donor keeps access)
- All payment methods stored securely by Stripe only
- Search subscriptions by exact email match

## Files Changed/Created
✅ `/database/migrations/008_create_recurring_donations.sql` - New
✅ `/backend/controllers/subscriptionController.js` - New
✅ `/backend/routes/subscriptions.js` - New
✅ `/backend/server.js` - Updated (added subscription routes)
✅ `/frontend/src/pages/SupportMinistry.jsx` - Updated (recurring logic)
✅ `/frontend/src/pages/ManageSubscriptions.jsx` - New
✅ `/frontend/src/pages/DonationConfirmation.jsx` - Updated (recurring support)
✅ `/frontend/src/App.jsx` - Updated (added manage route)
