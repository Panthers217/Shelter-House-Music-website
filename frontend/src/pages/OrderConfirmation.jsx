import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentIntent = location.state?.paymentIntent;

  if (!paymentIntent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-accent mb-4">No order found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary hover:bg-secondary text-accent rounded-lg font-semibold transition-all duration-300"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card-bg rounded-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="i-lucide-check-circle text-5xl text-green-500"></span>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-accent mb-2">Order Confirmed!</h1>
          <p className="text-text-secondary mb-6">Thank you for your purchase</p>

          {/* Order Details */}
          <div className="bg-background rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-bold text-accent mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Order ID:</span>
                <span className="text-text-primary font-mono">{paymentIntent.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Amount:</span>
                <span className="text-text-primary font-bold">
                  ${(paymentIntent.amount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Status:</span>
                <span className="text-green-500 font-semibold">
                  {paymentIntent.status === 'succeeded' ? 'Paid' : paymentIntent.status}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-background rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-bold text-accent mb-3">What's Next?</h2>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="i-lucide-mail text-primary mt-1"></span>
                <span>You'll receive a confirmation email shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="i-lucide-download text-primary mt-1"></span>
                <span>Digital items will be available for download in your email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="i-lucide-package text-primary mt-1"></span>
                <span>Physical items will be shipped to your address</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary hover:bg-secondary text-accent rounded-lg font-semibold transition-all duration-300"
            >
              Back to Homepage
            </button>
            <button
              onClick={() => navigate('/store')}
              className="px-6 py-3 bg-card-bg hover:bg-background text-text-primary rounded-lg font-semibold transition-all duration-300 border border-primary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
