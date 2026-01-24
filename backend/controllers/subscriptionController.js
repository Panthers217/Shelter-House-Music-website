import Stripe from "stripe";
import db from "../config/db.js";
import { sendSubscriptionConfirmationEmail } from "../services/emailService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a recurring donation subscription
const createSubscription = async (req, res) => {
  try {
    const { email, name, amount, paymentMethodId } = req.body;
    const userId = req.user?.userId; // From auth middleware

    if (!userId) {
      return res.status(401).json({
        error: "Authentication required to create monthly subscription",
        requiresAuth: true,
      });
    }

    if (!email || !name || !amount || !paymentMethodId) {
      return res.status(400).json({
        error: "Missing required fields: email, name, amount, or paymentMethodId",
      });
    }

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(parseFloat(amount) * 100);

    if (amountInCents < 100) {
      return res.status(400).json({
        error: "Minimum donation amount is $1.00",
      });
    }

    // Check if customer exists or create new one
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      
      // Attach payment method to existing customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });
      
      // Set as default payment method
      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    } else {
      // Create new customer with payment method
      customer = await stripe.customers.create({
        email: email,
        name: name,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    // Create a price for the subscription
    const price = await stripe.prices.create({
      unit_amount: amountInCents,
      currency: "usd",
      recurring: {
        interval: "month",
      },
      product_data: {
        name: "Monthly Ministry Support",
      },
    });

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });

    // Calculate next billing date
    const nextBillingDate = new Date(subscription.current_period_end * 1000);

    // Save to database
    const [result] = await db.query(
      `INSERT INTO recurring_donations 
       (user_id, stripe_subscription_id, stripe_customer_id, donor_name, donor_email, amount, status, next_billing_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        subscription.id,
        customer.id,
        name,
        email,
        amount,
        subscription.status,
        nextBillingDate,
      ]
    );

    // Send confirmation email
    try {
      await sendSubscriptionConfirmationEmail({
        email,
        name,
        amount,
        subscriptionId: subscription.id,
        nextBillingDate,
        status: subscription.status,
      });
      console.log(`✅ Subscription confirmation email sent to ${email}`);
    } catch (emailError) {
      console.error("⚠️  Failed to send subscription confirmation email:", emailError);
      // Don't fail the request if email fails - subscription was created successfully
    }

    res.status(201).json({
      success: true,
      subscriptionId: subscription.id,
      customerId: customer.id,
      status: subscription.status,
      nextBillingDate: nextBillingDate,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({
      error: error.message || "Failed to create subscription",
    });
  }
};

// Get subscriptions for a user by email
const getUserSubscriptions = async (req, res) => {
  try {
    const { email } = req.params;
    const userId = req.user?.userId; // From auth middleware

    if (!userId) {
      return res.status(401).json({ 
        error: "Authentication required to view subscriptions",
        requiresAuth: true 
      });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Verify user is accessing their own subscriptions
    if (req.user.email !== email) {
      return res.status(403).json({ 
        error: "You can only view your own subscriptions" 
      });
    }

    const [subscriptions] = await db.query(
      `SELECT id, stripe_subscription_id, stripe_customer_id, donor_name, 
              donor_email, amount, status, next_billing_date, created_at, 
              updated_at, cancelled_at
       FROM recurring_donations 
       WHERE user_id = ? AND donor_email = ?
       ORDER BY created_at DESC`,
      [userId, email]
    );

    // Enrich with Stripe data
    const enrichedSubscriptions = await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          const stripeSubscription = await stripe.subscriptions.retrieve(
            sub.stripe_subscription_id
          );
          return {
            ...sub,
            stripeStatus: stripeSubscription.status,
            currentPeriodEnd: new Date(
              stripeSubscription.current_period_end * 1000
            ),
          };
        } catch (error) {
          console.error(
            `Error fetching Stripe subscription ${sub.stripe_subscription_id}:`,
            error
          );
          return sub;
        }
      })
    );

    res.json({
      success: true,
      subscriptions: enrichedSubscriptions,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({
      error: "Failed to fetch subscriptions",
    });
  }
};

// Update subscription amount
const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        error: "Authentication required to update subscription",
        requiresAuth: true 
      });
    }

    if (!amount || amount < 1) {
      return res.status(400).json({
        error: "Valid amount is required (minimum $1.00)",
      });
    }

    // Get subscription from database and verify ownership
    const [subscriptions] = await db.query(
      "SELECT * FROM recurring_donations WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (subscriptions.length === 0) {
      return res.status(404).json({ 
        error: "Subscription not found or you don't have permission to modify it" 
      });
    }

    const subscription = subscriptions[0];

    if (subscription.status !== "active") {
      return res.status(400).json({
        error: "Can only update active subscriptions",
      });
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);

    // Get current Stripe subscription
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripe_subscription_id
    );

    // Create new price with updated amount
    const newPrice = await stripe.prices.create({
      unit_amount: amountInCents,
      currency: "usd",
      recurring: {
        interval: "month",
      },
      product_data: {
        name: "Monthly Ministry Support",
      },
    });

    // Update subscription with new price
    const updatedSubscription = await stripe.subscriptions.update(
      subscription.stripe_subscription_id,
      {
        items: [
          {
            id: stripeSubscription.items.data[0].id,
            price: newPrice.id,
          },
        ],
        proration_behavior: "none", // Don't prorate, change takes effect next billing cycle
      }
    );

    // Update database
    await db.query(
      "UPDATE recurring_donations SET amount = ?, updated_at = NOW() WHERE id = ?",
      [amount, id]
    );

    res.json({
      success: true,
      message: "Subscription updated successfully",
      newAmount: amount,
      effectiveDate: new Date(updatedSubscription.current_period_end * 1000),
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).json({
      error: error.message || "Failed to update subscription",
    });
  }
};

// Cancel subscription
const cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        error: "Authentication required to cancel subscription",
        requiresAuth: true 
      });
    }

    // Get subscription from database and verify ownership
    const [subscriptions] = await db.query(
      "SELECT * FROM recurring_donations WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (subscriptions.length === 0) {
      return res.status(404).json({ 
        error: "Subscription not found or you don't have permission to cancel it" 
      });
    }

    const subscription = subscriptions[0];

    if (subscription.status === "cancelled") {
      return res.status(400).json({
        error: "Subscription is already cancelled",
      });
    }

    // Cancel in Stripe (at period end, so they get what they paid for)
    const cancelledSubscription = await stripe.subscriptions.update(
      subscription.stripe_subscription_id,
      {
        cancel_at_period_end: true,
      }
    );

    // Update database
    await db.query(
      `UPDATE recurring_donations 
       SET status = 'cancelled', cancelled_at = NOW(), updated_at = NOW() 
       WHERE id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: "Subscription cancelled successfully",
      cancelAt: new Date(cancelledSubscription.current_period_end * 1000),
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    res.status(500).json({
      error: error.message || "Failed to cancel subscription",
    });
  }
};

// Reactivate a cancelled subscription (if not yet ended)
const reactivateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        error: "Authentication required to reactivate subscription",
        requiresAuth: true 
      });
    }

    // Get subscription from database and verify ownership
    const [subscriptions] = await db.query(
      "SELECT * FROM recurring_donations WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (subscriptions.length === 0) {
      return res.status(404).json({ 
        error: "Subscription not found or you don't have permission to reactivate it" 
      });
    }

    const subscription = subscriptions[0];

    // Reactivate in Stripe
    const reactivatedSubscription = await stripe.subscriptions.update(
      subscription.stripe_subscription_id,
      {
        cancel_at_period_end: false,
      }
    );

    // Update database
    await db.query(
      `UPDATE recurring_donations 
       SET status = 'active', cancelled_at = NULL, updated_at = NOW() 
       WHERE id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: "Subscription reactivated successfully",
      status: reactivatedSubscription.status,
    });
  } catch (error) {
    console.error("Error reactivating subscription:", error);
    res.status(500).json({
      error: error.message || "Failed to reactivate subscription",
    });
  }
};

export {
  createSubscription,
  getUserSubscriptions,
  updateSubscription,
  cancelSubscription,
  reactivateSubscription,
};
