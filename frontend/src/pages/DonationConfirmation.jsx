import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { FiCheckCircle, FiHeart, FiCalendar } from "react-icons/fi";

const DonationConfirmation = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  
  // Get state passed from navigation (for direct payment flow)
  const { isRecurring, donationAmount, subscriptionId, nextBillingDate } = location.state || {};

  useEffect(() => {
    if (sessionId || subscriptionId) {
      // Optionally fetch donation details from backend
      // For now, we'll just show a success message
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [sessionId, subscriptionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-shelter-charcoal flex items-center justify-center">
        <div className="text-shelter-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shelter-charcoal py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-shelter-slate rounded-lg p-8 md:p-12 text-center border border-shelter-slate">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-shelter-honey/15 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-12 h-12 text-shelter-honey" />
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-shelter-white mb-4">
            {isRecurring ? "Monthly Support Activated!" : "Thank You for Your Support!"}
          </h1>
          
          <p className="text-lg text-shelter-gray mb-8">
            {isRecurring 
              ? `Your monthly gift of $${donationAmount?.toFixed(2)} helps Shelter House Music continue serving churches, artists, and the local community.`
              : "Your generous gift helps Shelter House Music continue serving churches, artists, and the local community through gospel-centered music and ministry."
            }
          </p>

          {/* Confirmation Details */}
          {(sessionId || subscriptionId) && (
            <div className="bg-shelter-charcoal rounded-lg p-6 mb-8">
              <p className="text-shelter-gray text-sm mb-2">
                Confirmation Number
              </p>
              <p className="text-shelter-white font-mono text-sm break-all">
                {sessionId || subscriptionId}
              </p>
            </div>
          )}

          {/* Next Billing Date for Recurring */}
          {isRecurring && nextBillingDate && (
            <div className="bg-shelter-charcoal rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <FiCalendar className="text-shelter-honey text-xl" />
                <div className="text-left">
                  <p className="text-shelter-gray text-sm">Next Billing Date</p>
                  <p className="text-shelter-white font-semibold">
                    {new Date(nextBillingDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-shelter-charcoal rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-shelter-white mb-4 flex items-center gap-2">
              <FiHeart className="text-shelter-honey" />
              What Happens Next?
            </h2>
            <ul className="space-y-3 text-shelter-gray">
              <li className="flex items-start gap-2">
                <span className="text-shelter-honey mt-1">•</span>
                <span>You will receive an email receipt for your donation shortly</span>
              </li>
              {isRecurring && (
                <li className="flex items-start gap-2">
                  <span className="text-shelter-honey mt-1">•</span>
                  <span>Your card will be charged automatically each month on your billing date</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="text-shelter-honey mt-1">•</span>
                <span>Your support will be used to fund ministry operations, equipment, and outreach</span>
              </li>
              {isRecurring && (
                <li className="flex items-start gap-2">
                  <span className="text-shelter-honey mt-1">•</span>
                  <span>You can manage or cancel your subscription anytime from your account</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="text-shelter-honey mt-1">•</span>
                <span>We are grateful for your partnership in this important work</span>
              </li>
            </ul>
          </div>

          {/* Scripture */}
          <div className="mb-8">
            <p className="text-shelter-gray italic">
              "Each of you should give what you have decided in your heart to give, 
              not reluctantly or under compulsion, for God loves a cheerful giver."
            </p>
            <p className="text-shelter-honey text-sm mt-2">
              — 2 Corinthians 9:7
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber hover:scale-105 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Return Home
            </Link>
            {isRecurring && (
              <Link
                to="/manage-subscriptions"
                className="bg-transparent text-shelter-white border border-shelter-honey hover:bg-shelter-honey/20 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Manage Subscription
              </Link>
            )}
            <Link
              to="/music"
              className="bg-transparent text-shelter-white border border-shelter-honey hover:bg-shelter-honey/20 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Explore Music
            </Link>
          </div>
        </div>

        {/* Additional Support Section */}
        <div className="mt-8 text-center">
          <p className="text-shelter-gray mb-4">
            Want to support the ministry in other ways?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="text-shelter-honey hover:text-shelter-amber hover:underline"
            >
              Contact Us
            </Link>
            <span className="hidden sm:inline text-shelter-gray">•</span>
            <Link
              to="/about"
              className="text-shelter-honey hover:text-shelter-amber hover:underline"
            >
              Learn More About Our Ministry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationConfirmation;
