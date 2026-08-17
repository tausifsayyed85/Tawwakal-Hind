import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FoodModal } from './components/FoodModal';
import { CartDrawer } from './components/CartDrawer';
import { MobileCartBar } from './components/MobileCartBar';
import { BackToTop } from './components/BackToTop';
import { ToastContainer } from './components/ToastContainer';

import { Home } from './pages/Home';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const { openCart } = useCart();

  // Synchronize route with hash for back/forward navigation and link sharing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (
        [
          'home',
          'menu',
          'about',
          'gallery',
          'reviews',
          'contact',
          'cart',
          'checkout',
          'order-success',
        ].includes(hash)
      ) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuPage />;
      case 'about':
        return <AboutPage onNavigateToMenu={() => navigateTo('menu')} />;
      case 'gallery':
        return <GalleryPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return (
          <CartPage
            onNavigateToCheckout={() => navigateTo('checkout')}
            onNavigateToMenu={() => navigateTo('menu')}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            onNavigateToSuccess={() => navigateTo('order-success')}
            onNavigateToMenu={() => navigateTo('menu')}
            onNavigateToCart={() => navigateTo('cart')}
          />
        );
      case 'order-success':
        return <OrderSuccessPage onNavigateToMenu={() => navigateTo('menu')} />;
      case 'home':
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#15100F] text-[#FAF6EE] flex flex-col font-sans selection:bg-[#C9A45C] selection:text-[#15100F]">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      <main className="flex-grow">{renderPage()}</main>

      <Footer onNavigate={navigateTo} />

      {/* Global Interactive Modals & Floating Components */}
      <FoodModal />
      <CartDrawer
        onNavigateToCheckout={() => navigateTo('checkout')}
        onNavigateToCart={() => navigateTo('cart')}
      />
      <MobileCartBar onOpenCart={openCart} />
      <BackToTop />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
