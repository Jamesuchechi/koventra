import React from 'react';

interface BadgeProps {
  variant?: 'green' | 'yellow' | 'blue' | 'gray' | 'red';
  children: React.ReactNode;
}

export default function Badge({ variant = 'gray', children }: BadgeProps) {
  const styles = {
    green: 'bg-green-500/10 text-green-400 border border-green-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    gray: 'bg-white/5 text-muted border border-white/10',
    red: 'bg-red-500/10 text-red-400 border border-red-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-[2px] font-body text-[0.68rem] tracking-wider uppercase font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}
