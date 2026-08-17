import React from 'react';
import { Utensils, Flame, Sparkles, Coffee } from 'lucide-react';
import { motion } from 'motion/react';
import tandooriDishImg from '../assets/images/tandoori_dish_1786974827278.jpg';
import biryaniDishImg from '../assets/images/biryani_dish_1786974816212.jpg';

interface AboutProps {
  onExploreMenu: () => void;
}

export const About: React.FC<AboutProps> = ({ onExploreMenu }) => {
  const pillars = [
    {
      icon: <Utensils className="w-5 h-5 text-[#C9A45C]" />,
      title: 'Mughlai & Dum Biryanis',
      description: 'Layered saffron long-grain basmati cooked in authentic dum style with rich whole spices and tender cuts.',
    },
    {
      icon: <Flame className="w-5 h-5 text-[#C9A45C]" />,
      title: 'Charcoal Tandoor',
      description: 'Fresh paneer, succulent chicken, fish, and mutton roasted to smoky perfection in clay ovens.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C9A45C]" />,
      title: 'Wok-Tossed Indo-Chinese',
      description: 'Crispy Manchurian, fiery Schezwan, hot & sour soups, and wok-seared noodles crafted fresh on high flame.',
    },
    {
      icon: <Coffee className="w-5 h-5 text-[#C9A45C]" />,
      title: 'Beverages & Shakes',
      description: 'Refreshing sweet lassi, thick buttermilk, hot masala chai, and cooling drinks to accompany every meal.',
    },
  ];

  return (
    <section id="about-section" className="py-20 bg-[#F7F0E3] text-[#15100F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A0F18]/10 text-[#5A0F18] border border-[#5A0F18]/20 text-xs font-semibold uppercase tracking-widest">
              Authentic Dining in Bhusawal
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#15100F] leading-tight">
              A Celebration of <span className="text-[#5A0F18]">Indian & Mughlai</span> Flavours
            </h2>

            <p className="text-[#5A4E46] text-sm sm:text-base leading-relaxed font-normal">
              Located in Gandhi Nagar, Bhusawal, <strong>Tawakkal Hind</strong> brings together time-honoured culinary traditions. From royal slow-cooked Mughlai curries and fragrant handi dum biryanis to intense charcoal tandoori kebabs and high-heat Indo-Chinese wok specialties, every recipe is crafted with genuine ingredients, hand-pounded spices, and authentic technique.
            </p>

            <p className="text-[#5A4E46] text-sm sm:text-base leading-relaxed font-normal">
              Whether you are craving a comforting bowl of Manchow soup, a full tandoori platter for the family, or our signature Chicken Dum Biryani, our kitchen is dedicated to delivering rich taste, wholesome portions, and a reliable takeaway experience every day.
            </p>

            <div className="pt-2">
              <button
                id="about-explore-menu-btn"
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#5A0F18] hover:bg-[#7B1724] text-[#FAF6EE] text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <span>Browse Full Menu</span>
                <span className="text-[#C9A45C]">→</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Imagery & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Visual Mosaic */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#C9A45C]/30 bg-[#15100F] h-48 sm:h-56">
                <img
                  src={biryaniDishImg}
                  alt="Authentic Dum Biryani"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#C9A45C]/30 bg-[#15100F] h-48 sm:h-56 mt-4">
                <img
                  src={tandooriDishImg}
                  alt="Charcoal Tandoori Chicken"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Feature Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 border border-[#E2D6C3] p-4 rounded-xl shadow-sm hover:border-[#C9A45C] transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#15100F] flex items-center justify-center mb-2.5 shadow">
                    {pillar.icon}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#15100F] mb-1">{pillar.title}</h4>
                  <p className="text-xs text-[#6B5E55] leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
