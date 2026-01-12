# 🔒 Secure Download System

## Overview
This system prevents customers from sharing direct Cloudinary URLs by implementing a secure, purchase-verified download flow with time-limited signed URLs.

## Security Features

### ✅ **1. Purchase Verification**
- Every download link verifies that the user has actually purchased the item
- Queries the database to check `purchases` and `order_items` tables
- Only users with `payment_status = 'succeeded'` can download

### ✅ **2. Time-Limited URLs**
- Download links expire after **1 hour** (3600 seconds)
- Cloudinary signed URLs include expiration timestamps
- Cannot be shared or reused after expiration

### ✅ **3. User-Specific Links**
- Each download link includes the customer's email
- Links are personalized and won't work for other users
- Backend validates email matches the purchase record

### ✅ **4. No Direct Cloudinary URLs**
- Email contains frontend links: `https://soulfeltmusic.com/download?type=Track&id=123&email=user@example.com`
- These links redirect to a verification page
- Only after verification are Cloudinary URLs generated

### ✅ **5. Download Logging** (Optional)
- System can track all download attempts in `download_logs` table
- Helps identify suspicious activity or abuse
- Can limit downloads per purchase if needed

---

## How It Works

### Flow Diagram
```
Customer Email → Secure Link → Frontend Page → Backend Verification → Signed URL → Download
```

### Step-by-Step Process

#### 1. **Customer Receives Email**
After purchase, customer gets email with secure download links:
```html
<a href="https://soulfeltmusic.com/download?type=Track&id=2&email=customer@email.com">
  🔒 Download Track Name
</a>
```

#### 2. **Customer Clicks Link**
- Opens `/download` page on frontend
- Page extracts URL parameters: `type`, `id`, `email`

#### 3. **Frontend Verifies Purchase**
```javascript
POST /api/downloads/generate-url
{
  itemType: "Track",
  itemId: 2,
  userEmail: "customer@email.com"
}
```

#### 4. **Backend Validates**
- Checks if user exists
- Verifies purchase in database:
  ```sql
  SELECT oi.id FROM order_items oi
  JOIN purchases p ON oi.purchase_id = p.id
  WHERE p.user_id = ? 
  AND oi.item_type = ? 
  AND oi.item_id = ?
  AND p.payment_status = 'succeeded'
  ```

#### 5. **Generate Signed URL**
- Extracts Cloudinary public_id from stored URL
- Creates signed URL with 1-hour expiration:
  ```javascript
  cloudinary.url(publicId, {
    sign_url: true,
    expires_at: Math.floor(Date.now() / 1000) + 3600
  })
  ```

#### 6. **Download Starts**
- Frontend receives temporary signed URL
- Auto-downloads file or shows download button
- URL expires after 1 hour

---

## Implementation Details

### Backend Files

#### `/backend/routes/downloads.js`
**Main endpoint:** `POST /api/downloads/generate-url`

Key features:
- Purchase verification
- Signed URL generation
- Support for both tracks and albums
- Optional download logging

Example response:
```json
{
  "itemTitle": "Track Name",
  "itemType": "Track",
  "downloads": [
    {
      "title": "Track Name",
      "downloadUrl": "https://res.cloudinary.com/...?signature=xyz&expires_at=1234567890",
      "trackId": 2
    }
  ],
  "expiresIn": 3600,
  "message": "Download URL generated successfully"
}
```

#### `/backend/services/emailService.js`
**Function:** `sendPurchaseConfirmationEmail()`

Changes made:
- Removed direct `audio_url` from database queries
- Generate secure frontend links instead:
  ```javascript
  const secureDownloadUrl = `${baseUrl}/download?type=${itemType}&id=${itemId}&email=${userEmail}`;
  ```
- Email template uses `secure_download_url` instead of `audio_url`

### Frontend Files

#### `/frontend/src/pages/SecureDownload.jsx`
**Route:** `/download`

Features:
- Loading state while verifying purchase
- Error handling for invalid links
- Auto-download countdown (5 seconds)
- Manual download buttons for each track
- Shows expiration time
- Links to purchase history if errors occur

States:
1. **Verifying** - Checking purchase in database
2. **Ready** - Purchase verified, countdown to download
3. **Downloading** - Files downloading
4. **Error** - Purchase not found or link invalid

#### `/frontend/src/App.jsx`
Added route:
```jsx
<Route path="/download" element={<SecureDownload />} />
```

---

## Security Comparison

### ❌ **Before (Insecure)**
```
Email → Direct Cloudinary URL → Download
```
**Problems:**
- URLs can be shared indefinitely
- No purchase verification
- Anyone with URL can download
- No expiration
- No tracking

### ✅ **After (Secure)**
```
Email → Frontend Link → Backend Verification → Signed URL → Download
```
**Benefits:**
- ✅ Purchase verification required
- ✅ Time-limited (1 hour)
- ✅ User-specific (email-based)
- ✅ Cannot share working links
- ✅ Download tracking possible
- ✅ Cloudinary URLs hidden from email

---

## Configuration

### Environment Variables
Required in `/backend/.env`:
```env
FRONTEND_URL=https://soulfeltmusic.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Cloudinary Settings
No changes needed. System uses existing:
- `audio_url` stored in `tracks` table
- Cloudinary credentials from environment

---

## Testing

### Test Purchase Email
```bash
cd backend
node scripts/testPurchaseEmail.js
```

### Test Download Flow
1. Make a test purchase (or use test script)
2. Check email for download link
3. Click link → Should open verification page
4. Wait 5 seconds → Auto-download starts
5. Check browser downloads folder

### Test Security
**Try sharing link with different email:**
1. Copy download link from email
2. Change `email` parameter in URL
3. Click link → Should show "Access denied" error

**Try expired link:**
1. Generate download link
2. Wait 1+ hour
3. Try to download → Should fail (Cloudinary rejects)

---

## Optional Enhancements

### 1. **Download Limit Per Purchase**
```sql
-- Add to downloads table
ALTER TABLE download_logs ADD COLUMN download_count INT DEFAULT 0;

-- Check limit before generating URL
SELECT COUNT(*) FROM download_logs 
WHERE user_id = ? AND item_id = ?;

-- Reject if > 3 downloads
IF (downloadCount > 3) REJECT;
```

### 2. **Extended Expiration**
Change expiration in `/backend/routes/downloads.js`:
```javascript
expires_at: Math.floor(Date.now() / 1000) + (7 * 24 * 3600) // 7 days
```

### 3. **Album ZIP Downloads**
Already implemented! Use:
```javascript
POST /api/downloads/generate-album-zip
{
  albumId: 107,
  userEmail: "customer@email.com"
}
```
Creates temporary ZIP with all tracks, uploads to Cloudinary, returns signed URL.

### 4. **Download Analytics**
Create table:
```sql
CREATE TABLE download_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  item_type VARCHAR(50) NOT NULL,
  item_id INT NOT NULL,
  download_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  FOREIGN KEY (user_id) REFERENCES user(id)
);
```

Already implemented in `/backend/routes/downloads.js` (lines 146-156).

### 5. **One-Time Download Tokens**
For maximum security:
```javascript
// Generate unique token
const token = crypto.randomBytes(32).toString('hex');

// Store in database with expiration
INSERT INTO download_tokens (token, user_id, item_id, expires_at, used)
VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR), 0);

// Email contains token instead of email
https://soulfeltmusic.com/download?token=abc123...

// Backend validates token
SELECT * FROM download_tokens 
WHERE token = ? 
AND used = 0 
AND expires_at > NOW();

// Mark as used after download
UPDATE download_tokens SET used = 1 WHERE token = ?;
```

---

## Troubleshooting

### Issue: "Download links point to localhost"
**Fix:** Set `FRONTEND_URL` in `/backend/.env`:
```env
FRONTEND_URL=https://soulfeltmusic.com
```

### Issue: "Failed to verify purchase"
**Possible causes:**
1. Email parameter doesn't match purchase
2. Purchase status not 'succeeded'
3. Item ID incorrect
4. User not found in database

**Debug:**
```bash
# Check purchase record
SELECT * FROM purchases WHERE customer_email = 'customer@email.com';

# Check order items
SELECT * FROM order_items WHERE purchase_id = ?;
```

### Issue: "Cloudinary signature invalid"
**Possible causes:**
1. API credentials incorrect
2. URL format changed
3. Expiration time in past

**Fix:**
- Verify `CLOUDINARY_API_SECRET` is correct
- Check Cloudinary dashboard for public_id format
- Ensure server time is accurate

### Issue: "Download doesn't start automatically"
**Browser may block auto-downloads:**
- User can click individual track links
- Shows manual download buttons
- Check browser pop-up blocker settings

---

## Maintenance

### Regular Tasks
1. **Clean up expired download_logs:**
   ```sql
   DELETE FROM download_logs 
   WHERE download_at < DATE_SUB(NOW(), INTERVAL 90 DAY);
   ```

2. **Monitor suspicious activity:**
   ```sql
   SELECT user_id, COUNT(*) as downloads 
   FROM download_logs 
   WHERE download_at > DATE_SUB(NOW(), INTERVAL 1 DAY)
   GROUP BY user_id 
   HAVING downloads > 50;
   ```

3. **Verify Cloudinary storage:**
   - Ensure audio files haven't been deleted
   - Check storage limits
   - Archive old purchases if needed

---

## Support & Questions

### Common Questions

**Q: Can customers download multiple times?**
A: Yes, they can generate new signed URLs by clicking the email link again (within expiration period).

**Q: What happens after 1 hour?**
A: The signed URL expires. Customer must visit purchase history page or click email link again to generate new URL.

**Q: Can I extend expiration time?**
A: Yes, modify `expires_at` parameter in `/backend/routes/downloads.js` line 132.

**Q: Do I need to change Cloudinary settings?**
A: No, system uses existing audio URLs. Just ensure API credentials are set in environment variables.

**Q: What if customer shares the frontend link?**
A: Link includes their email. Backend verifies the email has purchased the item. Won't work for others.

---

## Summary

This secure download system provides:
- ✅ Purchase verification
- ✅ Time-limited access
- ✅ User-specific links
- ✅ Hidden Cloudinary URLs
- ✅ Download tracking
- ✅ Professional user experience

**Result:** Customers can download their purchases easily, but cannot share links that work for others.
