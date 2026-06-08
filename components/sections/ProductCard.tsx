'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured' | 'compact';
}

const STATUS_STYLES = {
  LIVE: 'bg-[#22c55e]/10 text-[#4ade80] border border-[#22c55e]/20',
  BUILDING: 'bg-gold/10 text-gold border border-gold/20',
  PLANNED: 'bg-white/5 text-muted border border-white/10',
  ARCHIVED: 'bg-white/5 text-muted border border-white/10',
};

const STATUS_LABELS = {
  LIVE: '● Live',
  BUILDING: 'In Development',
  PLANNED: 'Coming Soon',
  ARCHIVED: 'Archived',
};

/* 
  Gradient overlays for featured cards — each product gets a unique color atmosphere.
  Falls back gracefully if no image is present.
*/
const FEATURED_GRADIENTS = [
  'from-[#0a1628] via-[#0d1f3c]/80 to-transparent',
  'from-[#160a28] via-[#1f0d3c]/80 to-transparent',
  'from-[#160c0a] via-[#3c1a0d]/80 to-transparent',
];

const PRODUCT_BG_PATTERNS: Record<string, string> = {
  AI: 'bg-gradient-to-br from-[#0d1f3c] via-[#080c18] to-[#131929]',
  SAAS: 'bg-gradient-to-br from-[#0f1a2e] via-[#080c18] to-[#131929]',
  ENTERPRISE: 'bg-gradient-to-br from-[#0a1a0a] via-[#080c18] to-[#131929]',
  FINTECH: 'bg-gradient-to-br from-[#1a0f0a] via-[#080c18] to-[#131929]',
  OTHER: 'bg-gradient-to-br from-[#0f0f1a] via-[#080c18] to-[#131929]',
};

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { name, tagline, description, status, externalUrl, logoUrl, features, slug, category } = product;
  const isPlanned = status === 'PLANNED';
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  const cardHref = `/products/${slug}`;
  const bgPattern = PRODUCT_BG_PATTERNS[category] || PRODUCT_BG_PATTERNS.OTHER;

  const hasRealImage =
    logoUrl && (logoUrl.startsWith('/') || logoUrl.startsWith('http'));

  /* ── COMPACT variant ─────────────────────────────────── */
  if (isCompact) {
    return (
      <Link
        href={cardHref}
        className={`group flex items-start gap-4 p-5 rounded-[8px] border border-border-dim hover:border-border hover:bg-navy-hover transition-all duration-250 ${
          isPlanned ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        {/* Logo block */}
        <div className="w-10 h-10 rounded-[7px] border border-border-dim flex items-center justify-center overflow-hidden relative shrink-0 bg-gold/5">
          {hasRealImage ? (
            <Image src={logoUrl!} alt={name} fill className="object-cover" />
          ) : (
            <span className="font-display text-gold font-light text-[1rem]">
              {(logoUrl || name).substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display text-[1.1rem] font-light text-white leading-none">{name}</h3>
            <span
              className={`text-[0.6rem] tracking-widest uppercase px-1.5 py-0.5 rounded-[2px] font-medium font-body ${STATUS_STYLES[status]}`}
            >
              {STATUS_LABELS[status]}
            </span>
          </div>
          <p className="font-body text-[0.8rem] text-muted font-light leading-relaxed line-clamp-2">
            {tagline || description}
          </p>
        </div>

        <ArrowUpRight
          size={15}
          className="text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5"
        />
      </Link>
    );
  }

  /* ── FEATURED variant ────────────────────────────────── */
  if (isFeatured) {
    return (
      <Link
        href={cardHref}
        className={`group relative flex flex-col overflow-hidden rounded-[12px] border border-border-dim hover:border-gold/30 transition-all duration-500 min-h-[420px] md:min-h-[480px] ${
          isPlanned ? 'opacity-35 pointer-events-none' : ''
        }`}
        style={{ isolation: 'isolate' }}
      >
        {/* Background — image fill or gradient pattern */}
        <div className="absolute inset-0 z-0">
          {hasRealImage ? (
            <>
              <Image
                src={logoUrl!}
                alt={name}
                fill
                className="object-cover scale-[1.04] group-hover:scale-[1.0] transition-transform duration-700 ease-out"
              />
              {/* Dark vignette so text always readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c18] via-[#080c18]/70 to-[#080c18]/20" />
            </>
          ) : (
            <>
              {/* Rich ambient background for products without images */}
              <div className={`absolute inset-0 ${bgPattern}`} />
              {/* Animated noise-like ambient glow */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    'radial-gradient(ellipse 65% 55% at 70% 30%, rgba(201,168,76,0.18) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    'radial-gradient(ellipse 50% 45% at 20% 80%, rgba(201,168,76,0.12) 0%, transparent 65%)',
                }}
              />
              {/* Subtle grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                  maskImage:
                    'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
                }}
              />
            </>
          )}
        </div>

        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold/80 via-gold/30 to-transparent z-10" />

        {/* Content — positioned at bottom */}
        <div className="relative z-10 flex flex-col flex-1 justify-between p-8 md:p-10">
          {/* Top row — status + category */}
          <div className="flex items-start justify-between">
            <span
              className={`inline-block font-body text-[0.68rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-[3px] font-medium backdrop-blur-sm ${STATUS_STYLES[status]}`}
            >
              {STATUS_LABELS[status]}
            </span>
            <span className="font-body text-[0.65rem] tracking-[0.18em] uppercase text-muted/60 backdrop-blur-sm">
              {category}
            </span>
          </div>

          {/* Bottom — name, tagline, features, CTA */}
          <div className="space-y-4 mt-auto pt-10">
            {/* Logo mark — small, refined, above the name */}
            {!hasRealImage && (
              <div className="w-12 h-12 rounded-[9px] border border-gold/30 flex items-center justify-center bg-gold/8 backdrop-blur-sm">
                <span className="font-display text-gold font-light text-[1.2rem]">
                  {(logoUrl || name).substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}

            <div>
              <h3 className="font-display text-[2.5rem] md:text-[3rem] font-light text-white leading-[1.02] tracking-[-0.01em] mb-2">
                {name}
              </h3>
              {tagline && (
                <p className="font-display text-[1.1rem] md:text-[1.2rem] font-light text-gold/90 italic leading-snug">
                  {tagline}
                </p>
              )}
            </div>

            {description && (
              <p className="font-body text-[0.88rem] text-muted leading-[1.75] font-light max-w-[520px] line-clamp-2">
                {description}
              </p>
            )}

            {/* Feature tags */}
            {features && features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {features.slice(0, 5).map((feat) => (
                  <span
                    key={feat}
                    className="font-body text-[0.68rem] tracking-[0.08em] uppercase px-2.5 py-1 border border-white/10 rounded-[3px] text-muted/80 backdrop-blur-sm bg-white/[0.04]"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            )}

            {/* Action row */}
            {!isPlanned && (
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="inline-flex items-center gap-2 font-body text-[0.82rem] tracking-[0.06em] uppercase text-gold group-hover:text-white transition-colors duration-300">
                  Learn more
                  <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
                </span>

                {externalUrl?.startsWith('http') && (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(externalUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="inline-flex items-center gap-1.5 font-body text-[0.72rem] text-muted hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <span className="text-[0.65rem] tracking-[0.1em] uppercase">
                      {new URL(externalUrl).hostname}
                    </span>
                    <ArrowUpRight size={12} />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hover shimmer overlay */}
        <div className="absolute inset-0 z-[5] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-transparent via-transparent to-gold/[0.03]" />
      </Link>
    );
  }

  /* ── DEFAULT variant ─────────────────────────────────── */
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-[8px] border border-border-dim hover:border-border hover:bg-navy-hover transition-all duration-300 bg-navy-card ${
        isPlanned ? 'opacity-35 pointer-events-none' : ''
      }`}
    >
      {/* Subtle top color based on status */}
      {status === 'LIVE' && (
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#4ade80]/60 via-[#4ade80]/20 to-transparent" />
      )}
      {status === 'BUILDING' && (
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold/50 via-gold/15 to-transparent" />
      )}

      <div className="flex flex-col flex-1 p-7">
        {/* Status badge */}
        <div className="mb-5">
          <span
            className={`inline-block font-body text-[0.68rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-[3px] font-medium ${STATUS_STYLES[status]}`}
          >
            {STATUS_LABELS[status]}
          </span>
        </div>

        {/* Logo */}
        <div className="mb-5">
          <div className="w-10 h-10 rounded-[7px] border border-border-dim flex items-center justify-center overflow-hidden relative shrink-0 bg-gold/5">
            {hasRealImage ? (
              <Image src={logoUrl!} alt={name} fill className="object-cover" />
            ) : (
              <span className="font-display text-gold font-light text-[1rem]">
                {(logoUrl || name).substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="font-display font-light text-white leading-[1.05] mb-3 text-[1.65rem]">{name}</h3>

        {/* Tagline */}
        {tagline && (
          <p className="font-display font-light text-muted italic mb-3 text-[0.95rem]">{tagline}</p>
        )}

        {/* Description */}
        <p className="font-body text-[0.85rem] text-muted leading-[1.8] font-light flex-1">{description}</p>

        {/* Feature tags */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {features.slice(0, 3).map((feat) => (
              <span
                key={feat}
                className="font-body text-[0.68rem] tracking-[0.08em] uppercase px-2.5 py-1 border border-border-dim rounded-[3px] text-muted"
              >
                {feat}
              </span>
            ))}
          </div>
        )}

        {/* Action link */}
        {!isPlanned && (
          <div className="mt-7 pt-5 border-t border-border-dim flex items-center justify-between">
            <Link
              href={cardHref}
              className="inline-flex items-center gap-1.5 font-body text-[0.8rem] tracking-[0.06em] uppercase text-gold hover:text-white transition-colors duration-200 group/link"
            >
              <span>Learn more</span>
              <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 inline-block">→</span>
            </Link>

            {externalUrl?.startsWith('http') && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-[0.78rem] text-muted hover:text-white transition-colors duration-200"
              >
                <span className="text-[0.68rem] tracking-[0.08em] uppercase">
                  {new URL(externalUrl).hostname}
                </span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}