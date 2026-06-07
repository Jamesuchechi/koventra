'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { JobListing, JobType } from '@/lib/types';
import SectionReveal from '@/components/ui/SectionReveal';
import { Search, MapPin, Briefcase } from 'lucide-react';

interface CareersListClientProps {
  initialJobs: JobListing[];
}

const JOB_TYPES: { value: JobType | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All Positions' },
  { value: 'FULL_TIME', label: 'Full-time' },
  { value: 'PART_TIME', label: 'Part-time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'INTERNSHIP', label: 'Internship' },
];

export default function CareersListClient({ initialJobs }: CareersListClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<JobType | 'ALL'>('ALL');

  const filteredJobs = initialJobs.filter((job) => {
    const matchesType = selectedType === 'ALL' || job.type === selectedType;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const formatJobType = (type: JobType) => {
    return type.replace('_', ' ').toLowerCase();
  };

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <SectionReveal>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-border-dim pb-8">
          <div className="flex flex-wrap gap-2">
            {JOB_TYPES.map((typeObj) => (
              <button
                key={typeObj.value}
                onClick={() => setSelectedType(typeObj.value)}
                className={`px-4 py-2 text-[10px] tracking-wider uppercase font-body rounded-[2px] transition-all duration-200 border ${
                  selectedType === typeObj.value
                    ? 'bg-gold border-gold text-navy font-semibold'
                    : 'bg-navy border-border-dim text-muted hover:text-white hover:border-border'
                }`}
              >
                {typeObj.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-navy-card border border-border-dim rounded-[2px] font-body text-xs text-white placeholder-muted focus:outline-none focus:border-gold transition-colors duration-200"
            />
          </div>
        </div>
      </SectionReveal>

      {/* Jobs list */}
      <SectionReveal>
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 border border-border-dim rounded-[4px] bg-navy-card">
            <p className="font-body text-xs text-muted uppercase tracking-wider">
              No open positions found matching those parameters.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-dim border border-border-dim rounded-[4px] overflow-hidden bg-navy-card">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/careers/${job.id}`}
                className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-navy-hover transition-colors duration-200 group"
              >
                <div className="space-y-2.5">
                  <span className="font-body text-[10px] tracking-widest uppercase text-gold font-medium">
                    {job.team}
                  </span>
                  <h3 className="font-display text-xl sm:text-2.2xl font-light text-white group-hover:text-gold transition-colors duration-200 leading-snug">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-xs text-muted font-light">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-gold" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 capitalize">
                      <Briefcase size={13} className="text-gold" />
                      {formatJobType(job.type)}
                    </span>
                  </div>
                </div>

                <div className="self-start md:self-center">
                  <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-gold group-hover:text-white transition-colors duration-200 border-b border-transparent group-hover:border-white pb-0.5">
                    Apply Now <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </SectionReveal>
    </div>
  );
}
