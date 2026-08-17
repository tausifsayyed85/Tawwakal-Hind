import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MenuItem, CartItem, OrderDetails } from '../types';
import { RESTAURANT_INFO } from '../data/menu';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  minOrderReached: boolean;
  minOrderDeficit: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  selectedFoodModal: MenuItem | null;
  setSelectedFoodModal: (item: MenuItem | null) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'tawakkal_hind_cart_v1';
const LAST_ORDER_KEY = 'tawakkal_hind_last_order_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // LocalStorage fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedFoodModal, setSelectedFoodModal] = useState<MenuItem | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [lastOrder, setLastOrderState] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const setLastOrder = useCallback((order: OrderDetails | null) => {
    setLastOrderState(order);
    try {
      if (order) {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      } else {
        localStorage.removeItem(LAST_ORDER_KEY);
      }
    } catch {
      // ignore
    }
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback(
    (item: MenuItem, quantity = 1) => {
      setCart((prev) => {
        const existingIndex = prev.findIndex((ci) => ci.item.id === item.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        return [...prev, { item, quantity }];
      });
      addToast(`${item.name} added to your cart`, 'success');
    },
    [addToast]
  );

  const updateQuantity = useCallback(
    (itemId: string, newQty: number) => {
      if (newQty <= 0) {
        removeFromCart(itemId);
        return;
      }
      setCart((prev) =>
        prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity: newQty } : ci))
      );
    },
    []
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      setCart((prev) => {
        const target = prev.find((ci) => ci.item.id === itemId);
        if (target) {
          addToast(`Removed ${target.item.name} from cart`, 'info');
        }
        return prev.filter((ci) => ci.item.id !== itemId);
      });
    },
    [addToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const minOrderReached = subtotal >= RESTAURANT_INFO.minOrderAmount;
  const minOrderDeficit = Math.max(0, RESTAURANT_INFO.minOrderAmount - subtotal);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        minOrderReached,
        minOrderDeficit,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        selectedFoodModal,
        setSelectedFoodModal,
        toasts,
        addToast,
        removeToast,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
