
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Music, Map, Zap, LogIn, User, ChevronDown, ChevronUp } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige relative overflow-hidden">
      {/* Geometric shapes for abstract design */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 right-32 w-16 h-16 bg-paprika transform rotate-45"></div>
        <div className="absolute bottom-48 left-16 w-20 h-20 bg-sage-green transform rotate-12"></div>
        <div className="absolute top-1/2 right-16 w-12 h-12 bg-golden-yellow transform -rotate-12"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-terracotta transform rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Language Selector in top right */}
        <div className="flex justify-end mb-8">
          <LanguageSelector />
        </div>
        
        <div className="text-center">
          {/* Main Title with geometric background */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/20 to-terracotta/20 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-cream/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-warm-brown/20">
              <h1 className="boho-title text-4xl md:text-6xl lg:text-8xl mb-2 font-display">
                TANGO A DIARIO
              </h1>
              <h2 className="boho-title text-2xl md:text-3xl lg:text-4xl mb-4 font-display opacity-80">
                (Daily Tango)
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <Music className="w-8 h-8 md:w-12 md:h-12 text-burnt-orange animate-gentle-bounce" />
                <div className="w-2 h-2 bg-terracotta rounded-full animate-organic-pulse"></div>
                <Zap className="w-6 h-6 md:w-10 md:h-10 text-golden-yellow animate-gentle-bounce delay-300" />
                <div className="w-2 h-2 bg-sage-green rounded-full animate-organic-pulse delay-500"></div>
                <Map className="w-8 h-8 md:w-12 md:h-12 text-deep-teal animate-gentle-bounce delay-600" />
              </div>
              <p className="boho-subtitle text-lg md:text-xl mb-2 text-warm-brown">
                The Duolingo for Tango Musicality
              </p>
            </div>
          </div>
          
          {/* Main Description Panel */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-bl from-sage-green/20 to-deep-teal/20 rounded-2xl transform -rotate-1"></div>
            <div className="relative boho-panel p-6 md:p-8">
              <h3 className="boho-title text-2xl md:text-3xl mb-4 text-burnt-orange">
                Practice Tango Musicality for 5 Minutes Every Day
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <p className="text-warm-brown leading-relaxed">
                    <strong>Get One Topic Per Week</strong> and Learn More About it Every Day
                  </p>
                  <p className="text-warm-brown leading-relaxed">
                    <strong>Track Your Progress</strong> - Repeat, Repeat, and then Repeat - until You Can Forget It
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-warm-brown leading-relaxed">
                    Most topics are about <strong>building more contrast</strong> into your dancing and <strong>breaking your habits</strong>
                  </p>
                  <p className="text-warm-brown leading-relaxed">
                    <strong>Example topics:</strong> Dancing fast and slow, dancing small and big, dancing high and low...
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons with geometric backgrounds */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            {/* Road Map Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-terracotta to-paprika rounded-xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
              <Link 
                to="/roadmap" 
                className="relative block bg-gradient-to-r from-burnt-orange to-terracotta text-cream font-medium text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-warm-brown/20"
              >
                <div className="flex items-center justify-center gap-3">
                  <Map className="w-6 h-6" />
                  <span className="font-display tracking-wide">ROAD MAP</span>
                </div>
              </Link>
            </div>
            
            {/* Profile/Login Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-golden-yellow to-dusty-rose rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <Link 
                to={user ? "/profile" : "/auth"}
                className="relative block bg-gradient-to-r from-golden-yellow to-dusty-rose text-warm-brown font-medium text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-warm-brown/20"
              >
                <div className="flex items-center justify-center gap-3">
                  {user ? <User className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
                  <span className="font-display tracking-wide">
                    {user ? "PROFILE" : "LOGIN"}
                  </span>
                </div>
              </Link>
            </div>

            {/* Rhythm Lab Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sage-green to-deep-teal rounded-xl transform -rotate-2 group-hover:-rotate-3 transition-transform duration-300"></div>
              <Link 
                to="/rhythmlab" 
                className="relative block bg-gradient-to-r from-sage-green to-deep-teal text-cream font-medium text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-warm-brown/20"
              >
                <div className="flex items-center justify-center gap-3">
                  <Music className="w-6 h-6" />
                  <span className="font-display tracking-wide">RHYTHM LAB</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Expandable Sections */}
          <div className="max-w-4xl mx-auto space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {/* Why Section */}
              <AccordionItem value="why" className="border-warm-brown/30">
                <AccordionTrigger className="boho-panel px-6 py-4 hover:no-underline">
                  <span className="boho-title text-xl md:text-2xl text-burnt-orange">
                    WHY?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="boho-panel px-6 pb-6">
                  <div className="space-y-4 text-left">
                    <div className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-terracotta text-cream rounded-full flex items-center justify-center font-bold">1</span>
                      <p className="text-warm-brown leading-relaxed">
                        Because it took me more than 8 years and many long distance trips to musicality workshops to learn basic concepts that are not even that hard
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-burnt-orange text-cream rounded-full flex items-center justify-center font-bold">2</span>
                      <p className="text-warm-brown leading-relaxed">
                        Because each workshop was 3-4 days, way too much information at once, and I hardly ever went back to practicing them
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-sage-green text-cream rounded-full flex items-center justify-center font-bold">3</span>
                      <p className="text-warm-brown leading-relaxed">
                        Because I needed a little inspiration continuously instead of a lot at once
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Is this free? Section */}
              <AccordionItem value="pricing" className="border-warm-brown/30">
                <AccordionTrigger className="boho-panel px-6 py-4 hover:no-underline">
                  <span className="boho-title text-xl md:text-2xl text-burnt-orange">
                    IS THIS FREE?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="boho-panel px-6 pb-6">
                  <p className="text-warm-brown leading-relaxed text-left">
                    For now, yes, but paying even a little amount will increase your motivation and commitment at least five fold. So, in the future, this will be paid for both our sakes.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Finally Section */}
              <AccordionItem value="concept" className="border-warm-brown/30">
                <AccordionTrigger className="boho-panel px-6 py-4 hover:no-underline">
                  <span className="boho-title text-xl md:text-2xl text-burnt-orange">
                    PROOF OF CONCEPT
                  </span>
                </AccordionTrigger>
                <AccordionContent className="boho-panel px-6 pb-6">
                  <p className="text-warm-brown leading-relaxed text-left">
                    For now, this is just a proof of concept. I made it because I had a hunch that others might also need what I needed. I am testing that hunch. In fact, if you are reading this, you are already part of this test. I will commit to finishing it if I find people who really really really want it :) If you kind of want it, this is not for you yet!
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Credits Section */}
              <AccordionItem value="credits" className="border-warm-brown/30">
                <AccordionTrigger className="boho-panel px-6 py-4 hover:no-underline">
                  <span className="boho-title text-xl md:text-2xl text-burnt-orange">
                    CREDITS
                  </span>
                </AccordionTrigger>
                <AccordionContent className="boho-panel px-6 pb-6">
                  <div className="text-left space-y-4">
                    <p className="text-warm-brown leading-relaxed">
                      I am Helia, but the information in the app did not come to me in a dream. It is the result of the work of many Tango Teachers who have invested their life into understanding this music and teaching it. I just like to make this information more accessible.
                    </p>
                    <p className="text-warm-brown leading-relaxed">
                      <strong>I have personally learned the most from:</strong> Horacio Godoy, Michael Lavoca, Pepa Polazón, and Murat Erdemsel.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center items-center gap-8 opacity-60">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-warm-brown to-transparent"></div>
            <div className="w-3 h-3 bg-golden-yellow rounded-full animate-organic-pulse"></div>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-warm-brown to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
