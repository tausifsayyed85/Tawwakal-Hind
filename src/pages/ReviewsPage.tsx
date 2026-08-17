import React from 'react';
import { Reviews } from '../components/Reviews';
import { Star, ShieldCheck, MessageSquare, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

export const ReviewsPage: React.FC = () => {
  return (
    <div id="reviews-page-container" className="pt-28 pb-24 bg-[#15100F] min-h-screen text-[#F7F0E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A0F18] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-widest text-[#FAF6EE] mb-3 shadow">
            <Star className="w-3.5 h-3.5 text-[#C9A45C]" />
            Patron Feedback
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF6EE]">
            Customer <span className="text-[#C9A45C]">Reviews</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9288] mt-3 font-light leading-relaxed">
            Rated 3.9 Stars by 395+ verified Google reviewers in Bhusawal and across Maharashtra.
          </p>
        </div>
      </div>

      <Reviews />
    </div>
  );
};
