# 💼 Demo Banner & Badge - Usage Guide

These components help communicate to potential employers that this is a portfolio demonstration site.

---

## 📦 Components Created

### 1. `DemoBanner.jsx`

Full-width banner with three variants for different contexts.

### 2. `DemoBadge.jsx`

Small inline badge for use within content.

---

## 🎨 DemoBanner Variants

### Default Banner (Recommended for Home Page)

```jsx
import DemoBanner from "./components/DemoBanner";

<DemoBanner
  onClose={() => setShowBanner(false)} // Optional: allow dismissal
/>;
```

**Use case:** Top of home page or main landing area
**Features:**

- Eye-catching blue gradient
- Lists key demo content types
- Professional messaging for employers
- Dismissible

---

### Compact Banner (For Internal Pages)

```jsx
<DemoBanner variant="compact" onClose={() => setShowBanner(false)} />
```

**Use case:** Music page, Store page, Artist pages
**Features:**

- Minimal space usage
- Simple reminder message
- Easy to dismiss
- Doesn't distract from content

---

### Detailed Banner (For About/Portfolio Pages)

```jsx
<DemoBanner
  variant="detailed"
  showAdminInfo={true} // Shows what admin features exist
  onClose={() => setShowBanner(false)}
/>
```

**Use case:** About page, dedicated "Portfolio" section
**Features:**

- Comprehensive technology stack details
- Expandable technical information
- Lists admin features (even though not accessible)
- Perfect for technical recruiters

---

## 🏷️ DemoBadge Usage

### Next to Prices

```jsx
<div className="flex items-center gap-2">
  <span className="text-2xl font-bold">${price}</span>
  <DemoBadge text="Demo Price" />
</div>
```

### Next to Artist Names

```jsx
<h1 className="text-4xl font-bold flex items-center gap-3">
  {artistName}
  <DemoBadge variant="subtle" />
</h1>
```

### In Product Cards

```jsx
<div className="product-card">
  <img src={image} alt={title} />
  <div className="flex justify-between items-center">
    <h3>{title}</h3>
    <DemoBadge variant="outline" text="Sample" />
  </div>
</div>
```

---

## 📍 Recommended Placement

### High Priority (Add These First)

1. **Home Page** - Top of page

   ```jsx
   <DemoBanner onClose={() => setShowBanner(false)} />
   ```

2. **Store/Merchandise Page** - Above products

   ```jsx
   <DemoBanner variant="compact" />
   ```

3. **Artist Pages** - Below hero section
   ```jsx
   <DemoBanner variant="compact" />
   ```

### Medium Priority

4. **Music Page** - Top of music catalog

   ```jsx
   <DemoBanner variant="compact" />
   ```

5. **About Page** - Showcase technical details

   ```jsx
   <DemoBanner variant="detailed" showAdminInfo={true} />
   ```

6. **Checkout Page** - Before payment form
   ```jsx
   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
     <p className="text-sm text-blue-900">
       <strong>Demo Mode:</strong> This checkout process is fully functional but
       uses Stripe test mode. No real charges will be made.
     </p>
   </div>
   ```

### Optional (Use DemoBadge)

7. **Individual Product Cards** - Add badge to titles
8. **Artist Cards** - Small badge in corner
9. **Album Covers** - Subtle badge overlay

---

## 💡 Implementation Examples

### Example 1: Home Page with Dismissible Banner

```jsx
import { useState, useEffect } from "react";
import DemoBanner from "./components/DemoBanner";

function Home() {
  const [showBanner, setShowBanner] = useState(true);

  // Optional: Remember dismissal in localStorage
  useEffect(() => {
    const dismissed = localStorage.getItem("demoBannerDismissed");
    if (dismissed) setShowBanner(false);
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("demoBannerDismissed", "true");
  };

  return (
    <div>
      {showBanner && <DemoBanner onClose={handleDismiss} />}
      {/* Rest of home page */}
    </div>
  );
}
```

---

### Example 2: Store Page with Persistent Compact Banner

```jsx
import DemoBanner from "./components/DemoBanner";

function Store() {
  return (
    <div>
      <DemoBanner variant="compact" />

      <div className="container mx-auto px-4 py-8">
        <h1>Merchandise Store</h1>
        {/* Store content */}
      </div>
    </div>
  );
}
```

---

### Example 3: Product Card with Badge

```jsx
import DemoBadge from "./components/DemoBadge";

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <img src={product.image} alt={product.name} />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{product.name}</h3>
          <DemoBadge variant="outline" text="Sample" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">${product.price}</span>
          <span className="text-sm text-gray-500 line-through">
            ${product.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
```

---

### Example 4: Artist Page with Info

```jsx
import DemoBanner from "./components/DemoBanner";

function ArtistPage({ artist }) {
  return (
    <div>
      {/* Hero Section */}
      <div className="artist-hero">
        <h1>{artist.name}</h1>
      </div>

      {/* Demo Notice */}
      <div className="container mx-auto px-4 -mt-4">
        <DemoBanner variant="compact" />
      </div>

      {/* Artist Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Albums, tracks, etc. */}
      </div>
    </div>
  );
}
```

---

### Example 5: About Page - Technical Showcase

```jsx
import DemoBanner from "./components/DemoBanner";

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About This Project</h1>

      {/* Full technical details for employers */}
      <DemoBanner variant="detailed" showAdminInfo={true} />

      <div className="mt-8">{/* Additional about content */}</div>
    </div>
  );
}
```

---

## 🎨 Customization Options

### Change Colors

Edit `DemoBanner.jsx` to match your brand:

```jsx
// Current: Blue theme
className = "bg-gradient-to-r from-blue-500 to-indigo-600";

// Alternative: Purple theme
className = "bg-gradient-to-r from-purple-500 to-pink-600";

// Alternative: Green theme
className = "bg-gradient-to-r from-green-500 to-teal-600";
```

### Add Your Portfolio Link

```jsx
<div className="mt-4">
  <a
    href="https://yourportfolio.com"
    className="text-sm text-blue-100 hover:text-white underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    View More Projects →
  </a>
</div>
```

---

## ✅ Quick Start Checklist

- [ ] Import DemoBanner component
- [ ] Add default banner to home page (top)
- [ ] Add compact banner to store page
- [ ] Add compact banner to music page
- [ ] Add detailed banner to about page (optional)
- [ ] Test dismissal functionality
- [ ] Test responsive display on mobile
- [ ] Review messaging for clarity

---

## 🔍 What Employers Will See

### First Impression (Home Page)

✅ "This is a professional portfolio demonstration"
✅ Clear listing of technologies used
✅ Polished, dismissible banner design

### Navigation (Internal Pages)

✅ Subtle reminders about demo content
✅ Non-intrusive compact banners
✅ Consistent messaging throughout

### Technical Details (About/Portfolio)

✅ Full technology stack breakdown
✅ List of admin features (even if not accessible)
✅ Demonstrates documentation skills

---

## 📞 Need Help?

The components are self-contained and work with your existing Tailwind CSS setup. No additional dependencies needed!
