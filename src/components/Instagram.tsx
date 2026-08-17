import React from 'react';
import { RESTAURANT_INFO } from '../data/menu';
import { Instagram as InstagramIcon, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import biryaniDishImg from '../assets/images/biryani_dish_1786974816212.jpg';
import tandooriDishImg from '../assets/images/tandoori_dish_1786974827278.jpg';
import paneerTikkaDishImg from '../assets/images/paneer_tikka_dish_1786974837015.jpg';
import butterChickenDishImg from '../assets/images/butter_chicken_dish_1786974847441.jpg';

export const Instagram: React.FC = () => {
  const posts = [
    {
      img: biryaniDishImg,
      likes: '342',
      comments: '28',
      caption: 'The authentic saffron handi Chicken Dum Biryani at Tawakkal Hind.',
    },
    {
      img: tandooriDishImg,
      likes: '489',
      comments: '41',
      caption: 'Charcoal-fired whole Tandoori Chicken fresh from the clay oven.',
    },
    {
      img: paneerTikkaDishImg,
      likes: '298',
      comments: '19',
      caption: 'Golden charred Paneer Tikka skewers with crisp bell peppers.',
    },
    {
      img: butterChickenDishImg,
      likes: '512',
      comments: '36',
      caption: 'Velvety rich Murgh Makhani Butter Chicken with fresh clotted cream.',
    },
  ];

  return (
    <section id="instagram-section" className="py-20 bg-[#1F1716] border-t border-[#3A2E2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-pink-500/30 text-xs font-semibold uppercase tracking-widest text-[#FAF6EE] mb-3 shadow">
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            Social Community
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6EE]">
            Follow <span className="text-[#C9A45C]">Tawakkal Hind</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#9E9288] mt-2">
            Join our food-loving community on Instagram{' '}
            <a
              href={RESTAURANT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A45C] hover:underline font-medium"
            >
              {RESTAURANT_INFO.instagramHandle}
            </a>
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <motion.a
              key={idx}
              href={RESTAURANT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-[#15100F] border border-[#3A2E2C] block shadow-md hover:border-[#C9A45C]/50 transition-all"
            >
              <img
                src={post.img}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter brightness-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4 text-center text-white">
                <InstagramIcon className="w-6 h-6 text-pink-400" />
                <p className="text-[11px] font-medium line-clamp-2 leading-snug">{post.caption}</p>
                <div className="flex items-center gap-4 text-xs font-semibold text-[#FAF6EE]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            id="instagram-profile-link-btn"
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15100F] hover:bg-[#5A0F18] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] transition-all shadow-md"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            <span>Visit @tawakkal_hind_official</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A45C]" />
          </a>
        </div>
      </div>
    </section>
  );
};
