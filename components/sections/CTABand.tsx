import React from 'react';
import SectionReveal from '../ui/SectionReveal';
import Button from '../ui/Button';

export default function CTABand() {
  return (
    <section id="careers" className="relative overflow-hidden text-center py-36 px-[6vw] border-t border-border bg-navy">
      {/* Background Radial Light Effect */}
      <div 
        className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_70%)]" 
      />

      <div className="relative z-10 space-y-11">
        {/* Title */}
        <SectionReveal>
          <h2 className="font-display text-[clamp(3rem,5.5vw,5.5rem)] font-light leading-[1.08] max-w-[740px] mx-auto text-white">
            Want to build what<br />comes <em className="italic text-gold">next</em> with us?
          </h2>
        </SectionReveal>

        {/* Buttons */}
        <SectionReveal>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button variant="gold" href="mailto:careers@koventrasystems.com" external>
              View Open Roles
            </Button>
            <Button variant="outline" href="#contact">
              Get in Touch
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
