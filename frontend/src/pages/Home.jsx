import React from 'react';
import LatestCollection from '../components/LatestCollection';
import Hero from '../components/Hero';
import BestSeller from '../components/Bestseller';
import OurPolicy from '../components/OurPolicy';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  );
};

export default Home;
