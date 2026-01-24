# Testing Guide for Recurring Donations

## Prerequisites
1. Backend server running: `cd backend && npm run dev`
2. Frontend server running: `cd frontend && npm run dev`
3. Database migration applied (recurring_donations table exists)
4. Stripe test keys configured in environment variables

---

## Test Case 1: Create One-Time Donation
**Goal:** Verify one-time donations still work correctly

1. Navigate to http://localhost:5173/support-ministry
2. Fill in:
   - Name: "Test Donor"
   - Email: "test@example.com"
   - Select $50 or enter custom amount
   - **DO NOT check** "Make this a monthly gift"
3. Enter test card: 4242 4242 4242 4242
4. Enter any future expiry (e.g., 12/25)
5. Enter any CVC (e.g., 123)
6. Click "Complete Donation"

**Expected Results:**
- ✅ Success toast appears
- ✅ Redirected to /donation-confirmation
- ✅ Page shows "Thank You for Your Support!" (not "Monthly Support Activated!")
- ✅ No "Manage Subscription" button visible
- ✅ Check Stripe Dashboard - payment intent created (not subscription)

---

## Test Case 2: Create Monthly Recurring Donation
**Goal:** Verify recurring donation subscription is created

1. Navigate to http://localhost:5173/support-ministry
2. Fill in:
   - Name: "Monthly Supporter"
   - Email: "monthly@example.com"
   - Select $100
   - **✅ CHECK** "Make this a monthly gift" checkbox
3. Enter test card: 4242 4242 4242 4242
4. Enter any future expiry (e.g., 12/25)
5. Enter any CVC (e.g., 123)
6. Click "Complete Donation"

**Expected Results:**
- ✅ Success toast: "Monthly support set up successfully!"
- ✅ Redirected to /donation-confirmation
- ✅ Page shows "Monthly Support Activated!"
- ✅ Shows monthly amount: "$100.00"
- ✅ Shows next billing date (approximately 30 days from now)
- ✅ "Manage Subscription" button is visible

**Verify in Stripe Dashboard:**
1. Go to https://dashboard.stripe.com/test/subscriptions
2. Find subscription for monthly@example.com
3. Verify status is "Active"
4. Verify amount is $100/month

**Verify in Database:**
```sql
SELECT * FROM recurring_donations WHERE donor_email = 'monthly@example.com';
```
- ✅ Record exists with status 'active'
- ✅ Amount is 100.00
- ✅ stripe_subscription_id matches Stripe Dashboard
- ✅ next_billing_date is ~30 days from now

---

## Test Case 3: Find Subscription
**Goal:** Verify users can look up their subscriptions

1. Navigate to http://localhost:5173/manage-subscriptions
2. Enter email: "monthly@example.com"
3. Click "Find My Subscriptions"

**Expected Results:**
- ✅ Subscription card appears
- ✅ Shows "Monthly Ministry Support"
- ✅ Status badge shows "Active" in green
- ✅ Shows amount $100.00 per month
- ✅ Shows "Started" date
- ✅ Shows "Next Billing" date
- ✅ Action buttons visible: "Change Amount" and "Cancel Subscription"

---

## Test Case 4: Update Subscription Amount
**Goal:** Verify users can change their monthly donation amount

1. From manage-subscriptions page (from Test Case 3)
2. Click "Change Amount" button
3. Edit form appears with current amount
4. Change amount to 150
5. Click "Update" button

**Expected Results:**
- ✅ Success toast: "Subscription updated! New amount takes effect [date]"
- ✅ Amount updates to $150.00 on page
- ✅ Page refreshes showing new amount

**Verify in Stripe Dashboard:**
1. Refresh subscription page
2. ✅ Subscription shows new amount ($150)
3. ✅ Change scheduled for next billing period

**Verify in Database:**
```sql
SELECT amount, updated_at FROM recurring_donations WHERE donor_email = 'monthly@example.com';
```
- ✅ Amount updated to 150.00
- ✅ updated_at timestamp is recent

---

## Test Case 5: Cancel Subscription
**Goal:** Verify users can cancel their monthly support

1. From manage-subscriptions page
2. Click "Cancel Subscription" button
3. Confirm in the dialog

**Expected Results:**
- ✅ Success toast: "Subscription cancelled. Active until [date]"
- ✅ Status badge changes to "Cancelled" in red
- ✅ Shows "Cancelled On" date
- ✅ "Cancel Subscription" button disappears
- ✅ "Reactivate Subscription" button appears

**Verify in Stripe Dashboard:**
1. Refresh subscription page
2. ✅ Subscription shows as "Active" but with cancellation scheduled
3. ✅ Shows "Cancels at [end of period]"

**Verify in Database:**
```sql
SELECT status, cancelled_at FROM recurring_donations WHERE donor_email = 'monthly@example.com';
```
- ✅ Status is 'cancelled'
- ✅ cancelled_at timestamp is set

---

## Test Case 6: Reactivate Subscription
**Goal:** Verify users can undo cancellation

1. From manage-subscriptions page (subscription should be cancelled)
2. Click "Reactivate Subscription" button

**Expected Results:**
- ✅ Success toast: "Subscription reactivated successfully!"
- ✅ Status badge changes back to "Active" in green
- ✅ "Cancelled On" date disappears
- ✅ "Reactivate Subscription" button disappears
- ✅ "Change Amount" and "Cancel Subscription" buttons reappear

**Verify in Stripe Dashboard:**
1. Refresh subscription page
2. ✅ Subscription shows as "Active" with no cancellation

**Verify in Database:**
```sql
SELECT status, cancelled_at FROM recurring_donations WHERE donor_email = 'monthly@example.com';
```
- ✅ Status is 'active'
- ✅ cancelled_at is NULL

---

## Test Case 7: Multiple Subscriptions
**Goal:** Verify users can have multiple subscriptions

1. Create 3 different subscriptions with same email:
   - $25/month
   - $50/month
   - $100/month
2. Go to manage-subscriptions
3. Search for the email

**Expected Results:**
- ✅ All 3 subscriptions appear in list
- ✅ Sorted by creation date (newest first)
- ✅ Each has its own action buttons
- ✅ Can manage each independently

---

## Test Case 8: No Subscriptions Found
**Goal:** Verify proper messaging when no subscriptions exist

1. Navigate to /manage-subscriptions
2. Enter email that has no subscriptions: "none@example.com"
3. Click "Find My Subscriptions"

**Expected Results:**
- ✅ Shows "No monthly support subscriptions found for this email"
- ✅ Shows "Start Monthly Support" button
- ✅ Button links to /support-ministry

---

## Test Case 9: Declined Card
**Goal:** Verify proper error handling

1. Navigate to /support-ministry
2. Fill in form with "Make this a monthly gift" checked
3. Enter **declined test card**: 4000 0000 0000 0002
4. Submit

**Expected Results:**
- ✅ Error toast appears with decline message
- ✅ User stays on donation page
- ✅ Can retry with different card
- ✅ No subscription created in Stripe
- ✅ No record in database

---

## Test Case 10: Invalid Amount
**Goal:** Verify amount validation

**Test 10a: Amount less than $1**
1. Go to /support-ministry
2. Enter custom amount: 0.50
3. Check monthly gift checkbox
4. Try to submit

**Expected:** ✅ Error toast: "Please enter a donation amount of at least $1"

**Test 10b: Empty amount**
1. Don't select or enter any amount
2. Try to submit

**Expected:** ✅ Submit button disabled OR error message

---

## Test Case 11: Missing Donor Info
**Goal:** Verify required field validation

1. Go to /support-ministry
2. Select amount $50
3. Leave name or email blank
4. Try to submit

**Expected Results:**
- ✅ Error toast: "Please enter your name and email"
- ✅ Form doesn't submit
- ✅ No API call made

---

## Stripe Test Cards Reference

### Successful Payments
- **4242 4242 4242 4242** - Visa (succeeds)
- **5555 5555 5555 4444** - Mastercard (succeeds)
- **3782 822463 10005** - American Express (succeeds)

### Payment Failures
- **4000 0000 0000 0002** - Generic decline
- **4000 0000 0000 9995** - Insufficient funds
- **4000 0000 0000 0069** - Expired card
- **4000 0000 0000 0127** - Incorrect CVC

### 3D Secure (Authentication Required)
- **4000 0025 0000 3155** - Requires authentication

For all test cards:
- Use any future expiry date (e.g., 12/25)
- Use any 3-digit CVC (e.g., 123)
- Use any 5-digit ZIP code (e.g., 12345)

---

## Database Queries for Verification

### View all recurring donations
```sql
SELECT 
  id, 
  donor_name, 
  donor_email, 
  amount, 
  status, 
  next_billing_date,
  created_at,
  cancelled_at
FROM recurring_donations
ORDER BY created_at DESC;
```

### Count active subscriptions
```sql
SELECT COUNT(*) as active_count 
FROM recurring_donations 
WHERE status = 'active';
```

### Calculate monthly recurring revenue
```sql
SELECT SUM(amount) as monthly_revenue 
FROM recurring_donations 
WHERE status = 'active';
```

### Find subscriptions by status
```sql
SELECT * FROM recurring_donations 
WHERE status = 'cancelled';
```

---

## Checklist Summary

### One-Time Donations
- [ ] Create one-time donation
- [ ] Verify payment in Stripe
- [ ] Check confirmation page (one-time language)
- [ ] Verify email receipt

### Recurring Subscriptions
- [ ] Create monthly subscription
- [ ] Verify in Stripe Dashboard
- [ ] Verify in database
- [ ] Check confirmation page (recurring language)

### Subscription Management
- [ ] Find subscription by email
- [ ] Update monthly amount
- [ ] Cancel subscription
- [ ] Reactivate subscription
- [ ] Handle multiple subscriptions

### Error Handling
- [ ] Test declined card
- [ ] Test invalid amount
- [ ] Test missing information
- [ ] Test non-existent email lookup

### Edge Cases
- [ ] Test with very large amount ($10,000)
- [ ] Test with decimal amounts ($12.50)
- [ ] Test same email multiple subscriptions
- [ ] Test subscription with spaces in email

---

## Troubleshooting

**Issue:** Subscription not appearing in database
- Check Stripe Dashboard first - was it created there?
- Check backend console for errors
- Verify database connection
- Check SQL query ran successfully

**Issue:** Can't find subscription by email
- Ensure exact email match (case sensitive)
- Check for typos
- Verify email in database directly
- Check Stripe customer email

**Issue:** Amount not updating
- Changes take effect NEXT billing period
- Check Stripe subscription schedule
- Verify API returned success
- Refresh manage-subscriptions page

**Issue:** Backend errors
- Check environment variables loaded
- Verify Stripe secret key is correct
- Ensure database table exists
- Check server logs for details

---

## Success Criteria

✅ All 11 test cases pass
✅ No console errors in browser
✅ No errors in backend logs
✅ Stripe Dashboard matches database
✅ Email receipts received
✅ All buttons and links work
✅ Error messages are helpful
✅ Pages load quickly
✅ Mobile responsive

---

## Next Steps After Testing

1. **Production Preparation:**
   - Switch to live Stripe keys
   - Update environment variables
   - Test with real credit card (small amount)
   - Set up Stripe webhooks

2. **Monitoring:**
   - Monitor Stripe Dashboard daily
   - Check failed payments
   - Review subscription metrics
   - Watch for errors

3. **User Communication:**
   - Create help documentation
   - Add FAQ entries
   - Set up support email
   - Prepare cancellation policy

---

Good luck with testing! 🎉
