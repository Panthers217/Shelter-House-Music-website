import React, { useState } from "react";
import axios from "axios";

const NewsletterSubscription = ({ 
  title = "Shelter House Music Newsletter",
  description = "Subscribe to our newsletter for the latest updates.",
  containerClassName = "flex-1 flex flex-col md:ml-8",
  inputClassName = "rounded-md px-4 py-2 bg-shelter-charcoal text-shelter-white placeholder:text-shelter-gray font-semibold focus:outline-none focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 border border-shelter-honey/20",
  buttonClassName = "rounded-full border border-shelter-honey text-shelter-honey py-2 transition hover:bg-shelter-honey hover:text-shelter-charcoal",
  unsubscribeButtonClassName = "rounded-full border border-red-400 text-red-400 py-2 transition hover:bg-red-400 hover:text-white",
  showTitle = true,
  showDescription = true
}) => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");

    // Basic email validation
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setFeedback("Please enter a valid email address.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/newsletter/subscribe`,
        { email }
      );

      if (response.data.alreadySubscribed) {
        setFeedback("You're already subscribed to our newsletter!");
      } else {
        setFeedback("Thank you for subscribing!");
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setFeedback(
        error.response?.data?.error || "Failed to subscribe. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnsubscribeClick = (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setFeedback("Please enter a valid email address.");
      return;
    }

    setShowUnsubscribeModal(true);
  };

  const handleUnsubscribeConfirm = async () => {
    setSubmitting(true);
    setFeedback("");
    setShowUnsubscribeModal(false);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/newsletter/unsubscribe`,
        { email }
      );

      setFeedback("Successfully unsubscribed from newsletter.");
      setEmail("");
    } catch (error) {
      console.error("Newsletter unsubscribe error:", error);
      setFeedback(
        error.response?.data?.error || "Failed to unsubscribe. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnsubscribeCancel = () => {
    setShowUnsubscribeModal(false);
  };

  return (
    <>
      <div className={containerClassName}>
        {showTitle && (
          <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white mb-2">
            {title}
          </div>
        )}
        {showDescription && (
          <p className="mb-3 text-shelter-gray">
            {description}
          </p>
        )}
        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClassName}
            disabled={submitting}
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              onClick={handleSubscribe}
              className={buttonClassName}
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Subscribe"}
            </button>
            {showUnsubscribe && (
              <button
                type="button"
                onClick={handleUnsubscribeClick}
                className={unsubscribeButtonClassName}
                disabled={submitting}
              >
                Unsubscribe
              </button>
            )}
          </div>
          <div className="text-xs text-shelter-gray mt-1">
            Want to unsubscribe?{" "}
            <button
              type="button"
              onClick={() => setShowUnsubscribe(!showUnsubscribe)}
              className="text-shelter-honey hover:text-shelter-amber hover:underline focus:underline"
            >
              Click here
            </button>
          </div>
          {feedback && (
            <div
              className={`text-sm mt-1 ${
                feedback.includes("Thank") || feedback.includes("Successfully")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {feedback}
            </div>
          )}
        </form>
      </div>

      {/* Unsubscribe Confirmation Modal */}
      {showUnsubscribeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-shelter-slate rounded-lg shadow-xl max-w-md w-full p-6 border border-shelter-honey/30 ring-1 ring-shelter-honey/20">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white mb-4">
              Confirm Unsubscribe
            </h3>
            <p className="text-shelter-gray mb-6">
              Are you sure you want to unsubscribe <strong className="text-shelter-honey">{email}</strong> from our newsletter?
              <br />
              <br />
              You will no longer receive updates about new music, events, and exclusive content.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleUnsubscribeCancel}
                className="flex-1 px-4 py-2 rounded-full border border-shelter-gray text-shelter-white hover:bg-shelter-charcoal transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUnsubscribeConfirm}
                className="flex-1 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                Unsubscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterSubscription;
