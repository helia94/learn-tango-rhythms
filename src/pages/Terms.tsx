
import React from 'react';
import PageHeader from '@/components/ui/PageHeader';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sandy-beige/30 via-cream to-mushroom/20 text-warm-brown">
      <PageHeader title="Terms of Service" backRoute="/" />
      
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-cream/80 to-sandy-beige/60 rounded-[30px] p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-warm-brown">Terms of Service</h2>
          
          <div className="space-y-6 text-warm-brown/90">
            <section>
              <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
              <p className="leading-relaxed">
                By accessing and using Tango a Diario, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-3">2. Use License</h3>
              <p className="leading-relaxed">
                Permission is granted to temporarily download one copy of Tango a Diario for personal, non-commercial transitory viewing only.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-3">3. Disclaimer</h3>
              <p className="leading-relaxed">
                The materials on Tango a Diario are provided on an 'as is' basis. Tango a Diario makes no warranties, expressed or implied.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-3">4. User Content</h3>
              <p className="leading-relaxed">
                Users are responsible for any content they submit or share through the platform. All content must comply with applicable laws and regulations.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
