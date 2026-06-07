import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function ProductsLoading() {
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
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-16" />
          ))}
        </div>
        <Skeleton className="h-10 w-full md:w-80" />
      </div>

      {/* Product Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border-dim border border-border-dim rounded-[4px] overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="px-9 pt-10 pb-8 flex flex-col bg-navy-card space-y-6">
            {/* Status Badge */}
            <Skeleton className="h-5 w-20" />
            {/* Icon Logo */}
            <Skeleton className="w-11 h-11 rounded-[6px]" />
            {/* Title */}
            <Skeleton className="h-8 w-2/3" />
            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            {/* Actions */}
            <Skeleton className="h-4 w-28 mt-4" />
          </div>
        ))}
      </div>
    </main>
  );
}
