
import React from 'react';
import PageHeader from '@/components/ui/PageHeader';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sandy-beige/30 via-cream to-mushroom/20 text-warm-brown">
      <PageHeader title="Privacy Policy" backRoute="/" />
      
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-cream/80 to-sandy-beige/60 rounded-[30px] p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-warm-brown">Privacy Policy</h2>
          
          <div className="space-y-6 text-warm-brown/90">
            <section>
              <h3 className="text-lg font-semibold mb-3">Information We Collect</h3>
              <p className="leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-3">How We Use Your Information</h3>
              <p className="leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-3">Information Sharing</h3>
              <p className="leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-3">Data Security</h3>
              <p className="leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
