# Artist Data Helper - Usage Examples

## Overview
The `artistDataHelper.js` module provides reusable functions to build artist data consistently across your application. This ensures that all components passing artist information to `ArtistOverview` use the same data structure.

## Functions Available

### 1. `buildArtistData(artist, dbSnapshot)`
Builds complete artist data for a single artist.

```jsx
import { buildArtistData } from '../utils/artistDataHelper';

const MyComponent = () => {
  const { dbSnapshot } = useApiData();
  const artist = dbSnapshot?.artists?.records[0];
  
  const artistData = buildArtistData(artist, dbSnapshot);
  
  // Navigate to artist page
  navigate(`/artist/${artistData.name}`, { state: { art: artistData } });
};
```

### 2. `buildMultipleArtistsData(artists, dbSnapshot)`
Builds artist data for multiple artists at once.

```jsx
import { buildMultipleArtistsData } from '../utils/artistDataHelper';

const ArtistList = () => {
  const { dbSnapshot } = useApiData();
  const dbArtists = dbSnapshot?.artists?.records || [];
  
  const artistsData = buildMultipleArtistsData(dbArtists, dbSnapshot);
  
  return (
    <div>
      {artistsData.map(artist => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
};
```

### 3. `getArtistDataById(artistId, dbSnapshot)`
Finds and builds artist data by ID.

```jsx
import { getArtistDataById } from '../utils/artistDataHelper';

const ArtistLink = ({ artistId }) => {
  const { dbSnapshot } = useApiData();
  const artistData = getArtistDataById(artistId, dbSnapshot);
  
  if (!artistData) return null;
  
  return (
    <Link 
      to={`/artist/${artistData.name}`}
      state={{ art: artistData }}
    >
      {artistData.name}
    </Link>
  );
};
```

### 4. `getArtistDataByName(artistName, dbSnapshot)`
Finds and builds artist data by name.

```jsx
import { getArtistDataByName } from '../utils/artistDataHelper';

const FeaturedArtist = () => {
  const { dbSnapshot } = useApiData();
  const artistData = getArtistDataByName('Luna Starlight', dbSnapshot);
  
  if (!artistData) return <div>Artist not found</div>;
  
  return (
    <div>
      <h2>{artistData.name}</h2>
      <p>{artistData.bio}</p>
      <div>Featured Tracks: {artistData.featured_tracks.length}</div>
    </div>
  );
};
```

## What Data is Built?

The helper functions build a complete artist object with:

- **Basic Info**: `id`, `name`, `img`, `bio`, `genre`, `artist_country`
- **Career Details**: `career_highlights`, `influences`
- **Featured Tracks**: Array of track objects with images and audio URLs
- **Social Media**: URLs for all platforms (Spotify, Instagram, Twitter, YouTube, Apple Music, TikTok, Facebook)
- **Stats**: `rating`, `monthly_listeners`, `albums_released`

## Featured Tracks Structure

Featured tracks are automatically built from the `promotional_tracks` table where `promote_track = 1`. Each track includes:

```javascript
{
  id: 1,
  title: "Track Title",
  promo_audio_url: "https://...",
  img: "https://...",  // From artist image or album cover
  artist_name: "Artist Name",
  // ... all other track fields
}
```

## SessionStorage Integration

When navigating to artist pages, store the data for page reloads:

```jsx
import { buildArtistData } from '../utils/artistDataHelper';

const handleArtistClick = (artist) => {
  const artistData = buildArtistData(artist, dbSnapshot);
  
  // Store for page reloads
  sessionStorage.setItem(`album:${artist.id}`, JSON.stringify(artistData));
  
  // Navigate with state
  navigate(`/artist/${encodeURIComponent(artistData.name)}`, {
    state: { art: artistData }
  });
};
```

## Components Using This Helper

Currently implemented in:
- ✅ `ArtistGallery.jsx`
- ✅ `ArtistPageLayoutComponents.jsx`

Can be easily added to:
- Search results
- Artist cards
- Featured artist sections
- Related artists
- Any component navigating to `ArtistOverview`
