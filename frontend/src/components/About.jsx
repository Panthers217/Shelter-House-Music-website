import React from 'react';
import { useApiData } from '../context/ApiDataContext';
import { useTheme } from '../context/ThemeContext';
import { FaMusic, FaHeart, FaUsers, FaAward, FaRocket, FaHandshake } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import DemoBanner from './DemoBanner';
import ZoomFit from './ZoomFit.jsx';

const About = () => {
  const { websiteSettings } = useApiData();
  const { themeColors } = useTheme();
  // console.log("page_title:", websiteSettings?.about_page_title);

  // Core values/features
  const coreValues = [
    {
      icon: <FaMusic className="text-4xl" />,
      title: websiteSettings?.about_value1_title || 'Quality Music',
      description: websiteSettings?.about_value1_desc || 'Curated selection of the finest tracks from talented artists worldwide'
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: websiteSettings?.about_value2_title || 'Artist Support',
      description: websiteSettings?.about_value2_desc || 'Dedicated to empowering artists and helping them reach their audience'
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: websiteSettings?.about_value3_title || 'Community First',
      description: websiteSettings?.about_value3_desc || 'Building a vibrant community of music lovers and creators'
    },
    {
      icon: <FaAward className="text-4xl" />,
      title: websiteSettings?.about_value4_title || 'Excellence',
      description: websiteSettings?.about_value4_desc || 'Committed to delivering exceptional music experiences'
    }
  ];

  // Stats
  const stats = [
    { 
      number: websiteSettings?.about_stat1_number || '10K+', 
      label: websiteSettings?.about_stat1_label || 'Active Listeners' 
    },
    { 
      number: websiteSettings?.about_stat2_number || '500+', 
      label: websiteSettings?.about_stat2_label || 'Artists' 
    },
    { 
      number: websiteSettings?.about_stat3_number || '5K+', 
      label: websiteSettings?.about_stat3_label || 'Tracks' 
    },
    { 
      number: websiteSettings?.about_stat4_number || '100+', 
      label: websiteSettings?.about_stat4_label || 'Albums' 
    }
  ];

  // Mission points
  const missionPoints = [
    {
      icon: <FaRocket className="text-3xl" />,
      title: 'Our Mission',
      description: websiteSettings?.about_mission || 'To revolutionize the music industry by providing a platform that connects artists directly with their fans, fostering genuine relationships and supporting creative freedom.'
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: 'Our Vision',
      description: websiteSettings?.about_vision || 'To become the leading independent music platform where artists thrive, fans discover their next favorite sound, and music culture flourishes authentically.'
    }
  ];

  return (
    <ZoomFit>
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal">
      <div className="max-w-7xl mx-auto">
        
        {/* Demo Banner - Detailed variant for About page */}
        {/* <div className="mb-12">
          <DemoBanner variant="detailed" showAdminInfo={true} />
        </div> */}

        {/* Hero Section with Logo */}
        <div className="text-center mb-20">
          <div className="mb-8 flex justify-center">
            {websiteSettings?.logo_url ? (
              <img 
                src={websiteSettings.logo_url} 
                alt="Shelter House Music Logo" 
                className="h-32 md:h-40 w-auto object-contain animate-fade-in"
              />
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-bold text-shelter-honey">
                  Shelter House Music
                </span>
                <div className="w-32 h-1 mt-4 bg-shelter-amber"></div>
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shelter-white">
            {websiteSettings?.about_page_title || 'About Us'}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-shelter-white">
            {websiteSettings?.about_hero_tagline || 'Where passion meets melody, and artists connect with souls who truly feel the music.'}
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-20 bg-gradient-to-br from-shelter-slate to-shelter-charcoal p-8 md:p-12 rounded-2xl shadow-2xl border border-shelter-honey/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-shelter-honey">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none text-shelter-white">
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-shelter-white">
              {websiteSettings?.about_story_paragraph1 || 'Shelter House Music was born from a simple belief: that music has the power to touch souls and transform lives. Founded by passionate music enthusiasts, we set out to create more than just another music platform—we wanted to build a home for artists and listeners who believe in the raw, authentic power of music.'}
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-shelter-white">
              {websiteSettings?.about_story_paragraph2 || 'In an industry often dominated by algorithms and mainstream trends, we champion the independent spirit. We provide a space where emerging artists can showcase their talent, where established musicians can connect deeply with their fans, and where music lovers can discover sounds that resonate with their souls.'}
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-shelter-white">
              {websiteSettings?.about_story_paragraph3 || 'Today, Shelter House Music has grown into a thriving community of artists, producers, and fans united by their love for authentic, soulful music. Every track, every album, every artist on our platform represents a story waiting to be heard—and we\'re honored to be part of that journey.'}
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {missionPoints.map((point, index) => (
            <div 
              key={index}
              className="bg-shelter-slate p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-shelter-honey/20 hover:border-shelter-honey/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-shelter-honey/15 text-shelter-honey">
                  {point.icon}
                </div>
                <h3 className="text-2xl font-bold text-shelter-honey">
                  {point.title}
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-shelter-white">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="mb-20 p-8 md:p-12 rounded-2xl shadow-2xl bg-gradient-to-br from-shelter-honey to-shelter-amber">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-shelter-charcoal">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-shelter-charcoal">
                  {stat.number}
                </div>
                <div className="text-lg text-shelter-charcoal/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-shelter-white">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="bg-shelter-slate p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border border-shelter-honey/20 hover:border-shelter-honey/50"
              >
                <div className="mb-4 flex justify-center text-shelter-honey">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-shelter-white">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-shelter-white">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mb-20 bg-shelter-slate p-8 md:p-12 rounded-2xl shadow-2xl border-2 border-shelter-honey/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-shelter-honey">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {websiteSettings?.email && (
              <div className="flex items-start gap-4">
                <MdEmail className="text-3xl flex-shrink-0 text-shelter-honey" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-shelter-white">Email</h3>
                  <a 
                    href={`mailto:${websiteSettings.email}`}
                    className="text-shelter-gray hover:text-shelter-honey hover:underline transition-colors"
                  >
                    {websiteSettings.email}
                  </a>
                </div>
              </div>
            )}
            {websiteSettings?.phone && (
              <div className="flex items-start gap-4">
                <MdPhone className="text-3xl flex-shrink-0 text-shelter-honey" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-shelter-white">Phone</h3>
                  <a 
                    href={`tel:${websiteSettings.phone}`}
                    className="text-shelter-gray hover:text-shelter-honey hover:underline transition-colors"
                  >
                    {websiteSettings.phone}
                  </a>
                </div>
              </div>
            )}
            {websiteSettings?.address && (
              <div className="flex items-start gap-4">
                <MdLocationOn className="text-3xl flex-shrink-0 text-shelter-honey" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-shelter-white">Location</h3>
                  <p className="text-shelter-gray">
                    {websiteSettings.address}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-12 rounded-2xl shadow-2xl bg-gradient-to-br from-shelter-honey to-shelter-amber">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shelter-charcoal">
            {websiteSettings?.about_cta_title || 'Join Our Community'}
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-shelter-charcoal">
            {websiteSettings?.about_cta_description || 'Whether you\'re an artist looking to share your sound or a music lover seeking authentic experiences, Shelter House Music is your home.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/artists"
              className="bg-shelter-charcoal text-shelter-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-shelter-slate"
            >
              Explore Artists
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-shelter-charcoal text-shelter-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-shelter-charcoal hover:text-shelter-white"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
    </ZoomFit>
  );
};

export default About;
