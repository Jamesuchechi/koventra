import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import PressForm from '@/components/admin/PressForm';

interface EditPressPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Fresh database query on each load

export default async function EditPressPage({ params }: EditPressPageProps) {
  const { id } = await params;

  const entry = await prisma.pressEntry.findUnique({
    where: { id },
  });

  if (!entry) {
    notFound();
  }

  return <PressForm initialData={entry} isEdit={true} />;
}
