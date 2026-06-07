import React from 'react';
import prisma from '@/lib/prisma';
import PressListClient from '@/components/admin/PressListClient';

export const revalidate = 0; // Fetch fresh data on each load

export default async function AdminPressPage() {
  const entries = await prisma.pressEntry.findMany({
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      headline: true,
      publication: true,
      url: true,
      logoUrl: true,
      publishedAt: true,
      featured: true,
    },
  });

  return <PressListClient initialEntries={entries} />;
}
