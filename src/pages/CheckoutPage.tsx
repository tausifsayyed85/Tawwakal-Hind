import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency, RESTAURANT_INFO } from '../data/menu';
import { OrderDetails } from '../types';
import { ShoppingBag, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck, Phone, User, Mail, MessageSquare, Loader2 } from 'lucide-react';
import { submitTakeawayOrderFormspree } from '../services/formspree';
import confetti from 'canvas-confetti';

interface CheckoutPageProps {
  onNavigateToSuccess: () => void;
  onNavigateToMenu: () => void;
  onNavigateToCart: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onNavigateToSuccess,
  onNavigateToMenu,
  onNavigateToCart,
}) => {
  const { cart, subtotal, minOrderReached, clearCart, setLastOrder, addToast } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, render redirect prompt
  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 bg-[#15100F] min-h-screen text-[#F7F0E3] flex items-center justify-center px-4">
        <div className="bg-[#1F1716] border border-[#3A2E2C] rounded-3xl p-10 text-center max-w-md w-full shadow-2xl">
          <ShoppingBag className="w-12 h-12 text-[#C9A45C] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#FAF6EE] mb-2">No Items to Checkout</h2>
          <p className="text-xs text-[#9E9288] mb-6 leading-relaxed">
            Your cart is currently empty. Please add some delicious dishes from our menu first.
          </p>
          <button
            onClick={onNavigateToMenu}
            className="w-full py-3.5 px-4 rounded-xl bg-[#5A0F18] hover:bg-[#7B1724] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] transition-all cursor-pointer"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: { fullName?: string; phone?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Phone number is required';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!minOrderReached) {
      addToast(`Minimum takeaway order amount is ${formatCurrency(RESTAURANT_INFO.minOrderAmount)}`, 'warning');
      return;
    }

    if (!validate()) {
      addToast('Please complete all required fields', 'warning');
      return;
    }

    setIsSubmitting(true);

    // Generate reliable Order ID format: TH-YYYYMMDD-XXXX
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const generatedOrderId = `TH-${dateStr}-${randomCode}`;

    const orderData: OrderDetails = {
      orderId: generatedOrderId,
      customerName: fullName.trim(),
      phoneNumber: phone.trim(),
      email: email.trim() || undefined,
      orderType: 'Takeaway',
      specialInstructions: specialInstructions.trim() || undefined,
      items: [...cart],
      subtotal,
      total: subtotal,
      createdAt: now.toISOString(),
    };

    // Submit to Formspree endpoint (https://formspree.io/f/xyegnvoe)
    try {
      await submitTakeawayOrderFormspree(orderData);
    } catch (err) {
      console.warn('Formspree background sync notice:', err);
    }

    // Save order in state and clear active cart
    setLastOrder(orderData);
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A45C', '#5A0F18', '#FAF6EE', '#A95132'],
      });
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    onNavigateToSuccess();
  };

  return (
    <div id="checkout-page-container" className="pt-28 pb-24 bg-[#15100F] min-h-screen text-[#F7F0E3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back button */}
        <button
          onClick={onNavigateToCart}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#C9A45C] hover:text-[#FAF6EE] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>

        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold">
            Takeaway Order Details
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6EE] mt-1">
            Complete Your Takeaway Request
          </h1>
          <p className="text-xs text-[#9E9288] mt-1">
            Fill in your contact information below to prepare your order for pickup at our Bhusawal outlet.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customer Details Form Column */}
          <div className="lg:col-span-7 bg-[#1F1716] border border-[#3A2E2C] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#FAF6EE] pb-3 border-b border-[#3A2E2C] flex items-center justify-between">
              <span>Customer Information</span>
              <span className="text-xs text-[#C9A45C] font-sans font-semibold bg-[#15100F] px-3 py-1 rounded-full border border-[#C9A45C]/30">
                Takeaway Pickup
              </span>
            </h2>

            {/* Full Name */}
            <div>
              <label htmlFor="customer-name" className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Full Name *</span>
              </label>
              <input
                id="customer-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sayyed"
                required
                className={`w-full bg-[#15100F] border ${
                  errors.fullName ? 'border-rose-500' : 'border-[#3A2E2C]'
                } focus:border-[#C9A45C] rounded-xl px-4 py-3 text-sm text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors`}
              />
              {errors.fullName && (
                <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="customer-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Phone Number *</span>
              </label>
              <input
                id="customer-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 081800 81236 or 9876543210"
                required
                className={`w-full bg-[#15100F] border ${
                  errors.phone ? 'border-rose-500' : 'border-[#3A2E2C]'
                } focus:border-[#C9A45C] rounded-xl px-4 py-3 text-sm text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors`}
              />
              {errors.phone && (
                <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              )}
              <span className="text-[11px] text-[#756B63] mt-1 block">
                We will call this number if we need to confirm pickup time or instructions.
              </span>
            </div>

            {/* Email (Optional) */}
            <div>
              <label htmlFor="customer-email" className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#9E9288]" />
                <span>Email Address (Optional)</span>
              </label>
              <input
                id="customer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. customer@example.com"
                className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl px-4 py-3 text-sm text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors"
              />
            </div>

            {/* Special Instructions */}
            <div>
              <label htmlFor="special-instructions" className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Special Cooking / Packaging Instructions</span>
              </label>
              <textarea
                id="special-instructions"
                rows={3}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Medium spicy, extra green chutney, pack disposable spoons..."
                className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl px-4 py-3 text-sm text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Pickup Location Info Box */}
            <div className="bg-[#15100F] border border-[#3A2E2C] rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-[#FAF6EE] block mb-0.5">Takeaway Counter Pickup</strong>
                <p className="text-[#9E9288] leading-relaxed">
                  {RESTAURANT_INFO.address}. Open Daily {RESTAURANT_INFO.openingHours}. Pay upon pickup or via UPI/Cash at counter.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-[#1F1716] border border-[#3A2E2C] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#FAF6EE] pb-3 border-b border-[#3A2E2C]">
              Order Summary
            </h2>

            {/* Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(({ item, quantity }) => (
                <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-[#2A201E]">
                  <div className="flex-1 pr-2">
                    <span className="font-medium text-[#FAF6EE] block truncate">{item.name}</span>
                    <span className="text-[#9E9288]">Qty: {quantity} × {formatCurrency(item.price)}</span>
                  </div>
                  <span className="font-bold text-[#C9A45C] shrink-0">
                    {formatCurrency(item.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculation Totals */}
            <div className="space-y-2.5 pt-3 border-t border-[#3A2E2C] text-xs">
              <div className="flex justify-between text-[#9E9288]">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
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

            {/* Submit Button */}
            <button
              id="confirm-takeaway-order-btn"
              type="submit"
              disabled={isSubmitting || !minOrderReached}
              className={`w-full py-4 px-4 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all shadow-xl ${
                minOrderReached && !isSubmitting
                  ? 'bg-gradient-to-r from-[#5A0F18] via-[#7B1724] to-[#5A0F18] hover:from-[#7B1724] hover:to-[#5A0F18] text-[#FAF6EE] border border-[#C9A45C]/60 hover:shadow-[#C9A45C]/20 cursor-pointer'
                  : 'bg-[#241B1A] text-[#756B63] border border-[#3A2E2C] cursor-not-allowed opacity-60'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 text-[#C9A45C] animate-spin" />
                  <span>Processing & Sending Order...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                  <span>Confirm Takeaway Order</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
