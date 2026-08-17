import React from 'react';
import { Gallery } from '../components/Gallery';
import { Instagram } from '../components/Instagram';
import { Camera } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  return (
    <div id="gallery-page-container" className="pt-28 pb-24 bg-[#15100F] min-h-screen text-[#F7F0E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A0F18] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-widest text-[#FAF6EE] mb-3 shadow">
            <Camera className="w-3.5 h-3.5 text-[#C9A45C]" />
            Photo Collection
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF6EE]">
            Culinary <span className="text-[#C9A45C]">Gallery</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9288] mt-3 font-light leading-relaxed">
            Take a visual tour through our authentic biryanis, sizzling tandoori grills, rich curries, and delightful refreshments.
          </p>
        </div>
      </div>

      <Gallery />
      <Instagram />
    </div>
  );
};
