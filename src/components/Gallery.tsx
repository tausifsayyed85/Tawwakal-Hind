import React, { useState } from 'react';
import { Camera, Maximize2, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import biryaniDishImg from '../assets/images/biryani_dish_1786974816212.jpg';
import tandooriDishImg from '../assets/images/tandoori_dish_1786974827278.jpg';
import paneerTikkaDishImg from '../assets/images/paneer_tikka_dish_1786974837015.jpg';
import butterChickenDishImg from '../assets/images/butter_chicken_dish_1786974847441.jpg';
import heroFeastImg from '../assets/images/hero_tawakkal_feast_1786974802498.jpg';

export const Gallery: React.FC = () => {
  const [activeLightboxImg, setActiveLightboxImg] = useState<{ src: string; title: string; category: string } | null>(null);

  const galleryItems = [
    {
      src: heroFeastImg,
      title: 'Tawakkal Hind Grand Mughlai Feast',
      category: 'Banquet Spread',
      span: 'col-span-1 md:col-span-2 row-span-2',
    },
    {
      src: biryaniDishImg,
      title: 'Handi Chicken Dum Biryani',
      category: 'Signature Dum Rice',
      span: 'col-span-1',
    },
    {
      src: tandooriDishImg,
      title: 'Charcoal Clay Oven Tandoori Chicken',
      category: 'Tandoor Grill',
      span: 'col-span-1',
    },
    {
      src: paneerTikkaDishImg,
      title: 'Charred Spiced Paneer Tikka',
      category: 'Vegetarian Tandoor',
      span: 'col-span-1',
    },
    {
      src: butterChickenDishImg,
      title: 'Murgh Makhani Butter Chicken',
      category: 'Royal Curry',
      span: 'col-span-1',
    },
    {
      src: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      title: 'Indo-Chinese Sizzling Starters',
      category: 'Wok Specialties',
      span: 'col-span-1 md:col-span-2',
    },
    {
      src: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
      title: 'Traditional Sweet & Salted Lassi',
      category: 'Beverages',
      span: 'col-span-1',
    },
  ];

  return (
    <section id="gallery-section" className="py-20 bg-[#F7F0E3] text-[#15100F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A0F18]/10 text-[#5A0F18] border border-[#5A0F18]/20 text-xs font-semibold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-[#5A0F18]" />
            Visual Feast
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#15100F]">
            Culinary <span className="text-[#5A0F18]">Gallery</span>
          </h2>
          <p className="text-sm text-[#5A4E46] mt-3 font-normal">
            A glimpse of our vibrant dishes, sizzling tandoor skewers, rich curries, and handcrafted specialties.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[220px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setActiveLightboxImg(item)}
              className={`relative rounded-2xl overflow-hidden shadow-lg border border-[#E2D6C3] group bg-[#15100F] cursor-pointer ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A45C] block mb-1">
                  {item.category}
                </span>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold">{item.title}</h4>
                  <div className="w-8 h-8 rounded-full bg-[#5A0F18] border border-[#C9A45C]/60 flex items-center justify-center">
                    <Maximize2 className="w-4 h-4 text-[#C9A45C]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImg && (
          <div
            id="gallery-lightbox-modal"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveLightboxImg(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-[#1F1716] border border-[#C9A45C]/40 rounded-2xl overflow-hidden shadow-2xl text-[#FAF6EE]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveLightboxImg(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-[#C9A45C]/40 flex items-center justify-center text-white hover:bg-[#C9A45C] hover:text-[#15100F] transition-all"
                aria-label="Close image lightbox"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeLightboxImg.src}
                  alt={activeLightboxImg.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>
              <div className="p-5 border-t border-[#3A2E2C] flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold">
                    {activeLightboxImg.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#FAF6EE] mt-0.5">
                    {activeLightboxImg.title}
                  </h3>
                </div>
                <span className="text-xs text-[#9E9288]">Tawakkal Hind • Bhusawal</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
