import React from 'react';
import { MENU_ITEMS } from '../data/menu';
import { MenuCard } from './MenuCard';
import { Sparkles, Star } from 'lucide-react';

export const NewDishes: React.FC = () => {
  const newDishes = MENU_ITEMS.filter((item) => item.badge === 'New');

  if (newDishes.length === 0) return null;

  return (
    <section id="new-dishes-section" className="py-16 bg-[#15100F] border-b border-[#3A2E2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-[#5A0F18] border border-[#C9A45C]/50 flex items-center justify-center">
            <Star className="w-4 h-4 text-[#C9A45C]" />
          </div>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6EE]">
              New on the Menu
            </h2>
            <p className="text-xs text-[#9E9288]">Fresh seasonal creations just added to our clay tandoor lineup.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newDishes.map((dish) => (
            <MenuCard key={dish.id} item={dish} />
          ))}
        </div>
      </div>
    </section>
  );
};
