
import React from 'react';
import KineticHomepage from '@/components/KineticHomepage';
import LanguageSelector from '@/components/LanguageSelector';

const Home = () => {
  return (
    <div className="relative">
      {/* Language Selector overlay */}
      <div className="fixed top-8 right-8 z-50">
        <LanguageSelector />
      </div>
      
      {/* Kinetic homepage experience */}
      <KineticHomepage />
    </div>
  );
};

export default Home;
