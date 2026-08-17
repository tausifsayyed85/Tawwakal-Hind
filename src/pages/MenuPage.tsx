import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, CATEGORIES } from '../data/menu';
import { FoodType, MenuItem } from '../types';
import { MenuSearch } from '../components/MenuSearch';
import { MenuFilters } from '../components/MenuFilters';
import { MenuCard } from '../components/MenuCard';
import { Utensils, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MenuPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<FoodType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');

  // Compute total dish counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MENU_ITEMS.length };
    MENU_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered and sorted menu items
  const filteredItems = useMemo(() => {
    let result = [...MENU_ITEMS];

    // Filter by food type (veg, egg, non-veg)
    if (selectedType !== 'all') {
      result = result.filter((item) => item.type === selectedType);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      const targetCategory = CATEGORIES.find((c) => c.id === selectedCategory);
      if (targetCategory) {
        result = result.filter((item) => item.category.toLowerCase() === targetCategory.name.toLowerCase());
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.cuisine.toLowerCase().includes(q)
      );
    }

    // Sort items
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedType, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSortBy('recommended');
  };

  return (
    <div id="menu-page-container" className="pt-28 pb-24 bg-[#15100F] min-h-screen text-[#F7F0E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A0F18] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-widest text-[#FAF6EE] mb-3 shadow">
            <Utensils className="w-3.5 h-3.5 text-[#C9A45C]" />
            Complete Digital Menu
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF6EE] tracking-tight">
            Our <span className="text-[#C9A45C]">Menu</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9288] mt-2 font-light">
            Explore the authentic flavours of Tawakkal Hind. Browse all dishes, filter by type, and add items directly to your takeaway cart.
          </p>
        </div>

        {/* Search Bar & Primary Filters */}
        <MenuSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalFound={filteredItems.length}
        />

        {/* Sticky Horizontal Categories */}
        <MenuFilters
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

        {/* Menu Items Grid or Empty State */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((dish) => (
              <MenuCard key={dish.id} item={dish} />
            ))}
          </div>
        ) : (
          <div className="bg-[#1F1716] border border-[#3A2E2C] rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#15100F] border border-[#3A2E2C] flex items-center justify-center text-[#9E9288] mx-auto mb-4">
              <Utensils className="w-8 h-8 text-[#C9A45C]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#FAF6EE] mb-2">No Dishes Found</h3>
            <p className="text-xs text-[#9E9288] mb-6 leading-relaxed">
              We couldn’t find any dish matching your current search or category filter. Try clearing filters or searching for something else.
            </p>
            <button
              id="clear-menu-filters-btn"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5A0F18] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] hover:bg-[#7B1724] transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#C9A45C]" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
