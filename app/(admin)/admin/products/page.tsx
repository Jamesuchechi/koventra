import React from 'react';
import prisma from '@/lib/prisma';
import ProductListClient from '@/components/admin/ProductListClient';

export const revalidate = 0; // Fresh database query on each load

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      status: true,
      featured: true,
      sortOrder: true,
    },
  });

  return <ProductListClient initialProducts={products} />;
}
