import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionReveal from '../ui/SectionReveal';
import SectionTag from '../ui/SectionTag';
import ProductCard from './ProductCard';
import prisma from '@/lib/prisma';
import { Product, ProductCategory, ProductStatus } from '@/lib/types';
import { Product as DBProduct } from '@prisma/client';

export default async function Ecosystem() {
  let dbProducts: DBProduct[] = [];
  try {
    dbProducts = await prisma.product.findMany({
      where: { status: { not: 'ARCHIVED' } },
      orderBy: { sortOrder: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  const products: Product[] = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    tagline: p.tagline,
    description: p.description,
    category: p.category as ProductCategory,
    status: p.status as ProductStatus,
    externalUrl: p.externalUrl,
    logoUrl: p.logoUrl,
    images: Array.isArray(p.images) ? (p.images as string[]) : [],
    features: Array.isArray(p.features) ? (p.features as string[]) : [],
    featured: p.featured,
    sortOrder: p.sortOrder,
    launchedAt: null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  const featuredProducts = products.filter((p) => p.featured);
  const regularProducts = products.filter((p) => !p.featured);

  return (
    <section id="ecosystem" className="py-28 px-6 md:px-10 bg-navy">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <SectionTag>The Ecosystem</SectionTag>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-[1.07] text-white">
                Products built under<br />
                the <em className="italic text-gold">Koventra</em> umbrella
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <p className="font-body text-[0.85rem] text-muted max-w-[280px] md:text-right leading-relaxed font-light">
                A focused portfolio of ventures — each solving a specific problem at industry scale.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 font-body text-[0.8rem] tracking-[0.06em] uppercase text-gold hover:text-white transition-colors duration-200"
              >
                View all products <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </SectionReveal>

        {products.length === 0 ? (
          <SectionReveal>
            <div className="text-center py-16 border border-border-dim rounded-[8px] bg-navy-card">
              <p className="font-body text-xs text-muted uppercase tracking-wider">No products in the ecosystem yet.</p>
            </div>
          </SectionReveal>
        ) : (
          <div className="space-y-4">
            {/* Featured products — full width or 2-col */}
            {featuredProducts.length > 0 && (
              <SectionReveal>
                <div className={`grid gap-4 ${featuredProducts.length === 1 ? 'grid-cols-1 md:grid-cols-[1.6fr_1fr]' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {featuredProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} variant="featured" />
                  ))}
                  {/* Fill the right column with up to 2 regular products if only 1 featured */}
                  {featuredProducts.length === 1 && regularProducts.slice(0, 2).map((p) => (
                    <ProductCard key={p.id} product={p} variant="compact" />
                  ))}
                </div>
              </SectionReveal>
            )}

            {/* Remaining regular products grid */}
            {(() => {
              const remaining = featuredProducts.length === 1
                ? regularProducts.slice(2)
                : regularProducts;

              if (remaining.length === 0) return null;

              return (
                <SectionReveal>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {remaining.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </SectionReveal>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}