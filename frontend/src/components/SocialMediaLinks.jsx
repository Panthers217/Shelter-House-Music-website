import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
  FaSpotify,
  FaSoundcloud,
  FaDiscord,
  FaTwitch,
  FaRedditAlien,
  FaPinterest,
  FaSnapchat,
  FaTelegram,
  FaWhatsapp,
  FaGithub,
  FaBandcamp,
  FaDeezer,
  FaApple,
  FaAmazon,
  FaPatreon,
  FaLink,
} from "react-icons/fa6";
import { SiTidal, SiNapster } from "react-icons/si";

const SocialMediaLinks = ({ 
  iconSize = 18,
  containerClassName = "flex flex-row gap-4 items-center flex-wrap",
  iconClassName = "w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-[#fffced] hover:bg-[#aa2a46] transition",
  showTitle = true,
  onLinksLoaded = null, // Callback when links are fetched
  platformFilter = null, // Array of platform names to show (e.g., ['facebook', 'youtube'])
  customLinks = null // Object with custom URLs for platforms (e.g., { facebook: 'https://...', youtube: 'https://...' })
}) => {
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping for social media platforms
  const socialMediaIcons = {
    facebook: FaFacebookF,
    twitter: FaXTwitter,
    instagram: FaInstagram,
    youtube: FaYoutube,
    tiktok: FaTiktok,
    spotify: FaSpotify,
    soundcloud: FaSoundcloud,
    bandcamp: FaBandcamp,
    applemusic: FaApple,
    tidal: SiTidal,
    deezer: FaDeezer,
    amazonmusic: FaAmazon,
    napster: SiNapster,
    linkedin: FaLinkedinIn,
    discord: FaDiscord,
    twitch: FaTwitch,
    reddit: FaRedditAlien,
    pinterest: FaPinterest,
    snapchat: FaSnapchat,
    telegram: FaTelegram,
    whatsapp: FaWhatsapp,
    github: FaGithub,
    patreon: FaPatreon,
  };

  useEffect(() => {
    async function fetchSocialMediaLinks() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings/contact`);
        
        // Parse social media links and filter only enabled ones
        if (response.data.social_media_links) {
          const links = typeof response.data.social_media_links === 'string' 
            ? JSON.parse(response.data.social_media_links)
            : response.data.social_media_links;
          
          let enabledLinks = Object.entries(links)
            .filter(([key, value]) => value.enabled && value.url)
            .map(([key, value]) => ({
              platform: key,
              url: value.url,
              name: value.name || key,
              icon: value.icon || key
            }));
          
          // Apply platform filter if provided
          if (platformFilter && Array.isArray(platformFilter)) {
            enabledLinks = enabledLinks.filter(link => platformFilter.includes(link.platform));
          }
          
          // Override with custom links if provided
          if (customLinks && typeof customLinks === 'object') {
            enabledLinks = enabledLinks.map(link => {
              if (customLinks[link.platform]) {
                return { ...link, url: customLinks[link.platform] };
              }
              return link;
            });
          }
          
          setSocialMediaLinks(enabledLinks);
          
          // Call callback if provided
          if (onLinksLoaded) {
            onLinksLoaded(enabledLinks);
          }
        }
      } catch (err) {
        console.error('Error fetching social media links:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSocialMediaLinks();
  }, [onLinksLoaded]);

  if (loading) {
    return null; // Or return a loading spinner if desired
  }

  if (socialMediaLinks.length === 0) {
    return null; // Don't render anything if no links
  }

  return (
    <div className={containerClassName}>
      {socialMediaLinks.map((link) => {
        const IconComponent = socialMediaIcons[link.platform] || FaLink;
        return (
          <a 
            key={link.platform}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={iconClassName}
            title={showTitle ? link.name : undefined}
            aria-label={link.name}
          >
            <IconComponent size={iconSize} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaLinks;
