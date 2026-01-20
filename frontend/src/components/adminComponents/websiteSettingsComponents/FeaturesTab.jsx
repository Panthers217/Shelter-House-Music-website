export default function FeaturesTab({ settings, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Feature Toggles
      </h2>
      <p className="text-text-secondary mb-6">
        Enable or disable features across your website
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            key: "enable_merchandise",
            label: "Ministry Resources",
            desc: "Show ministry resources section",
          },
          {
            key: "enable_videos",
            label: "Videos",
            desc: "Show videos section",
          },
        //   {
        //     key: "enable_artist_profiles",
        //     label: "Artist Profiles",
        //     desc: "Show artist pages",
        //   },
          {
            key: "enable_newsletter",
            label: "Newsletter",
            desc: "Newsletter signup",
          },
        //   {
        //     key: "enable_cart",
        //     label: "Shopping Cart",
        //     desc: "Cart functionality",
        //   },
          {
            key: "enable_user_accounts",
            label: "User Accounts",
            desc: "User registration/login",
          },
        //   {
        //     key: "enable_promotional_tracks",
        //     label: "Promotional Tracks",
        //     desc: "Show promo tracks",
        //   },
        //   {
        //     key: "enable_promotional_videos",
        //     label: "Promotional Videos",
        //     desc: "Show promo videos",
        //   },
          {
            key: "enable_stripe",
            label: "Stripe Payments",
            desc: "Enable Stripe checkout",
          },
        ].map((feature) => (
          <div
            key={feature.key}
            className="flex items-center justify-between p-4 bg-background rounded-lg"
          >
            <div className="flex-1">
              <label className="block text-accent font-medium">
                {feature.label}
              </label>
              <p className="text-text-secondary text-sm">
                {feature.desc}
              </p>
            </div>
            <button
              onClick={() =>
                handleInputChange(feature.key, !settings[feature.key])
              }
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                settings[feature.key] ? "bg-green-600" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                  settings[feature.key]
                    ? "translate-x-7"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
