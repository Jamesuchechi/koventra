'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Research',
    dropdown: [
      {
        heading: 'Overview',
        links: [
          { label: 'Research Index', href: '/research', desc: 'All published papers and findings' },
          { label: 'Our Approach', href: '/about', desc: 'How we think about intelligence' },
        ],
      },
      {
        heading: 'Focus Areas',
        links: [
          { label: 'Artificial Intelligence', href: '/products', desc: 'AI systems and intelligence layers' },
          { label: 'Legal Technology', href: '/products/lex-ai', desc: 'Document intelligence and automation' },
          { label: 'Enterprise Infrastructure', href: '/products', desc: 'Systems built for scale' },
        ],
      },
    ],
  },
  {
    label: 'Products',
    dropdown: [
      {
        heading: 'Live Products',
        links: [
          { label: 'Lex AI', href: '/products/lex-ai', desc: 'AI-powered legal workspace', badge: 'Live', external: 'https://ailex.space' },
        ],
      },
      {
        heading: 'In Development',
        links: [
          { label: 'Product Two', href: '/products', desc: 'Next venture taking shape', badge: 'Building' },
          { label: 'Product Three', href: '/products', desc: 'Pipeline — ships when ready', badge: 'Building' },
          { label: 'View All Products', href: '/products', desc: 'Full ecosystem listing' },
        ],
      },
    ],
  },
  {
    label: 'Company',
    dropdown: [
      {
        heading: 'About',
        links: [
          { label: 'About Koventra', href: '/about', desc: 'Our story, mission, and team' },
          { label: 'Leadership', href: '/about', desc: 'The minds behind Koventra' },
          { label: 'Press & Media', href: '/press', desc: 'News and announcements' },
        ],
      },
      {
        heading: 'Work With Us',
        links: [
          { label: 'Careers', href: '/careers', desc: 'Open roles across all ventures' },
          { label: 'Contact', href: '/contact', desc: 'Get in touch with our team' },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileOpen
            ? 'bg-navy/95 backdrop-blur-xl border-b border-border-dim'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-[60px] px-6 md:px-10 max-w-[1400px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group" onClick={() => setMobileOpen(false)}>
            <div className="relative w-7 h-7 rounded-[5px] overflow-hidden border border-gold/20 bg-gold/5 shrink-0">
              <Image src="/logo.png" alt="Koventra" fill unoptimized className="object-cover scale-[1.35]" />
            </div>
            <span className="font-display text-[1.3rem] font-medium tracking-[0.04em] text-white">
              Koventra<span className="text-gold">.</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <ul className="hidden lg:flex items-center">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 font-body text-[0.84rem] tracking-[0.01em] transition-colors duration-150 ${
                    activeDropdown === item.label ? 'text-white' : 'text-muted hover:text-white'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Mega Dropdown */}
                {activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[520px] bg-navy-card border border-border-dim rounded-[8px] shadow-2xl overflow-hidden"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Thin gold top line */}
                    <div className="h-[1.5px] bg-gradient-to-r from-gold/60 via-gold/20 to-transparent" />

                    <div className="grid grid-cols-2 gap-0">
                      {item.dropdown.map((group, gIdx) => (
                        <div key={group.heading} className={`p-5 ${gIdx === 0 ? 'border-r border-border-dim' : ''}`}>
                          <p className="font-body text-[0.65rem] tracking-[0.18em] uppercase text-gold font-semibold mb-3">
                            {group.heading}
                          </p>
                          <ul className="space-y-0.5">
                            {group.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  href={link.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-start gap-2 px-2.5 py-2 rounded-[4px] hover:bg-navy-hover transition-colors duration-150 group/link"
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="font-body text-[0.84rem] text-white group-hover/link:text-white font-light leading-tight">
                                        {link.label}
                                      </span>
                                      {(link as any).badge && (
                                        <span
                                          className={`text-[0.6rem] tracking-widest uppercase px-1.5 py-0.5 rounded-[2px] font-medium ${
                                            (link as any).badge === 'Live'
                                              ? 'bg-live/10 text-live'
                                              : 'bg-gold/10 text-gold'
                                          }`}
                                        >
                                          {(link as any).badge}
                                        </span>
                                      )}
                                      {(link as any).external && (
                                        <ArrowUpRight size={11} className="text-muted opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                      )}
                                    </div>
                                    {link.desc && (
                                      <span className="font-body text-[0.75rem] text-muted font-light leading-relaxed">
                                        {link.desc}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}

            {/* Simple direct links */}
            <li>
              <Link href="/careers" className="px-4 py-2 font-body text-[0.84rem] text-muted hover:text-white transition-colors duration-150">
                Careers
              </Link>
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="font-body text-[0.82rem] text-muted hover:text-white transition-colors duration-150"
            >
              Contact
            </Link>
            <Link
              href="/products/lex-ai"
              className="flex items-center gap-1.5 px-4 py-2 bg-white text-navy font-body text-[0.82rem] font-medium rounded-[5px] hover:bg-white/90 transition-all duration-150"
            >
              Try Lex AI
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-muted hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-navy/98 backdrop-blur-2xl flex flex-col lg:hidden transition-all duration-400 ease-in-out ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: '60px' }}
      >
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="border-b border-border-dim">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                className="flex items-center justify-between w-full py-4 font-body text-base text-white text-left"
              >
                {item.label}
                <ChevronDown
                  size={16}
                  className={`text-muted transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileExpanded === item.label && (
                <div className="pb-4 space-y-4">
                  {item.dropdown.map((group) => (
                    <div key={group.heading}>
                      <p className="font-body text-[0.65rem] tracking-[0.18em] uppercase text-gold mb-2 font-semibold">
                        {group.heading}
                      </p>
                      <ul className="space-y-1">
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 font-body text-sm text-muted hover:text-white transition-colors"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="border-b border-border-dim">
            <Link
              href="/careers"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between w-full py-4 font-body text-base text-white"
            >
              Careers
            </Link>
          </div>
          <div className="border-b border-border-dim">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between w-full py-4 font-body text-base text-white"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="px-6 pb-10 pt-4 border-t border-border-dim">
          <Link
            href="/products/lex-ai"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-white text-navy font-body text-sm font-medium rounded-[6px]"
          >
            Try Lex AI
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}