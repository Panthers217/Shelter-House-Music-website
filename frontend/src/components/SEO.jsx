import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Soul Felt Music - Experience the Soul of Music',
  description = 'Discover and stream soulful music from talented artists. Explore albums, tracks, and exclusive content at Soul Felt Music.',
  keywords = 'soul music, music streaming, albums, tracks, artists, ministry resources, christian music',
  image,
  url,
  type = 'website',
  artist,
  album,
  track,
  schemaData
}) => {
  // Get site URL from environment variable or default
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://shelterhousemusic.com';
  const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Shelter House Music';
  
  // Use environment-based URLs
  const defaultImage = `${SITE_URL}/og-image.jpg`;
  const pageUrl = url || SITE_URL;
  const ogImage = image || defaultImage;
  
  const siteTitle = SITE_NAME;
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  // Construct schema.org structured data
  const getSchemaData = () => {
    if (schemaData) return schemaData;

    // Default organization schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [
        // Add social media links here
      ]
    };

    // Artist schema
    if (artist) {
      return {
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        name: artist.name,
        image: artist.image_url,
        description: artist.bio,
        genre: artist.genre,
        url: `${SITE_URL}/artist/${artist.id}`
      };
    }

    // Album schema
    if (album) {
      return {
        '@context': 'https://schema.org',
        '@type': 'MusicAlbum',
        name: album.title,
        image: album.cover_image_url,
        description: album.description,
        byArtist: {
          '@type': 'MusicGroup',
          name: album.artist_name
        },
        datePublished: album.release_date,
        url: `${SITE_URL}/album/${album.id}`
      };
    }

    // Track schema
    if (track) {
      return {
        '@context': 'https://schema.org',
        '@type': 'MusicRecording',
        name: track.title,
        byArtist: {
          '@type': 'MusicGroup',
          name: track.artist_name
        },
        duration: track.duration,
        inAlbum: track.album_title ? {
          '@type': 'MusicAlbum',
          name: track.album_title
        } : undefined,
        url: `${SITE_URL}/track/${track.id}`
      };
    }

    return organizationSchema;
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(getSchemaData())}
      </script>
    </Helmet>
  );
};

export default SEO;
