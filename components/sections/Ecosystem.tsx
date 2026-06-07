import React from 'react';
import SectionReveal from '../ui/SectionReveal';
import SectionTag from '../ui/SectionTag';
import ProductCard from './ProductCard';
import prisma from '@/lib/prisma';
import { Product, ProductCategory, ProductStatus } from '@/lib/types';
import { Product as DBProduct } from '@prisma/client';

export default async function Ecosystem() {
  // Query all non-archived products from database sorted by sortOrder
  let dbProducts: DBProduct[] = [];
  try {
    dbProducts = await prisma.product.findMany({
      where: {
        status: {
          not: 'ARCHIVED',
        },
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  } catch (error) {
    console.error('Error fetching products from database:', error);
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

  return (
    <section id="ecosystem" className="py-28 px-[6vw] bg-navy">
      {/* Header */}
      <SectionReveal>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div>
            <SectionTag>The Ecosystem</SectionTag>
            <h2 className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-light leading-[1.08] text-white">
              Products built under<br />the <em className="italic text-gold">Koventra</em> umbrella
            </h2>
          </div>
          <p className="font-body text-[0.83rem] text-muted max-w-[280px] md:text-right leading-[1.7] font-light">
            A growing portfolio of focused products, each solving a specific problem at industry scale.
          </p>
        </div>
      </SectionReveal>

      {/* Grid of Product Cards */}
      <SectionReveal>
        {products.length === 0 ? (
          <div className="text-center py-16 border border-border-dim rounded-[4px] bg-navy-card">
            <p className="font-body text-xs text-muted uppercase tracking-wider">No products available in the ecosystem.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border-dim border border-border-dim rounded-[4px] overflow-hidden">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </SectionReveal>
    </section>
  );
}
