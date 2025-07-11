
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Music, Map, Zap, LogIn, User, ChevronDown, ChevronUp } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import SEOHead from '@/components/SEOHead';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import HeaderImage from '@/components/ui/HeaderImage';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  // Set loaded state after a short delay for entrance animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const headerImageUrl = "https://res.cloudinary.com/dl9xg597r/image/upload/q_auto:eco/v1750771704/Cream_Navy_Modern_Fashion_Brand_Email_Header_k3n6gz.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-sandy-beige/30 via-cream to-mushroom/20 text-warm-brown overflow-hidden relative">
      <SEOHead />
      {/* Softer Mid-Century Modern organic shapes background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Large soft terracotta shape in top left */}
        <div 
          className="absolute bg-gradient-to-br from-terracotta/30 to-burnt-orange/20 rounded-full opacity-60" 
          style={{ 
            width: '45%', 
            height: '40%', 
            top: '-5%', 
            left: '-10%',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          }}
        />
        
        {/* Warm brown shape in top right */}
        <div 
          className="absolute bg-gradient-to-bl from-warm-brown/25 to-caramel/15 rounded-full opacity-70" 
          style={{ 
            width: '35%', 
            height: '30%', 
            top: '5%', 
            right: '5%',
            borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%',
          }}
        />
        
        {/* Sandy beige shape in middle right */}
        <div 
          className="absolute bg-gradient-to-l from-sandy-beige/40 to-mushroom/25 rounded-full opacity-50" 
          style={{ 
            width: '25%', 
            height: '40%', 
            top: '35%', 
            right: '-5%',
            borderRadius: '50% 50% 70% 30% / 50% 50% 30% 70%',
          }}
        />
        
        {/* Soft burnt orange shape in bottom left */}
        <div 
          className="absolute bg-gradient-to-tr from-burnt-orange/20 to-terracotta/15 rounded-full opacity-60" 
          style={{ 
            width: '40%', 
            height: '45%', 
            bottom: '-15%', 
            left: '-10%',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          }}
        />
        
        {/* Subtle accent shape */}
        <div 
          className="absolute bg-gradient-to-tl from-sage-green/20 to-deep-teal/10 rounded-full opacity-60" 
          style={{ 
            width: '20%', 
            height: '25%', 
            bottom: '20%', 
            right: '15%',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          }}
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Language Selector */}
        <div className="flex justify-between items-center mb-12 pt-4">
          <div className="text-2xl font-medium tracking-wide">
            <span className="text-sage-green">TANGO</span> <span className="text-burnt-orange/80">A DIARIO</span>
          </div>
          <LanguageSelector />
        </div>
        
        {/* Hero section with softer Mid-Century Modern styling */}
        <div 
          className={`relative mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main title area */}
            <div className="md:col-span-7 bg-gradient-to-br from-terracotta/80 to-warm-brown/70 rounded-[40px] p-8 md:p-12 text-cream shadow-lg">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                {t('home.hero.title')}
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 font-light opacity-90">
                {t('home.hero.subtitle')}
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-95">
                {t('home.hero.tagline')}
              </p>
              <div className="flex items-center gap-4">
                <Music className="w-8 h-8 text-cream/90" />
                <div className="w-2 h-2 bg-cream/80 rounded-full"></div>
                <Zap className="w-6 h-6 text-cream/90" />
                <div className="w-2 h-2 bg-cream/80 rounded-full"></div>
                <Map className="w-8 h-8 text-cream/90" />
              </div>
            </div>
            
            {/* Side content area */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-warm-brown/70 to-caramel/60 rounded-[30px] p-6 text-cream shadow-md">
                <h3 className="text-xl font-medium mb-3">{t('home.about.title')}</h3>
                <p className="opacity-95">
                  {t('home.about.description')}
                </p>
              </div>
              
              {/* Action buttons moved here, below About Us */}
              <div className="grid grid-cols-1 gap-4">
                {/* Road Map Button - Enhanced with more contrast */}
                <Link 
                  to="/roadmap" 
                  className="bg-gradient-to-br from-burnt-orange to-paprika border-2 border-burnt-orange text-cream font-bold text-xl p-6 rounded-[20px] hover:from-paprika hover:to-terracotta hover:border-paprika transition-all duration-300 flex items-center justify-between group shadow-xl hover:shadow-2xl transform hover:-translate-y-1 block"
                >
                  <span className="font-bold tracking-wide">{t('home.buttons.roadMap')}</span>
                  <Map className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </Link>
                
                {/* Profile/Login Button */}
                <Link 
                  to={user ? "/profile" : "/auth"}
                  className="bg-gradient-to-br from-sage-green/70 to-deep-teal/60 text-cream font-medium text-lg p-4 rounded-[20px] hover:from-cream/80 hover:to-sandy-beige/70 hover:text-sage-green hover:border-sage-green/40 border-2 border-sage-green/30 transition-all duration-300 flex items-center justify-between group shadow-md hover:shadow-lg"
                >
                  <span className="font-medium">
                    {user ? t('home.buttons.profile') : t('home.buttons.login')}
                  </span>
                  {user ? 
                    <User className="w-5 h-5 group-hover:scale-110 transition-transform" /> : 
                    <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  }
                </Link>

                {/* Rhythm Lab Button */}
                <Link 
                  to="/rhythmlab" 
                  className="bg-gradient-to-br from-mushroom/70 to-warm-brown/60 border-2 border-warm-brown/30 text-cream font-medium text-lg p-4 rounded-[20px] hover:from-warm-brown/80 hover:to-caramel/70 hover:text-cream transition-all duration-300 flex items-center justify-between group shadow-md hover:shadow-lg"
                >
                  <span className="font-medium">{t('home.buttons.rhythmLab')}</span>
                  <Music className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Header Image Section */}
        <HeaderImage 
          imageUrl={headerImageUrl}
          alt="Tango A Diario Header"
          className="mb-16"
        />
        
        {/* Main description section with homogenized casing */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-cream/80 to-sandy-beige/60 rounded-[30px] p-8 relative overflow-hidden shadow-lg">
            {/* Background shape */}
            <div 
              className="absolute bg-gradient-to-br from-burnt-orange/10 to-terracotta/5 rounded-full" 
              style={{ 
                width: '60%', 
                height: '120%', 
                top: '-10%', 
                right: '-20%',
                borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%',
              }}
            />
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-warm-brown relative z-10">
              {t('home.description.title')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-warm-brown/90">
                  <strong>{t('home.description.getTopicWeek')}</strong>
                </p>
                <p className="text-lg leading-relaxed text-warm-brown/90">
                  <strong>{t('home.description.trackProgress')}</strong>
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-warm-brown/90">
                  {t('home.description.buildingContrast')}
                </p>
                <p className="text-lg leading-relaxed text-warm-brown/90">
                  <strong>{t('home.description.exampleTopics')}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Local Content Section for SEO */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-sage-green/10 to-deep-teal/5 rounded-[30px] p-8 shadow-md">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-warm-brown">
                Tango Learning for German Cities
              </h3>
              <p className="text-lg leading-relaxed text-warm-brown/90 max-w-4xl mx-auto">
                {t('home.description.localContent' as any)}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {['Karlsruhe', 'Mannheim', 'Heidelberg', 'Frankfurt', 'Wiesbaden', 'Stuttgart'].map((city) => (
                  <span 
                    key={city}
                    className="px-4 py-2 bg-gradient-to-br from-terracotta/20 to-burnt-orange/10 text-warm-brown rounded-full text-sm font-medium"
                  >
                    {city} Tango
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Expandable Sections with softer Mid-Century styling */}
        <div className="mb-16 bg-gradient-to-br from-cream/70 to-sandy-beige/50 rounded-[30px] p-6 shadow-lg">
          <Accordion type="single" collapsible className="w-full">
            {/* WHY Section */}
            <AccordionItem value="why" className="border-b border-terracotta/20">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-terracotta/90">
                  {t('home.accordion.why.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-terracotta/80 to-burnt-orange/70 text-cream flex items-center justify-center font-bold rounded-full">1</span>
                    <p className="leading-relaxed pt-2 text-warm-brown/90">
                      {t('home.accordion.why.reason1')}
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-warm-brown/80 to-caramel/70 text-cream flex items-center justify-center font-bold rounded-full">2</span>
                    <p className="leading-relaxed pt-2 text-warm-brown/90">
                      {t('home.accordion.why.reason2')}
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-sandy-beige/80 to-mushroom/70 text-warm-brown flex items-center justify-center font-bold rounded-full">3</span>
                    <p className="leading-relaxed pt-2 text-warm-brown/90">
                      {t('home.accordion.why.reason3')}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Is this free? Section */}
            <AccordionItem value="pricing" className="border-b border-terracotta/20">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-terracotta/90">
                  {t('home.accordion.pricing.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="leading-relaxed text-warm-brown/90">
                  {t('home.accordion.pricing.content')}
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* NEW SECTION: Is it just for Leaders? */}
            <AccordionItem value="forLeaders" className="border-b border-terracotta/20">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-terracotta/90">
                  {t('home.accordion.forLeaders.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="leading-relaxed text-warm-brown/90">
                  {t('home.accordion.forLeaders.content')}
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Proof of Concept Section */}
            <AccordionItem value="concept" className="border-b border-terracotta/20">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-terracotta/90">
                  {t('home.accordion.concept.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="leading-relaxed text-warm-brown/90">
                  {t('home.accordion.concept.content')}
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Credits Section */}
            <AccordionItem value="credits" className="border-b border-terracotta/20">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-terracotta/90">
                  {t('home.accordion.credits.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="leading-relaxed text-warm-brown/90">
                    {t('home.accordion.credits.intro')}
                  </p>
                  <p className="leading-relaxed text-warm-brown/90">
                    <span className="font-bold">{t('home.accordion.credits.teachers')}</span>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Mobile-only ROAD MAP button at bottom */}
        <div className="md:hidden mb-8">
          <Link 
            to="/roadmap" 
            className="w-full bg-gradient-to-br from-burnt-orange to-paprika border-2 border-burnt-orange text-cream font-bold text-xl p-6 rounded-[20px] hover:from-paprika hover:to-terracotta hover:border-paprika transition-all duration-300 flex items-center justify-between group shadow-xl hover:shadow-2xl transform hover:-translate-y-1 block"
          >
            <span className="font-bold tracking-wide">{t('home.buttons.roadMap')}</span>
            <Map className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        {/* Footer with Mid-Century styling */}
        <footer className="mt-16 pt-6 border-t border-terracotta/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-lg font-medium text-terracotta/80">{t('home.footer.copyright')}</div>
            <div className="flex gap-6">
              <Link to="/terms" className="text-warm-brown/80 hover:text-terracotta/80 transition-colors">{t('home.footer.terms')}</Link>
              <Link to="/privacy" className="text-warm-brown/80 hover:text-terracotta/80 transition-colors">{t('home.footer.privacy')}</Link>
              <Link to="/contact" className="text-warm-brown/80 hover:text-terracotta/80 transition-colors">{t('home.footer.contact')}</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
