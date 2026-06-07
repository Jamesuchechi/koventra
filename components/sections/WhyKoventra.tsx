import React from 'react';
import SectionReveal from '../ui/SectionReveal';
import SectionTag from '../ui/SectionTag';
import { DIFFERENTIATORS } from '@/lib/constants';

export default function WhyKoventra() {
  return (
    <section id="why" className="bg-navy-mid border-t border-border py-28 px-[6vw]">
      {/* Eyebrow & Title */}
      <SectionReveal>
        <SectionTag>Why Koventra</SectionTag>
        <h2 className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-light leading-[1.08] text-white">
          What sets us apart
        </h2>
      </SectionReveal>

      {/* Grid of Differentiators */}
      <SectionReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border-dim border border-border-dim rounded-[4px] overflow-hidden mt-16">
          {DIFFERENTIATORS.map((item) => (
            <div
              key={item.num}
              className="bg-navy-card p-9 transition-colors duration-[250ms] hover:bg-navy-hover group"
            >
              <div className="font-display text-[3.2rem] font-light text-gold opacity-30 group-hover:opacity-100 transition-opacity duration-300 leading-none mb-4 select-none">
                {item.num}
              </div>
              <h3 className="font-body text-[0.85rem] font-medium tracking-[0.05em] text-white mb-2 uppercase">
                {item.title}
              </h3>
              <p className="font-body text-[0.82rem] text-muted leading-[1.75] font-light">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
