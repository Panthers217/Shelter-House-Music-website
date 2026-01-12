export default function LegalTab({ settings, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Legal & Terms
      </h2>

      <div>
        <label className="block text-accent font-medium mb-2">
          Terms of Service
          <span className="text-sm text-text-secondary ml-2">
            (Supports HTML formatting)
          </span>
        </label>
        <textarea
          value={settings.terms_of_service || ""}
          onChange={(e) =>
            handleInputChange("terms_of_service", e.target.value)
          }
          rows={20}
          placeholder="Enter your Terms of Service content here. You can use HTML tags for formatting."
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
        />
        <p className="text-sm text-text-secondary mt-2">
          💡 Tip: Use HTML tags like &lt;h1&gt;, &lt;h2&gt;, &lt;p&gt;,
          &lt;ul&gt;, &lt;li&gt; for formatting. This content will be
          displayed on the /terms page.
        </p>
      </div>
    </div>
  );
}
