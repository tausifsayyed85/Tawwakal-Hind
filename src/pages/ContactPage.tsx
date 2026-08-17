import React from 'react';
import { Contact } from '../components/Contact';
import { MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div id="contact-page-container" className="pt-28 pb-24 bg-[#15100F] min-h-screen text-[#F7F0E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A0F18] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-widest text-[#FAF6EE] mb-3 shadow">
            <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
            Get In Touch
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF6EE]">
            Contact & <span className="text-[#C9A45C]">Location</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9288] mt-3 font-light leading-relaxed">
            Have questions about group orders, takeaway pickup, or daily chef specials? We are here to assist you.
          </p>
        </div>
      </div>

      <Contact />
    </div>
  );
};
