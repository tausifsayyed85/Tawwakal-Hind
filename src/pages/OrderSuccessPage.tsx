import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO, formatCurrency } from '../data/menu';
import { CheckCircle, Phone, MessageSquare, ArrowLeft, MapPin, Clock, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrderSuccessPageProps {
  onNavigateToMenu: () => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ onNavigateToMenu }) => {
  const { lastOrder, addToast } = useCart();
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#C9A45C', '#5A0F18', '#FAF6EE', '#D1C7BD'],
      });
    } catch {
      // ignore
    }
  }, []);

  if (!lastOrder) {
    return (
      <div className="pt-32 pb-24 bg-[#15100F] min-h-screen text-[#F7F0E3] flex items-center justify-center px-4">
        <div className="bg-[#1F1716] border border-[#3A2E2C] rounded-3xl p-10 text-center max-w-md w-full shadow-2xl">
          <CheckCircle className="w-12 h-12 text-[#C9A45C] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#FAF6EE] mb-2">No Active Order Found</h2>
          <p className="text-xs text-[#9E9288] mb-6 leading-relaxed">
            You haven't placed an order yet in this session.
          </p>
          <button
            onClick={onNavigateToMenu}
            className="w-full py-3.5 px-4 rounded-xl bg-[#5A0F18] hover:bg-[#7B1724] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] transition-all cursor-pointer"
          >
            Explore Menu
          </button>
        </div>
      </div>
    );
  }

  // Pre-format WhatsApp Message
  const itemsText = lastOrder.items
    .map((item) => `• ${item.item.name} x${item.quantity} - ${formatCurrency(item.item.price * item.quantity)}`)
    .join('\n');

  const whatsappMessage = encodeURIComponent(
    `*TAWAKKAL HIND TAKEAWAY ORDER*\n` +
      `Order ID: ${lastOrder.orderId}\n` +
      `Customer Name: ${lastOrder.customerName}\n` +
      `Phone: ${lastOrder.phoneNumber}\n` +
      (lastOrder.specialInstructions ? `Special Instructions: ${lastOrder.specialInstructions}\n` : '') +
      `\n*Items:*\n${itemsText}\n\n` +
      `*Total Amount:* ${formatCurrency(lastOrder.total)}\n` +
      `Order Type: Takeaway Pickup`
  );

  const cleanRestaurantPhone = RESTAURANT_INFO.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/91${cleanRestaurantPhone.replace(/^0/, '')}?text=${whatsappMessage}`;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(lastOrder.orderId);
    setCopied(true);
    addToast('Order ID copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="order-success-page-container" className="pt-28 pb-24 bg-[#15100F] min-h-screen text-[#F7F0E3]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner */}
        <div className="bg-[#1F1716] border border-[#C9A45C]/50 rounded-3xl p-6 sm:p-10 text-center shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#5A0F18]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-full bg-[#5A0F18] border border-[#C9A45C] flex items-center justify-center text-[#C9A45C] mx-auto mb-4 shadow-xl">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold block mb-1">
            Thank you for ordering
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6EE] mb-2">
            Order Received!
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9288] max-w-md mx-auto leading-relaxed">
            Your takeaway order has been logged. Our kitchen at Tawakkal Hind is preparing your fresh dishes.
          </p>

          {/* Order ID Badge */}
          <div className="inline-flex items-center gap-3 bg-[#15100F] border border-[#C9A45C]/40 px-4 py-2 rounded-xl mt-6">
            <span className="text-xs text-[#9E9288]">Order ID:</span>
            <span className="text-sm font-mono font-bold text-[#FAF6EE]">{lastOrder.orderId}</span>
            <button
              onClick={handleCopyOrderId}
              className="text-[#9E9288] hover:text-[#C9A45C] p-1 cursor-pointer transition-colors"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Action Buttons: WhatsApp & Call */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            id="success-whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Order on WhatsApp</span>
          </a>

          <a
            id="success-call-btn"
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="py-4 px-6 rounded-2xl bg-[#5A0F18] hover:bg-[#7B1724] border border-[#C9A45C]/60 text-[#FAF6EE] font-medium text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all"
          >
            <Phone className="w-4 h-4 text-[#C9A45C]" />
            <span>Call Restaurant ({RESTAURANT_INFO.phone})</span>
          </a>
        </div>

        {/* Order Details & Summary Breakdown */}
        <div className="bg-[#1F1716] border border-[#3A2E2C] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <h2 className="font-serif text-lg font-bold text-[#FAF6EE] pb-3 border-b border-[#3A2E2C]">
            Takeaway Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[#9E9288]">Customer Name</span>
              <p className="text-sm font-semibold text-[#FAF6EE]">{lastOrder.customerName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[#9E9288]">Phone Number</span>
              <p className="text-sm font-semibold text-[#FAF6EE]">{lastOrder.phoneNumber}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[#9E9288]">Order Type</span>
              <p className="text-sm font-semibold text-[#C9A45C]">Takeaway Pickup</p>
            </div>
            <div className="space-y-1">
              <span className="text-[#9E9288]">Placed At</span>
              <p className="text-sm text-[#FAF6EE]">
                {new Date(lastOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {lastOrder.specialInstructions && (
            <div className="bg-[#15100F] border border-[#3A2E2C] rounded-xl p-3.5 text-xs">
              <span className="text-[#9E9288] block mb-1">Special Instructions:</span>
              <p className="text-[#FAF6EE] italic">{lastOrder.specialInstructions}</p>
            </div>
          )}

          {/* Itemized list */}
          <div className="pt-3 border-t border-[#3A2E2C] space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#9E9288] font-semibold block">
              Items Ordered
            </span>
            {lastOrder.items.map(({ item, quantity }) => (
              <div key={item.id} className="flex justify-between items-center text-xs py-1">
                <span className="text-[#FAF6EE]">
                  {item.name} <strong className="text-[#9E9288]">×{quantity}</strong>
                </span>
                <span className="font-bold text-[#C9A45C]">
                  {formatCurrency(item.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="pt-4 border-t border-[#3A2E2C] flex justify-between items-baseline">
            <span className="font-serif text-base font-bold text-[#FAF6EE]">Total Amount</span>
            <span className="text-2xl font-bold text-[#C9A45C]">{formatCurrency(lastOrder.total)}</span>
          </div>

          {/* Pickup Address info */}
          <div className="pt-4 border-t border-[#3A2E2C] flex items-start gap-3 text-xs text-[#9E9288]">
            <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
            <p>
              Please pick up your order at <strong className="text-[#FAF6EE]">{RESTAURANT_INFO.address}</strong>. Open Daily {RESTAURANT_INFO.openingHours}.
            </p>
          </div>
        </div>

        {/* Back to Menu CTA */}
        <div className="text-center mt-8">
          <button
            id="order-success-back-menu-btn"
            onClick={onNavigateToMenu}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A45C] hover:text-[#FAF6EE] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Order More Dishes / Back to Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
