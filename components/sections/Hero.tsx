import React from 'react';
import Button from '../ui/Button';
import { getSiteSettings } from '@/lib/settings';

export default async function Hero() {
  const settings = await getSiteSettings();

  const stats = [
    { value: settings.stat1Num, label: settings.stat1Label },
    { value: settings.stat2Num, label: settings.stat2Label },
    { value: settings.stat3Num, label: settings.stat3Label },
    { value: settings.stat4Num, label: settings.stat4Label },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-end px-[6vw] pb-28 relative overflow-hidden bg-navy">
      {/* Background Radial Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_60%_20%,rgba(201,168,76,0.06)_0%,transparent_70%)]" 
      />
      
      {/* Background Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,black_40%,transparent_100%)]" 
      />

      {/* Hero Eyebrow */}
      <p 
        className="font-body text-[0.75rem] tracking-[0.22em] uppercase text-gold mb-7 animate-up"
        style={{ animationDelay: '150ms' }}
      >
        {settings.heroEyebrow}
      </p>

      {/* Hero Title */}
      <h1 
        className="font-display text-[clamp(3.2rem,8vw,7.5rem)] font-light leading-[1.02] tracking-[-0.015em] max-w-[900px] animate-up text-white"
        style={{ animationDelay: '300ms' }}
      >
        {settings.heroTitle}
      </h1>

      {/* Hero Subtitle */}
      <p 
        className="font-body text-[1.05rem] text-muted max-w-[500px] mt-8 leading-[1.85] font-light animate-up"
        style={{ animationDelay: '500ms' }}
      >
        {settings.heroSubtitle}
      </p>

      {/* CTA Buttons */}
      <div 
        className="flex flex-wrap items-center gap-[1.2rem] mt-11 animate-up"
        style={{ animationDelay: '650ms' }}
      >
        <Button variant="gold" href="#ecosystem">
          Explore Products
        </Button>
        <Button variant="outline" href="#mission">
          Our Mission
        </Button>
      </div>

      {/* Stats Divider Bar */}
      <div 
        className="flex flex-wrap gap-16 mt-20 pt-10 border-t border-border animate-up"
        style={{ animationDelay: '850ms' }}
      >
        {stats.map((stat, i) => (
          <div key={i} className="min-w-[120px]">
            <span className="font-display text-[2.8rem] font-light text-white block leading-none">
              {stat.value}
            </span>
            <span className="font-body text-[0.72rem] tracking-[0.14em] uppercase text-muted block mt-1.5 font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
