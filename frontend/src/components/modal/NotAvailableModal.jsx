import React from 'react';

function NotAvailableModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#1d1e26] to-[#16171d] rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-[#aa2a46]/30">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-[#aa2a46]/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#aa2a46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-[#fffced] text-center mb-2">
          Not Available
        </h2>
        <p className="text-white/70 text-center mb-6">
          Sorry, this album or track is not available for purchase at this time.
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-[#aa2a46] text-[#fffced] rounded-xl font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-all duration-300 shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default NotAvailableModal;
