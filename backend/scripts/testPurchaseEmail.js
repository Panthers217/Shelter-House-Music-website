/**
 * Test Purchase Confirmation Email
 * Run this script to test the email notification system
 * Usage: node backend/scripts/testPurchaseEmail.js
 */

import { sendPurchaseConfirmationEmail } from "../services/emailService.js";

// Test data - modify with your test email
const testPurchaseData = {
  customer_email: "marlorouse109@yahoo.com", // ⚠️ CHANGE THIS TO YOUR EMAIL
  customer_name: "Test Customer",
  order_id: "TEST-" + Date.now(),
  purchased_at: new Date(),
  amount: 49.97,
  items: [
    {
      item_type: "Digital Album",
      item_id: 1,
      item_title: "Summer Vibes Collection",
      artist_name: "DJ Sunset",
      quantity: 1,
      price: 19.99,
    },
    {
      item_type: "Track",
      item_id: 5,
      item_title: "Midnight Dreams",
      artist_name: "The Dreamers",
      quantity: 1,
      price: 9.99,
    },
    {
      item_type: "Merchandise",
      item_id: 10,
      item_title: "Band T-Shirt (Medium)",
      artist_name: "Soul Felt Music",
      quantity: 1,
      price: 19.99,
    },
  ],
  shipping_address: JSON.stringify({
    line1: "123 Music Street",
    line2: "Apt 4B",
    city: "Nashville",
    state: "TN",
    postal_code: "37201",
    country: "US",
  }),
};

console.log("🧪 Testing Purchase Confirmation Email...\n");
console.log("Test Order Details:");
console.log("- Order ID:", testPurchaseData.order_id);
console.log("- Customer:", testPurchaseData.customer_name);
console.log("- Email:", testPurchaseData.customer_email);
console.log("- Items:", testPurchaseData.items.length);
console.log("- Total: $" + testPurchaseData.amount.toFixed(2));
console.log("\nAttempting to send email...\n");

try {
  const result = await sendPurchaseConfirmationEmail(testPurchaseData);

  console.log("✅ SUCCESS! Email sent successfully!\n");
  console.log("📧 Details:");
  console.log("- Recipient:", result.recipient);
  console.log("- Message ID:", result.messageId);
  console.log("\n✉️  Check your inbox at:", testPurchaseData.customer_email);
  console.log("📁 Also check spam/junk folder if not in inbox\n");

  process.exit(0);
} catch (error) {
  console.error("❌ ERROR: Failed to send email\n");
  console.error("Error Details:", error.message);

  if (error.message.includes("Email settings not configured")) {
    console.error("\n💡 FIX: Configure email settings in database:");
    console.error("   1. Go to Admin Settings in your app");
    console.error("   2. Or run SQL:");
    console.error(`
      UPDATE website_settings SET
        email_provider = 'smtp',
        smtp_host = 'smtp.gmail.com',
        smtp_port = 587,
        smtp_secure = false,
        smtp_user = 'your-email@gmail.com',
        smtp_password = 'your-app-password',
        email_from_name = 'Soul Felt Music';
    `);
  } else if (
    error.message.includes("SMTP") ||
    error.message.includes("authentication")
  ) {
    console.error("\n💡 FIX: Check your email credentials:");
    console.error("   - SMTP username correct?");
    console.error("   - SMTP password correct?");
    console.error("   - For Gmail: Use App Password, not regular password");
    console.error("   - Enable 2FA and generate App Password at:");
    console.error("     https://myaccount.google.com/apppasswords");
  }

  console.error("\n📚 See PURCHASE_EMAIL_IMPLEMENTATION.md for setup guide\n");
  process.exit(1);
}
