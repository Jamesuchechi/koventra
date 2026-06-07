import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function CareersLoading() {
  return (
    <main className="min-h-screen bg-navy pt-32 pb-24 px-[6vw]">
      <div className="max-w-4xl mb-16 space-y-4">
        {/* Eyebrow */}
        <Skeleton className="h-4 w-32" />
        {/* Title */}
        <Skeleton className="h-12 w-3/4 sm:w-1/2" />
        <Skeleton className="h-12 w-2/3 sm:w-1/3" />
      </div>

      {/* Filter and Search Skeleton */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-border-dim pb-8 mb-12">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" />
          ))}
        </div>
        <Skeleton className="h-10 w-full md:w-80" />
      </div>

      {/* Jobs list Skeleton */}
      <div className="divide-y divide-border-dim border border-border-dim rounded-[4px] overflow-hidden bg-navy-card">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 w-full md:w-2/3">
              {/* Team tag */}
              <Skeleton className="h-4 w-24" />
              {/* Title */}
              <Skeleton className="h-8 w-3/4" />
              {/* Meta info */}
              <div className="flex gap-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            {/* Apply button */}
            <Skeleton className="h-5 w-24 shrink-0" />
          </div>
        ))}
      </div>
    </main>
  );
}
