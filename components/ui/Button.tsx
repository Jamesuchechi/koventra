import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'gold',
  href,
  external = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-block px-8 py-3.5 rounded-[2px] font-body text-[0.82rem] tracking-[0.08em] uppercase cursor-pointer transition-colors duration-200 text-center select-none';
  
  const variantStyles = {
    gold: 'bg-gold text-navy font-medium hover:bg-[#d4b45a] border border-transparent',
    outline: 'bg-transparent text-white font-light border border-white/20 hover:border-white/55',
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
