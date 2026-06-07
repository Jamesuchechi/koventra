import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function AboutLoading() {
  return (
    <main className="min-h-screen bg-navy pt-32 pb-24 px-[6vw]">
      {/* Page Header */}
      <div className="max-w-4xl mb-20 space-y-4">
        {/* Eyebrow */}
        <Skeleton className="h-4 w-32" />
        {/* Title */}
        <Skeleton className="h-12 w-3/4 sm:w-1/2" />
        <Skeleton className="h-12 w-2/3 sm:w-1/3" />
      </div>

      {/* Story section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-28 border-t border-border-dim pt-16 mb-28">
        <div className="space-y-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-2/3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <Skeleton className="h-48 w-full" />
      </div>

      {/* Team section */}
      <div className="border-t border-border-dim pt-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-64" />
          </div>
          <Skeleton className="h-12 w-48" />
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-navy-card border border-border-dim rounded-[4px] p-6 space-y-6">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-8 w-full border-t border-border-dim pt-4" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
