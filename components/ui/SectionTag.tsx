import React from 'react';

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTag({ children, className = '' }: SectionTagProps) {
  return (
    <span className={`text-[0.73rem] tracking-[0.22em] uppercase text-gold mb-4 block font-body ${className}`}>
      {children}
    </span>
  );
}
