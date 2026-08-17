import React from 'react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../data/menu';
import { Plus, Minus, ShoppingBag, Sparkles, Flame, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { cart, addToCart, updateQuantity, setSelectedFoodModal } = useCart();

  const cartItem = cart.find((ci) => ci.item.id === item.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const getTypeBadge = () => {
    switch (item.type) {
      case 'veg':
        return {
          label: 'VEG',
          style: 'border-emerald-500 text-emerald-400 bg-emerald-950/60',
          dot: 'bg-emerald-500',
        };
      case 'egg':
        return {
          label: 'EGG',
          style: 'border-amber-500 text-amber-400 bg-amber-950/60',
          dot: 'bg-amber-400',
        };
      case 'non-veg':
      default:
        return {
          label: 'NON-VEG',
          style: 'border-rose-600 text-rose-400 bg-rose-950/60',
          dot: 'bg-rose-500',
        };
    }
  };

  const typeConfig = getTypeBadge();

  return (
    <motion.div
      id={`menu-card-${item.id}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35 }}
      className="group bg-[#1F1716] border border-[#3A2E2C] hover:border-[#C9A45C]/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#C9A45C]/10 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div className="relative h-48 sm:h-52 w-full bg-[#15100F] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 filter brightness-95"
          loading="lazy"
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1716] via-transparent to-black/30" />

        {/* Quick View Overlay Button */}
        <button
          onClick={() => setSelectedFoodModal(item)}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] cursor-pointer"
          aria-label={`View details of ${item.name}`}
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#15100F]/90 text-[#FAF6EE] text-xs font-medium border border-[#C9A45C]/60 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-[#C9A45C]" />
            Quick View
          </span>
        </button>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
          {/* Veg/Non-Veg Tag */}
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider border shadow-md ${typeConfig.style}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${typeConfig.dot}`} />
            {typeConfig.label}
          </span>

          {/* Bestseller / Chef's Special / New Tag */}
          {item.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#5A0F18] text-[#FAF6EE] border border-[#C9A45C]/70 shadow-lg">
              {item.badge === "Chef's Special" && <Sparkles className="w-3 h-3 text-[#C9A45C]" />}
              {item.badge === 'Bestseller' && <Flame className="w-3 h-3 text-amber-400" />}
              {item.badge}
            </span>
          )}
        </div>

        {/* Pieces / Portion Tag */}
        {(item.pieces || item.portion) && (
          <div className="absolute bottom-2.5 right-3 pointer-events-none">
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#15100F]/90 text-[#C9A45C] border border-[#C9A45C]/30 shadow">
              {item.pieces || `${item.portion} Portion`}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              onClick={() => setSelectedFoodModal(item)}
              className="font-serif text-base sm:text-lg font-bold text-[#FAF6EE] group-hover:text-[#C9A45C] transition-colors leading-snug cursor-pointer line-clamp-1"
            >
              {item.name}
            </h3>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[#C9A45C]/80 font-medium block mb-2">
            {item.category}
          </span>
          <p className="text-xs text-[#9E9288] leading-relaxed line-clamp-2 mb-4 font-light">
            {item.description}
          </p>
        </div>

        {/* Card Footer: Price & Add to Cart Controls */}
        <div className="pt-3 border-t border-[#3A2E2C] flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-[#9E9288] block -mb-0.5">Price</span>
            <span className="text-lg font-bold text-[#FAF6EE]">{formatCurrency(item.price)}</span>
          </div>

          {quantityInCart > 0 ? (
            <div className="inline-flex items-center rounded-xl border border-[#C9A45C]/60 bg-[#15100F] p-1 shadow-inner">
              <button
                id={`card-decrease-${item.id}`}
                onClick={() => updateQuantity(item.id, quantityInCart - 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#FAF6EE] hover:bg-[#3A2E2C] transition-colors cursor-pointer"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-bold text-[#C9A45C]">
                {quantityInCart}
              </span>
              <button
                id={`card-increase-${item.id}`}
                onClick={() => updateQuantity(item.id, quantityInCart + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#FAF6EE] hover:bg-[#3A2E2C] transition-colors cursor-pointer"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              id={`card-add-${item.id}`}
              onClick={() => addToCart(item, 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5A0F18] hover:bg-[#7B1724] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] transition-all shadow hover:shadow-[#C9A45C]/20 active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
