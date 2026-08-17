import React from 'react';
import { Hero } from '../components/Hero';
import { CuisineStrip } from '../components/CuisineStrip';
import { About } from '../components/About';
import { FeaturedDishes } from '../components/FeaturedDishes';
import { ChefSpecials } from '../components/ChefSpecials';
import { NewDishes } from '../components/NewDishes';
import { Gallery } from '../components/Gallery';
import { Reviews } from '../components/Reviews';
import { Instagram } from '../components/Instagram';
import { Contact } from '../components/Contact';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div id="home-page-container">
      <Hero
        onExploreMenu={() => onNavigate('menu')}
        onOrderTakeaway={() => onNavigate('menu')}
      />
      <CuisineStrip />
      <About onExploreMenu={() => onNavigate('menu')} />
      <FeaturedDishes onViewAllMenu={() => onNavigate('menu')} />
      <ChefSpecials onViewAllMenu={() => onNavigate('menu')} />
      <NewDishes />
      <Gallery />
      <Reviews />
      <Instagram />
      <Contact />
    </div>
  );
};
