import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  return (
    <aside
      aria-label="Notifications"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            id={`toast-${toast.id}`}
            className="pointer-events-auto bg-[#1F1716] border border-[#C9A45C]/40 text-[#F7F0E3] shadow-2xl rounded-xl p-3.5 flex items-center justify-between gap-3 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
              {(toast.type === 'success' || !toast.type) && (
                <CheckCircle2 className="w-5 h-5 text-[#C9A45C] shrink-0" />
              )}
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#9E9288] hover:text-[#F7F0E3] transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </aside>
  );
};
