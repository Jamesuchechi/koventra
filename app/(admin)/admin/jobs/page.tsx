import React from 'react';
import prisma from '@/lib/prisma';
import JobListClient from '@/components/admin/JobListClient';

export const revalidate = 0; // Fetch fresh data on each load

export default async function AdminJobsPage() {
  const jobs = await prisma.jobListing.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      team: true,
      location: true,
      type: true,
      status: true,
      closesAt: true,
    },
  });

  return <JobListClient initialJobs={jobs} />;
}
