import React from 'react';
import { MENU_ITEMS } from '../data/menu';
import { MenuCard } from './MenuCard';
import { Sparkles, Crown } from 'lucide-react';
import { motion } from 'motion/react';

interface ChefSpecialsProps {
  onViewAllMenu: () => void;
}

export const ChefSpecials: React.FC<ChefSpecialsProps> = ({ onViewAllMenu }) => {
  const chefSpecials = MENU_ITEMS.filter((item) => item.badge === "Chef's Special").slice(0, 6);

  return (
    <section id="chef-specials-section" className="py-20 bg-[#1F1716] border-y border-[#3A2E2C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A0F18] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-widest text-[#FAF6EE] mb-3 shadow-md">
            <Crown className="w-3.5 h-3.5 text-[#C9A45C]" />
            Signature Recipes
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAF6EE]">
            Chef’s <span className="text-[#C9A45C]">Royal Specials</span>
          </h2>
          <p className="text-sm text-[#9E9288] mt-3 leading-relaxed font-light">
            Masterpieces crafted with artisanal perfection — from slow-cooked bone-marrow mutton shorba to royal Kabsa rice and velvety butter chicken.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {chefSpecials.map((dish) => (
            <MenuCard key={dish.id} item={dish} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            id="chef-specials-view-more-btn"
            onClick={onViewAllMenu}
            className="px-8 py-3.5 rounded-full bg-[#15100F] hover:bg-[#5A0F18] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C9A45C]" />
            <span>Discover All {MENU_ITEMS.filter((i) => i.badge === "Chef's Special").length} Chef Specials</span>
          </button>
        </div>
      </div>
    </section>
  );
};
