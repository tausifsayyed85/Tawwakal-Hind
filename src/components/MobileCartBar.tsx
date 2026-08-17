import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../data/menu';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileCartBarProps {
  onOpenCart: () => void;
}

export const MobileCartBar: React.FC<MobileCartBarProps> = ({ onOpenCart }) => {
  const { cart, totalItems, subtotal } = useCart();

  if (cart.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="mobile-cart-floating-bar"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="fixed bottom-3 left-3 right-3 z-40 sm:hidden"
      >
        <button
          onClick={onOpenCart}
          className="w-full bg-[#1F1716] border border-[#C9A45C]/60 rounded-2xl p-3.5 flex items-center justify-between shadow-2xl backdrop-blur-xl text-[#F7F0E3] hover:bg-[#2A201E] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-[#5A0F18] border border-[#C9A45C]/50 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#C9A45C]" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C9A45C] text-[#15100F] text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {totalItems}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs text-[#9E9288] block">Takeaway Cart</span>
              <span className="text-sm font-bold text-[#FAF6EE]">{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C9A45C] bg-[#15100F] px-3.5 py-2 rounded-xl border border-[#C9A45C]/30">
            <span>View Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
