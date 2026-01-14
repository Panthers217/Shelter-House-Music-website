# Shelter House Music Brand Colors Guide

## Brand Color Palette

All Shelter House Music brand colors are now consistently defined in both Tailwind and CSS variables.

### Color Definitions

| Color Name | Hex Value | Tailwind Class | CSS Variable | Usage |
|------------|-----------|----------------|--------------|-------|
| **Shelter White** | `#F5F5F2` | `shelter-white` | `--shelter-white` | Primary text on dark backgrounds |
| **Shelter Honey** | `#D4A24C` | `shelter-honey` | `--shelter-honey` | Primary CTA buttons, accents, links |
| **Shelter Amber** | `#B8872A` | `shelter-amber` | `--shelter-amber` | Hover states, secondary accents |
| **Shelter Charcoal** | `#1E1E1E` | `shelter-charcoal` | `--shelter-charcoal` | Main background, dark sections |
| **Shelter Slate** | `#2A2A2A` | `shelter-slate` | `--shelter-slate` | Cards, secondary backgrounds |
| **Shelter Gray** | `#8A8A85` | `shelter-gray` | `--shelter-gray` | Secondary text, muted text |
| **Shelter Olive** | `#6F7D5C` | `shelter-olive` | `--shelter-olive` | Use sparingly for success/info |

## Component Color Guidelines

### Backgrounds

```jsx
// Dark sections (primary)
<div className="bg-shelter-charcoal">

// Cards and secondary sections
<div className="bg-shelter-slate">

// Light sections (when needed)
<div className="bg-shelter-white">
```

### Text Colors

```jsx
// Primary text on dark backgrounds
<h1 className="text-shelter-white">

// Secondary/muted text on dark backgrounds
<p className="text-shelter-gray">

// Primary text on light backgrounds
<h1 className="text-shelter-charcoal">

// Accent text (eyebrows, labels, highlights)
<span className="text-shelter-honey">
```

### Buttons

#### Primary Button (Main CTA)
```jsx
<button className="bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber font-semibold">
  Click Me
</button>
```

#### Secondary Button (Outlined)
```jsx
// On dark sections
<button className="bg-transparent text-shelter-white border border-shelter-honey hover:bg-shelter-honey/20">
  Learn More
</button>

// On light sections
<button className="bg-transparent text-shelter-charcoal border border-shelter-honey hover:bg-shelter-honey/20">
  Learn More
</button>
```

#### Tertiary/Link Button
```jsx
<button className="bg-transparent text-shelter-honey hover:text-shelter-amber hover:underline">
  Read More →
</button>
```

### Cards

#### Card on Dark Section
```jsx
<div className="bg-shelter-slate border border-shelter-slate rounded-lg p-6 hover:border-shelter-honey/50">
  <h3 className="text-shelter-white font-bold mb-2">Card Title</h3>
  <p className="text-shelter-gray">Card description text goes here.</p>
</div>
```

#### Card on Light Section
```jsx
<div className="bg-shelter-white border border-shelter-gray/20 rounded-lg p-6 hover:border-shelter-honey/50">
  <h3 className="text-shelter-charcoal font-bold mb-2">Card Title</h3>
  <p className="text-shelter-gray">Card description text goes here.</p>
</div>
```

### Form Inputs

#### Dark Section Input
```jsx
<input 
  type="text"
  className="bg-shelter-charcoal border border-shelter-slate focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 text-shelter-white placeholder:text-shelter-gray"
  placeholder="Enter text..."
/>
```

#### Light Section Input
```jsx
<input 
  type="text"
  className="bg-shelter-white border border-shelter-gray/30 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 text-shelter-charcoal placeholder:text-shelter-gray"
  placeholder="Enter text..."
/>
```

### Links

```jsx
// Navigation links
<Link to="/" className="text-shelter-white hover:text-shelter-honey transition-colors">
  Home
</Link>

// Footer links
<Link to="/about" className="text-shelter-gray hover:text-shelter-honey transition-colors">
  About
</Link>

// In-text links
<a href="#" className="text-shelter-honey hover:text-shelter-amber underline">
  Read more
</a>
```

### Borders and Dividers

```jsx
// On dark backgrounds
<div className="border-t border-shelter-slate"></div>

// On light backgrounds
<div className="border-t border-shelter-gray/20"></div>

// Accent borders
<div className="border border-shelter-honey/30"></div>
```

### Focus Rings

```jsx
// All interactive elements should use honey for focus
<button className="focus:ring-2 focus:ring-shelter-honey focus:outline-none">
  Button
</button>
```

### Badges and Labels

```jsx
// Featured badge
<span className="bg-shelter-honey/15 text-shelter-honey border border-shelter-honey/30 px-3 py-1 rounded-full text-sm">
  Featured
</span>

// Status badge
<span className="bg-shelter-olive/15 text-shelter-olive border border-shelter-olive/30 px-3 py-1 rounded-full text-sm">
  Active
</span>
```

## Section Examples

### Hero Section
```jsx
<section className="bg-shelter-charcoal">
  {/* Eyebrow/Label */}
  <span className="text-shelter-honey text-sm uppercase tracking-wide">
    Welcome
  </span>
  
  {/* Main Headline */}
  <h1 className="text-shelter-white text-5xl font-bold">
    Experience the Soul of Music
  </h1>
  
  {/* Subheading */}
  <p className="text-shelter-gray text-lg">
    Discover amazing artists and their stories
  </p>
  
  {/* Primary CTA */}
  <button className="bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber px-8 py-3 rounded-lg font-semibold">
    Explore Music
  </button>
  
  {/* Secondary CTA */}
  <button className="bg-transparent text-shelter-white border border-shelter-honey hover:bg-shelter-honey/20 px-8 py-3 rounded-lg">
    Learn More
  </button>
</section>
```

### Footer
```jsx
<footer className="bg-shelter-charcoal">
  {/* Brand name */}
  <span className="text-shelter-honey text-2xl font-bold">
    Shelter House Music
  </span>
  
  {/* Section headings */}
  <h3 className="text-shelter-honey font-bold">Quick Links</h3>
  
  {/* Links */}
  <Link to="/" className="text-shelter-white hover:text-shelter-honey">
    Home
  </Link>
  
  {/* Divider */}
  <div className="border-t border-shelter-slate"></div>
  
  {/* Copyright */}
  <p className="text-shelter-gray text-sm">
    © 2024 Shelter House Music
  </p>
</footer>
```

## DO NOT Use

❌ Avoid introducing new colors unless explicitly required
❌ Avoid using hardcoded hex values like `#aa2a46`, `#fffced`, `#f7c900`
❌ Avoid using arbitrary Tailwind colors like `red-500`, `blue-600`, `green-500` (except for status indicators)
❌ Avoid large areas filled with honey/amber (gold should be accent only)

## Files Updated

The following files have been updated with Shelter House Music brand colors:

### Configuration Files
- `/frontend/tailwind.config.js` - Added `shelter.*` color definitions
- `/frontend/src/index.css` - Updated CSS variables and scrollbar styles

### Core Components
- `/frontend/src/components/HomeBanner.jsx` - Hero section buttons and text
- `/frontend/src/components/Footer.jsx` - Footer backgrounds, links, and text
- `/frontend/src/components/ResponsiveNavbar.jsx` - Navigation colors, cart icon, user profile
- `/frontend/src/components/Contact.jsx` - Form inputs, buttons, contact info cards

### Pages
- `/frontend/src/pages/Faq.jsx` - Search, filters, question cards, buttons
- `/frontend/src/pages/Terms.jsx` - Background, card, content styling

## Next Steps

When adding new components or features:

1. **Always use Tailwind classes**: `bg-shelter-honey`, `text-shelter-white`, etc.
2. **Follow the component mapping** in this guide
3. **Test contrast** - ensure text is readable on backgrounds
4. **Use hover states** - `hover:bg-shelter-amber`, `hover:text-shelter-honey`
5. **Add focus rings** - `focus:ring-2 focus:ring-shelter-honey`

## Questions?

Refer to the original brand color specification at the top of this document for the complete component mapping and design rules.
