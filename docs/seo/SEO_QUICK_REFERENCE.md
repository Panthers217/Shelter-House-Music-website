# SEO Quick Reference - Soul Felt Music

## 🚀 Key Commands

```bash
# Development
npm run dev

# Build with SEO (includes sitemap generation + pre-rendering)
npm run build

# Preview built site
npm run preview

# Generate sitemap only
npm run generate-sitemap
```

## ✅ What's Implemented

### 1. React Helmet Async
- Dynamic meta tags per page
- SEO component: `src/components/SEO.jsx`
- Usage: `<SEO title="..." description="..." keywords="..." />`

### 2. Pre-rendering (react-snap)
- Generates static HTML for all routes
- Runs automatically after build
- Configured routes in `package.json` → `reactSnap.include`

### 3. Sitemap
- Auto-generated XML sitemap
- Located: `public/sitemap.xml`
- Includes all static routes with priorities

### 4. Meta Tags
- Enhanced `index.html` with default meta tags
- Open Graph (Facebook) support
- Twitter Card support
- Canonical URLs

### 5. robots.txt
- Allows crawlers
- Disallows admin routes
- Points to sitemap

## 📄 SEO Component Props

```jsx
<SEO 
  title="Page Title"                    // Required
  description="Page description"        // Required
  keywords="keyword1, keyword2"         // Optional
  url="https://soulfeltmusic.com/page" // Optional
  image="https://example.com/og.jpg"   // Optional (for OG)
  type="website"                        // Optional (website/article)
  
  // For music-specific pages:
  artist={{ name, image_url, bio, genre, id }}
  album={{ title, cover_image_url, description, artist_name, release_date, id }}
  track={{ title, artist_name, duration, album_title, id }}
/>
```

## 🎯 Pages with SEO

- ✅ Home (`/pages/Home.jsx`)
- ✅ Music (`/components/Music.jsx`)
- ✅ Artist Listing (`/components/ArtistPageLayoutComponents.jsx`)
- ⚠️ Individual Artist Pages (needs implementation)
- ⚠️ Store (needs implementation)
- ⚠️ About (needs implementation)
- ⚠️ Contact (needs implementation)
- ⚠️ Other pages (needs implementation)

## 🔧 Configuration Files

- `package.json` - Build scripts and react-snap config
- `frontend/index.html` - Default meta tags
- `frontend/public/robots.txt` - Crawler instructions
- `frontend/public/sitemap.xml` - Generated sitemap
- `frontend/scripts/generate-sitemap.js` - Sitemap generator
- `frontend/src/main.jsx` - Hydration setup
- `frontend/src/components/SEO.jsx` - SEO component

## 📊 Testing Tools

**Meta Tags**:
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator

**Structured Data**:
- Google: https://search.google.com/test/rich-results

**Performance**:
- Lighthouse (Chrome DevTools)
- PageSpeed Insights

## 🐛 Troubleshooting

**Pre-rendering fails:**
- Check `reactSnap.include` array includes route
- Ensure no blocking API calls during initial render
- Check console for errors

**Meta tags not showing:**
- Verify SEO component is imported and used
- Check browser dev tools → Elements → `<head>`
- View page source (should see meta tags in HTML)

**Sitemap not updating:**
- Run `npm run generate-sitemap`
- Check `frontend/public/sitemap.xml` exists
- Verify it's copied to `dist` folder after build

## 📈 Next Steps

1. Add SEO to remaining pages (Store, About, Contact, etc.)
2. Implement dynamic artist/album URLs in sitemap
3. Add actual Open Graph images
4. Update domain URLs before deployment
5. Submit sitemap to search engines after launch
