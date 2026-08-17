import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency, MODAL_FEATURED_IMAGE } from '../data/menu';
import { X, Plus, Minus, ShoppingBag, Sparkles, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FoodModal: React.FC = () => {
  const { selectedFoodModal, setSelectedFoodModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!selectedFoodModal) return null;

  const handleAdd = () => {
    addToCart(selectedFoodModal, quantity);
    setSelectedFoodModal(null);
    setQuantity(1);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'veg':
        return 'border-emerald-500 text-emerald-400 bg-emerald-950/40';
      case 'egg':
        return 'border-amber-500 text-amber-400 bg-amber-950/40';
      case 'non-veg':
      default:
        return 'border-rose-600 text-rose-400 bg-rose-950/40';
    }
  };

  const displayImage = selectedFoodModal.image || MODAL_FEATURED_IMAGE;

  return (
    <AnimatePresence>
      <div
        id="food-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={() => setSelectedFoodModal(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-[#1F1716] border border-[#C9A45C]/30 rounded-2xl overflow-hidden shadow-2xl text-[#F7F0E3]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            id="close-food-modal-btn"
            onClick={() => setSelectedFoodModal(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#15100F]/80 backdrop-blur-md border border-[#C9A45C]/30 flex items-center justify-center text-[#F7F0E3] hover:bg-[#C9A45C] hover:text-[#15100F] transition-all"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dish Image */}
          <div className="relative h-64 sm:h-72 w-full bg-[#15100F] overflow-hidden">
            <img
              src={displayImage}
              alt={selectedFoodModal.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1716] via-transparent to-black/40" />

            {/* Badges on image */}
            <div className="absolute bottom-3 left-4 flex flex-wrap gap-2 items-center">
              {selectedFoodModal.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#5A0F18] text-[#FAF6EE] border border-[#C9A45C]/60 shadow-lg">
                  {selectedFoodModal.badge === "Chef's Special" && <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />}
                  {selectedFoodModal.badge === "Bestseller" && <Flame className="w-3.5 h-3.5 text-amber-400" />}
                  {selectedFoodModal.badge}
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getBadgeColor(
                  selectedFoodModal.type
                )}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedFoodModal.type === 'veg'
                      ? 'bg-emerald-500'
                      : selectedFoodModal.type === 'egg'
                      ? 'bg-amber-400'
                      : 'bg-rose-500'
                  }`}
                />
                {selectedFoodModal.type.toUpperCase()}
              </span>
              {selectedFoodModal.pieces && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#15100F]/90 text-[#C9A45C] border border-[#C9A45C]/30">
                  {selectedFoodModal.pieces}
                </span>
              )}
              {selectedFoodModal.portion && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#15100F]/90 text-[#FAF6EE] border border-white/20">
                  {selectedFoodModal.portion} Portion
                </span>
              )}
            </div>
          </div>

          {/* Dish Details */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="text-xs uppercase font-medium tracking-widest text-[#C9A45C]">
                  {selectedFoodModal.category} • {selectedFoodModal.cuisine} Cuisine
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#FAF6EE] mt-0.5">
                  {selectedFoodModal.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#C9A45C]">
                  {formatCurrency(selectedFoodModal.price)}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#D1C7BD] leading-relaxed mb-6 font-light">
              {selectedFoodModal.description}
            </p>

            {/* Quantity Stepper & Add Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#3A2E2C]">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="text-xs uppercase tracking-wider text-[#9E9288] font-medium">
                  Quantity
                </span>
                <div className="inline-flex items-center rounded-lg border border-[#C9A45C]/40 bg-[#15100F] p-1">
                  <button
                    id="modal-decrease-qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1.5 rounded text-[#FAF6EE] hover:bg-[#3A2E2C] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-[#FAF6EE]">
                    {quantity}
                  </span>
                  <button
                    id="modal-increase-qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 rounded text-[#FAF6EE] hover:bg-[#3A2E2C] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                id="modal-add-to-cart-btn"
                onClick={handleAdd}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#5A0F18] via-[#7B1724] to-[#5A0F18] hover:from-[#7B1724] hover:to-[#5A0F18] text-[#FAF6EE] border border-[#C9A45C]/50 font-medium text-sm shadow-lg hover:shadow-[#C9A45C]/20 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#C9A45C]" />
                <span>
                  Add to Cart • {formatCurrency(selectedFoodModal.price * quantity)}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
