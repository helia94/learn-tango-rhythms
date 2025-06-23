
import React from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sandy-beige/30 via-cream to-mushroom/20 text-warm-brown">
      <PageHeader title="Contact Us" backRoute="/" />
      
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-cream/80 to-sandy-beige/60 rounded-[30px] p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-warm-brown">Get in Touch</h2>
          
          <div className="space-y-8 text-warm-brown/90">
            <section>
              <p className="text-lg leading-relaxed mb-6">
                We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
              </p>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-terracotta/20 to-burnt-orange/10 rounded-[20px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-terracotta" />
                  <h3 className="text-lg font-semibold">Email Us</h3>
                </div>
                <p className="leading-relaxed">
                  For general inquiries, feedback, or support questions, send us an email and we'll get back to you as soon as possible.
                </p>
                <div className="mt-4">
                  <a 
                    href="mailto:hello@tangoadiario.com" 
                    className="text-terracotta hover:text-burnt-orange transition-colors font-medium"
                  >
                    hello@tangoadiario.com
                  </a>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-sage-green/20 to-deep-teal/10 rounded-[20px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-sage-green" />
                  <h3 className="text-lg font-semibold">Community</h3>
                </div>
                <p className="leading-relaxed">
                  Join our community discussions, share your progress, and connect with other tango dancers learning musicality.
                </p>
                <div className="mt-4">
                  <span className="text-sage-green font-medium">Coming soon...</span>
                </div>
              </div>
            </div>
            
            <section className="bg-gradient-to-br from-warm-brown/10 to-caramel/5 rounded-[20px] p-6">
              <h3 className="text-lg font-semibold mb-3">About the Creator</h3>
              <p className="leading-relaxed">
                Tango Diario was created by Helia, a passionate tango dancer who wanted to make musicality learning more accessible. 
                This project is a labor of love, designed to help dancers develop their musical understanding through daily practice.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
