'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, CONTACT_LINK } from '@/lib/constants';

export default function Navbar() {
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        id="nav"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6vw] border-b border-border bg-navy/88 backdrop-blur-lg transition-all duration-300 ${
          isCompact ? 'h-[52px]' : 'h-[64px]'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="font-display text-[1.45rem] font-medium tracking-[0.05em] text-white flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="relative w-7 h-7 rounded-[4px] border border-gold/20 bg-gold/5 flex items-center justify-center overflow-hidden shrink-0">
            <Image
              src="/logo.png"
              alt="Koventra"
              fill
              unoptimized
              className="object-cover scale-[1.35]"
            />
          </div>
          <span>Koventra<span className="text-gold">.</span></span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-[2.2rem]">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="font-body text-[0.82rem] tracking-[0.09em] uppercase text-muted hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={CONTACT_LINK.href}
              className="font-body text-[0.82rem] tracking-[0.09em] uppercase text-gold border border-gold px-4 py-1.5 rounded-[2px] hover:bg-gold hover:text-navy transition-all duration-200"
            >
              {CONTACT_LINK.label}
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-between w-6 h-4 cursor-pointer focus:outline-none z-50"
          aria-label="Toggle Menu"
        >
          <span
            className={`h-[1px] w-full bg-white transition-all duration-300 origin-left ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[2px] bg-gold' : ''
            }`}
          />
          <span
            className={`h-[1px] w-full bg-white transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-[1px] w-full bg-white transition-all duration-300 origin-left ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[2px] bg-gold' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-[-10px]'
        }`}
      >
        <ul className="flex flex-col items-center gap-8 text-center">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-body text-lg tracking-[0.15em] uppercase text-muted hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={CONTACT_LINK.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-body text-lg tracking-[0.15em] uppercase text-gold border border-gold px-6 py-2.5 rounded-[2px] hover:bg-gold hover:text-navy transition-all duration-200 inline-block"
            >
              {CONTACT_LINK.label}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
