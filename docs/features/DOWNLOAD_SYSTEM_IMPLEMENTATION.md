# Download System Implementation Guide

## Overview
This document describes the implementation of the secure download system for purchased digital content (tracks and albums) using temporary signed URLs.

## System Architecture

### Components
1. **Backend API** - `/backend/routes/downloads.js`
2. **Frontend Handler** - `PurchaseHistory.jsx` component
3. **Database** - Existing `purchases`, `order_items`, `tracks`, and `albums` tables
4. **File Storage** - Cloudinary (existing)

---

## How It Works

### User Flow
1. User navigates to **Purchase History** page (`/purchase-history`)
2. User sees all completed orders with purchased items
3. User clicks **"Download"** button on a digital item (Track or Album)
4. System verifies purchase ownership
5. System generates temporary signed URL(s) from Cloudinary
6. Download begins automatically in new tab
7. URL expires after 1 hour
8. User can regenerate download link anytime by clicking "Download" again

### Security Flow
```
User clicks Download
    ↓
Frontend sends: { itemType, itemId, userEmail }
    ↓
Backend verifies:
  - User exists in database
  - User purchased this specific item
  - Payment status = 'succeeded'
    ↓
Backend fetches audio_url from tracks/albums table
    ↓
Backend generates Cloudinary signed URL (expires in 1 hour)
    ↓
Frontend receives signed URL
    ↓
Browser opens download in new tab
```

---

## Implementation Details

### 1. Backend API Endpoint

**File:** `/backend/routes/downloads.js`

**Endpoint:** `POST /api/downloads/generate-url`

**Request Body:**
```json
{
  "itemType": "Track" | "Digital Album",
  "itemId": 123,
  "userEmail": "user@example.com"
}
```

**Response (Single Track):**
```json
{
  "itemTitle": "Song Title",
  "itemType": "Track",
  "downloads": [
    {
      "title": "Song Title",
      "downloadUrl": "https://res.cloudinary.com/.../signed-url",
      "trackId": 123
    }
  ],
  "expiresIn": 3600,
  "message": "Download URL generated successfully"
}
```

**Response (Album with Multiple Tracks):**
```json
{
  "itemTitle": "Album Title",
  "itemType": "Digital Album",
  "downloads": [
    {
      "title": "Track 1",
      "downloadUrl": "https://res.cloudinary.com/.../signed-url-1",
      "trackId": 101
    },
    {
      "title": "Track 2",
      "downloadUrl": "https://res.cloudinary.com/.../signed-url-2",
      "trackId": 102
    }
  ],
  "expiresIn": 3600,
  "message": "2 track download URLs generated successfully"
}
```

**Security Checks:**
1. User exists in database (by email)
2. User has purchased the item (checks `purchases` + `order_items` tables)
3. Payment status is `'succeeded'`
4. Audio file exists in database

**Error Responses:**
- `400` - Missing required fields
- `403` - User hasn't purchased this item
- `404` - User not found or audio file not found
- `500` - Server error

---

### 2. Frontend Implementation

**File:** `/frontend/src/components/PurchaseHistory.jsx`

**Function:** `handleDownload(item)`

**Features:**
- Shows loading state ("Generating..." on button)
- Disables button during processing
- Opens single track in new tab
- Opens multiple tracks (albums) with 500ms delay between each
- Handles errors with user-friendly messages
- Restores button state after completion

**Button States:**
- Default: "Download"
- Loading: "Generating..." (disabled)
- Error: Restored to "Download" with alert message

---

### 3. Database Schema

**Existing Tables Used:**

#### `purchases`
```sql
- id (BIGINT, PRIMARY KEY)
- user_id (BIGINT, FK to user.id)
- stripe_payment_intent_id (VARCHAR)
- order_id (VARCHAR)
- amount (DECIMAL)
- payment_status (VARCHAR) -- 'succeeded', 'pending', 'failed'
- customer_email (VARCHAR)
- purchased_at (TIMESTAMP)
```

#### `order_items`
```sql
- id (BIGINT, PRIMARY KEY)
- purchase_id (BIGINT, FK to purchases.id)
- item_type (VARCHAR) -- 'Track', 'Digital Album', 'Merchandise', etc.
- item_id (BIGINT) -- ID of track or album
- item_title (VARCHAR)
- artist_name (VARCHAR)
- quantity (INT)
- price (DECIMAL)
```

#### `tracks`
```sql
- id (BIGINT, PRIMARY KEY)
- album_id (BIGINT)
- title (VARCHAR)
- audio_url (VARCHAR) -- Cloudinary URL
- artist_id (BIGINT)
```

#### `albums`
```sql
- id (BIGINT, PRIMARY KEY)
- artist_id (BIGINT)
- title (VARCHAR)
- cover_url (VARCHAR)
```

---

### 4. Cloudinary Integration

**Configuration:**
Uses existing environment variables:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

**Signed URL Generation:**
```javascript
cloudinary.url(publicId, {
  resource_type: 'video',
  type: 'upload',
  sign_url: true,
  secure: true,
  expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour
});
```

**URL Parsing:**
Extracts public ID from Cloudinary URL:
```
https://res.cloudinary.com/{cloud}/video/upload/v1760301374/{public_id}.mp3
                                                   ↑ version  ↑ public_id
```

**Expiration:**
- Signed URLs expire after **1 hour (3600 seconds)**
- After expiration, URL returns 401 Unauthorized
- User can generate new URL anytime by clicking Download again

---

## Testing

### Manual Testing Steps

1. **Test Single Track Download:**
   - Log in as user with purchases (`test16@yahoo.com`)
   - Navigate to `/purchase-history`
   - Click "Download" on a Track item
   - Verify new tab opens with MP3 file
   - Verify button shows "Generating..." then "Download"

2. **Test Album Download:**
   - Click "Download" on a Digital Album item
   - Verify alert about multiple downloads
   - Verify multiple tabs open (one per track)
   - Allow pop-ups if blocked by browser

3. **Test Security:**
   - Try accessing URL after 1 hour → Should fail (401)
   - Try downloading as different user → Should fail (403)
   - Try downloading with invalid item ID → Should fail (404)

4. **Test Error Handling:**
   - Test with network offline → Should show error alert
   - Test with item not purchased → Should show access denied
   - Test with deleted track → Should show not found

### API Testing with curl

```bash
# Test download URL generation
curl -X POST http://localhost:3001/api/downloads/generate-url \
  -H "Content-Type: application/json" \
  -d '{
    "itemType": "Track",
    "itemId": 1,
    "userEmail": "test16@yahoo.com"
  }'

# Expected success response:
# { "itemTitle": "...", "downloads": [...], "expiresIn": 3600 }

# Test unauthorized access
curl -X POST http://localhost:3001/api/downloads/generate-url \
  -H "Content-Type: application/json" \
  -d '{
    "itemType": "Track",
    "itemId": 999,
    "userEmail": "notpurchased@example.com"
  }'

# Expected error response:
# { "error": "Access denied. You have not purchased this item." }
```

---

## Security Features

### ✅ Implemented Security Measures

1. **Purchase Verification**
   - Checks database to confirm user purchased the item
   - Verifies payment status is `'succeeded'`
   - Prevents unauthorized downloads

2. **Temporary URLs**
   - URLs expire after 1 hour
   - Cannot be shared long-term
   - New URL generated for each download request

3. **User Authentication**
   - Requires valid user email
   - Links to authenticated user in `websiteUser` context
   - Redirects to login if not authenticated

4. **Database Validation**
   - Verifies user exists
   - Verifies item exists in tracks/albums
   - Checks foreign key relationships

### 🔒 Additional Security Recommendations

1. **Add Authentication Token**
   - Currently uses email for identification
   - Consider adding JWT token verification
   - Example: Send auth token in request headers

2. **Rate Limiting**
   - Limit download URL generations per user per hour
   - Prevent abuse of the API

3. **Download Tracking**
   - Optional `download_logs` table implemented
   - Tracks: user_id, item_type, item_id, download_at
   - Use for analytics and abuse detection

4. **IP Verification**
   - Store IP address with purchase
   - Compare with download request IP
   - Flag suspicious activity

---

## File Structure

```
backend/
├── routes/
│   ├── downloads.js          # NEW - Download API endpoint
│   ├── purchase-history.js   # Existing - Purchase history API
│   └── payments.js            # Existing - Stripe payment handling
├── server.js                  # Updated - Added downloads route
└── config/
    └── db.js                  # Existing - Database connection

frontend/
└── src/
    └── components/
        └── PurchaseHistory.jsx  # Updated - Added handleDownload()
```

---

## Configuration

### Environment Variables Required

**Backend (.env):**
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3001  # Or production URL
```

---

## Troubleshooting

### Common Issues

**1. "Failed to generate download link"**
- Check Cloudinary credentials in `.env`
- Verify `audio_url` exists in tracks table
- Check server logs for detailed error

**2. "Access denied. You have not purchased this item."**
- Verify user email matches purchase
- Check `payment_status` is `'succeeded'`
- Verify `order_items` has correct `item_id` and `item_type`

**3. Download opens but 401 Unauthorized**
- URL has expired (after 1 hour)
- Click "Download" again to generate new URL
- Check Cloudinary API credentials

**4. Album downloads don't work**
- Allow pop-ups in browser
- Check if tracks exist for album in database
- Verify all tracks have valid `audio_url`

**5. Button stays as "Generating..."**
- JavaScript error occurred
- Check browser console for errors
- Refresh page and try again

---

## Future Enhancements

### Potential Improvements

1. **Download All Button**
   - Add button to download entire order at once
   - Generate ZIP file with all purchased tracks

2. **Download History**
   - Track download count per item
   - Show "Last downloaded" date
   - Display download limit (if implemented)

3. **Streaming Option**
   - Add "Listen" button for online streaming
   - Keep download for offline use
   - Integrate audio player component

4. **Download Manager**
   - Queue multiple downloads
   - Show download progress
   - Pause/resume functionality

5. **Email Download Links**
   - Send download link via email
   - Include in purchase confirmation email
   - Set longer expiration (24 hours)

6. **Mobile App Integration**
   - Deep links for mobile app
   - In-app download handling
   - Offline playback support

---

## Maintenance

### Regular Checks

1. **Monitor Cloudinary Usage**
   - Track bandwidth consumption
   - Review signed URL generation frequency
   - Check for abuse patterns

2. **Database Performance**
   - Index on `order_items.purchase_id`
   - Index on `purchases.user_id`
   - Monitor query performance

3. **Error Logs**
   - Review failed download attempts
   - Track 403 errors (unauthorized access)
   - Monitor 404 errors (missing files)

4. **User Feedback**
   - Track support tickets about downloads
   - Monitor browser compatibility issues
   - Collect feedback on user experience

---

## API Reference Summary

### Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/api/downloads/generate-url` | Generate temporary download URL | Yes (via email) |
| GET | `/api/purchase-history/user-email/:email` | Get user's purchase history | Yes |
| GET | `/api/purchase-history/user/:userId` | Get purchases by user ID | Yes |

### Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success - Download URL generated |
| 400 | Bad Request - Missing or invalid parameters |
| 403 | Forbidden - User hasn't purchased item |
| 404 | Not Found - User or item doesn't exist |
| 500 | Server Error - Internal error occurred |

---

## Support

For issues or questions:
1. Check server logs: `backend/` directory
2. Check browser console for frontend errors
3. Review this documentation
4. Test API endpoints with curl/Postman
5. Verify database records for purchase

---

**Last Updated:** November 2, 2025  
**Version:** 1.0  
**Status:** ✅ Production Ready
