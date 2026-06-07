import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, tagline, description, status, externalUrl, logoUrl, features, featured } = product;

  const isLive = status === 'LIVE';
  const isBuilding = status === 'BUILDING';
  const isPlanned = status === 'PLANNED';

  // Card classes
  const cardClasses = `px-9 pt-10 pb-8 flex flex-col relative overflow-hidden transition-all duration-350 cursor-default hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 group ${
    featured ? 'md:col-span-2 bg-navy-hover' : 'bg-navy-card hover:bg-navy-hover'
  } ${isPlanned ? 'opacity-38 pointer-events-none' : ''}`;

  return (
    <div className={cardClasses}>
      {/* Featured Top Border Gradient Accent */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-transparent" />
      )}

      {/* Badge */}
      <div className="mb-6 self-start">
        {isLive && (
          <span className="inline-block text-[0.68rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded-[2px] bg-[#22c55e]/10 text-live font-body">
            ● Live
          </span>
        )}
        {isBuilding && (
          <span className="inline-block text-[0.68rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded-[2px] bg-gold/10 text-gold font-body">
            In Development
          </span>
        )}
        {isPlanned && (
          <span className="inline-block text-[0.68rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded-[2px] bg-white/5 text-muted font-body">
            Coming Soon
          </span>
        )}
      </div>

      {/* Icon Wordmark Initials */}
      <div className="w-11 h-11 rounded-[6px] border border-border flex items-center justify-center font-display text-[1.05rem] text-gold bg-gold/5 mb-5.5 shrink-0 select-none overflow-hidden relative">
        {logoUrl && (logoUrl.startsWith('/') || logoUrl.startsWith('http')) ? (
          <Image
            src={logoUrl}
            alt={name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <span>{(logoUrl || name).substring(0, 2).toUpperCase()}</span>
        )}
      </div>

      {/* Name */}
      <h3 className={`font-display font-light text-white mb-2 leading-none ${featured ? 'text-[2.2rem]' : 'text-[1.7rem]'}`}>
        {name}
      </h3>

      {/* Description */}
      <p className="font-body text-[0.85rem] text-muted leading-relaxed font-light flex-1">
        {description}
      </p>

      {/* Features tags */}
      {features && features.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5">
          {features.map((feat) => (
            <span
              key={feat}
              className="font-body text-[0.72rem] tracking-[0.1em] uppercase px-2.5 py-1 border border-border rounded-[2px] text-muted whitespace-nowrap"
            >
              {feat}
            </span>
          ))}
        </div>
      )}

      {/* Navigation / Action Link */}
      {!isPlanned && (
        <div className="mt-7 self-start">
          {externalUrl?.startsWith('http') ? (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.78rem] tracking-[0.1em] uppercase text-gold hover:text-white transition-colors duration-300 relative pb-0.5"
            >
              <span>Visit {new URL(externalUrl).hostname}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-350" />
            </a>
          ) : (
            <Link
              href={externalUrl || '#contact'}
              className="inline-flex items-center gap-1.5 text-[0.78rem] tracking-[0.1em] uppercase text-gold hover:text-white transition-colors duration-300 relative pb-0.5"
            >
              <span>{isBuilding ? 'Get notified' : 'Learn more'}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-350" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
