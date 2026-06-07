import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_COLUMNS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-navy border-t border-border">
      {/* Upper Grid */}
      <div className="py-18 px-[6vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 md:gap-16">
        {/* Brand/About Col */}
        <div className="space-y-4">
          <Link href="/" className="font-display text-[1.45rem] font-medium tracking-[0.05em] text-white flex items-center gap-2.5 select-none">
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
          <p className="font-body text-[0.82rem] text-muted leading-[1.8] max-w-[200px] font-light">
            Building intelligent systems and scalable technology for the world of tomorrow.
          </p>
        </div>

        {/* Dynamic Link Columns */}
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title} className="flex flex-col">
            <h4 className="font-body text-[0.72rem] tracking-[0.2em] uppercase text-gold mb-5 font-medium select-none">
              {column.title}
            </h4>
            <ul className="space-y-2.5 font-body text-[0.83rem]">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('mailto:') || link.href === '#' || (link as any).external ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-muted hover:text-white transition-colors duration-200 font-light"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted hover:text-white transition-colors duration-200 font-light"
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

      {/* Bottom Copyright Bar */}
      <div className="py-6 px-[6vw] border-t border-border-dim flex flex-col md:flex-row justify-between items-center text-[0.76rem] text-muted font-light gap-2 md:gap-0 select-none">
        <p>© {currentYear} Koventra Systems. All rights reserved.</p>
        <p>Built with precision.</p>
      </div>
    </footer>
  );
}
