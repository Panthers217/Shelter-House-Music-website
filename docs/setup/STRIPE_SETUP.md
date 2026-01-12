# Stripe Checkout Integration - Setup Instructions

## ✅ What's Been Implemented

### Frontend:
1. **Checkout Page** (`/checkout`) - Full checkout flow with:
   - Cart items display
   - Customer information form
   - Billing address fields
   - Stripe Card Element for payment
   - Order summary with tax calculation
   
2. **Order Confirmation Page** (`/order-confirmation`) - Success page after payment

3. **Updated Cart** - "Proceed to Checkout" button added to cart in ArtistStore

### Backend:
1. **Payment Controller** - Handles Stripe payment intents
2. **Payment Routes** - `/api/payments/create-payment-intent` and webhook endpoint
3. **Stripe Integration** - Server-side Stripe SDK configured

## 🔧 Setup Required

### 1. Get Stripe API Keys

1. Sign up at https://stripe.com
2. Go to Dashboard → Developers → API keys
3. Copy your **Publishable key** (starts with `pk_test_...`)
4. Copy your **Secret key** (starts with `sk_test_...`)

### 2. Add Environment Variables

**Frontend** (`/frontend/.env` or `.env.local`):
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Backend** (`/backend/.env`):
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Test the Checkout Flow

1. Add items to cart in the store
2. Click "Proceed to Checkout"
3. Fill in customer information
4. Use Stripe test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Use any future date for expiry (e.g., `12/25`)
   - Use any 3-digit CVC (e.g., `123`)
   - Use any ZIP code (e.g., `12345`)

### 4. Setup Stripe Webhook (Optional - for production)

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your URL: `https://yourdomain.com/api/payments/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the webhook signing secret and add to `.env`

## 📋 Features

- **Secure Payment Processing** - PCI-compliant via Stripe
- **Customer Information** - Email, name, billing address
- **Tax Calculation** - Automatic 8% tax (configurable)
- **Cart Integration** - Uses existing CartContext
- **Order Confirmation** - Success page with order details
- **Error Handling** - Toast notifications for errors
- **Responsive Design** - Works on mobile, tablet, desktop

## 🚀 How to Use

1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Navigate to `/store`
4. Add items to cart
5. Click "Proceed to Checkout"
6. Complete payment form
7. See order confirmation

## 💡 Customization

### Change Tax Rate:
In `/frontend/src/pages/Checkout.jsx`, line 16:
```javascript
const tax = cartTotal * 0.08; // Change 0.08 to your tax rate
```

### Modify Checkout Fields:
Edit the form in `/frontend/src/pages/Checkout.jsx` to add/remove fields

### Update Order Confirmation:
Customize `/frontend/src/pages/OrderConfirmation.jsx` for your brand

## 🔒 Security Notes

- Never commit Stripe secret keys to version control
- Use environment variables for all sensitive data
- Test thoroughly before going live
- Review Stripe's security best practices

## 📚 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React Elements](https://stripe.com/docs/stripe-js/react)
- [Testing Cards](https://stripe.com/docs/testing)
