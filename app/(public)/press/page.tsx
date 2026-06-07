import React from 'react';
import Image from 'next/image';
import { ExternalLink, Calendar } from 'lucide-react';
import { PressEntry as DBPress } from '@prisma/client';
import prisma from '@/lib/prisma';
import SectionReveal from '@/components/ui/SectionReveal';
import SectionTag from '@/components/ui/SectionTag';

export const dynamic = 'force-dynamic';

export default async function PressPage() {
  // Query all press entries ordered by published date descending
  let pressEntries: DBPress[] = [];
  try {
    pressEntries = await prisma.pressEntry.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching press entries from database:', error);
  }

  const featuredEntries = pressEntries.filter((p) => p.featured);
  const regularEntries = pressEntries.filter((p) => !p.featured);

  const formatDate = (dateVal: Date | string) => {
    return new Date(dateVal).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-navy pt-32 pb-24 px-[6vw]">
      {/* Page Header */}
      <div className="max-w-4xl mb-20">
        <SectionReveal>
          <span className="font-body text-[0.72rem] tracking-[0.2em] uppercase text-gold block mb-3 font-semibold">
            Press & Media
          </span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-white tracking-tight">
            Koventra Systems in <br />
            the <em className="italic text-gold">global press</em>
          </h1>
        </SectionReveal>
      </div>

      {/* Featured Press Coverage */}
      {featuredEntries.length > 0 && (
        <section className="mb-24">
          <SectionReveal>
            <SectionTag>Featured Stories</SectionTag>
            <h2 className="font-display text-2xl font-light text-white mt-4 mb-8">
              Key coverage & releases
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredEntries.map((entry) => (
              <SectionReveal key={entry.id}>
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-navy-card hover:bg-navy-hover border border-border-dim hover:border-gold p-8 rounded-[4px] flex flex-col justify-between h-72 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Publication Logo / Name */}
                    <div className="flex items-center gap-3">
                      {entry.logoUrl && (entry.logoUrl.startsWith('/') || entry.logoUrl.startsWith('http')) ? (
                        <div className="relative w-16 h-8 select-none">
                          <Image
                            src={entry.logoUrl}
                            alt={entry.publication}
                            fill
                            unoptimized
                            className="object-contain object-left filter opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      ) : (
                        <span className="font-body text-xs font-semibold tracking-wider text-gold uppercase">
                          {entry.publication}
                        </span>
                      )}
                    </div>

                    {/* Headline */}
                    <h3 className="font-display text-xl sm:text-2xl font-light text-white group-hover:text-gold transition-colors duration-200 line-clamp-3 leading-snug">
                      {entry.headline}
                    </h3>
                  </div>

                  {/* Date & Action */}
                  <div className="flex items-center justify-between border-t border-border-dim pt-4 text-xs font-body text-muted font-light mt-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-gold" />
                      {formatDate(entry.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-gold group-hover:text-white transition-colors duration-200">
                      Read Article <ExternalLink size={10} />
                    </span>
                  </div>
                </a>
              </SectionReveal>
            ))}
          </div>
        </section>
      )}

      {/* Regular Press Coverage List */}
      <section className="border-t border-border-dim pt-16">
        <SectionReveal>
          <SectionTag>Media Index</SectionTag>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-light leading-[1.1] text-white mt-2 mb-12">
            Chronological coverage directory
          </h2>
        </SectionReveal>

        {pressEntries.length === 0 ? (
          <SectionReveal>
            <div className="text-center py-16 border border-border-dim rounded-[4px] bg-navy-card">
              <p className="font-body text-xs text-muted uppercase tracking-wider">
                No press entries recorded in the index.
              </p>
            </div>
          </SectionReveal>
        ) : (
          <div className="divide-y divide-border-dim border border-border-dim rounded-[4px] overflow-hidden bg-navy-card">
            {(featuredEntries.length > 0 ? regularEntries : pressEntries).map((entry) => (
              <a
                key={entry.id}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-navy-hover transition-colors duration-200 group"
              >
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="font-body text-[10px] tracking-widest uppercase text-gold font-medium">
                      {entry.publication}
                    </span>
                    <span className="text-muted-dim">•</span>
                    <span className="font-body text-xs text-muted font-light flex items-center gap-1">
                      <Calendar size={12} className="text-gold" />
                      {formatDate(entry.publishedAt)}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-light text-white group-hover:text-gold transition-colors duration-200 leading-snug">
                    {entry.headline}
                  </h3>
                </div>

                <div className="self-start md:self-center">
                  <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-gold group-hover:text-white transition-colors duration-200 border-b border-transparent group-hover:border-white pb-0.5">
                    View Release <ExternalLink size={12} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
