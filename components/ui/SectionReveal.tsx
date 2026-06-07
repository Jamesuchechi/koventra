'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionReveal({
  children,
  className = '',
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

