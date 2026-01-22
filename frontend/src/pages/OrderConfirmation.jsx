import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentIntent = location.state?.paymentIntent;

  if (!paymentIntent) {
    return (
      <div className="min-h-screen bg-shelter-charcoal flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-shelter-white mb-4">No order found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-shelter-honey hover:bg-shelter-amber text-shelter-charcoal rounded-lg font-semibold transition-all duration-300 focus:ring-2 focus:ring-shelter-honey focus:outline-none"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shelter-charcoal py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-shelter-slate rounded-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-shelter-olive/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-shelter-olive/30">
            <span className="i-lucide-check-circle text-5xl text-shelter-olive"></span>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-shelter-white mb-2">Order Confirmed!</h1>
          <p className="text-shelter-gray mb-6">Thank you for your support</p>

          {/* Order Details */}
          <div className="bg-shelter-charcoal rounded-lg p-6 mb-6 text-left border border-shelter-slate">
            <h2 className="text-xl font-bold text-shelter-honey mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-shelter-gray">Order ID:</span>
                <span className="text-shelter-white font-mono">{paymentIntent.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-shelter-gray">Amount:</span>
                <span className="text-shelter-white font-bold">
                  ${(paymentIntent.amount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-shelter-gray">Status:</span>
                <span className="text-shelter-olive font-semibold">
                  {paymentIntent.status === 'succeeded' ? 'Paid' : paymentIntent.status}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-shelter-charcoal rounded-lg p-6 mb-6 text-left border border-shelter-slate">
            <h2 className="text-xl font-bold text-shelter-honey mb-3">What's Next?</h2>
            <ul className="space-y-2 text-shelter-gray">
              <li className="flex items-start gap-2">
                <span className="i-lucide-mail text-shelter-honey mt-1"></span>
                <span>You'll receive a confirmation email shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="i-lucide-download text-shelter-honey mt-1"></span>
                <span>Digital items will be available for download in your email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="i-lucide-package text-shelter-honey mt-1"></span>
                <span>Physical items will be shipped to your address</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-shelter-honey hover:bg-shelter-amber text-shelter-charcoal rounded-lg font-semibold transition-all duration-300 focus:ring-2 focus:ring-shelter-honey focus:outline-none"
            >
              Back to Homepage
            </button>
            <button
              onClick={() => navigate('/store')}
              className="px-6 py-3 bg-transparent hover:bg-shelter-honey/20 text-shelter-white rounded-lg font-semibold transition-all duration-300 border border-shelter-honey focus:ring-2 focus:ring-shelter-honey focus:outline-none"
            >
              Continue Supporting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
