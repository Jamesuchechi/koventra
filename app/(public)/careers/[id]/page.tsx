import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Briefcase, Calendar, ExternalLink } from 'lucide-react';
import { JobListing as DBJob } from '@prisma/client';
import prisma from '@/lib/prisma';
import SectionReveal from '@/components/ui/SectionReveal';
import SectionTag from '@/components/ui/SectionTag';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'auto';
export const revalidate = 60;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const job = await prisma.jobListing.findUnique({
    where: { id: params.id },
  });

  if (!job || job.status !== 'OPEN') {
    return buildMetadata({
      title: 'Job Not Found',
      description: 'This career opportunity is not currently available.',
      pathname: `/careers/${params.id}`,
    });
  }

  return buildMetadata({
    title: `${job.title} | ${job.team}`,
    description: job.description ? job.description.slice(0, 160) : `Apply for ${job.title} at Koventra Systems.`,
    pathname: `/careers/${params.id}`,
  });
}

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;

  // Retrieve job listing by id
  let job: DBJob | null = null;
  try {
    job = await prisma.jobListing.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching job from database:', error);
  }

  // Verify job exists and is open
  if (!job || job.status !== 'OPEN') {
    notFound();
  }

  const formatJobType = (type: string) => {
    return type.replace('_', ' ').toLowerCase();
  };

  const formatClosesDate = (dateVal: Date | null) => {
    if (!dateVal) return null;
    return new Date(dateVal).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-navy pt-32 pb-24 px-[6vw]">
      {/* Back Link */}
      <div className="mb-12">
        <SectionReveal>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs text-muted hover:text-white uppercase tracking-wider transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            Back to Careers
          </Link>
        </SectionReveal>
      </div>

      {/* Header Panel */}
      <section className="border-b border-border-dim pb-16 mb-16">
        <SectionReveal>
          <span className="font-body text-[10px] tracking-widest uppercase text-gold font-medium block mb-3">
            {job.team} Division
          </span>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light text-white leading-tight mb-6 tracking-tight">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-body text-xs text-muted font-light">
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-gold" />
              {job.location}
            </span>
            <span className="flex items-center gap-2 capitalize">
              <Briefcase size={14} className="text-gold" />
              {formatJobType(job.type)}
            </span>
            {job.closesAt && (
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-gold" />
                Applications close: {formatClosesDate(job.closesAt)}
              </span>
            )}
          </div>
        </SectionReveal>
      </section>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24">
        {/* Left: Job Description */}
        <div>
          <SectionReveal>
            <SectionTag>Job Specification</SectionTag>
            <h2 className="font-display text-2xl font-light text-white mt-4 mb-8">
              Role description & requirements
            </h2>
            <div className="font-body text-sm text-muted leading-[1.85] font-light whitespace-pre-wrap space-y-6">
              {job.description || 'No description provided for this listing.'}
            </div>
          </SectionReveal>
        </div>

        {/* Right: Apply Sidebar */}
        <div className="space-y-8 h-fit bg-navy-card border border-border-dim rounded-[4px] p-8">
          <SectionReveal>
            <h3 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3 mb-6">
              Application Portal
            </h3>
            <p className="font-body text-xs text-muted leading-relaxed font-light mb-6">
              We recruit on a rolling basis. Ensure your CV clearly articulates your engineering competencies or operations track record.
            </p>

            {job.applyUrl ? (
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-gold hover:bg-[#d4b45a] text-navy font-body text-xs font-semibold tracking-widest uppercase rounded-[2px] flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span>Apply External</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <Link
                href="/contact"
                className="w-full py-4 bg-gold hover:bg-[#d4b45a] text-navy font-body text-xs font-semibold tracking-widest uppercase rounded-[2px] flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span>Submit CV via Contact</span>
              </Link>
            )}
          </SectionReveal>

          <SectionReveal>
            <div className="pt-6 border-t border-border-dim">
              <span className="block font-body text-[10px] tracking-wider uppercase text-muted">Security Clearance</span>
              <span className="block font-body text-xs text-white font-light mt-2 leading-relaxed">
                Positions at Koventra may require standard operations background verification or security clearance protocol depending on division assignments.
              </span>
            </div>
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
