import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency, RESTAURANT_INFO } from '../data/menu';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, AlertTriangle, ArrowLeft, Sparkles } from 'lucide-react';

interface CartPageProps {
  onNavigateToCheckout: () => void;
  onNavigateToMenu: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigateToCheckout,
  onNavigateToMenu,
}) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
    minOrderReached,
    minOrderDeficit,
  } = useCart();

  return (
    <div id="cart-page-container" className="pt-28 pb-24 bg-[#15100F] min-h-screen text-[#F7F0E3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#3A2E2C]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold">
              Review Your Items
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF6EE] mt-1">
              Your Takeaway Order
            </h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-[#9E9288] hover:text-rose-400 py-1 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-[#1F1716] border border-[#3A2E2C] rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xl">
            <div className="w-20 h-20 rounded-full bg-[#15100F] border border-[#3A2E2C] flex items-center justify-center text-[#9E9288] mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-[#C9A45C]/50" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#FAF6EE] mb-2">Your cart is empty</h3>
            <p className="text-xs text-[#9E9288] mb-6 leading-relaxed">
              Explore our menu and discover delicious biryanis, tandoor specials, and Mughlai curries.
            </p>
            <button
              id="empty-cart-page-browse-btn"
              onClick={onNavigateToMenu}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5A0F18] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] hover:bg-[#7B1724] transition-all shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#C9A45C]" />
              <span>Browse Menu</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items Column */}
            <div className="lg:col-span-7 space-y-4">
              {cart.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="bg-[#1F1716] border border-[#3A2E2C] rounded-2xl p-4 flex gap-4 items-center hover:border-[#C9A45C]/40 transition-all shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover bg-[#15100F] shrink-0 border border-[#3A2E2C]"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.type === 'veg'
                            ? 'bg-emerald-500'
                            : item.type === 'egg'
                            ? 'bg-amber-400'
                            : 'bg-rose-500'
                        }`}
                      />
                      <h3 className="text-sm sm:text-base font-bold text-[#FAF6EE] truncate">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#9E9288] mb-3">
                      {formatCurrency(item.price)} each
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border border-[#3A2E2C] bg-[#15100F] p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          className="p-1 rounded text-[#9E9288] hover:text-[#FAF6EE] hover:bg-[#3A2E2C] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#FAF6EE]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                          className="p-1 rounded text-[#9E9288] hover:text-[#FAF6EE] hover:bg-[#3A2E2C] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#C9A45C]">
                          {formatCurrency(item.price * quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9E9288] hover:text-rose-400 p-1.5 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={onNavigateToMenu}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#C9A45C] hover:text-[#FAF6EE] transition-colors pt-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Add More Dishes from Menu</span>
              </button>
            </div>

            {/* Order Summary & Checkout Action Column */}
            <div className="lg:col-span-5 bg-[#1F1716] border border-[#3A2E2C] rounded-3xl p-6 shadow-2xl space-y-6">
              <h2 className="font-serif text-lg font-bold text-[#FAF6EE] pb-3 border-b border-[#3A2E2C]">
                Order Summary
              </h2>

              {/* Minimum Order Check Alert */}
              <div className="p-3.5 rounded-xl bg-[#15100F] border border-[#3A2E2C] text-xs">
                {!minOrderReached ? (
                  <div className="flex items-start gap-2.5 text-amber-300">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      Add <strong className="text-white font-bold">{formatCurrency(minOrderDeficit)}</strong> more to reach the minimum takeaway order of {formatCurrency(RESTAURANT_INFO.minOrderAmount)}.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                    <span>Minimum order reached! Ready for checkout.</span>
                  </div>
                )}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#9E9288]">
                  <span>Items Count</span>
                  <span className="text-[#FAF6EE] font-medium">{totalItems} items</span>
                </div>
                <div className="flex justify-between text-[#9E9288]">
                  <span>Items Subtotal</span>
                  <span className="text-[#FAF6EE] font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#9E9288]">
                  <span>Order Type</span>
                  <span className="text-[#C9A45C] font-semibold">Takeaway Pickup</span>
                </div>
                <div className="pt-3 border-t border-[#3A2E2C] flex justify-between items-baseline">
                  <span className="text-base font-serif font-bold text-[#FAF6EE]">Total Amount</span>
                  <span className="text-2xl font-bold text-[#C9A45C]">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <button
                id="cart-page-checkout-btn"
                disabled={!minOrderReached}
                onClick={onNavigateToCheckout}
                className={`w-full py-4 px-4 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all shadow-xl ${
                  minOrderReached
                    ? 'bg-gradient-to-r from-[#5A0F18] via-[#7B1724] to-[#5A0F18] hover:from-[#7B1724] hover:to-[#5A0F18] text-[#FAF6EE] border border-[#C9A45C]/60 hover:shadow-[#C9A45C]/20 cursor-pointer'
                    : 'bg-[#241B1A] text-[#756B63] border border-[#3A2E2C] cursor-not-allowed opacity-60'
                }`}
              >
                <span>{minOrderReached ? 'Proceed to Takeaway Checkout' : `Min Order ₹140 Required`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-[#756B63] text-center">
                Pickup location: Gandhi Nagar, Gadkari Nagar, Bhusawal
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
