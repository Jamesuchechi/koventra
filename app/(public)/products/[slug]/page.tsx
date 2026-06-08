import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Product as DBProduct } from '@prisma/client';
import prisma from '@/lib/prisma';
import SectionReveal from '@/components/ui/SectionReveal';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product || product.status === 'ARCHIVED') {
    return buildMetadata({
      title: 'Product Not Found',
      description: 'The requested product is unavailable in the Koventra Systems ecosystem.',
      pathname: `/products/${slug}`,
    });
  }

  return buildMetadata({
    title: product.name,
    description: product.description ?? product.tagline ?? `Explore ${product.name} from Koventra Systems.`,
    pathname: `/products/${slug}`,
    ogImageUrl: product.logoUrl ?? undefined,
  });
}

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_BG: Record<string, string> = {
  AI:         'from-[#0a1628] via-[#080c18]',
  SAAS:       'from-[#0f1a2e] via-[#080c18]',
  ENTERPRISE: 'from-[#0a1a0a] via-[#080c18]',
  FINTECH:    'from-[#1a0f0a] via-[#080c18]',
  OTHER:      'from-[#0f0f1a] via-[#080c18]',
};

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  LIVE:     { label: '● Live',         cls: 'bg-[#22c55e]/10 text-[#4ade80] border border-[#22c55e]/25' },
  BUILDING: { label: 'In Development', cls: 'bg-gold/10 text-gold border border-gold/25' },
  PLANNED:  { label: 'Coming Soon',    cls: 'bg-white/5 text-muted border border-white/10' },
  ARCHIVED: { label: 'Archived',       cls: 'bg-white/5 text-muted border border-white/10' },
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  let product: DBProduct | null = null;
  try {
    product = await prisma.product.findUnique({ where: { slug } });
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  if (!product || product.status === 'ARCHIVED') notFound();

  const features    = Array.isArray(product.features) ? (product.features as string[]) : [];
  const screenshots = Array.isArray(product.images)   ? (product.images   as string[]) : [];
  const statusCfg   = STATUS_CONFIG[product.status] ?? STATUS_CONFIG.PLANNED;
  const bgFrom      = CATEGORY_BG[product.category]  ?? CATEGORY_BG.OTHER;
  const hasLogo     = product.logoUrl &&
    (product.logoUrl.startsWith('/') || product.logoUrl.startsWith('http'));

  return (
    <main className="min-h-screen bg-navy overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className={`relative min-h-[70vh] flex flex-col justify-end bg-gradient-to-b ${bgFrom} to-navy overflow-hidden`}>

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.09]"
            style={{ background: 'radial-gradient(circle at top right, #c9a84c, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-[0.06]"
            style={{ background: 'radial-gradient(circle at bottom left, #c9a84c, transparent 65%)' }}
          />
        </div>

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 40%, black 30%, transparent 100%)',
          }}
        />

        {/* Product logo blurred in background for atmosphere */}
        {hasLogo && (
          <div className="absolute inset-0 opacity-[0.07]">
            <Image src={product.logoUrl!} alt="" fill className="object-cover object-center scale-110 blur-sm" />
          </div>
        )}

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy to-transparent" />

        {/* Back link */}
        <div className="relative z-10 pt-28 px-[6vw]">
          <SectionReveal>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-body text-[0.72rem] tracking-[0.18em] uppercase text-muted hover:text-white transition-colors duration-200 mb-16"
            >
              <ArrowLeft size={13} />
              Back to Ecosystem
            </Link>
          </SectionReveal>
        </div>

        {/* Hero content */}
        <div className="relative z-10 px-[6vw] pb-20 max-w-[1400px] mx-auto w-full">
          <SectionReveal>
            {/* Status + category row */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className={`font-body text-[0.68rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-[3px] font-medium ${statusCfg.cls}`}>
                {statusCfg.label}
              </span>
              <span className="font-body text-[0.68rem] tracking-[0.18em] uppercase text-muted/60">
                {product.category} · Koventra Ecosystem
              </span>
            </div>

            {/* Logo + Title */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-6">
              {hasLogo ? (
                <div className="w-20 h-20 rounded-[12px] border border-gold/20 overflow-hidden relative shrink-0 bg-gold/5">
                  <Image src={product.logoUrl!} alt={product.name} fill className="object-cover" />
                </div>
              ) : product.logoUrl ? (
                <div className="w-20 h-20 rounded-[12px] border border-gold/20 flex items-center justify-center bg-gold/5 shrink-0">
                  <span className="font-display text-gold text-[2rem] font-light leading-none">
                    {product.logoUrl.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              ) : null}

              <h1
                className="font-display font-light text-white leading-[0.95] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
              >
                {product.name}
              </h1>
            </div>

            {/* Tagline */}
            {product.tagline && (
              <p
                className="font-display font-light italic text-gold leading-[1.2] max-w-[680px]"
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}
              >
                {product.tagline}
              </p>
            )}
          </SectionReveal>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <div className="px-[6vw] py-20 max-w-[1400px] mx-auto w-full">

        {/* Top action bar */}
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-20 pb-10 border-b border-border-dim">
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              <div>
                <span className="block font-body text-[0.65rem] tracking-[0.18em] uppercase text-muted mb-1">Status</span>
                <span className={`inline-block font-body text-[0.68rem] tracking-[0.12em] uppercase px-2.5 py-1 rounded-[3px] font-medium ${statusCfg.cls}`}>
                  {statusCfg.label}
                </span>
              </div>
              <div>
                <span className="block font-body text-[0.65rem] tracking-[0.18em] uppercase text-muted mb-1">Category</span>
                <span className="font-body text-[0.82rem] text-white font-medium tracking-wider">{product.category}</span>
              </div>
              {product.externalUrl?.startsWith('http') && (
                <div>
                  <span className="block font-body text-[0.65rem] tracking-[0.18em] uppercase text-muted mb-1">Domain</span>
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[0.82rem] text-gold hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    {new URL(product.externalUrl).hostname}
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              )}
            </div>

            {product.externalUrl && product.status !== 'PLANNED' && (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold hover:bg-[#d4b45a] text-navy font-body text-[0.8rem] font-semibold tracking-[0.12em] uppercase rounded-[3px] transition-all duration-200 shrink-0 group"
              >
                Visit Platform
                <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            )}
          </div>
        </SectionReveal>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24">

          {/* LEFT: Description + Screenshots */}
          <div className="space-y-16">

            <SectionReveal>
              <div>
                <span className="font-body text-[0.68rem] tracking-[0.22em] uppercase text-gold block mb-4">
                  Overview
                </span>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light text-white leading-[1.15] mb-8">
                  What {product.name} does
                </h2>
                <div className="font-body text-[0.95rem] text-muted leading-[1.95] font-light space-y-5">
                  {product.description
                    ? product.description.split('\n\n').map((para, i) => <p key={i}>{para}</p>)
                    : <p className="italic opacity-60">No description has been registered for this product yet.</p>
                  }
                </div>
              </div>
            </SectionReveal>

            {screenshots.length > 0 && (
              <SectionReveal>
                <div>
                  <span className="font-body text-[0.68rem] tracking-[0.22em] uppercase text-gold block mb-4">
                    Interface
                  </span>
                  <h2 className="font-display text-[clamp(1.4rem,2.5vw,2rem)] font-light text-white leading-[1.15] mb-8">
                    Screenshots
                  </h2>
                  <div className={`grid gap-4 ${screenshots.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    {screenshots.map((screen, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-video border border-border-dim rounded-[6px] overflow-hidden bg-navy-card group"
                      >
                        <Image
                          src={screen}
                          alt={`${product.name} screenshot ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            )}
          </div>

          {/* RIGHT: Features + Specs */}
          <div className="space-y-6">

            {features.length > 0 && (
              <SectionReveal>
                <div className="bg-navy-card border border-border-dim rounded-[8px] overflow-hidden">
                  <div className="px-8 py-5 border-b border-border-dim flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="font-body text-[0.7rem] tracking-[0.2em] uppercase text-gold font-medium">
                      Capabilities
                    </span>
                  </div>
                  <ul className="divide-y divide-border-dim">
                    {features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 px-8 py-4 group hover:bg-navy-hover transition-colors duration-200"
                      >
                        <span className="font-display text-gold/40 text-[0.82rem] font-light mt-0.5 group-hover:text-gold/70 transition-colors duration-200 w-5 shrink-0 select-none">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-body text-[0.85rem] text-muted leading-relaxed font-light group-hover:text-white/80 transition-colors duration-200">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            )}

            <SectionReveal>
              <div className="bg-navy-card border border-border-dim rounded-[8px] overflow-hidden">
                <div className="px-8 py-5 border-b border-border-dim flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="font-body text-[0.7rem] tracking-[0.2em] uppercase text-gold font-medium">
                    Specifications
                  </span>
                </div>
                <div className="divide-y divide-border-dim">
                  {[
                    { label: 'Venture Status', value: product.status },
                    { label: 'Category',       value: product.category },
                    { label: 'Ecosystem',      value: 'Koventra Systems' },
                    ...(product.externalUrl?.startsWith('http')
                      ? [{ label: 'Platform', value: new URL(product.externalUrl).hostname }]
                      : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-8 py-4">
                      <span className="font-body text-[0.72rem] tracking-[0.14em] uppercase text-muted">{label}</span>
                      <span className="font-body text-[0.82rem] text-white font-medium tracking-wide">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {features.length === 0 && product.externalUrl && product.status !== 'PLANNED' && (
              <SectionReveal>
                <div className="bg-navy-card border border-border-dim rounded-[8px] p-8 space-y-5">
                  <p className="font-body text-xs text-muted leading-relaxed font-light">
                    {product.name} is {product.status === 'LIVE' ? 'live and available' : 'currently in active development'}.
                    {product.status === 'LIVE' ? ' Visit the platform to explore its full capabilities.' : ' Follow along as we build.'}
                  </p>
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-gold hover:bg-[#d4b45a] text-navy font-body text-[0.78rem] font-semibold tracking-widest uppercase rounded-[2px] flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    Visit Platform
                    <ExternalLink size={13} />
                  </a>
                </div>
              </SectionReveal>
            )}
          </div>
        </div>

        {/* Bottom: explore more */}
        <SectionReveal>
          <div className="mt-28 pt-16 border-t border-border-dim flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="font-body text-[0.68rem] tracking-[0.22em] uppercase text-gold block mb-2">
                The Ecosystem
              </span>
              <p className="font-display text-[1.4rem] font-light text-white">
                Explore more Koventra ventures
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border-dim hover:border-gold/40 text-white font-body text-[0.78rem] tracking-[0.1em] uppercase rounded-[3px] transition-all duration-200 group hover:bg-gold/5"
            >
              View all products
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </SectionReveal>

      </div>
    </main>
  );
}