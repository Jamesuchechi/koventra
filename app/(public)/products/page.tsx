import React from 'react';
import { Product as DBProduct } from '@prisma/client';
import prisma from '@/lib/prisma';
import { Product, ProductCategory, ProductStatus } from '@/lib/types';
import ProductsListClient from '@/components/public/ProductsListClient';
import SectionReveal from '@/components/ui/SectionReveal';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // Query all active products
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

  // Map database entries to strict type definition
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
    <main className="min-h-screen bg-navy pt-32 pb-24 px-[6vw]">
      {/* Page Header */}
      <div className="max-w-4xl mb-16">
        <SectionReveal>
          <span className="font-body text-[0.72rem] tracking-[0.2em] uppercase text-gold block mb-3 font-semibold">
            Product Ecosystem
          </span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-white tracking-tight">
            Explore the products built under <br />
            the <em className="italic text-gold">Koventra</em> umbrella
          </h1>
        </SectionReveal>
      </div>

      <ProductsListClient initialProducts={products} />
    </main>
  );
}
