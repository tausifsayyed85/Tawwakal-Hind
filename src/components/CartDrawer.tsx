import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency, RESTAURANT_INFO } from '../data/menu';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToMenu,
}) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
    minOrderReached,
    minOrderDeficit,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="cart-drawer-backdrop"
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-[#1F1716] border-l border-[#C9A45C]/30 text-[#F7F0E3] shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-[#3A2E2C] flex items-center justify-between bg-[#15100F]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5A0F18] border border-[#C9A45C]/50 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#C9A45C]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FAF6EE]">Your Takeaway Order</h3>
                <p className="text-xs text-[#9E9288]">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  id="clear-cart-btn"
                  onClick={clearCart}
                  className="text-xs text-[#9E9288] hover:text-rose-400 px-2 py-1 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                id="close-cart-drawer-btn"
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-[#241B1A] border border-[#3A2E2C] flex items-center justify-center text-[#9E9288] hover:text-[#FAF6EE] hover:border-[#C9A45C]/50 transition-all"
                aria-label="Close cart drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Minimum Order Indicator */}
          <div className="px-5 py-2.5 bg-[#15100F]/60 border-b border-[#3A2E2C] text-xs">
            {!minOrderReached ? (
              <div className="flex items-center gap-2 text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  Add <strong className="text-white font-bold">{formatCurrency(minOrderDeficit)}</strong> more to reach minimum order of {formatCurrency(RESTAURANT_INFO.minOrderAmount)}.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                <span>Minimum takeaway order reached ({formatCurrency(RESTAURANT_INFO.minOrderAmount)}). Ready for checkout!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#15100F] border border-[#3A2E2C] flex items-center justify-center text-[#9E9288] mb-4">
                  <ShoppingBag className="w-10 h-10 text-[#C9A45C]/50" />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#FAF6EE] mb-2">Your cart is empty</h4>
                <p className="text-xs text-[#9E9288] max-w-xs mb-6 leading-relaxed">
                  Explore our authentic Indian, Mughlai, Chinese, and Tandoor menu to add your favorite delicacies.
                </p>
                <button
                  id="empty-cart-browse-btn"
                  onClick={() => {
                    closeCart();
                    onNavigateToMenu();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#5A0F18] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] hover:bg-[#7B1724] transition-all shadow-md"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="bg-[#15100F] border border-[#3A2E2C] rounded-xl p-3.5 flex gap-3 items-center hover:border-[#C9A45C]/40 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-[#241B1A] shrink-0 border border-[#3A2E2C]"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.type === 'veg'
                            ? 'bg-emerald-500'
                            : item.type === 'egg'
                            ? 'bg-amber-400'
                            : 'bg-rose-500'
                        }`}
                      />
                      <h4 className="text-sm font-semibold text-[#FAF6EE] truncate">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs text-[#9E9288] mb-2">
                      {formatCurrency(item.price)} each
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-[#3A2E2C] bg-[#1F1716] p-0.5">
                        <button
                          id={`decrease-qty-${item.id}`}
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          className="p-1 rounded text-[#9E9288] hover:text-[#FAF6EE] hover:bg-[#3A2E2C] transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-[#FAF6EE]">
                          {quantity}
                        </span>
                        <button
                          id={`increase-qty-${item.id}`}
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                          className="p-1 rounded text-[#9E9288] hover:text-[#FAF6EE] hover:bg-[#3A2E2C] transition-colors"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#C9A45C]">
                          {formatCurrency(item.price * quantity)}
                        </span>
                        <button
                          id={`remove-item-${item.id}`}
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9E9288] hover:text-rose-400 p-1 transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations and Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#3A2E2C] bg-[#15100F] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#9E9288]">
                  <span>Items Subtotal</span>
                  <span className="text-[#FAF6EE] font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#9E9288]">
                  <span>Order Type</span>
                  <span className="text-[#C9A45C] font-medium">Takeaway Pickup</span>
                </div>
                <div className="pt-2 border-t border-[#3A2E2C] flex justify-between items-baseline">
                  <span className="text-sm font-serif font-bold text-[#FAF6EE]">Total Amount</span>
                  <span className="text-xl font-bold text-[#C9A45C]">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <button
                id="cart-proceed-checkout-btn"
                disabled={!minOrderReached}
                onClick={() => {
                  closeCart();
                  onNavigateToCheckout();
                }}
                className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all shadow-xl ${
                  minOrderReached
                    ? 'bg-gradient-to-r from-[#5A0F18] via-[#7B1724] to-[#5A0F18] hover:from-[#7B1724] hover:to-[#5A0F18] text-[#FAF6EE] border border-[#C9A45C]/60 hover:shadow-[#C9A45C]/20 cursor-pointer'
                    : 'bg-[#241B1A] text-[#756B63] border border-[#3A2E2C] cursor-not-allowed opacity-60'
                }`}
              >
                <span>{minOrderReached ? 'Proceed to Takeaway' : `Min Order ₹140 Required`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
