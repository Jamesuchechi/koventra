'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/lib/settings';

interface HeroClientProps {
  settings: SiteSettings;
  stats: { value: string; label: string }[];
}

const ease = [0.16, 1, 0.3, 1];

export default function HeroClient({ settings, stats }: HeroClientProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pb-24 pt-32 overflow-hidden bg-navy">
      {/* Subtle radial glow — top right */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle at top right, #c9a84c, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle at bottom left, #c9a84c, transparent 70%)',
          }}
        />
      </div>

      {/* Faint dot-grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto w-full">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
          className="font-body text-[0.75rem] tracking-[0.22em] uppercase text-gold mb-6 font-medium"
        >
          {settings.heroEyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.15 }}
          className="font-display font-light leading-[1.01] tracking-[-0.02em] text-white mb-8"
          style={{ fontSize: 'clamp(3.2rem, 7.5vw, 7rem)', maxWidth: '850px' }}
        >
          {/* Split headline — render italic last word in gold */}
          {settings.heroTitle.split(' ').map((word, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <React.Fragment key={i}>
                {isLast ? (
                  <em className="italic text-gold" style={{ fontStyle: 'italic' }}>
                    {word}
                  </em>
                ) : (
                  `${word} `
                )}
              </React.Fragment>
            );
          })}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="font-body text-[1.05rem] text-muted max-w-[500px] leading-[1.85] font-light mb-10"
        >
          {settings.heroSubtitle}
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.42 }}
          className="flex flex-wrap items-center gap-3 mb-20"
        >
          <Link
            href="https://ailex.space"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-white text-navy font-body text-[0.85rem] font-medium rounded-[6px] hover:bg-white/90 transition-all duration-200"
          >
            Try Lex AI
            <ArrowUpRight size={15} />
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 px-5 py-3 border border-white/20 text-white font-body text-[0.85rem] font-light rounded-[6px] hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            Explore Ecosystem
          </Link>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="flex flex-wrap gap-x-14 gap-y-6 pt-10 border-t border-border-dim"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.65 + i * 0.08 }}
            >
              <span className="font-display text-[2.8rem] font-light text-white block leading-none">
                {stat.value}
              </span>
              <span className="font-body text-[0.72rem] tracking-[0.14em] uppercase text-muted block mt-1.5 font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}