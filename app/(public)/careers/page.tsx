import React from 'react';
import { JobListing as DBJob } from '@prisma/client';
import prisma from '@/lib/prisma';
import { JobListing, JobStatus, JobType } from '@/lib/types';
import CareersListClient from '@/components/public/CareersListClient';
import SectionReveal from '@/components/ui/SectionReveal';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'auto';
export const revalidate = 60;
export const metadata = buildMetadata({
  title: 'Careers',
  description: 'Discover open roles at Koventra Systems across engineering, operations, and product teams.',
  pathname: '/careers',
});

export default async function CareersPage() {
  // Query all OPEN jobs
  let dbJobs: DBJob[] = [];
  try {
    dbJobs = await prisma.jobListing.findMany({
      where: {
        status: 'OPEN',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching job listings from database:', error);
  }

  // Map to frontend interface types
  const jobs: JobListing[] = dbJobs.map((j) => ({
    id: j.id,
    title: j.title,
    team: j.team,
    location: j.location,
    type: j.type as JobType,
    status: j.status as JobStatus,
    description: j.description,
    applyUrl: j.applyUrl,
    closesAt: j.closesAt ? j.closesAt.toISOString() : null,
    createdAt: j.createdAt.toISOString(),
    updatedAt: j.updatedAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-navy pt-32 pb-24 px-[6vw]">
      {/* Page Header */}
      <div className="max-w-4xl mb-16">
        <SectionReveal>
          <span className="font-body text-[0.72rem] tracking-[0.2em] uppercase text-gold block mb-3 font-semibold">
            Careers & Capital
          </span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-white tracking-tight">
            Build the next era of <br />
            <em className="italic text-gold">systems software</em>
          </h1>
        </SectionReveal>
      </div>

      <CareersListClient initialJobs={jobs} />
    </main>
  );
}
