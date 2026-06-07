import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { Product as DBProduct } from '@prisma/client';
import prisma from '@/lib/prisma';
import SectionReveal from '@/components/ui/SectionReveal';
import SectionTag from '@/components/ui/SectionTag';

export const dynamic = 'force-dynamic';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  // Retrieve product by slug from the database
  let product: DBProduct | null = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error('Error fetching product from database:', error);
  }

  // Redirect to 404 if not found or archived
  if (!product || product.status === 'ARCHIVED') {
    notFound();
  }

  const features = Array.isArray(product.features) ? (product.features as string[]) : [];
  const screenshots = Array.isArray(product.images) ? (product.images as string[]) : [];
  const isLive = product.status === 'LIVE';
  const isBuilding = product.status === 'BUILDING';

  return (
    <main className="min-h-screen bg-navy pt-32 pb-24 px-[6vw]">
      {/* Back to Products */}
      <div className="mb-12">
        <SectionReveal>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs text-muted hover:text-white uppercase tracking-wider transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            Back to Ecosystem
          </Link>
        </SectionReveal>
      </div>

      {/* Product Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start border-b border-border-dim pb-16 mb-16">
        <div className="space-y-6">
          <SectionReveal>
            {/* Status Badge */}
            <div className="mb-4">
              {isLive && (
                <span className="inline-block text-[0.68rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded-[2px] bg-[#22c55e]/10 text-live font-body">
                  ● Live Card
                </span>
              )}
              {isBuilding && (
                <span className="inline-block text-[0.68rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded-[2px] bg-gold/10 text-gold font-body">
                  In Active Development
                </span>
              )}
              {product.status === 'PLANNED' && (
                <span className="inline-block text-[0.68rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded-[2px] bg-white/5 text-muted font-body">
                  Coming Soon
                </span>
              )}
            </div>

            {/* Logo + Name */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-[8px] border border-border flex items-center justify-center font-display text-[1.4rem] text-gold bg-gold/5 shrink-0 overflow-hidden relative select-none">
                {product.logoUrl && (product.logoUrl.startsWith('/') || product.logoUrl.startsWith('http')) ? (
                  <Image
                    src={product.logoUrl}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <span>{(product.logoUrl || product.name).substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div>
                <h1 className="font-display text-[clamp(2rem,5vw,3.8rem)] font-light text-white leading-none">
                  {product.name}
                </h1>
                <p className="font-body text-xs text-muted uppercase tracking-wider mt-1">{product.category} Category</p>
              </div>
            </div>

            {/* Tagline */}
            {product.tagline && (
              <p className="font-display text-xl sm:text-2xl font-light text-gold leading-relaxed max-w-3xl">
                {product.tagline}
              </p>
            )}
          </SectionReveal>
        </div>

        {/* Action Button */}
        {product.externalUrl && product.status !== 'PLANNED' && (
          <SectionReveal>
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-gold hover:bg-[#d4b45a] text-navy font-body text-xs font-semibold tracking-widest uppercase rounded-[2px] flex items-center gap-2 transition-all duration-200"
            >
              <span>Visit Platform</span>
              <ExternalLink size={14} />
            </a>
          </SectionReveal>
        )}
      </section>

      {/* Main Details */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24">
        {/* Left Side: Overview & Description */}
        <div className="space-y-12">
          <SectionReveal>
            <SectionTag>Product Overview</SectionTag>
            <h2 className="font-display text-2xl font-light text-white mt-4 mb-6">
              Engineering parameters & directives
            </h2>
            <p className="font-body text-sm text-muted leading-[1.8] font-light whitespace-pre-wrap">
              {product.description || 'No detailed specifications have been registered for this product.'}
            </p>
          </SectionReveal>

          {/* Screenshots Gallery */}
          {screenshots.length > 0 && (
            <SectionReveal>
              <SectionTag>Visual Demonstration</SectionTag>
              <h2 className="font-display text-xl font-light text-white mt-4 mb-6">
                Interface screenshots
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {screenshots.map((screen, idx) => (
                  <div key={idx} className="relative aspect-video border border-border-dim rounded-[4px] overflow-hidden bg-navy-card">
                    <Image
                      src={screen}
                      alt={`${product.name} Screenshot ${idx + 1}`}
                      fill
                      unoptimized
                      className="object-cover hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </SectionReveal>
          )}
        </div>

        {/* Right Side: Features & Specifications */}
        <div className="space-y-8 h-fit bg-navy-card border border-border-dim rounded-[4px] p-8">
          <SectionReveal>
            <h3 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3 mb-6">
              Product Capabilities
            </h3>

            {features.length === 0 ? (
              <p className="font-body text-xs text-muted italic">No specific capability tags defined.</p>
            ) : (
              <ul className="space-y-4">
                {features.map((feat, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <ShieldCheck size={16} className="text-gold shrink-0 mt-0.5" />
                    <span className="font-body text-xs text-muted leading-relaxed font-light">{feat}</span>
                  </li>
                ))}
              </ul>
            )}
          </SectionReveal>

          <SectionReveal>
            <div className="pt-6 border-t border-border-dim space-y-4">
              <div>
                <span className="block font-body text-[10px] tracking-wider uppercase text-muted">Venture Status</span>
                <span className="block font-body text-xs text-white font-medium mt-1 uppercase tracking-wider">{product.status}</span>
              </div>
              <div>
                <span className="block font-body text-[10px] tracking-wider uppercase text-muted">Category Taxonomy</span>
                <span className="block font-body text-xs text-white font-medium mt-1 uppercase tracking-wider">{product.category}</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
