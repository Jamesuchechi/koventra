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
  LIVE: 'bg-live/10 text-live',
  BUILDING: 'bg-gold/10 text-gold',
  PLANNED: 'bg-white/5 text-muted',
  ARCHIVED: 'bg-white/5 text-muted',
};

const STATUS_LABELS = {
  LIVE: '● Live',
  BUILDING: 'In Development',
  PLANNED: 'Coming Soon',
  ARCHIVED: 'Archived',
};

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { name, tagline, description, status, externalUrl, logoUrl, features, slug } = product;
  const isPlanned = status === 'PLANNED';
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  const cardHref = `/products/${slug}`;

  const LogoBlock = () => (
    <div
      className="w-10 h-10 rounded-[7px] border border-border-dim flex items-center justify-center overflow-hidden relative shrink-0 bg-gold/5"
      style={{ fontSize: '1rem' }}
    >
      {logoUrl && (logoUrl.startsWith('/') || logoUrl.startsWith('http')) ? (
        <Image src={logoUrl} alt={name} fill className="object-cover" />
      ) : (
        <span className="font-display text-gold font-light text-[1rem]">
          {(logoUrl || name).substring(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );

  if (isCompact) {
    return (
      <Link
        href={cardHref}
        className={`group flex items-start gap-4 p-5 rounded-[8px] border border-border-dim hover:border-border hover:bg-navy-hover transition-all duration-250 ${isPlanned ? 'opacity-40 pointer-events-none' : ''}`}
      >
        <LogoBlock />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display text-[1.1rem] font-light text-white leading-none">{name}</h3>
            <span className={`text-[0.6rem] tracking-widest uppercase px-1.5 py-0.5 rounded-[2px] font-medium font-body ${STATUS_STYLES[status]}`}>
              {STATUS_LABELS[status]}
            </span>
          </div>
          <p className="font-body text-[0.8rem] text-muted font-light leading-relaxed line-clamp-2">{tagline || description}</p>
        </div>
        <ArrowUpRight size={15} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
      </Link>
    );
  }

  return (
    <div
      className={`group relative flex flex-col overflow-hidden transition-all duration-300 ${
        isFeatured
          ? 'bg-navy-hover rounded-[8px] border border-border-dim hover:border-border'
          : 'bg-navy-card rounded-[8px] border border-border-dim hover:border-border hover:bg-navy-hover'
      } ${isPlanned ? 'opacity-35 pointer-events-none' : ''}`}
    >
      {/* Featured gold accent line */}
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold/70 via-gold/20 to-transparent" />
      )}

      {/* Card body */}
      <div className={`flex flex-col flex-1 ${isFeatured ? 'p-8 md:p-10' : 'p-7'}`}>
        {/* Status badge */}
        <div className="mb-5">
          <span className={`inline-block font-body text-[0.68rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-[3px] font-medium ${STATUS_STYLES[status]}`}>
            {STATUS_LABELS[status]}
          </span>
        </div>

        {/* Logo */}
        <div className="mb-5">
          <LogoBlock />
        </div>

        {/* Name */}
        <h3
          className={`font-display font-light text-white leading-[1.05] mb-3 ${
            isFeatured ? 'text-[2.2rem]' : 'text-[1.65rem]'
          }`}
        >
          {name}
        </h3>

        {/* Tagline */}
        {tagline && (
          <p className={`font-display font-light text-muted italic mb-3 ${isFeatured ? 'text-[1.1rem]' : 'text-[0.95rem]'}`}>
            {tagline}
          </p>
        )}

        {/* Description */}
        <p className="font-body text-[0.85rem] text-muted leading-[1.8] font-light flex-1">
          {description}
        </p>

        {/* Feature tags */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {features.slice(0, isFeatured ? 5 : 3).map((feat) => (
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
              <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
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