import React from 'react';
import { HERO_IMAGE, RESTAURANT_INFO, formatCurrency } from '../data/menu';
import { Utensils, ShoppingBag, Clock, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreMenu: () => void;
  onOrderTakeaway: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOrderTakeaway }) => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#15100F]">
      {/* Background with subtle zoom animation */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src={HERO_IMAGE}
          alt="Tawakkal Hind Royal Feast"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 filter brightness-75 contrast-110"
        />
        {/* Layered luxury gradient vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15100F] via-[#15100F]/60 to-[#15100F]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#15100F]/50 to-[#15100F]" />
      </motion.div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Decorative Arch / Crest Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F1716]/90 border border-[#C9A45C]/50 backdrop-blur-md mb-6 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[#F7F0E3]">
            Gandhi Nagar, Bhusawal • Maharashtra
          </span>
        </motion.div>

        {/* Restaurant Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-2"
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium text-[#C9A45C] block mb-1">
            Welcome to
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#FAF6EE] uppercase drop-shadow-2xl">
            TAWAKKAL HIND
          </h1>
        </motion.div>

        {/* Main Headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#E5C378] font-light max-w-2xl mt-2 mb-4 leading-relaxed"
        >
          “Where Tradition Meets Irresistible Flavour.”
        </motion.p>

        {/* Supporting Cuisines */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs sm:text-sm uppercase tracking-widest font-medium text-[#D1C7BD] mb-6 flex flex-wrap justify-center items-center gap-2"
        >
          <span>Indian</span>
          <span className="text-[#C9A45C]">•</span>
          <span>Mughlai</span>
          <span className="text-[#C9A45C]">•</span>
          <span>Chinese</span>
          <span className="text-[#C9A45C]">•</span>
          <span>Tandoor</span>
          <span className="text-[#C9A45C]">•</span>
          <span>Mocktails</span>
        </motion.p>

        {/* Operating Hours & Min Order Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#9E9288] mb-8 bg-[#1F1716]/80 px-4 py-2 rounded-xl border border-[#3A2E2C]"
        >
          <span className="flex items-center gap-1.5 text-[#F7F0E3]">
            <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
            Open Daily • {RESTAURANT_INFO.openingHours}
          </span>
          <span className="hidden sm:inline text-[#3A2E2C]">|</span>
          <span className="flex items-center gap-1.5 text-[#C9A45C] font-medium">
            <ShoppingBag className="w-3.5 h-3.5" />
            {formatCurrency(RESTAURANT_INFO.minOrderAmount)} Minimum Order
          </span>
          <span className="hidden sm:inline text-[#3A2E2C]">|</span>
          <span className="flex items-center gap-1.5 text-[#D1C7BD]">
            <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
            Bhusawal, MH
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#5A0F18] hover:bg-[#7B1724] border border-[#C9A45C]/80 text-[#FAF6EE] text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl hover:shadow-[#C9A45C]/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Utensils className="w-4 h-4 text-[#C9A45C]" />
            <span>Explore Menu</span>
          </button>

          <button
            id="hero-order-takeaway-btn"
            onClick={onOrderTakeaway}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1F1716] hover:bg-[#2A201E] border border-[#C9A45C]/50 text-[#FAF6EE] text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4 text-[#C9A45C]" />
            <span>Order Takeaway</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative Bottom Glow Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent" />
    </section>
  );
};
