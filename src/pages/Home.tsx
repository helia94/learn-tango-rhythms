
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 pixelated">
      <div className="max-w-4xl mx-auto">
        {/* Language Selector in top right */}
        <div className="flex justify-end mb-8">
          <LanguageSelector />
        </div>
        
        <div className="text-center">
          <h1 className="boho-title text-6xl md:text-8xl mb-8 font-display">
            TANGO RHYTHM LAB
          </h1>
          
          <div className="boho-panel p-8 mb-12">
            <p className="boho-subtitle text-lg mb-8">
              Welcome to the Tango Rhythm Lab - your interactive space for exploring and creating tango rhythms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/rhythmlab" 
                className="boho-button text-lg px-8 py-4 inline-block"
              >
                Enter Rhythm Lab
              </Link>
              
              <Link 
                to="/rhythmlab/quiz" 
                className="boho-button text-lg px-8 py-4 inline-block"
              >
                {t('quiz.takeQuiz')}
              </Link>
              
              <Link 
                to="/rhythmlab/leaderboard" 
                className="boho-button text-lg px-8 py-4 inline-block"
              >
                {t('leaderboard.viewLeaderboard')}
              </Link>
            </div>
          </div>
          
          <div className="boho-panel p-6">
            <h2 className="boho-subtitle text-xl mb-4">Features</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-burnt-orange mb-2">Interactive Beat Grid</h3>
                <p className="text-sm text-warm-brown">Create and modify tango rhythms with our visual beat grid</p>
              </div>
              <div>
                <h3 className="font-semibold text-burnt-orange mb-2">Rhythm Presets</h3>
                <p className="text-sm text-warm-brown">Explore classic tango patterns and strong beat presets</p>
              </div>
              <div>
                <h3 className="font-semibold text-burnt-orange mb-2">Knowledge Quiz</h3>
                <p className="text-sm text-warm-brown">Test your understanding and compete on the leaderboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
