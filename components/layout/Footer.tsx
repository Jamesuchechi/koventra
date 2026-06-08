import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FOOTER_NAV = [
  {
    heading: 'Research',
    links: [
      { label: 'Research Index', href: '/research' },
      { label: 'Our Approach', href: '/about' },
      { label: 'AI Safety', href: '/about' },
      { label: 'Publications', href: '/press' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'Lex AI', href: 'https://ailex.space', external: true },
      { label: 'Product Two', href: '/products' },
      { label: 'Product Three', href: '/products' },
      { label: 'View All', href: '/products' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press & Media', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: 'X / Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-border-dim">
      {/* Main Footer Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 md:gap-20">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 select-none group">
              <div className="relative w-7 h-7 rounded-[5px] overflow-hidden border border-gold/20 bg-gold/5 shrink-0">
                <Image src="/logo.png" alt="Koventra" fill className="object-cover scale-[1.35]" />
              </div>
              <span className="font-display text-[1.3rem] font-medium tracking-[0.04em] text-white">
                Koventra<span className="text-gold">.</span>
              </span>
            </Link>

            <p className="font-body text-[0.83rem] text-muted leading-[1.75] font-light max-w-[190px]">
              The parent organization behind a growing portfolio of focused technology ventures.
            </p>

            {/* Social Row */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-border-dim text-muted hover:text-white hover:border-border transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_NAV.map((col) => (
              <div key={col.heading}>
                <h4 className="font-body text-[0.72rem] tracking-[0.18em] uppercase text-gold mb-4 font-semibold select-none">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-[0.84rem] text-muted hover:text-white transition-colors duration-150 font-light flex items-center gap-1 group"
                        >
                          {link.label}
                          <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-0 group-hover:opacity-60 transition-opacity" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M1 9L9 1M9 1H3M9 1V7" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="font-body text-[0.84rem] text-muted hover:text-white transition-colors duration-150 font-light"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Bar */}
        <div className="border-t border-border-dim py-5 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
          <p className="font-body text-[0.76rem] text-muted font-light">
            © {currentYear} Koventra Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="font-body text-[0.76rem] text-muted hover:text-white transition-colors font-light">
              Privacy
            </Link>
            <Link href="#" className="font-body text-[0.76rem] text-muted hover:text-white transition-colors font-light">
              Terms
            </Link>
            <span className="font-body text-[0.76rem] text-muted font-light">
              Built with precision.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}