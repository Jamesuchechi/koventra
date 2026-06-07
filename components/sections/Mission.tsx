import React from 'react';
import SectionReveal from '../ui/SectionReveal';
import SectionTag from '../ui/SectionTag';
import { MISSION_PILLARS } from '@/lib/constants';
import { getSiteSettings } from '@/lib/settings';

export default async function Mission() {
  const settings = await getSiteSettings();

  return (
    <section id="mission" className="bg-navy-mid border-t border-border py-28 px-[6vw]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-28 items-center">
        {/* Left Column - Content */}
        <div className="space-y-6">
          <SectionReveal>
            <SectionTag>{settings.missionEyebrow}</SectionTag>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-[1.12] text-white">
              {settings.missionTitle}
            </h2>
          </SectionReveal>
          
          <SectionReveal>
            <p className="font-body text-[0.95rem] text-muted leading-[1.95] font-light">
              {settings.missionParagraph1}
              {settings.missionParagraph2 && (
                <>
                  <br /><br />
                  {settings.missionParagraph2}
                </>
              )}
            </p>
          </SectionReveal>
        </div>

        {/* Right Column - Pillars Grid */}
        <SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-border border border-border rounded-[4px] overflow-hidden">
            {MISSION_PILLARS.map((pillar) => (
              <div 
                key={pillar.num} 
                className="bg-navy-card p-7 transition-colors duration-[250ms] hover:bg-navy-hover group"
              >
                <span className="font-display text-[1.8rem] text-gold opacity-40 block mb-2 transition-opacity duration-300 group-hover:opacity-100">
                  {pillar.num}
                </span>
                <h3 className="font-body text-[0.82rem] font-medium tracking-[0.06em] uppercase text-white mb-1.5">
                  {pillar.title}
                </h3>
                <p className="font-body text-[0.82rem] text-muted leading-[1.7] font-light">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
