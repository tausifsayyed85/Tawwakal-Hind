import React from 'react';
import { CategoryInfo } from '../types';
import { motion } from 'motion/react';

interface MenuFiltersProps {
  categories: CategoryInfo[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categoryCounts: Record<string, number>;
}

export const MenuFilters: React.FC<MenuFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="sticky top-[68px] z-30 bg-[#15100F]/95 backdrop-blur-md py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-[#3A2E2C] mb-8">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = cat.id === 'all' ? categoryCounts['all'] : (categoryCounts[cat.name] || 0);

          return (
            <button
              key={cat.id}
              id={`cat-pill-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              disabled={!cat.isAvailable && count === 0}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#5A0F18] border-[#C9A45C] text-[#FAF6EE] shadow-md shadow-[#5A0F18]/40'
                  : cat.isAvailable
                  ? 'bg-[#1F1716] border-[#3A2E2C] text-[#D1C7BD] hover:text-[#FAF6EE] hover:border-[#C9A45C]/40'
                  : 'bg-[#15100F]/60 border-[#2A201E] text-[#6B5E55] opacity-50 cursor-not-allowed'
              }`}
            >
              <span>{cat.name}</span>
              {cat.isAvailable ? (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-[#C9A45C] text-[#15100F]'
                      : 'bg-[#15100F] text-[#C9A45C] border border-[#C9A45C]/30'
                  }`}
                >
                  {count}
                </span>
              ) : (
                <span className="text-[9px] px-1.5 py-0.2 text-[#756B63] uppercase tracking-normal">
                  Coming Soon
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
