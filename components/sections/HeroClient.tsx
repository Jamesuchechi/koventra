'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/lib/settings';

interface HeroClientProps {
  settings: SiteSettings;
  stats: { value: string; label: string }[];
}

const ease = [0.16, 1, 0.3, 1];

export default function HeroClient({ settings, stats }: HeroClientProps) {
  const sectionRef   = useRef<HTMLElement>(null);
  const featuredRef  = useRef<HTMLDivElement>(null);

  // ── Scroll-driven scale for the featured card ──────────────────
  // Card starts at ~92% width/scale and grows to 100% as it enters view
  const { scrollYProgress: cardProgress } = useScroll({
    target: featuredRef,
    offset: ['start end', 'end end'],
  });
  const cardScale   = useTransform(cardProgress, [0, 1], [0.88, 1]);
  const cardOpacity = useTransform(cardProgress, [0, 0.35], [0, 1]);
  const cardY       = useTransform(cardProgress, [0, 1], [60, 0]);

  // Headline words — everything up to last word, last word in italic gold
  const words    = settings.heroTitle.split(' ');
  const lastWord = words[words.length - 1];
  const lead     = words.slice(0, -1).join(' ');

  return (
    <section ref={sectionRef} className="bg-navy overflow-hidden">

      {/* ══════════════════════════════════════════════
          TOP AREA — left headline + right description
          (mirrors Anthropic's exact layout)
      ══════════════════════════════════════════════ */}
      <div className="relative pt-40 pb-24 px-[6vw] max-w-[1400px] mx-auto">

        {/* Subtle top-right glow */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-[600px] h-[500px] opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 100% 0%, #c9a84c, transparent 70%)' }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.55fr] gap-12 lg:gap-24 items-end">

          {/* LEFT — big headline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.05 }}
              className="font-body text-[0.72rem] tracking-[0.26em] uppercase text-gold font-medium mb-7 flex items-center gap-3"
            >
              <span className="h-px w-6 bg-gold/50 inline-block" />
              {settings.heroEyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.12 }}
              className="font-display font-light text-white leading-[1.0] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(3.6rem, 7.5vw, 8rem)' }}
            >
              {lead}{' '}
              <em className="text-gold" style={{ fontStyle: 'italic' }}>
                {lastWord}
              </em>
            </motion.h1>
          </div>

          {/* RIGHT — description + CTAs (sits bottom-aligned with headline) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.32 }}
            className="space-y-7 pb-2"
          >
            <p className="font-body text-[1rem] text-muted font-light leading-[1.9]">
              {settings.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="https://ailex.space"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-navy font-body text-[0.82rem] font-medium rounded-[5px] hover:bg-white/90 active:scale-[0.98] transition-all duration-150"
              >
                Try Lex AI
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.16] text-white font-body text-[0.82rem] font-light rounded-[5px] hover:border-white/35 hover:bg-white/[0.04] active:scale-[0.98] transition-all duration-150"
              >
                Explore Ecosystem
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          FEATURED CARD — scroll-driven expansion
          Starts slightly smaller, grows to full width
          as it scrolls into the viewport
      ══════════════════════════════════════════════ */}
      <div className="px-[3vw] pb-0 overflow-hidden">
        <motion.div
          ref={featuredRef}
          style={{ scale: cardScale, opacity: cardOpacity, y: cardY }}
          className="relative w-full min-h-[70vh] rounded-t-[16px] overflow-hidden bg-navy-hover border border-border-dim border-b-0 origin-bottom"
        >
          {/* Card ambient atmosphere */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 65% 55% at 70% 35%, rgba(201,168,76,0.09) 0%, transparent 65%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage:
                'radial-gradient(ellipse 90% 85% at 60% 40%, black 30%, transparent 100%)',
            }}
          />

          {/* Gold top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold/80 via-gold/30 to-transparent" />

          {/* Card content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[70vh]">

            {/* Left — product info */}
            <div className="flex flex-col justify-center p-12 lg:p-16 xl:p-20">
              <span className="font-body text-[0.68rem] tracking-[0.2em] uppercase text-gold/70 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] inline-block" />
                Flagship Product · Live
              </span>

              <h2
                className="font-display font-light text-white leading-[0.96] tracking-[-0.02em] mb-5"
                style={{ fontSize: 'clamp(3.5rem, 6vw, 6.5rem)' }}
              >
                Lex{' '}
                <em className="text-gold" style={{ fontStyle: 'italic' }}>
                  AI
                </em>
              </h2>

              <p className="font-display text-[1.2rem] font-light text-muted italic leading-snug mb-8 max-w-[420px]">
                AI-powered legal workspace
              </p>

              <p className="font-body text-[0.9rem] text-muted/80 font-light leading-[1.85] max-w-[440px] mb-10">
                An AI-powered legal workspace built for modern legal teams. Handles clause extraction,
                contract risk scoring, intelligent drafting, and real-time collaborative review —
                turning weeks of legal work into hours.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://ailex.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-[#d4b45a] text-navy font-body text-[0.78rem] font-semibold tracking-[0.08em] uppercase rounded-[4px] transition-all duration-200 group"
                >
                  Visit Platform
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
                <Link
                  href="/products/lex-ai"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border-dim hover:border-border text-muted hover:text-white font-body text-[0.78rem] tracking-[0.08em] uppercase rounded-[4px] transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right — visual / abstract art panel */}
            <div className="relative hidden lg:flex items-center justify-center overflow-hidden">
              {/* Abstract geometric network — pure CSS/SVG, no image needed */}
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.18]"
                viewBox="0 0 600 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Hexagonal/Voronoi-like network, similar to Anthropic's glasswing */}
                <g stroke="#c9a84c" strokeWidth="0.6">
                  {/* Row 1 */}
                  <polygon points="120,40 200,80 200,160 120,200 40,160 40,80" />
                  <polygon points="280,40 360,80 360,160 280,200 200,160 200,80" />
                  <polygon points="440,40 520,80 520,160 440,200 360,160 360,80" />
                  <polygon points="560,40 600,60 600,160 560,200 520,160 520,80" />
                  {/* Row 2 */}
                  <polygon points="40,160 120,200 120,280 40,320 0,300 0,200" />
                  <polygon points="120,200 200,160 280,200 280,280 200,320 120,280" />
                  <polygon points="280,200 360,160 440,200 440,280 360,320 280,280" />
                  <polygon points="440,200 520,160 600,200 600,280 520,320 440,280" />
                  {/* Row 3 */}
                  <polygon points="40,320 120,280 200,320 200,400 120,440 40,400" />
                  <polygon points="200,320 280,280 360,320 360,400 280,440 200,400" />
                  <polygon points="360,320 440,280 520,320 520,400 440,440 360,400" />
                  <polygon points="520,320 600,280 600,400 520,440" />
                  {/* Row 4 */}
                  <polygon points="120,440 200,400 280,440 280,520 200,560 120,520" />
                  <polygon points="280,440 360,400 440,440 440,520 360,560 280,520" />
                  <polygon points="440,440 520,400 600,440 600,520 520,560 440,520" />
                  {/* Row 5 */}
                  <polygon points="40,480 120,440 120,520 40,560" />
                  <polygon points="200,560 280,520 360,560 360,600 200,600" />
                  <polygon points="360,560 440,520 520,560 520,600 360,600" />
                  {/* Inner detail lines */}
                  <line x1="120" y1="200" x2="200" y2="160" />
                  <line x1="280" y1="200" x2="200" y2="160" />
                  <line x1="200" y1="320" x2="120" y2="280" />
                  <line x1="200" y1="320" x2="280" y2="280" />
                  <line x1="360" y1="320" x2="280" y2="280" />
                  <line x1="360" y1="320" x2="440" y2="280" />
                </g>
                {/* Dot nodes at intersections */}
                {[
                  [120,40],[200,80],[280,40],[360,80],[440,40],[520,80],
                  [40,160],[120,200],[200,160],[280,200],[360,160],[440,200],[520,160],
                  [40,320],[120,280],[200,320],[280,280],[360,320],[440,280],[520,320],
                  [120,440],[200,400],[280,440],[360,400],[440,440],[520,400],
                  [200,560],[280,520],[360,560],[440,520],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3" fill="#c9a84c" opacity="0.5" />
                ))}
              </svg>

              {/* Soft center glow behind the SVG */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 55% at 55% 45%, rgba(201,168,76,0.08) 0%, transparent 65%)',
                }}
              />

              {/* Feature chips — floating in the visual area */}
              <div className="relative z-10 flex flex-col gap-3 items-start">
                {['Clause Extraction', 'Contract Risk Scoring', 'Intelligent Drafting', 'Collaborative Review', 'Legal Intelligence'].map((feat, i) => (
                  <motion.span
                    key={feat}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.9 + i * 0.08 }}
                    className="font-body text-[0.72rem] tracking-[0.1em] uppercase px-4 py-2 bg-navy/60 backdrop-blur-sm border border-border-dim rounded-[3px] text-muted hover:text-white hover:border-border transition-all duration-200"
                  >
                    {feat}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom stats strip inside the card */}
          <div className="relative z-10 border-t border-border-dim grid grid-cols-2 md:grid-cols-4 divide-x divide-border-dim">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center px-6 py-6">
                <span className="font-display text-[2.2rem] font-light text-white leading-none block">
                  {stat.value}
                </span>
                <span className="font-body text-[0.63rem] tracking-[0.18em] uppercase text-muted block mt-1.5 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}