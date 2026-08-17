import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const CuisineStrip: React.FC = () => {
  const cuisines = ['INDIAN', 'MUGHLAI', 'CHINESE', 'TANDOOR', 'MOCKTAILS'];

  return (
    <section aria-label="Cuisine Categories" className="relative bg-[#1F1716] border-y border-[#C9A45C]/30 py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-10 text-center"
        >
          {cuisines.map((cuisine, index) => (
            <React.Fragment key={cuisine}>
              <div className="flex items-center gap-2 group">
                <Sparkles className="w-3 h-3 text-[#C9A45C] opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="font-serif text-xs sm:text-sm tracking-[0.25em] font-semibold text-[#FAF6EE] group-hover:text-[#C9A45C] transition-colors">
                  {cuisine}
                </span>
              </div>
              {index < cuisines.length - 1 && (
                <span className="text-[#C9A45C]/40 text-sm hidden sm:inline select-none">◆</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
