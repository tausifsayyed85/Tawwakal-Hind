import React from 'react';
import { About } from '../components/About';
import { CuisineStrip } from '../components/CuisineStrip';
import { ChefSpecials } from '../components/ChefSpecials';
import { Sparkles, Utensils, Award, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

interface AboutPageProps {
  onNavigateToMenu: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToMenu }) => {
  return (
    <div id="about-page-container" className="pt-28 pb-24 bg-[#15100F] min-h-screen text-[#F7F0E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A0F18] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-widest text-[#FAF6EE] mb-3 shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            Our Heritage & Passion
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF6EE]">
            About <span className="text-[#C9A45C]">Tawakkal Hind</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9288] mt-3 font-light leading-relaxed">
            A premier Indian, Mughlai, Tandoori & Chinese culinary destination in Bhusawal, Maharashtra.
          </p>
        </div>
      </div>

      <CuisineStrip />
      <About onExploreMenu={onNavigateToMenu} />

      {/* Quick Values / Standards Grid */}
      <section className="py-16 bg-[#1F1716] border-t border-[#3A2E2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#15100F] border border-[#3A2E2C] rounded-2xl p-6">
              <Utensils className="w-8 h-8 text-[#C9A45C] mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#FAF6EE] mb-2">Authentic Recipes</h3>
              <p className="text-xs text-[#9E9288] leading-relaxed">
                Hand-pounded spices, slow-simmered gravies, and traditional dum techniques passed down through classic Mughlai culinary arts.
              </p>
            </div>

            <div className="bg-[#15100F] border border-[#3A2E2C] rounded-2xl p-6">
              <Award className="w-8 h-8 text-[#C9A45C] mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#FAF6EE] mb-2">Fresh Quality Cuts</h3>
              <p className="text-xs text-[#9E9288] leading-relaxed">
                Premium meats, fresh paneer, crisp vegetables, and high-grade basmati rice prepared fresh daily in our hygienic kitchen.
              </p>
            </div>

            <div className="bg-[#15100F] border border-[#3A2E2C] rounded-2xl p-6">
              <Clock className="w-8 h-8 text-[#C9A45C] mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#FAF6EE] mb-2">Quick Takeaway</h3>
              <p className="text-xs text-[#9E9288] leading-relaxed">
                Convenient online takeaway ordering with minimum ₹140 orders, ready for speedy pickup at {RESTAURANT_INFO.address}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChefSpecials onViewAllMenu={onNavigateToMenu} />
    </div>
  );
};
