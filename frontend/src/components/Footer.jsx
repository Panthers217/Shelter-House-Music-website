import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import NewsletterSubscription from "./NewsletterSubscription";
import { useFeatures } from "../context/FeaturesContext";
import shelterLogo from "../assets/Shelter-house-logo.png";

const socialLinks = [
  {
    icon: <FaFacebookF />,
    url: "https://facebook.com/soulfeltmusic",
    label: "Facebook",
  },
  {
    icon: <FaTwitter />,
    url: "https://twitter.com/soulfeltmusic",
    label: "Twitter",
  },
  {
    icon: <FaInstagram />,
    url: "https://instagram.com/soulfeltmusic",
    label: "Instagram",
  },
  {
    icon: <FaYoutube />,
    url: "https://youtube.com/soulfeltmusic",
    label: "YouTube",
  },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Store", to: "/store" },
  { label: "Artists", to: "/artists" },
  { label: "Music", to: "/music" },
  { label: "Videos", to: "/videos" },
  { label: "Community", to: "/community" },
];
const supportLinks = [
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" },
  { label: "Terms", to: "/terms" },
];

const Footer = () => {
  const { isEnabled } = useFeatures();
  const isNewsletterEnabled = isEnabled('enable_newsletter');

  return (
    <footer className="bg-shelter-charcoal text-shelter-white pt-8 pb-4 px-2">
      <div className="max-w-7xl mx-auto border border-shelter-slate rounded-sm p-6 md:p-8 flex flex-col md:flex-col lg:flex-row xl:flex-row md:items-start gap-8 md:gap-0">
        {/* Left column */}
        <div className="flex-1 mb-6 md:mb-0 max-w-md">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={shelterLogo} 
              alt="Shelter House Music Logo" 
              className="h-16 w-auto object-contain flex-shrink-0"
            />
            <span className="text-shelter-honey text-2xl font-bold font-[bold'] leading-tight">
              Shelter House Music
            </span>
          </div>
          <p className="text-shelter-white text-base leading-relaxed">
            Experience songs of joy, peace, and righteousness.
          </p>
          <p className="text-shelter-white text-base leading-relaxed mt-3">
            Join our community of joining hearts through music.
          </p>
        </div>
        {/* Quick Links */}
        <div className="flex-1 flex flex-col md:ml-8 mb-6 md:mb-0">
          <div className="font-bold text-shelter-honey mb-2">Quick Links</div>
          <ul className="space-y-1">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="hover:text-[#aa2a46] focus:text-[#aa2a46] transition-colors underline-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Support & Social */}
        <div className="flex-1 flex flex-col md:ml-8 mb-6 md:mb-0">
          <div className="font-bold text-shelter-honey mb-2">Support</div>
          <ul className="space-y-1 mb-3">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="hover:text-shelter-honey focus:text-shelter-honey transition-colors underline-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="font-bold text-shelter-honey mb-2">Follow Us</div>
          <div className="flex gap-3 text-2xl">
            <SocialMediaLinks
              iconSize={14}
              containerClassName="flex gap-2"
              iconClassName="text-gray-400 hover:text-white"
              showTitle={false}
              platformFilter={['facebook', 'youtube']}
              customLinks={{
    facebook: 'https://www.facebook.com/shelterhousemusicministry',
    youtube: 'https://www.youtube.com/@ShelterHouseMusic'
  }}
            />
          </div>
        </div>
        {/* Newsletter */}
        {isNewsletterEnabled && (
          <NewsletterSubscription 
            title="Soul Felt Music Newsletter"
            description={
              <>
                Subscribe to our newsletter
                <br />
                for the latest updates.
              </>
            }
          />
        )}
      </div>
      <div className="max-w-7xl mx-auto mt-4 text-xs text-shelter-white">
        © 2024 Soul Felt Music. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;