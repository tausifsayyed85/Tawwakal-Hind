import React from 'react';
import { MENU_ITEMS } from '../data/menu';
import { MenuCard } from './MenuCard';
import { Sparkles, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface FeaturedDishesProps {
  onViewAllMenu: () => void;
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({ onViewAllMenu }) => {
  // Selected high-reputation Bestsellers for the home showcase
  const bestsellers = MENU_ITEMS.filter((item) => item.badge === 'Bestseller').slice(0, 6);

  return (
    <section id="featured-dishes-section" className="py-20 bg-[#15100F] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5A0F18]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A0F18]/50 border border-[#C9A45C]/40 text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Customer Favourites
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAF6EE]">
              Popular & <span className="text-[#C9A45C]">Bestseller</span> Dishes
            </h2>
            <p className="text-sm text-[#9E9288] mt-2 max-w-xl">
              Hand-picked delicacies that our patrons return for again and again. Layered aromatics, rich marinades, and genuine taste.
            </p>
          </div>

          <button
            id="view-all-bestsellers-btn"
            onClick={onViewAllMenu}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A45C] hover:text-[#FAF6EE] transition-colors self-start md:self-auto py-2 group cursor-pointer"
          >
            <span>Explore All Dishes</span>
            <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestsellers.map((dish) => (
            <MenuCard key={dish.id} item={dish} />
          ))}
        </div>
      </div>
    </section>
  );
};
