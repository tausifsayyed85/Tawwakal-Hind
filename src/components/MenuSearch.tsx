import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { FoodType } from '../types';

interface MenuSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: FoodType | 'all';
  onTypeChange: (type: FoodType | 'all') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalFound: number;
}

export const MenuSearch: React.FC<MenuSearchProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  totalFound,
}) => {
  const typeFilters: { id: FoodType | 'all'; label: string; dot?: string; activeClass: string }[] = [
    { id: 'all', label: 'All Items', activeClass: 'bg-[#5A0F18] border-[#C9A45C] text-[#FAF6EE]' },
    {
      id: 'veg',
      label: 'Veg',
      dot: 'bg-emerald-500',
      activeClass: 'bg-emerald-950 border-emerald-500 text-emerald-300',
    },
    {
      id: 'egg',
      label: 'Egg',
      dot: 'bg-amber-400',
      activeClass: 'bg-amber-950 border-amber-500 text-amber-300',
    },
    {
      id: 'non-veg',
      label: 'Non-Veg',
      dot: 'bg-rose-600',
      activeClass: 'bg-rose-950 border-rose-500 text-rose-300',
    },
  ];

  return (
    <div className="bg-[#1F1716] border border-[#3A2E2C] rounded-2xl p-4 sm:p-6 shadow-xl mb-8 space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Bar Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-[#9E9288] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="menu-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for dishes (e.g. Biryani, Tikka, Soup, Manchurian)..."
            className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl pl-11 pr-10 py-3 text-sm text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              id="clear-search-query-btn"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9288] hover:text-[#FAF6EE] p-1"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-[#C9A45C]" />
          <span className="text-xs uppercase tracking-wider text-[#9E9288] font-medium hidden sm:inline">
            Sort:
          </span>
          <select
            id="menu-sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] text-xs font-medium text-[#FAF6EE] rounded-xl px-3 py-3 focus:outline-none cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Veg / Egg / Non-Veg Type Badges & Dish Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#3A2E2C]">
        <div className="flex flex-wrap items-center gap-2">
          {typeFilters.map((tf) => {
            const isSelected = selectedType === tf.id;
            return (
              <button
                key={tf.id}
                id={`filter-type-${tf.id}`}
                onClick={() => onTypeChange(tf.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                  isSelected
                    ? tf.activeClass
                    : 'bg-[#15100F] border-[#3A2E2C] text-[#9E9288] hover:text-[#FAF6EE] hover:border-[#C9A45C]/40'
                }`}
              >
                {tf.dot && <span className={`w-2 h-2 rounded-full ${tf.dot}`} />}
                <span>{tf.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-[#9E9288]">
          Showing <strong className="text-[#C9A45C] font-semibold">{totalFound}</strong> {totalFound === 1 ? 'dish' : 'dishes'}
        </div>
      </div>
    </div>
  );
};
