# Artist-Specific Store Implementation

## Overview
This document describes the implementation of artist-specific store pages that allow each artist to have their own dedicated store showing only their products (albums and merchandise).

## Changes Made

### 1. ArtistStore Component (`frontend/src/components/ArtistStore.jsx`)

#### Added Props
- `artistId` (optional): The artist ID to filter products by. If not provided, shows all products (general store).
- `artistName` (optional): The artist's name for display. Defaults to "Artist".

#### Product Filtering
```javascript
// Albums filtered by artist_id
const filteredAlbums = artistId 
  ? dbSnapshot.albums.records.filter(album => album.artist_id === parseInt(artistId))
  : dbSnapshot.albums.records;

// Merchandise filtered by artist_id
const filteredMerch = artistId
  ? dbSnapshot.merchandise.records.filter(merch => merch.artist_id === parseInt(artistId))
  : dbSnapshot.merchandise.records;
```

#### Dynamic Store Name
- When `artistId` is provided: `"{artistName} Store"`
- When no `artistId`: `"Luna Starlight Store"` (default)

#### Dynamic Header
- Title: `"{artistName} Official Store"` (when artistId provided)
- Description: `"Support {artistName} directly by purchasing official music releases and exclusive merchandise..."`

#### Demo Products
- Demo products only show when no `artistId` is provided (general store only)

### 2. App.jsx Routing (`frontend/src/App.jsx`)

#### New Route
```javascript
<Route path="/store/:artistId" element={<ArtistStoreWrapper />} />
```

#### ArtistStoreWrapper Component
- Extracts `artistId` from URL params using `useParams()`
- Fetches artist name from `dbSnapshot.artists.records`
- Passes both `artistId` and `artistName` to `ArtistStore` component

#### Imports Added
```javascript
import { Navigate, useParams } from 'react-router-dom';
import { useApiData } from './context/ApiDataContext';
```

### 3. ArtistOverview Component (`frontend/src/components/ArtistOverview.jsx`)

#### GetMusic Component Updates
- Added `artistId` prop to function signature
- Added `useNavigate` hook
- Button now navigates to artist-specific store:
  ```javascript
  onClick={() => navigate(`/store/${artistId}`)}
  ```
- Added transition effect to button: `transition-colors`

#### GetMusic Rendering
- Passed `artistId={album?.id}` prop when rendering GetMusic component

#### Imports Added
```javascript
import { useParams, useLocation, useNavigate } from "react-router-dom";
```

## Database Schema

Both tables already have the necessary `artist_id` foreign key column:

### Albums Table
- `artist_id` (INT) - References `artists.id`

### Merchandise Table
- `artist_id` (INT) - References `artists.id`

## User Flow

1. User visits an artist's overview page at `/artist/:id`
2. User clicks "Stream & Purchase" button in the GetMusic section
3. User is navigated to `/store/:artistId`
4. Store page shows only products belonging to that artist
5. Store name and header are customized with artist's name

## Backwards Compatibility

- General store route `/store` still works and shows all products
- No breaking changes to existing functionality
- If `artistId` is not provided, component behaves like original store

## Testing Checklist

- [ ] Verify `/store` route shows all products
- [ ] Verify `/store/:artistId` shows only artist's products
- [ ] Verify store name changes based on artist
- [ ] Verify "Stream & Purchase" button navigates correctly
- [ ] Verify cart functionality works on artist-specific stores
- [ ] Verify tab filtering (All Products, Music, Merchandise) works
- [ ] Verify demo products don't appear on artist-specific stores
- [ ] Test with multiple artists to ensure filtering is accurate

## Future Enhancements

1. Add fallback/empty state when artist has no products
2. Add breadcrumb navigation from artist store back to artist page
3. Add SEO meta tags for each artist store
4. Consider adding artist banner/header image to store page
5. Add "Back to Artist" button in store navigation
