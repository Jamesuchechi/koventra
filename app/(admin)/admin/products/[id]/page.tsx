import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Fresh database query on each load

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  // Safely map Prisma Json field to string array
  const formattedProduct = {
    ...product,
    features: Array.isArray(product.features) ? (product.features as string[]) : [],
  };

  return <ProductForm initialData={formattedProduct} isEdit={true} />;
}
