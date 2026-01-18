// src/components/Contact.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SocialMediaLinks from './SocialMediaLinks';
import ZoomFit from './ZoomFit.jsx';
import SEO from './SEO';

// Inquiry tab options
const inquiryTabs = [
    { label: 'General Inquiry', value: 'general' },
    { label: 'Artist Submissions', value: 'artist' },
    { label: 'Press & Media', value: 'press' },
];

const Contact = () => {
    
  const [contactInfo, setContactInfo] = useState({
    contact_email: 'info@shelterhousemusic.com',
    contact_phone: ' (252) 354-8303',
    contact_address: 'Jacksonville, NC 28540',
    office_hours_weekday: '9:00 AM - 6:00 PM',
    office_hours_saturday: '10:00 AM - 4:00 PM',
    office_hours_sunday: 'Closed',
    office_hours_timezone: 'EST'
  });

  // Form state
  const [activeTab, setActiveTab] = useState('general');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Fetch contact info from API
  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings/contact`);
        setContactInfo(response.data);
      } catch (err) {
        console.error('Error fetching contact info:', err);
        // Keep default values if fetch fails
      }
    }
    
    fetchContactInfo();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear status when user types
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact/submit`, {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        inquiry_type: activeTab
      });

      setSubmitStatus({ 
        type: 'success', 
        message: 'Message sent successfully! We\'ll get back to you soon.' 
      });
      // Reset form
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Failed to send message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Parse address into array of lines
  const getAddressLines = () => {
    if (!contactInfo.contact_address) return [];
    return contactInfo.contact_address.split(',').map(line => line.trim());
  };

  // Parse email into array (could be multiple emails separated by comma or newline)
  const getEmails = () => {
    if (!contactInfo.contact_email) return [];
    return contactInfo.contact_email.split(/[,\n]/).map(email => email.trim()).filter(Boolean);
  };

  // Render functions
  const renderContactMobile = () => {
    return (
        <div
            data-layer="Contact Mobile Responsive"
            className="w-full max-w-[425px] min-w-[320px] bg-none flex flex-col items-start overflow-hidden mx-auto"
        >
            <div className="w-full bg-white flex flex-col items-start overflow-hidden pr-0 sm:pr-0">
                <div className="w-full py-3 bg-shelter-charcoal flex flex-col items-center">
                    <div className="w-full h-[1px] bg-shelter-slate" />
                    <div className="w-full max-w-[368px] pb-0.5 bg-shelter-slate flex flex-col items-start">
                        <div className="w-full relative">
                            <div className="relative left-0 top-0 w-full max-w-[368px] h-auto flex flex-col justify-center items-start gap-4 pr-4 pb-1">
                                <div className="text-shelter-white text-nowrap text-5xl sm:text-6xl font-bold font-['Roboto'] leading-tight sm:pl-[5%] ">Contact Us</div>
                                <div className="w-full max-w-[350px] text-shelter-white text-base font-normal font-['Roboto'] leading-6 sm:text-xs sm:pl-[5%]">Get in touch with the Shelter House Music team. We're here to help with any questions about our artists, music, or community.</div>
                            </div>
                        </div>
                        <div className="relative left-0  w-full flex flex-col gap-12">
                            <div className="w-full px-6 pt-6 pb-7 bg-shelter-slate rounded-lg shadow-md flex flex-col gap-7">
                                <div className="w-full pb-1 border border-shelter-slate rounded flex justify-center gap-2">
                                    {inquiryTabs.map(tab => (
                                        <button
                                            key={tab.value}
                                            type="button"
                                            className={`px-3 pt-1 pb-5 border rounded flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 ${
                                                activeTab === tab.value 
                                                    ? 'border-shelter-honey bg-shelter-honey/10' 
                                                    : 'border-shelter-slate hover:border-shelter-honey/50'
                                            }`}
                                            onClick={() => setActiveTab(tab.value)}
                                        >
                                            <div className={`text-center text-xs font-medium font-['Public_Sans'] leading-snug whitespace-nowrap ${
                                                activeTab === tab.value 
                                                    ? 'text-shelter-honey' 
                                                    : 'text-shelter-gray'
                                            }`}>{tab.label}</div>
                                        </button>
                                    ))}
                                </div>
                                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                                    <div className="w-full flex flex-col gap-4">
                                        <div className="w-full max-w-[310px] h-16 relative">
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                className="absolute left-0 top-6 w-full h-11 bg-shelter-charcoal rounded-md border border-shelter-slate focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 px-4 text-shelter-white placeholder:text-shelter-gray"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                            <div className="absolute left-0 top-0 text-shelter-white text-xs font-medium font-['Public_Sans'] leading-5">Full Name *</div>
                                        </div>
                                        <div className="w-full max-w-[310px] h-16 relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                className="absolute left-0 top-6 w-full h-11 bg-shelter-charcoal rounded-md border border-shelter-slate focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 px-4 text-shelter-white placeholder:text-shelter-gray"
                                                placeholder="Enter your email"
                                                required
                                            />
                                            <div className="absolute left-0 top-0 text-shelter-white text-xs font-medium font-['Public_Sans'] leading-5">Email Address *</div>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-[310px] h-16 relative">
                                        <input
                                            type="text"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            className="absolute left-0 top-6 w-full h-11 bg-shelter-charcoal rounded-md border border-shelter-slate focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 px-4 text-shelter-white placeholder:text-shelter-gray"
                                            placeholder="What's this about?"
                                            required
                                        />
                                        <div className="absolute left-0 top-0 text-shelter-white text-xs font-medium font-['Public_Sans'] leading-5">Subject *</div>
                                    </div>
                                    <div className="w-full flex flex-col gap-2 pb-2">
                                        <div className="text-shelter-white text-xs font-medium font-['Public_Sans'] leading-5">Message *</div>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            className="w-full max-w-[310px] h-36 bg-shelter-charcoal rounded-md border border-shelter-slate focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 p-3 text-shelter-white placeholder:text-shelter-gray"
                                            required
                                        />
                                    </div>
                                    {submitStatus.message && (
                                        <div className={`text-center text-sm ${
                                            submitStatus.type === 'success' ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                            {submitStatus.message}
                                        </div>
                                    )}
                                    <div className="w-full flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`w-1/2 py-3 bg-shelter-honey text-shelter-charcoal font-semibold rounded-md flex flex-col items-center ${
                                                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-shelter-amber'
                                            }`}
                                        >
                                            <div className="text-center text-shelter-charcoal text-sm font-medium font-['Public_Sans'] leading-snug">
                                                {loading ? 'Sending...' : 'Send Message'}
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="w-full flex flex-col gap-7 pt-0.5">
                                <div className="w-full px-5 pt-5 pb-5 bg-shelter-slate rounded-lg shadow-md flex flex-col gap-5">
                                    <div className="text-shelter-white text-lg font-medium font-['Roboto'] leading-7">Get In Touch</div>
                                    <div className="w-full flex flex-col gap-5">
                                        <div className="w-full flex gap-4 items-start">
                                            <div className="p-2 bg-shelter-honey rounded-full flex items-center justify-center">
                                                <div className="w-4 h-3 outline outline-2 outline-shelter-charcoal" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-shelter-white text-sm font-medium font-['Public_Sans'] leading-snug">Email</div>
                                                {getEmails().map((email, idx) => (
                                                  <div key={idx} className="text-shelter-gray text-xs font-normal font-['Public_Sans'] leading-5">{email}</div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-full flex gap-4 items-start">
                                            <div className="p-2 bg-shelter-honey rounded-full flex items-center justify-center">
                                                <div className="w-4 h-4 outline outline-2 outline-shelter-charcoal" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <div className="text-shelter-white text-sm font-medium font-['Public_Sans'] leading-snug">Phone</div>
                                                <div className="text-shelter-gray text-xs font-normal font-['Public_Sans'] leading-5">{contactInfo.contact_phone}</div>
                                                <div className="text-shelter-gray/70 text-[0.7rem] font-normal font-['Public_Sans'] leading-none">Mon-Fri, 9AM-6PM EST</div>
                                            </div>
                                        </div>
                                        <div className="w-full flex gap-4 items-start">
                                            <div className="p-2 bg-shelter-honey rounded-full flex items-center justify-center">
                                                <div className="w-3 h-4 outline outline-2 outline-shelter-charcoal" />
                                                <div className="w-1 h-1 outline outline-2 outline-shelter-charcoal ml-2 mt-1" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-shelter-white text-sm font-medium font-['Public_Sans'] leading-snug">Address</div>
                                                {getAddressLines().map((line, idx) => (
                                                  <div key={idx} className="text-shelter-gray text-xs font-normal font-['Public_Sans'] leading-5">{line}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-5 pt-5 pb-5 bg-shelter-slate rounded-lg shadow-md flex flex-col gap-5">
                                    <div className="text-shelter-white text-lg font-medium font-['Roboto'] leading-7">Office Hours</div>
                                    <div className="w-full flex flex-col gap-2">
                                        <div className="flex justify-between items-start pb-1">
                                            <div className="text-shelter-gray text-xs font-normal font-['Public_Sans'] leading-5">Monday - Friday</div>
                                            <div className="text-shelter-white text-xs font-medium font-['Public_Sans'] leading-5">{contactInfo.office_hours_weekday}</div>
                                        </div>
                                        <div className="flex justify-between items-start pb-1">
                                            <div className="text-shelter-gray text-xs font-normal font-['Public_Sans'] leading-5">Saturday</div>
                                            <div className="text-shelter-white text-xs font-medium font-['Public_Sans'] leading-5">{contactInfo.office_hours_saturday}</div>
                                        </div>
                                        <div className="flex justify-between items-start pb-1">
                                            <div className="text-shelter-gray text-xs font-normal font-['Public_Sans'] leading-5">Sunday</div>
                                            <div className="text-shelter-gray/70 text-xs font-normal font-['Public_Sans'] leading-5">{contactInfo.office_hours_sunday}</div>
                                        </div>
                                        <div className="w-full pt-4 border border-shelter-honey/20 rounded flex flex-col items-start">
                                            <div className="text-shelter-gray text-[0.7rem] font-normal font-['Public_Sans'] leading-none">All times are {contactInfo.office_hours_timezone}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-5 pt-5 pb-5 bg-shelter-slate rounded-lg shadow-md flex flex-col gap-5 justify-center items-start">
                                    <div className="text-shelter-white text-lg font-medium font-['Roboto'] leading-7">Follow Us</div>
                                    <SocialMediaLinks 
                                      iconSize={18}
                                      containerClassName="w-full flex gap-4 justify-center items-start flex-wrap"
                                      iconClassName="w-6 h-6 flex items-center justify-center bg-shelter-charcoal rounded-full text-shelter-white hover:bg-shelter-honey hover:text-shelter-charcoal transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const renderContactTablet = () => {
        return (
            <div className="w-full min-h-screen bg-none flex flex-col items-center justify-start overflow-hidden">
                <div className="w-full bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal flex flex-col items-center justify-start overflow-hidden">
                    <div className="w-full bg-none flex flex-col items-center justify-start">
                        <div className="w-[95vw] max-w-[768px] bg-none flex flex-col items-start justify-start">
                            <div className="w-full px-6 py-4 flex flex-col items-center justify-start">
                                <div className="w-full p-2 flex flex-col items-start justify-start gap-2">
                                    <div className="w-full flex flex-col items-start justify-center gap-4 pr-[40vw] pb-1">
                                        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white text-nowrap font-bold text-[3.5rem] leading-[4.1rem] font-['Roboto']">Contact Us</h1>
                                        <p className="w-[55vw] max-w-[425px] text-shelter-white text-base font-normal font-['Roboto'] leading-snug">Get in touch with the Shelter House Music team. We're here to help with any questions about our artists, music, or community.</p>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-center justify-center gap-16">
                                    {/* Contact Form */}
                                    <div className="w-full bg-shelter-charcoal rounded-xl shadow-lg p-12 flex flex-col gap-12 ring-1 ring-shelter-honey/20">
                                        {/* Tabs */}
                                        <div className="flex flex-row gap-6 pb-2 border-b border-shelter-honey/20">
                                            {inquiryTabs.map(tab => (
                                                <button
                                                    key={tab.value}
                                                    type="button"
                                                    className={`px-3 pb-7 text-xl font-medium font-['Public_Sans'] transition-all duration-200 border-b-2 hover:scale-105 focus:outline-none ${
                                                        activeTab === tab.value 
                                                            ? 'border-shelter-honey text-shelter-honey' 
                                                            : 'border-transparent text-shelter-gray hover:text-shelter-honey hover:border-shelter-honey/50'
                                                    }`}
                                                    onClick={() => setActiveTab(tab.value)}
                                                >{tab.label}</button>
                                            ))}
                                        </div>
                                        {/* Form Fields */}
                                        <form className="flex flex-col gap-9" onSubmit={handleSubmit}>
                                            <div className="flex flex-col gap-6">
                                                <div className="relative w-full">
                                                    <label className="block text-shelter-white text-xl font-medium font-['Public_Sans'] mb-1">Full Name *</label>
                                                    <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Enter your full name" className="w-full h-16 bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-xl font-normal font-['Public_Sans'] px-6" required />
                                                </div>
                                                <div className="relative w-full">
                                                    <label className="block text-shelter-white text-xl font-medium font-['Public_Sans'] mb-1">Email Address *</label>
                                                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="w-full h-16 bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-xl font-normal font-['Public_Sans'] px-6" required />
                                                </div>
                                            </div>
                                            <div className="relative w-full">
                                                <label className="block text-shelter-white text-xl font-medium font-['Public_Sans'] mb-1">Subject *</label>
                                                <input name="subject" type="text" value={form.subject} onChange={handleChange} placeholder="What's this about?" className="w-full h-16 bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-xl font-normal font-['Public_Sans'] px-6" required />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label className="block text-shelter-white text-xl font-medium font-['Public_Sans']">Message *</label>
                                                <textarea name="message" value={form.message} onChange={handleChange} className="w-full min-h-[12rem] bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-xl font-normal font-['Public_Sans'] px-6 py-3" required />
                                            </div>
                                            <button type="submit" className="w-full py-6 bg-shelter-honey rounded-md text-shelter-charcoal text-2xl font-medium font-['Public_Sans'] hover:bg-shelter-amber transition focus:ring-2 focus:ring-shelter-honey" disabled={loading}>
                                                {loading ? 'Sending...' : 'Send Message'}
                                            </button>
                                            {submitStatus.message && (
                                                <div className={`text-center text-lg mt-2 ${
                                                    submitStatus.type === 'success' ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                    {submitStatus.message}
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                    {/* Contact Details */}
                                    <div className="w-full flex flex-col gap-12">
                                        {/* Get In Touch */}
                                        <div className="w-full bg-shelter-charcoal rounded-xl shadow-lg p-9 flex flex-col gap-9 ring-1 ring-shelter-honey/20">
                                            <div className="text-shelter-white text-3xl font-medium font-['Roboto']">Get In Touch</div>
                                            <div className="flex flex-col gap-9">
                                                {/* Email */}
                                                <div className="flex flex-row gap-6 items-start">
                                                    <div className="p-4 bg-shelter-honey rounded-full flex items-center justify-center">
                                                        {/* Email Icon Placeholder */}
                                                        <span className="w-8 h-6 block bg-shelter-charcoal rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-shelter-white text-2xl font-medium font-['Public_Sans']">Email</div>
                                                        {getEmails().map((email, idx) => (
                                                          <div key={idx} className="text-shelter-gray text-xl font-normal font-['Public_Sans']">{email}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Phone */}
                                                <div className="flex flex-row gap-6 items-start">
                                                    <div className="p-4 bg-shelter-honey rounded-full flex items-center justify-center">
                                                        {/* Phone Icon Placeholder */}
                                                        <span className="w-6 h-6 block bg-shelter-charcoal rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-shelter-white text-2xl font-medium font-['Public_Sans']">Phone</div>
                                                        <div className="text-shelter-gray text-xl font-normal font-['Public_Sans']">{contactInfo.contact_phone}</div>
                                                        <div className="text-shelter-gray/70 text-lg font-normal font-['Public_Sans']">Mon-Fri, 9AM-6PM EST</div>
                                                    </div>
                                                </div>
                                                {/* Address */}
                                                <div className="flex flex-row gap-6 items-start">
                                                    <div className="p-4 bg-shelter-honey rounded-full flex items-center justify-center">
                                                        {/* Address Icon Placeholder */}
                                                        <span className="w-6 h-8 block bg-shelter-charcoal rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-shelter-white text-2xl font-medium font-['Public_Sans']">Address</div>
                                                        {getAddressLines().map((line, idx) => (
                                                          <div key={idx} className="text-shelter-gray text-xl font-normal font-['Public_Sans']">{line}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Office Hours */}
                                        <div className="w-full bg-shelter-charcoal rounded-xl shadow-lg p-9 flex flex-col gap-6 ring-1 ring-shelter-honey/20">
                                            <div className="text-shelter-white text-3xl font-medium font-['Roboto']">Office Hours</div>
                                            <div className="flex flex-col gap-3">
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-shelter-gray text-xl font-normal font-['Public_Sans']">Monday - Friday</span>
                                                    <span className="text-shelter-white text-xl font-medium font-['Public_Sans']">{contactInfo.office_hours_weekday}</span>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-shelter-gray text-xl font-normal font-['Public_Sans']">Saturday</span>
                                                    <span className="text-shelter-white text-xl font-medium font-['Public_Sans']">{contactInfo.office_hours_saturday}</span>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-shelter-gray text-xl font-normal font-['Public_Sans']">Sunday</span>
                                                    <span className="text-shelter-gray/70 text-xl font-normal font-['Public_Sans']">{contactInfo.office_hours_sunday}</span>
                                                </div>
                                                <div className="pt-6 border-t border-shelter-honey/20">
                                                    <span className="text-shelter-gray text-lg font-normal font-['Public_Sans']">All times are {contactInfo.office_hours_timezone}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Follow Us */}
                                        <div className="w-full bg-shelter-charcoal rounded-xl shadow-lg p-9 flex flex-col gap-9 ring-1 ring-shelter-honey/20">
                                            <div className="text-shelter-white text-3xl font-medium font-['Roboto']">Follow Us</div>
                                            <SocialMediaLinks 
                                              iconSize={18}
                                              containerClassName="flex flex-row gap-6 items-center flex-wrap"
                                              iconClassName="w-6 h-6 flex items-center justify-center bg-shelter-slate rounded-full text-shelter-white hover:bg-shelter-honey hover:text-shelter-charcoal transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

  const renderContactLaptop = () => {
        return (
            <div className="w-full min-h-screen bg-transparent flex flex-col items-center  overflow-hidden">
                <div className="w-full bg-white flex flex-col items-center justify-center gap-6 overflow-hidden">
                    <div className="w-full py-[9vw] bg-shelter-charcoal flex flex-col items-center justify-start gap-2.5">
                        <div className="w-[80vw] max-w-[1024px] px-[5vw] py-[2.5vw] bg-shelter-slate flex flex-col items-start justify-start gap-2">
                            <div className="relative w-full min-h-[60vh]">
                                {/* Header Section */}
                                <div className="absolute left-0 top-0 w-[85vw] max-w-[876px] h-[9vw] max-h-[136px] flex flex-col justify-center items-start gap-4 pl-1 pr-[30vw] pb-1">
                                    <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white font-bold text-[4vw] leading-[4.8vw] font-['Roboto']">Contact Us</h1>
                                    <p className="w-[44vw] max-w-[450px] text-shelter-gray text-base font-normal font-['Roboto'] leading-snug">Get in touch with the Shelter House Music team. We're here to help with any questions about our artists, music, or community.</p>
                                </div>
                                {/* Main Content Section */}
                                <div className="absolute left-0 top-[12vw] flex flex-row justify-end items-start gap-[3vw] w-full">
                                    {/* Contact Form */}
                                    <div className="bg-shelter-charcoal rounded-lg shadow-lg p-[2vw] flex flex-col gap-6 min-w-[32vw] max-w-[40vw] ring-1 ring-shelter-honey/20">
                                        {/* Tabs */}
                                        <div className="flex flex-row gap-3 pb-1 border-b border-shelter-honey/20">
                                            {inquiryTabs.map(tab => (
                                                <button
                                                    key={tab.value}
                                                    type="button"
                                                    className={`px-2 pb-4 text-sm font-medium font-['Public_Sans'] border-b-2 transition-all duration-200 hover:scale-105 focus:outline-none ${
                                                        activeTab === tab.value 
                                                            ? 'border-shelter-honey text-shelter-honey' 
                                                            : 'border-transparent text-shelter-gray hover:text-shelter-honey hover:border-shelter-honey/50'
                                                    }`}
                                                    onClick={() => setActiveTab(tab.value)}
                                                >
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>
                                        {/* Form Fields */}
                                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                            <div className="flex flex-row gap-3">
                                                <div className="relative w-1/2">
                                                    <label className="block text-shelter-white text-sm font-medium font-['Public_Sans'] mb-1">Full Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter your full name"
                                                        className="w-full h-12 bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-base font-normal font-['Public_Sans'] px-3"
                                                        required
                                                    />
                                                </div>
                                                <div className="relative w-1/2">
                                                    <label className="block text-shelter-white text-sm font-medium font-['Public_Sans'] mb-1">Email Address *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter your email"
                                                        className="w-full h-12 bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-base font-normal font-['Public_Sans'] px-3"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative w-full">
                                                <label className="block text-shelter-white text-sm font-medium font-['Public_Sans'] mb-1">Subject *</label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={form.subject}
                                                    onChange={handleChange}
                                                    placeholder="What's this about?"
                                                    className="w-full h-12 bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-base font-normal font-['Public_Sans'] px-3"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="block text-shelter-white text-sm font-medium font-['Public_Sans']">Message *</label>
                                                <textarea
                                                    name="message"
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    className="w-full min-h-[8rem] bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-base font-normal font-['Public_Sans'] px-3 py-2"
                                                    required
                                                />
                                            </div>
                                            {submitStatus.message && (
                                                <div className={`text-center text-sm ${
                                                    submitStatus.type === 'success' ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                    {submitStatus.message}
                                                </div>
                                            )}
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`w-full py-3 bg-shelter-honey rounded-md text-shelter-charcoal text-base font-medium font-['Public_Sans'] focus:ring-2 focus:ring-shelter-honey ${
                                                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-shelter-amber'
                                                }`}
                                            >
                                                {loading ? 'Sending...' : 'Send Message'}
                                            </button>
                                        </form>
                                    </div>
                                    {/* Contact Details */}
                                    <div className="flex flex-col gap-7 min-w-[22vw] max-w-[28vw]">
                                        {/* Get In Touch */}
                                        <div className="bg-shelter-charcoal rounded-lg shadow-lg p-4 flex flex-col gap-5 ring-1 ring-shelter-honey/20">
                                            <div className="text-shelter-white text-xl font-medium font-['Roboto']">Get In Touch</div>
                                            <div className="flex flex-col gap-5">
                                                {/* Email */}
                                                <div className="flex flex-row gap-3 items-start">
                                                    <div className="p-2 bg-shelter-honey rounded-full flex items-center justify-center">
                                                        {/* Email Icon Placeholder */}
                                                        <span className="w-5 h-4 block bg-shelter-charcoal rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-shelter-white text-base font-medium font-['Public_Sans']">Email</div>
                                                        {getEmails().map((email, idx) => (
                                                          <div key={idx} className="text-shelter-gray text-sm font-normal font-['Public_Sans']">{email}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Phone */}
                                                <div className="flex flex-row gap-3 items-start">
                                                    <div className="p-2 bg-shelter-honey rounded-full flex items-center justify-center">
                                                        {/* Phone Icon Placeholder */}
                                                        <span className="w-4 h-4 block bg-shelter-charcoal rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-shelter-white text-base font-medium font-['Public_Sans']">Phone</div>
                                                        <div className="text-shelter-gray text-sm font-normal font-['Public_Sans']">{contactInfo.contact_phone}</div>
                                                        <div className="text-shelter-gray/70 text-xs font-normal font-['Public_Sans']">Mon-Fri, 9AM-6PM EST</div>
                                                    </div>
                                                </div>
                                                {/* Address */}
                                                <div className="flex flex-row gap-3 items-start">
                                                    <div className="p-2 bg-shelter-honey rounded-full flex items-center justify-center">
                                                        {/* Address Icon Placeholder */}
                                                        <span className="w-4 h-5 block bg-shelter-charcoal rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-shelter-white text-base font-medium font-['Public_Sans']">Address</div>
                                                        {getAddressLines().map((line, idx) => (
                                                          <div key={idx} className="text-shelter-gray text-sm font-normal font-['Public_Sans']">{line}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Office Hours */}
                                        <div className="bg-shelter-charcoal rounded-lg shadow-lg p-4 flex flex-col gap-3 ring-1 ring-shelter-honey/20">
                                            <div className="text-shelter-white text-xl font-medium font-['Roboto']">Office Hours</div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-shelter-gray text-sm font-normal font-['Public_Sans']">Monday - Friday</span>
                                                    <span className="text-shelter-white text-sm font-medium font-['Public_Sans']">{contactInfo.office_hours_weekday}</span>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-shelter-gray text-sm font-normal font-['Public_Sans']">Saturday</span>
                                                    <span className="text-shelter-white text-sm font-medium font-['Public_Sans']">{contactInfo.office_hours_saturday}</span>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-shelter-gray text-sm font-normal font-['Public_Sans']">Sunday</span>
                                                    <span className="text-shelter-gray/70 text-sm font-normal font-['Public_Sans']">{contactInfo.office_hours_sunday}</span>
                                                </div>
                                                <div className="pt-3 border-t border-shelter-honey/20">
                                                    <span className="text-shelter-gray text-xs font-normal font-['Public_Sans']">All times are {contactInfo.office_hours_timezone}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Follow Us */}
                                        <div className="bg-shelter-charcoal rounded-lg shadow-lg p-4 flex flex-col gap-5 ring-1 ring-shelter-honey/20">
                                            <div className="text-shelter-white text-xl font-medium font-['Roboto']">Follow Us</div>
                                            <SocialMediaLinks 
                                              iconSize={18}
                                              containerClassName="flex flex-row gap-3 items-center flex-wrap"
                                              iconClassName="w-6 h-6 flex items-center justify-center bg-shelter-slate rounded-full text-shelter-white hover:bg-shelter-honey hover:text-shelter-charcoal transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

  const renderContactDesktop = () => {
    return (
        <div className="w-full min-h-screen bg-none flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal  flex flex-col items-center justify-center gap-6 overflow-hidden">
                <div className="w-full  bg-none flex flex-col items-center justify-start gap-2.5">
                    <div className="w-[80vw] max-w-[1440px] px-[7vw] py-[3.5vw] bg-none flex flex-col items-start justify-start gap-2.5">
                        <div className="relative w-full min-h-[80vh]">
                            {/* Header Section */}
                            <div className="relative left-0 top-0 w-[85vw] max-w-[1232px] h-[13vw] max-h-[192px] flex flex-col justify-center items-start gap-6 pl-1 pr-[40vw] pb-1">
                                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white font-bold text-[5.5vw] text-nowrap leading-[6vw] font-['Roboto']">Contact Us</h1>
                                <p className="w-[44vw] max-w-[633px] text-shelter-white text-xl font-normal font-['Roboto'] leading-loose">Get in touch with the Shelter House Music team. We're here to help with any questions about our artists, music, or community.</p>
                            </div>
                            {/* Main Content Section */}
                            <div className="relative left-0 top-[3vw] flex flex-row justify-end items-start gap-[5vw] w-full">
                                {/* Contact Form */}
                                <div className="bg-shelter-charcoal rounded-lg shadow-lg p-[2.5vw] flex flex-col gap-8 min-w-[32vw] max-w-[40vw] ring-1 ring-shelter-honey/20">
                                    {/* Tabs */}
                                    <div className="flex flex-row gap-4 pb-1 border-b border-shelter-honey/20">
                                        {inquiryTabs.map(tab => (
                                            <button
                                                key={tab.value}
                                                type="button"
                                                className={`px-2 pb-5 text-base font-medium font-['Public_Sans'] transition-all duration-200 border-b-2 hover:scale-105 focus:outline-none ${activeTab === tab.value ? 'border-shelter-honey text-shelter-honey' : 'border-transparent text-shelter-gray hover:text-shelter-honey hover:border-shelter-honey/50'}`}
                                                onClick={() => setActiveTab(tab.value)}
                                            >{tab.label}</button>
                                        ))}
                                    </div>
                                    {/* Form Fields */}
                                    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
                                        <div className="flex flex-row gap-4">
                                            <div className="relative w-1/2">
                                                <label className="block text-shelter-white text-base font-medium font-['Public_Sans'] mb-1">Full Name *</label>
                                                <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Enter your full name" className="w-full h-14 bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-lg font-normal font-['Public_Sans'] px-4" required />
                                            </div>
                                            <div className="relative w-1/2">
                                                <label className="block text-shelter-white text-base font-medium font-['Public_Sans'] mb-1">Email Address *</label>
                                                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="w-full h-14 bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-lg font-normal font-['Public_Sans'] px-4" required />
                                            </div>
                                        </div>
                                        <div className="relative w-full">
                                            <label className="block text-shelter-white text-base font-medium font-['Public_Sans'] mb-1">Subject *</label>
                                            <input name="subject" type="text" value={form.subject} onChange={handleChange} placeholder="What's this about?" className="w-full h-14 bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-lg font-normal font-['Public_Sans'] px-4" required />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="block text-shelter-white text-base font-medium font-['Public_Sans']">Message *</label>
                                            <textarea name="message" value={form.message} onChange={handleChange} className="w-full min-h-[8rem] bg-shelter-slate rounded-md border border-shelter-honey/20 focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 text-shelter-white placeholder:text-shelter-gray text-lg font-normal font-['Public_Sans'] px-4 py-2" required />
                                        </div>
                                            <button type="submit" className="w-full py-3 bg-shelter-honey rounded-md text-shelter-charcoal text-base font-medium font-['Public_Sans'] hover:bg-shelter-amber focus:ring-2 focus:ring-shelter-honey transition" disabled={loading}>
                                                {loading ? 'Sending...' : 'Send Message'}
                                            </button>
                                            {submitStatus.message && (
                                                <div className={`text-center text-base mt-2 ${
                                                    submitStatus.type === 'success' ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                    {submitStatus.message}
                                                </div>
                                            )}
                                    </form>
                                </div>
                                {/* Contact Details */}
                                <div className="flex flex-col gap-9 min-w-[22vw] max-w-[28vw]">
                                    {/* Get In Touch */}
                                    <div className="bg-shelter-charcoal rounded-lg shadow-lg p-6 flex flex-col gap-7 ring-1 ring-shelter-honey/20">
                                        <div className="text-shelter-white text-2xl font-medium font-['Roboto']">Get In Touch</div>
                                        <div className="flex flex-col gap-7">
                                            {/* Email */}
                                            <div className="flex flex-row gap-4 items-start">
                                                <div className="p-3 bg-shelter-honey rounded-full flex items-center justify-center">
                                                    {/* Email Icon Placeholder */}
                                                    <span className="w-6 h-5 block bg-shelter-charcoal rounded" />
                                                </div>
                                                <div>
                                                    <div className="text-shelter-white text-lg font-medium font-['Public_Sans']">Email</div>
                                                    {getEmails().map((email, idx) => (
                                                      <div key={idx} className="text-shelter-gray text-base font-normal font-['Public_Sans']">{email}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Phone */}
                                            <div className="flex flex-row gap-4 items-start">
                                                <div className="p-3 bg-shelter-honey rounded-full flex items-center justify-center">
                                                    {/* Phone Icon Placeholder */}
                                                    <span className="w-5 h-5 block bg-shelter-charcoal rounded" />
                                                </div>
                                                <div>
                                                    <div className="text-shelter-white text-lg font-medium font-['Public_Sans']">Phone</div>
                                                    <div className="text-shelter-gray text-base font-normal font-['Public_Sans']">{contactInfo.contact_phone}</div>
                                                    <div className="text-shelter-gray/70 text-sm font-normal font-['Public_Sans']">Mon-Fri, 9AM-6PM EST</div>
                                                </div>
                                            </div>
                                            {/* Address */}
                                            <div className="flex flex-row gap-4 items-start">
                                                <div className="p-3 bg-shelter-honey rounded-full flex items-center justify-center">
                                                    {/* Address Icon Placeholder */}
                                                    <span className="w-5 h-6 block bg-shelter-charcoal rounded" />
                                                </div>
                                                <div>
                                                    <div className="text-shelter-white text-lg font-medium font-['Public_Sans']">Address</div>
                                                    {getAddressLines().map((line, idx) => (
                                                      <div key={idx} className="text-shelter-gray text-base font-normal font-['Public_Sans']">{line}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Office Hours */}
                                    <div className="bg-shelter-charcoal rounded-lg shadow-lg p-6 flex flex-col gap-4 ring-1 ring-shelter-honey/20">
                                        <div className="text-shelter-white text-2xl font-medium font-['Roboto']">Office Hours</div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row justify-between">
                                                <span className="text-shelter-gray text-base font-normal font-['Public_Sans']">Monday - Friday</span>
                                                <span className="text-shelter-white text-base font-medium font-['Public_Sans']">{contactInfo.office_hours_weekday}</span>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <span className="text-shelter-gray text-base font-normal font-['Public_Sans']">Saturday</span>
                                                <span className="text-shelter-white text-base font-medium font-['Public_Sans']">{contactInfo.office_hours_saturday}</span>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <span className="text-shelter-gray text-base font-normal font-['Public_Sans']">Sunday</span>
                                                <span className="text-shelter-gray/70 text-base font-normal font-['Public_Sans']">{contactInfo.office_hours_sunday}</span>
                                            </div>
                                            <div className="pt-4 border-t border-shelter-honey/20">
                                                <span className="text-shelter-gray text-sm font-normal font-['Public_Sans']">All times are {contactInfo.office_hours_timezone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Follow Us */}
                                    <div className="bg-shelter-charcoal rounded-lg shadow-lg p-6 flex flex-col gap-7 ring-1 ring-shelter-honey/20">
                                        <div className="text-shelter-white text-2xl font-medium font-['Roboto']">Follow Us</div>
                                        <SocialMediaLinks 
                                          iconSize={18}
                                          containerClassName="flex flex-row gap-4 items-center flex-wrap"
                                          iconClassName="w-6 h-6 flex items-center justify-center bg-shelter-slate rounded-full text-shelter-white hover:bg-shelter-honey hover:text-shelter-charcoal transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  return (
    <>
      <SEO 
        title="Contact Us | Shelter House Music"
        description="Get in touch with Shelter House Music. Contact us for inquiries about our ministry, artist submissions, press & media, or general questions. We're here to serve you."
        keywords="contact shelter house music, christian music ministry contact, artist submissions, worship music inquiries, ministry contact information, church music support"
        url="https://shelterhousemusic.com/contact"
      />
      <ZoomFit>
      <section>
        <div className='Mobile block md:hidden lg:hidden xl:hidden pt-[3%]'>
            {renderContactMobile()}
        </div>
        <div className='Tablet hidden md:block lg:hidden xl:hidden'>
            {renderContactTablet()}
        </div>
        <div className='Desktop hidden md:hidden lg:block xl:block'>
            {renderContactDesktop()}
        </div>
        <div className="Laptop hidden md:hidden lg:hidden xl:hidden">
            {renderContactLaptop()}
        </div>
    
        
    </section>
    </ZoomFit>
    </>
  );
};

export default Contact;
