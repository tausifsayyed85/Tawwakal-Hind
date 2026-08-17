import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menu';
import { ShoppingBag, Menu as MenuIcon, X, Phone, UtensilsCrossed, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { totalItems, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="main-site-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#15100F]/95 backdrop-blur-md border-b border-[#C9A45C]/25 py-3 shadow-xl'
            : 'bg-gradient-to-b from-[#15100F]/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5A0F18] to-[#15100F] border border-[#C9A45C] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-[#C9A45C]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#FAF6EE] group-hover:text-[#C9A45C] transition-colors block leading-none">
                TAWAKKAL HIND
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#C9A45C]/90 font-medium block mt-1">
                Indian • Mughlai • Tandoor
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative text-xs uppercase tracking-widest font-medium transition-colors py-1 cursor-pointer ${
                    isActive ? 'text-[#C9A45C]' : 'text-[#F7F0E3]/85 hover:text-[#FAF6EE]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A45C] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* View Menu CTA Button */}
            <button
              id="nav-view-menu-btn"
              onClick={() => handleNavClick('menu')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5A0F18]/90 hover:bg-[#7B1724] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Explore Menu</span>
            </button>

            {/* Cart Trigger */}
            <button
              id="nav-cart-btn"
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-[#1F1716] border border-[#C9A45C]/40 hover:border-[#C9A45C] text-[#FAF6EE] transition-all shadow-md cursor-pointer hover:bg-[#2A201E]"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5 text-[#C9A45C]" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#5A0F18] border border-[#C9A45C] text-[#FAF6EE] text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-[#1F1716] border border-[#3A2E2C] text-[#F7F0E3] hover:text-[#C9A45C] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[65px] z-30 bg-[#15100F]/98 backdrop-blur-xl border-b border-[#C9A45C]/30 p-6 flex flex-col justify-between md:hidden overflow-y-auto"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#9E9288] block">Navigation</span>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    id={`mobile-nav-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-4 py-3 rounded-xl text-base font-serif font-semibold transition-all ${
                      currentPage === link.id
                        ? 'bg-[#5A0F18] text-[#FAF6EE] border border-[#C9A45C]/50'
                        : 'text-[#F7F0E3] hover:bg-[#1F1716]'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#3A2E2C] space-y-4">
              <div className="text-xs text-[#9E9288] space-y-1">
                <p>Gandhi Nagar, Gadkari Nagar, Bhusawal</p>
                <p>Open Daily • 11:00 AM – 10:30 PM</p>
              </div>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-3 px-4 rounded-xl bg-[#1F1716] border border-[#C9A45C]/40 text-[#FAF6EE] flex items-center justify-center gap-2 text-sm font-medium hover:bg-[#2A201E] transition-all"
              >
                <Phone className="w-4 h-4 text-[#C9A45C]" />
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
