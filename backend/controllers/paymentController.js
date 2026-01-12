import Stripe from 'stripe';
import db from '../config/db.js';
import { sendPurchaseConfirmationEmail } from '../services/emailService.js';

// Initialize Stripe with a check for the API key
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey || stripeKey === 'your_stripe_secret_key_here') {
  console.warn('⚠️  WARNING: Stripe secret key not configured. Payment features will not work.');
  console.warn('⚠️  Get your key from: https://dashboard.stripe.com/test/apikeys');
}
const stripe = stripeKey && stripeKey !== 'your_stripe_secret_key_here' 
  ? new Stripe(stripeKey) 
  : null;

/**
 * Create a payment intent
 * @route POST /api/payments/create-payment-intent
 */
export async function createPaymentIntent(req, res) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return res.status(503).json({ 
        error: 'Payment processing is not configured. Please contact support.' 
      });
    }

    const { amount, cart, customerInfo, userEmail } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Look up user_id from database if user is authenticated
    let userId = null;
    if (userEmail) {
      try {
        const [users] = await db.query('SELECT id FROM user WHERE email = ?', [userEmail]);
        if (users.length > 0) {
          userId = users[0].id;
          // console.log(`✅ Found user_id ${userId} for email ${userEmail}`);
        }
      } catch (dbError) {
        console.error('Error looking up user:', dbError);
        // Continue without userId - guest checkout
      }
    }

    // Generate a unique order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create simplified items summary for Stripe metadata (max 500 chars)
    const itemsSummary = cart.length === 1 
      ? `${cart[0].type}: ${cart[0].title}` 
      : `${cart.length} items (${[...new Set(cart.map(i => i.type))].join(', ')})`;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      metadata: {
        orderId: orderId,
        userId: userId || 'guest',
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        itemCount: cart.length.toString(),
        itemsSummary: itemsSummary.substring(0, 500) // Ensure it fits in 500 chars
      },
      description: `Order ${orderId} - ${itemsSummary.substring(0, 200)}`,
    });

    // Create a pending purchase record in database
    let purchaseId = null;
    try {
      // Calculate item_type summary from cart (e.g., "Track, Album, Merchandise")
      const itemTypes = [...new Set(cart.map(item => item.type || 'Unknown'))].join(', ');
      // console.log('📋 Item types in order:', itemTypes);
      
      // Insert purchase record (one record per order)
      const [purchaseResult] = await db.query(
        `INSERT INTO purchases 
        (user_id, stripe_payment_intent_id, order_id, amount, currency, payment_status, 
         customer_email, customer_name, shipping_address, item_type, metadata) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId || null,
          paymentIntent.id,
          orderId,
          amount / 100, // Convert cents to dollars
          'usd',
          'pending',
          customerInfo.email,
          customerInfo.name,
          JSON.stringify(customerInfo.address || {}),
          itemTypes,
          JSON.stringify({
            userAgent: req.headers['user-agent'],
            ip: req.ip
          })
        ]
      );
      
      purchaseId = purchaseResult.insertId;
      // console.log(`✅ Created purchase record #${purchaseId} for order ${orderId}`);
      
      // Insert individual order items
      if (cart && cart.length > 0) {
        // console.log('📦 Cart items to insert:', JSON.stringify(cart, null, 2));
        // console.log('🔍 Checking merchandise items:');
        cart.forEach((item, idx) => {
          if (item.type === 'Merchandise') {
            // console.log(`  Merch ${idx}:`, {
            //   title: item.title,
            //   id: item.id,
            //   merch_id: item.merch_id,
            //   type: item.type,
            //   img: item.img
            // });
          }
        });
        
        // Build order items with artist names looked up from database
        const orderItemsValues = await Promise.all(cart.map(async (item) => {
          let artistName = item.artist_name || item.artistName || null;
          
          // If no artist name provided, look it up from the database
          if (!artistName && item.id) {
            try {
              // Try to find artist name from tracks table
              const [trackRows] = await db.query(
                `SELECT a.name as artist_name 
                 FROM tracks t 
                 JOIN artists a ON t.artist_id = a.id 
                 WHERE t.id = ?`,
                [item.id]
              );
              
              if (trackRows.length === 0) {
                // Try albums table
                const [albumRows] = await db.query(
                  `SELECT a.name as artist_name 
                   FROM albums al 
                   JOIN artists a ON al.artist_id = a.id 
                   WHERE al.id = ?`,
                  [item.id]
                );
                
                if (albumRows.length > 0) {
                  artistName = albumRows[0].artist_name;
                }
              } else {
                artistName = trackRows[0].artist_name;
              }
            } catch (lookupError) {
              console.error('Error looking up artist name:', lookupError);
            }
          }
          
          const itemData = [
            purchaseId,
            item.type || 'track',
            item.id || item.merch_id || item.track_id || item.album_id || 0,
            item.title,
            artistName,
            item.quantity || 1,
            typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : (item.price || 0)
          ];
          // console.log('Item data for', item.type, ':', itemData);
          return itemData;
        }));
        
        // console.log('🔄 Inserting order items...');
        const [itemsResult] = await db.query(
          `INSERT INTO order_items 
          (purchase_id, item_type, item_id, item_title, artist_name, quantity, price) 
          VALUES ?`,
          [orderItemsValues]
        );
        // console.log(`✅ Created ${cart.length} order items for purchase #${purchaseId}`, itemsResult);
      } else {
        // console.log('⚠️  No cart items to insert');
      }
    } catch (dbError) {
      // console.error('❌ Error creating purchase record:', dbError);
      // console.error('Error details:', dbError.message);
      // console.error('SQL State:', dbError.sqlState);
      // console.error('SQL Message:', dbError.sqlMessage);
      // Continue anyway - payment intent was created
    }

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: orderId
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Webhook endpoint for Stripe events
 * @route POST /api/payments/webhook
 */
export async function handleWebhook(req, res) {
  // Check if Stripe is configured
  if (!stripe) {
    return res.status(503).json({ 
      error: 'Payment processing is not configured.' 
    });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSuccess = event.data.object;
      // console.log('PaymentIntent was successful!', paymentIntentSuccess.id);
      
      // Update purchase record to completed
      try {
        await db.query(
          `UPDATE purchases 
           SET payment_status = 'succeeded', updated_at = NOW() 
           WHERE stripe_payment_intent_id = ?`,
          [paymentIntentSuccess.id]
        );
        // console.log(`✅ Updated purchase record for payment ${paymentIntentSuccess.id}`);
        
        // Fetch purchase details with order items to send confirmation email
        try {
          const [purchases] = await db.query(
            `SELECT 
              p.id as purchase_id,
              p.order_id,
              p.customer_email,
              p.customer_name,
              p.amount,
              p.purchased_at,
              p.shipping_address
            FROM purchases p
            WHERE p.stripe_payment_intent_id = ?`,
            [paymentIntentSuccess.id]
          );
          
          if (purchases.length > 0) {
            const purchase = purchases[0];
            
            // Fetch order items with image URLs
            const [orderItems] = await db.query(
              `SELECT 
                oi.item_type,
                oi.item_id,
                oi.item_title,
                oi.artist_name,
                oi.quantity,
                oi.price,
                CASE 
                  WHEN oi.item_type = 'Track' THEN (
                    SELECT a.cover_url 
                    FROM tracks t 
                    JOIN albums a ON t.album_id = a.id 
                    WHERE t.id = oi.item_id
                  )
                  WHEN oi.item_type = 'Digital Album' THEN (
                    SELECT cover_url 
                    FROM albums 
                    WHERE id = oi.item_id
                  )
                  WHEN oi.item_type = 'Physical Album' THEN (
                    SELECT cover_url 
                    FROM albums 
                    WHERE id = oi.item_id
                  )
                  WHEN oi.item_type = 'Merchandise' THEN (
                    SELECT image_url 
                    FROM merchandise 
                    WHERE id = oi.item_id
                  )
                  ELSE NULL
                END as image_url,
                CASE 
                  WHEN oi.item_type = 'Merchandise' THEN (
                    SELECT merch_type 
                    FROM merchandise 
                    WHERE id = oi.item_id
                  )
                  ELSE NULL
                END as merch_type
              FROM order_items oi
              WHERE oi.purchase_id = ?`,
              [purchase.purchase_id]
            );
            
            // console.log('📧 Order items with images:');
            orderItems.forEach(item => {
              // console.log(`  ${item.item_type}: ${item.item_title}`);
              // console.log(`    item_id: ${item.item_id}`);
              // console.log(`    image_url: ${item.image_url || 'MISSING'}`);
            });
            
            // Send confirmation email
            const emailData = {
              customer_email: purchase.customer_email,
              customer_name: purchase.customer_name,
              order_id: purchase.order_id,
              purchased_at: purchase.purchased_at,
              amount: purchase.amount,
              items: orderItems,
              shipping_address: purchase.shipping_address
            };
            
            // console.log('📧 Email data being sent:', {
            //   ...emailData,
            //   items: orderItems.length,
            //   hasShipping: !!purchase.shipping_address,
            //   shippingPreview: purchase.shipping_address ? JSON.stringify(purchase.shipping_address).substring(0, 100) : 'none'
            // });
            
            await sendPurchaseConfirmationEmail(emailData);
            // console.log(`✅ Sent purchase confirmation email to ${purchase.customer_email}`);
          } else {
            // console.warn(`⚠️  No purchase found for payment intent ${paymentIntentSuccess.id}`);
          }
        } catch (emailError) {
          // Log error but don't fail the webhook - purchase still succeeded
          // console.error('❌ Error sending confirmation email:', emailError);
        }
      } catch (dbError) {
        // console.error('Error updating purchase record:', dbError);
      }
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      // console.log('PaymentIntent failed:', failedPayment.id);
      
      // Update purchase record to failed
      try {
        await db.query(
          `UPDATE purchases 
           SET payment_status = 'failed', updated_at = NOW() 
           WHERE stripe_payment_intent_id = ?`,
          [failedPayment.id]
        );
        // console.log(`⚠️  Updated purchase record to failed for payment ${failedPayment.id}`);
      } catch (dbError) {
        console.error('Error updating purchase record:', dbError);
      }
      break;
      
    case 'payment_intent.canceled':
      const canceledPayment = event.data.object;
      // console.log('PaymentIntent was canceled:', canceledPayment.id);
      
      // Update purchase record to canceled
      try {
        await db.query(
          `UPDATE purchases 
           SET payment_status = 'canceled', updated_at = NOW() 
           WHERE stripe_payment_intent_id = ?`,
          [canceledPayment.id]
        );
      } catch (dbError) {
        console.error('Error updating purchase record:', dbError);
      }
      break;
      
    default:
      // console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
