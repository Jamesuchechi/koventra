import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { TeamMember } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getSiteSettings } from '@/lib/settings';
import { buildMetadata } from '@/lib/seo';
import SectionReveal from '@/components/ui/SectionReveal';
import SectionTag from '@/components/ui/SectionTag';

export const dynamic = 'auto';
export const revalidate = 60;

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: 'About',
    description: settings.missionParagraph1,
    pathname: '/about',
  });
}

export default async function AboutPage() {
  const settings = await getSiteSettings();
  
  // Fetch only visible team members, ordered by sortOrder
  let team: TeamMember[] = [];
  try {
    team = await prisma.teamMember.findMany({
      where: { visible: true },
      orderBy: { sortOrder: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching team members from database:', error);
  }

  return (
    <main className="min-h-screen bg-navy pt-32 pb-24 px-[6vw]">
      {/* Page Header */}
      <div className="max-w-4xl mb-20">
        <SectionReveal>
          <span className="font-body text-[0.72rem] tracking-[0.2em] uppercase text-gold block mb-3 font-semibold">
            About the Systems Company
          </span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-white tracking-tight">
            We build the future of <br />
            <em className="italic text-gold">industrial intelligence</em>
          </h1>
        </SectionReveal>
      </div>

      {/* Company Philosophy & Story */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-28 border-t border-border-dim pt-16 mb-28">
        <div>
          <SectionReveal>
            <SectionTag>Our Story</SectionTag>
            <h2 className="font-display text-2xl font-light text-white mt-4 mb-6">
              {settings.missionTitle}
            </h2>
            <div className="font-body text-sm text-muted leading-relaxed space-y-6 font-light">
              <p>{settings.missionParagraph1}</p>
              {settings.missionParagraph2 && <p>{settings.missionParagraph2}</p>}
            </div>
          </SectionReveal>
        </div>

        <div className="bg-navy-card border border-border-dim rounded-[4px] p-8 flex flex-col justify-between h-fit">
          <SectionReveal>
            <h3 className="font-body text-xs font-semibold tracking-wider text-gold uppercase mb-6">
              Corporate Directives
            </h3>
            <ul className="space-y-4 font-body text-xs text-muted font-light">
              <li className="flex items-start gap-3">
                <span className="text-gold font-semibold">•</span>
                <span>Long-term private capital deployment structure.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-semibold">•</span>
                <span>Category leadership mandates across active portfolios.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-semibold">•</span>
                <span>100% focused on solving deep, industry-level challenges.</span>
              </li>
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t border-border-dim pt-16">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
            <div>
              <SectionTag>Leadership & Personnel</SectionTag>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-light leading-[1.1] text-white mt-2">
                The minds driving <em className="italic text-gold">Koventra</em>
              </h2>
            </div>
            <p className="font-body text-[0.8rem] text-muted max-w-[280px] md:text-right leading-relaxed font-light">
              An interdisciplinary team of engineers, operations executives, and domain experts.
            </p>
          </div>
        </SectionReveal>

        {/* Team Grid */}
        <SectionReveal>
          {team.length === 0 ? (
            <div className="text-center py-16 border border-border-dim rounded-[4px] bg-navy-card">
              <p className="font-body text-xs text-muted uppercase tracking-wider">
                Leadership directory is currently empty.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div 
                  key={member.id} 
                  className="bg-navy-card border border-border-dim rounded-[4px] p-6 hover:border-border transition-all duration-350 flex flex-col justify-between"
                >
                  <div>
                    {/* Photo / Initial Placeholder */}
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border border-border-dim mb-6 bg-navy flex items-center justify-center">
                      {member.photoUrl ? (
                        <Image
                          src={member.photoUrl}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="font-display text-xl text-gold font-light">
                          {member.name.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <h3 className="font-display text-xl font-light text-white leading-tight mb-1">
                      {member.name}
                    </h3>
                    <p className="font-body text-[10px] tracking-widest uppercase text-gold font-medium mb-4">
                      {member.role}
                    </p>

                    {/* Bio */}
                    {member.bio && (
                      <p className="font-body text-xs text-muted leading-relaxed font-light mb-6 line-clamp-4 hover:line-clamp-none transition-all duration-200">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border-dim">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-white transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-white transition-colors"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {!member.linkedin && !member.twitter && (
                      <span className="font-body text-[10px] text-muted-dim italic">Profile Secured</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionReveal>
      </section>
    </main>
  );
}
