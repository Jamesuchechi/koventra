import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionReveal from '../ui/SectionReveal';
import { MISSION_PILLARS } from '@/lib/constants';
import { getSiteSettings } from '@/lib/settings';

export default async function Mission() {
  const settings = await getSiteSettings();

  // Split mission title — last word gets italic gold treatment
  const titleWords = settings.missionTitle.split(' ');
  const titleLast  = titleWords[titleWords.length - 1];
  const titleLead  = titleWords.slice(0, -1).join(' ');

  return (
    <section id="mission" className="relative bg-navy overflow-hidden">

      {/* ══════════════════════════════════════════════════
          BAND 1 — WHO WE ARE  (full-bleed statement)
      ══════════════════════════════════════════════════ */}
      <div className="relative border-t border-border-dim border-b border-border-dim">

        {/* Background ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 15% 55%, rgba(201,168,76,0.055) 0%, transparent 65%)',
          }}
        />

        <div className="relative max-w-[1400px] mx-auto px-[6vw] py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-32 items-start">

            {/* Left ── headline */}
            <SectionReveal>
              <div className="lg:sticky lg:top-32">
                <span className="font-body text-[0.7rem] tracking-[0.28em] uppercase text-gold font-medium flex items-center gap-3 mb-7">
                  <span className="inline-block h-px w-6 bg-gold/50" />
                  {settings.missionEyebrow}
                </span>

                <h2
                  className="font-display font-light text-white leading-[1.04] tracking-[-0.018em]"
                  style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4.4rem)' }}
                >
                  {titleLead}{' '}
                  <em className="text-gold" style={{ fontStyle: 'italic' }}>
                    {titleLast}
                  </em>
                </h2>

                {/* Gold rule under headline */}
                <div className="mt-8 h-px w-16 bg-gradient-to-r from-gold/60 to-transparent" />
              </div>
            </SectionReveal>

            {/* Right ── body + CTA */}
            <SectionReveal>
              <div className="space-y-7 pt-1">
                <p className="font-body text-[0.98rem] text-muted leading-[1.95] font-light">
                  {settings.missionParagraph1}
                </p>
                {settings.missionParagraph2 && (
                  <p className="font-body text-[0.98rem] text-muted leading-[1.95] font-light">
                    {settings.missionParagraph2}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-5 pt-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 font-body text-[0.78rem] tracking-[0.1em] uppercase text-gold hover:text-white transition-colors duration-200 border-b border-gold/35 hover:border-white/50 pb-px group"
                  >
                    About Koventra
                    <ArrowUpRight
                      size={13}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 font-body text-[0.78rem] tracking-[0.1em] uppercase text-muted hover:text-white transition-colors duration-200 border-b border-white/15 hover:border-white/40 pb-px group"
                  >
                    Our products
                    <ArrowUpRight
                      size={13}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          BAND 2 — FOUR PILLARS  (hover-reveal grid)
      ══════════════════════════════════════════════════ */}
      <div className="relative border-b border-border-dim">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative max-w-[1400px] mx-auto px-[6vw] py-24">
          <SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {MISSION_PILLARS.map((pillar, i) => (
                <div
                  key={pillar.num}
                  className={`
                    group relative p-9 transition-colors duration-300 cursor-default
                    hover:bg-navy-hover
                    ${i < MISSION_PILLARS.length - 1 ? 'border-r border-border-dim' : ''}
                    border-b sm:border-b-0 border-border-dim
                  `}
                >
                  {/* Animated top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />

                  {/* Number */}
                  <span className="font-display text-[2.6rem] leading-none text-gold opacity-15 group-hover:opacity-80 transition-opacity duration-500 select-none block mb-6">
                    {pillar.num}
                  </span>

                  {/* Title */}
                  <h3 className="font-body text-[0.8rem] font-semibold tracking-[0.1em] uppercase text-white mb-3">
                    {pillar.title}
                  </h3>

                  {/* Body */}
                  <p className="font-body text-[0.83rem] text-muted leading-[1.8] font-light">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          BAND 3 — COMPANY STATS  (clean divider row)
      ══════════════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-[6vw] py-20">
        <SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 md:divide-x md:divide-border-dim">
            {[
              { num: settings.stat1Num,  label: settings.stat1Label  },
              { num: settings.stat2Num,  label: settings.stat2Label  },
              { num: settings.stat3Num,  label: settings.stat3Label  },
              { num: settings.stat4Num,  label: settings.stat4Label  },
            ].map(({ num, label }, i) => (
              <div
                key={i}
                className="flex flex-col items-start md:items-center md:text-center px-0 md:px-10"
              >
                <span className="font-display text-[3.2rem] font-light text-white leading-none block">
                  {num}
                </span>
                <span className="font-body text-[0.68rem] tracking-[0.2em] uppercase text-muted block mt-2.5 font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>

    </section>
  );
}