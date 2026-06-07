'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { SiteSettings } from '@/lib/settings';

interface HeroClientProps {
  settings: SiteSettings;
  stats: { value: string; label: string }[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.6,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroClient({ settings, stats }: HeroClientProps) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex flex-col justify-end px-[6vw] pb-28 relative overflow-hidden bg-navy"
    >
      {/* Background Radial Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_60%_20%,rgba(201,168,76,0.06)_0%,transparent_70%)]" 
      />
      
      {/* Background Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,black_40%,transparent_100%)]" 
      />

      {/* Hero Eyebrow */}
      <motion.p 
        variants={itemVariants}
        className="font-body text-[0.75rem] tracking-[0.22em] uppercase text-gold mb-7"
      >
        {settings.heroEyebrow}
      </motion.p>

      {/* Hero Title */}
      <motion.h1 
        variants={itemVariants}
        className="font-display text-[clamp(3.2rem,8vw,7.5rem)] font-light leading-[1.02] tracking-[-0.015em] max-w-[900px] text-white"
      >
        {settings.heroTitle}
      </motion.h1>

      {/* Hero Subtitle */}
      <motion.p 
        variants={itemVariants}
        className="font-body text-[1.05rem] text-muted max-w-[500px] mt-8 leading-[1.85] font-light"
      >
        {settings.heroSubtitle}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap items-center gap-[1.2rem] mt-11"
      >
        <Button variant="gold" href="#ecosystem">
          Explore Products
        </Button>
        <Button variant="outline" href="#mission">
          Our Mission
        </Button>
      </motion.div>

      {/* Stats Divider Bar */}
      <motion.div 
        variants={statsContainerVariants}
        className="flex flex-wrap gap-16 mt-20 pt-10 border-t border-border w-full"
      >
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={statItemVariants}
            className="min-w-[120px]"
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
    </motion.section>
  );
}
