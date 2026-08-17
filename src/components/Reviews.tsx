import React from 'react';
import { RESTAURANT_INFO } from '../data/menu';
import { Star, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews-section" className="py-20 bg-[#15100F] border-t border-[#3A2E2C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F1716] border border-[#C9A45C]/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#5A0F18]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Overall Rating Display */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 text-center lg:text-left space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A0F18] border border-[#C9A45C]/40 text-xs font-semibold uppercase tracking-widest text-[#FAF6EE]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                Google Verified Rating
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="font-serif text-6xl sm:text-7xl font-bold text-[#FAF6EE]">
                  {RESTAURANT_INFO.googleRating}
                </span>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                    <Star className="w-5 h-5 fill-amber-400/50 text-amber-400" />
                  </div>
                  <span className="text-sm font-semibold text-[#D1C7BD] block">
                    out of 5.0 Stars
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#9E9288] leading-relaxed">
                Based on <strong className="text-[#FAF6EE] font-bold">{RESTAURANT_INFO.googleReviewsCount} Google Reviews</strong> from diners and takeaway customers across Bhusawal and Maharashtra.
              </p>

              <div className="pt-2">
                <a
                  id="view-google-reviews-btn"
                  href={`https://www.google.com/search?q=Tawakkal+Hind+Restaurant+Bhusawal+reviews`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#5A0F18] hover:bg-[#7B1724] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] transition-all shadow-md cursor-pointer"
                >
                  <span>View Google Reviews</span>
                  <ExternalLink className="w-4 h-4 text-[#C9A45C]" />
                </a>
              </div>
            </motion.div>

            {/* Right: Authentic Quality Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="bg-[#15100F] border border-[#3A2E2C] p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-[#C9A45C] mb-2 font-serif font-bold text-base">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Authentic Taste
                </div>
                <p className="text-xs text-[#9E9288] leading-relaxed font-light">
                  Known for hand-layered Dum Biryanis, rich Mughlai handi preparations, and traditional slow-cooked shorba recipes.
                </p>
              </div>

              <div className="bg-[#15100F] border border-[#3A2E2C] p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-[#C9A45C] mb-2 font-serif font-bold text-base">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Smoky Tandoor
                </div>
                <p className="text-xs text-[#9E9288] leading-relaxed font-light">
                  Clay-oven charred tikkas, seekh kebabs, and whole tandoori platters roasted fresh on charcoal skewers.
                </p>
              </div>

              <div className="bg-[#15100F] border border-[#3A2E2C] p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-[#C9A45C] mb-2 font-serif font-bold text-base">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Reliable Takeaway
                </div>
                <p className="text-xs text-[#9E9288] leading-relaxed font-light">
                  Carefully packed takeaway orders with minimum ₹140 ordering flexibility for quick home pickups.
                </p>
              </div>

              <div className="bg-[#15100F] border border-[#3A2E2C] p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-[#C9A45C] mb-2 font-serif font-bold text-base">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Extensive Variety
                </div>
                <p className="text-xs text-[#9E9288] leading-relaxed font-light">
                  Over 100+ vegetarian, egg, and non-vegetarian selections spanning Indian, Mughlai, and Indo-Chinese culinary crafts.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
