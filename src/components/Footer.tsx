import React from 'react';
import { RESTAURANT_INFO } from '../data/menu';
import { UtensilsCrossed, Phone, MapPin, Clock, Instagram as InstagramIcon, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#100C0B] text-[#D1C7BD] border-t border-[#3A2E2C] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#241B1A]">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5A0F18] border border-[#C9A45C] flex items-center justify-center shadow-lg">
                <UtensilsCrossed className="w-5 h-5 text-[#C9A45C]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#FAF6EE]">
                TAWAKKAL HIND
              </span>
            </div>

            <p className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold">
              Indian • Mughlai • Chinese • Tandoor • Mocktails
            </p>

            <p className="text-xs text-[#9E9288] leading-relaxed font-light">
              Where tradition meets irresistible flavour. Savor hand-crafted dum biryanis, clay oven roasted tandoori platters, and authentic curries right here in Bhusawal.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                id="footer-instagram-link"
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1716] border border-[#3A2E2C] hover:border-[#C9A45C] hover:text-[#FAF6EE] flex items-center justify-center text-[#9E9288] transition-all"
                aria-label="Instagram profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FAF6EE]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-[#9E9288] hover:text-[#C9A45C] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-[#9E9288] hover:text-[#C9A45C] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="text-[#9E9288] hover:text-[#C9A45C] transition-colors cursor-pointer"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="text-[#9E9288] hover:text-[#C9A45C] transition-colors cursor-pointer"
                >
                  Culinary Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('reviews')}
                  className="text-[#9E9288] hover:text-[#C9A45C] transition-colors cursor-pointer"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-[#9E9288] hover:text-[#C9A45C] transition-colors cursor-pointer"
                >
                  Contact & Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-[#C9A45C] hover:underline transition-colors cursor-pointer font-medium"
                >
                  Reserve a Table
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Order & Takeaway */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FAF6EE]">
              Order Online
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="text-[#9E9288] hover:text-[#C9A45C] transition-colors cursor-pointer"
                >
                  View Digital Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cart')}
                  className="text-[#9E9288] hover:text-[#C9A45C] transition-colors cursor-pointer"
                >
                  View Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('checkout')}
                  className="text-[#9E9288] hover:text-[#C9A45C] transition-colors cursor-pointer"
                >
                  Takeaway Order
                </button>
              </li>
              <li className="text-[11px] text-[#756B63] pt-1">
                Min. Order: ₹140
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FAF6EE]">
              Contact Details
            </h4>
            <div className="space-y-2.5 text-xs text-[#9E9288]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#FAF6EE] font-medium">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <span>Open Daily • {RESTAURANT_INFO.openingHours}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#756B63]">
          <p>© {new Date().getFullYear()} Tawakkal Hind Restaurant. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for pure culinary excellence in Bhusawal.
          </p>
        </div>
      </div>
    </footer>
  );
};
