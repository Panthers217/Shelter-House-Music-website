# 🔐 Recurring Donations - Authentication Integration

## Overview
Monthly recurring donations now require user authentication for enhanced security. This ensures that only the subscription owner can manage their recurring donations.

## Changes Made

### 1. Database Changes ✅

**Migration:** `009_add_user_id_to_recurring_donations.sql`
- Added `user_id` column (BIGINT) to `recurring_donations` table
- Created foreign key constraint to `user` table
- Added index on `user_id` for performance
- CASCADE on delete/update to maintain referential integrity

### 2. Backend Changes ✅

**New Middleware:** `/backend/middleware/auth.js`
- `verifyFirebaseToken()` - Requires authentication, rejects unauthorized requests
- `optionalAuth()` - Allows requests with/without auth, adds user info if available
- Automatically fetches user record from database using Firebase email
- Adds `req.user.userId` and `req.user.dbUser` to request

**Updated Controller:** `/backend/controllers/subscriptionController.js`
All functions now:
- Require authentication via middleware
- Verify user ownership before allowing operations
- Associate subscriptions with user_id on creation
- Return 401 with `requiresAuth: true` for unauthorized attempts

**Updated Routes:** `/backend/routes/subscriptions.js`
All routes now use `verifyFirebaseToken` middleware:
- `POST /api/subscriptions/create` - Requires auth
- `GET /api/subscriptions/user/:email` - Requires auth + ownership verification
- `PUT /api/subscriptions/:id/amount` - Requires auth + ownership verification
- `DELETE /api/subscriptions/:id` - Requires auth + ownership verification
- `POST /api/subscriptions/:id/reactivate` - Requires auth + ownership verification

### 3. Frontend Changes ✅

**SupportMinistry.jsx:**
- Imports `useUserLogin` hook
- Pre-fills email if user is logged in
- Shows sign-in prompt near "Make this a monthly gift" checkbox
- Redirects to login if user tries to create recurring donation without auth
- Passes return path to login page for seamless redirect back

**ManageSubscriptions.jsx:**
- Requires authentication to access page
- Redirects to login if not authenticated
- Auto-fills email from logged-in user (read-only)
- Cannot view other users' subscriptions
- Shows loading state while checking auth
- Handles 401 responses gracefully with redirect

---

## Security Features

### Authentication Flow

1. **Creating Monthly Subscription:**
   ```
   User clicks "Make this a monthly gift" → 
   System checks if logged in →
   If not logged in: Redirect to /login →
   After login: Return to /support-ministry →
   Complete donation with authenticated user
   ```

2. **Managing Subscriptions:**
   ```
   User visits /manage-subscriptions →
   System checks authentication →
   If not authenticated: Redirect to /login →
   After login: Auto-load user's subscriptions →
   All operations require ownership verification
   ```

### Ownership Verification

**Database Level:**
- Foreign key constraint ensures `user_id` references valid user
- Queries filter by both `user_id` AND `email` for double verification

**API Level:**
- Middleware verifies Firebase token
- Controller checks `user_id` matches subscription owner
- Email in URL must match authenticated user's email

**Frontend Level:**
- Email field is read-only (auto-filled from user)
- Cannot search for other users' subscriptions
- Redirects to login if session expires

---

## User Experience

### For New Users

Creating Monthly Donation **WITHOUT Login:**
1. Visit /support-ministry
2. Check "Make this a monthly gift"
3. See note: "You'll need to sign in to set up monthly support"
4. Click submit → Redirected to /login
5. Sign up or log in
6. Redirected back to /support-ministry
7. Form data preserved (amount, etc.)
8. Complete donation as authenticated user

### For Logged-In Users

Creating Monthly Donation **WITH Login:**
1. Visit /support-ministry
2. Email auto-filled from account
3. Check "Make this a monthly gift"
4. See confirmation they're logged in
5. Enter amount and card details
6. Submit → Subscription created with user_id

Managing Subscriptions:
1. Visit /manage-subscriptions
2. Already authenticated → No redirect
3. Email auto-filled (can't change)
4. View only own subscriptions
5. Update/cancel securely

### Session Expiration

If user's session expires:
- API returns 401 with `requiresAuth: true`
- Frontend detects and shows error toast
- Redirects to /login with return path
- After re-authentication, returns to original page

---

## API Authentication

### Request Headers

All subscription API calls require:
```javascript
Authorization: Bearer <firebase-id-token>
```

**Automatic:** The `useUserLogin` hook has an axios interceptor that automatically adds this header to all API requests.

### Token Refresh

Firebase tokens automatically refresh in the background. The axios interceptor calls `user.getIdToken(true)` which forces a refresh if needed.

### Error Responses

**401 Unauthorized:**
```json
{
  "error": "No authentication token provided",
  "requiresAuth": true
}
```

**403 Forbidden:**
```json
{
  "error": "You can only view your own subscriptions"
}
```

**404 Not Found:**
```json
{
  "error": "Subscription not found or you don't have permission to modify it"
}
```

---

## Testing Authentication

### Test Case 1: Create Subscription Without Login
1. Open incognito/private window
2. Visit http://localhost:5173/support-ministry
3. Check "Make this a monthly gift"
4. Try to submit
5. **Expected:** Redirected to /login with toast message

### Test Case 2: Create Subscription With Login
1. Sign in to account
2. Visit /support-ministry
3. Email should be auto-filled
4. Check "Make this a monthly gift"
5. Submit with valid card
6. **Expected:** Subscription created, confirmation page shows

### Test Case 3: View Own Subscriptions
1. Sign in
2. Visit /manage-subscriptions
3. Email auto-filled from account
4. Click "Find My Subscriptions"
5. **Expected:** Shows all subscriptions for logged-in user

### Test Case 4: Attempt to Access Without Auth
1. Sign out or use incognito
2. Visit /manage-subscriptions directly
3. **Expected:** Redirected to /login immediately

### Test Case 5: Session Expiration
1. Sign in
2. Open /manage-subscriptions
3. Wait 15+ minutes (or manually sign out in another tab)
4. Try to update subscription
5. **Expected:** 401 error, redirected to /login

---

## Migration Path for Existing Data

**Existing subscriptions (before user_id added):**
- Have `user_id = NULL`
- Still visible in Stripe Dashboard
- **Action Required:** Admin should:
  1. Contact existing donors
  2. Ask them to create account with same email
  3. Run SQL to link subscriptions:
     ```sql
     UPDATE recurring_donations rd
     JOIN user u ON rd.donor_email = u.email
     SET rd.user_id = u.id
     WHERE rd.user_id IS NULL;
     ```

**Future Enhancement:**
Consider adding a "claim subscription" feature where users can link existing subscriptions to their account after signing up.

---

## Configuration

### Environment Variables

**Backend (Already configured):**
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
# ... other Firebase keys
```

**Frontend (Already configured):**
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase config
```

---

## Benefits of Authentication Integration

✅ **Security:** Only subscription owners can manage their donations
✅ **Privacy:** Users can't view others' subscription data
✅ **Accountability:** All operations tied to authenticated user
✅ **Audit Trail:** Know exactly who created/modified subscriptions
✅ **User Experience:** Auto-fill email, seamless management
✅ **Data Integrity:** Foreign key ensures valid user references
✅ **Scalability:** Ready for user dashboard features

---

## Future Enhancements

1. **User Dashboard:**
   - View all donations (one-time + recurring)
   - Download tax receipts
   - Update payment method
   - View donation history

2. **Email Notifications:**
   - Welcome email on first subscription
   - Monthly thank you emails
   - Renewal reminders
   - Cancellation confirmations

3. **Admin Features:**
   - View all recurring donors
   - Filter by user
   - Export donor list
   - Send bulk communications

4. **Subscription Analytics:**
   - Track monthly recurring revenue per user
   - Identify most generous donors
   - Churn analysis
   - Conversion from one-time to recurring

---

## Troubleshooting

### Issue: "Authentication required" error
**Solution:** User needs to sign in. Click the login link in error message.

### Issue: Can't see subscriptions after login
**Solution:** 
1. Verify email in subscription matches logged-in email
2. Check browser console for errors
3. Verify backend is running
4. Check Firebase token is valid

### Issue: Subscription created but user_id is NULL
**Solution:** 
1. User wasn't authenticated during creation
2. Run migration to link by email (see Migration Path above)
3. User may need to recreate subscription while logged in

### Issue: "You can only view your own subscriptions"
**Solution:** User trying to access another user's subscriptions. This is expected security behavior.

---

## Summary

✅ **Database updated** with user_id foreign key
✅ **Backend secured** with Firebase auth middleware
✅ **API routes protected** with authentication
✅ **Frontend updated** with login checks and redirects
✅ **Ownership verified** at every operation
✅ **User experience** enhanced with auto-fill and seamless auth
✅ **Security improved** - only owners can manage subscriptions

**Result:** Monthly recurring donations are now securely tied to authenticated user accounts, providing better security, privacy, and user experience.
