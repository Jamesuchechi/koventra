import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import JobForm from '@/components/admin/JobForm';

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Fresh database query on each load

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;

  const job = await prisma.jobListing.findUnique({
    where: { id },
  });

  if (!job) {
    notFound();
  }

  return <JobForm initialData={job} isEdit={true} />;
}
