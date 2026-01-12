import React, { useState, useEffect } from 'react'

export default function WelcomeToast() {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    // Show toast after a short delay on first load
    const timer = setTimeout(() => {
      setShowToast(true)
    }, 2000)

    // Auto-hide toast after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowToast(false)
    }, 10000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!showToast) return null

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-slide-in-up">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl border border-white/20 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold mb-1">👋 Welcome, Employer!</p>
            <p className="text-sm text-white/90">
              Click the <span className="font-bold">folder icon below</span> to view the complete project structure
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Animated Arrow Pointing Down */}
        <div className="absolute -bottom-3 right-8 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 16l-6-6h12l-6 6z" />
          </svg>
        </div>
      </div>
    </div>
  )
}