import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { FiHeart, FiMusic, FiTrendingUp, FiGlobe } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useUserLogin } from "../hooks/useUserLogin";

// Initialize Stripe
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_your_key_here"
);

// Card styling
const cardElementOptions = {
  style: {
    base: {
      color: "#F5F5F2",
      fontFamily: "Roboto, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#8A8A85",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

// Donation Form Component
function DonationForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useUserLogin(); // Add auth hook
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    email: "",
    name: "",
  });

  const suggestedAmounts = [25, 50, 100, 250];

  // Pre-fill email if user is logged in
  React.useEffect(() => {
    if (user?.email && !donorInfo.email) {
      setDonorInfo((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setCustomAmount(value);
    setDonationAmount(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Check if user is logged in for recurring donations
    if (isRecurring && !user) {
      toast.error("Please sign in to set up monthly recurring support");
      navigate("/login", { state: { from: "/support-ministry", isRecurring: true } });
      return;
    }

    const amount = parseFloat(donationAmount || customAmount);

    if (!amount || amount < 1) {
      toast.error("Please enter a donation amount of at least $1");
      return;
    }

    if (!donorInfo.email || !donorInfo.name) {
      toast.error("Please enter your name and email");
      return;
    }

    setProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);

      // If recurring, create subscription instead of one-time payment
      if (isRecurring) {
        // Create payment method first
        const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: donorInfo.name,
            email: donorInfo.email,
          },
        });

        if (pmError) {
          toast.error(pmError.message);
          setProcessing(false);
          return;
        }

        // Get Firebase auth token
        const token = await user.getIdToken(true);

        // Create subscription via backend
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/subscriptions/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
              email: donorInfo.email,
              name: donorInfo.name,
              amount: amount,
              paymentMethodId: paymentMethod.id,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create subscription");
        }

        const subscriptionData = await response.json();
        
        toast.success("Monthly support set up successfully!");
        navigate("/donation-confirmation", {
          state: {
            isRecurring: true,
            donationAmount: amount,
            subscriptionId: subscriptionData.subscriptionId,
            nextBillingDate: subscriptionData.nextBillingDate,
          },
        });
      } else {
        // One-time payment flow (existing code)
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/payments/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: Math.round(amount * 100), // Convert to cents
              cart: [
                {
                  type: "Donation",
                  title: "One-Time Ministry Support",
                  price: amount,
                  quantity: 1,
                },
              ],
              customerInfo: {
                email: donorInfo.email,
                name: donorInfo.name,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create payment intent");
        }

        const { clientSecret } = await response.json();

        // Confirm payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: donorInfo.name,
                email: donorInfo.email,
              },
            },
          }
        );

        if (error) {
          toast.error(error.message);
          setProcessing(false);
        } else if (paymentIntent.status === "succeeded") {
          toast.success("Thank you for your generous support!");
          navigate("/donation-confirmation", {
            state: {
              paymentIntent,
              donationAmount: amount,
              isRecurring: false,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error processing donation:", error);
      toast.error(error.message || "An error occurred. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-shelter-charcoal py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-shelter-white mb-4">
            Support the Ministry
          </h1>
          <p className="text-lg text-shelter-gray max-w-2xl mx-auto">
            Shelter House Music is a Christian music ministry serving churches, artists, 
            and the local community. Your generous support helps provide the resources 
            needed to continue this important work.
          </p>
        </div>

        {/* How Your Support Helps Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-shelter-white text-center mb-8">
            How Your Support Helps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supplies Card */}
            <div className="bg-shelter-slate rounded-lg p-6 border border-shelter-slate hover:border-shelter-honey/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-shelter-honey/15 rounded-full flex items-center justify-center">
                    <FiHeart className="w-6 h-6 text-shelter-honey" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-shelter-white mb-2">
                    Supplies
                  </h3>
                  <p className="text-shelter-gray">
                    Supports day-to-day ministry needs, creative resources, and materials 
                    required for music production and outreach.
                  </p>
                </div>
              </div>
            </div>

            {/* Musical Equipment Card */}
            <div className="bg-shelter-slate rounded-lg p-6 border border-shelter-slate hover:border-shelter-honey/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-shelter-honey/15 rounded-full flex items-center justify-center">
                    <FiMusic className="w-6 h-6 text-shelter-honey" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-shelter-white mb-2">
                    Musical Equipment
                  </h3>
                  <p className="text-shelter-gray">
                    Helps maintain and upgrade instruments, audio equipment, and sound tools 
                    used in recording and church-focused projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Recording & Production Card */}
            <div className="bg-shelter-slate rounded-lg p-6 border border-shelter-slate hover:border-shelter-honey/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-shelter-honey/15 rounded-full flex items-center justify-center">
                    <FiTrendingUp className="w-6 h-6 text-shelter-honey" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-shelter-white mb-2">
                    Recording & Production Costs
                  </h3>
                  <p className="text-shelter-gray">
                    Covers studio time, mixing, mastering, and production services that allow 
                    us to produce high-quality worship and gospel music.
                  </p>
                </div>
              </div>
            </div>

            {/* Digital Distribution Card */}
            <div className="bg-shelter-slate rounded-lg p-6 border border-shelter-slate hover:border-shelter-honey/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-shelter-honey/15 rounded-full flex items-center justify-center">
                    <FiGlobe className="w-6 h-6 text-shelter-honey" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-shelter-white mb-2">
                    Digital Distribution & Ministry Reach
                  </h3>
                  <p className="text-shelter-gray">
                    Supports digital platforms, hosting, and distribution tools that help music 
                    reach churches, artists, and listeners beyond the local community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ministry Stewardship Section */}
        <div className="bg-shelter-slate rounded-lg p-8 mb-12 border border-shelter-slate">
          <h2 className="text-2xl font-bold text-shelter-white mb-4">
            Ministry Stewardship & Transparency
          </h2>
          <div className="space-y-3 text-shelter-gray">
            <p>
              Your support is voluntary and greatly appreciated. Every contribution helps 
              sustain and grow our ministry's mission to serve the Church through music.
            </p>
            <p>
              Shelter House Music is not operating as a traditional retail or e-commerce business. 
              We are a faith-based ministry dedicated to strengthening hearts and communities through 
              gospel-centered music and outreach.
            </p>
            <p className="text-shelter-honey font-medium">
              Thank you for partnering with us in this important work.
            </p>
          </div>
        </div>

        {/* Donation Form */}
        <form onSubmit={handleSubmit} className="bg-shelter-slate rounded-lg p-8 border border-shelter-slate">
          <h2 className="text-2xl font-bold text-shelter-white mb-6 text-center">
            Complete Your Donation
          </h2>

          {/* Donor Information */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-shelter-white mb-4">
              Your Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-shelter-white font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={donorInfo.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-shelter-charcoal border border-shelter-slate focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 text-shelter-white placeholder:text-shelter-gray rounded-lg"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-shelter-white font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={donorInfo.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-shelter-charcoal border border-shelter-slate focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 text-shelter-white placeholder:text-shelter-gray rounded-lg"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>

          {/* Suggested Amounts */}
          <div className="mb-6">
            <label className="block text-shelter-white font-medium mb-3">
              Select Amount
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {suggestedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    donationAmount === amount
                      ? "bg-shelter-honey text-shelter-charcoal"
                      : "bg-shelter-charcoal text-shelter-white border border-shelter-slate hover:border-shelter-honey"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <label className="block text-shelter-white font-medium mb-2">
              Or Enter Custom Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-shelter-gray text-lg">
                $
              </span>
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 bg-shelter-charcoal border border-shelter-slate focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 text-shelter-white placeholder:text-shelter-gray rounded-lg text-lg"
              />
            </div>
          </div>

          {/* Recurring Option */}
          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-5 h-5 text-shelter-honey focus:ring-shelter-honey focus:ring-2 border-shelter-slate rounded"
              />
              <span className="text-shelter-white">
                Make this a monthly gift
              </span>
            </label>
            <p className="text-shelter-gray text-sm mt-2 ml-8">
              Monthly giving provides consistent support for ongoing ministry operations
              {!user && (
                <span className="block mt-1 text-shelter-honey">
                  Note: You'll need to{" "}
                  <Link to="/login" className="underline hover:text-shelter-amber">
                    sign in
                  </Link>{" "}
                  to set up monthly support
                </span>
              )}
            </p>
          </div>

          {/* Card Element */}
          <div className="mb-8">
            <label className="block text-shelter-white font-medium mb-2">
              Payment Information *
            </label>
            <div className="bg-shelter-charcoal border border-shelter-slate rounded-lg p-4 focus-within:border-shelter-honey focus-within:ring-2 focus-within:ring-shelter-honey/20">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={processing || !stripe || (!donationAmount && !customAmount)}
            className="w-full bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber hover:scale-105 hover:shadow-lg active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 py-4 rounded-lg font-bold text-lg transition-all duration-200"
          >
            {processing ? "Processing..." : "Complete Donation"}
          </button>

          <p className="text-center text-shelter-gray text-sm mt-4">
            Secure payment processing powered by Stripe
          </p>
        </form>

        {/* Thank You Message */}
        <div className="text-center mt-12">
          <p className="text-shelter-gray italic">
            "Let each one give as he purposes in his heart, not grudgingly or of necessity; 
            for God loves a cheerful giver." — 2 Corinthians 9:7
          </p>
        </div>
      </div>
    </div>
  );
}

const SupportMinistry = () => {
  return (
    <Elements stripe={stripePromise}>
      <DonationForm />
    </Elements>
  );
};

export default SupportMinistry;
