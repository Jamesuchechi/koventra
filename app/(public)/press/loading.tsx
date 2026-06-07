import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function PressLoading() {
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

      {/* Featured Press Section */}
      <section className="mb-24 space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-navy-card border border-border-dim p-8 rounded-[4px] flex flex-col justify-between h-72">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-4/5" />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border-dim pt-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regular Press Index */}
      <section className="border-t border-border-dim pt-16 space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="divide-y divide-border-dim border border-border-dim rounded-[4px] overflow-hidden bg-navy-card">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 w-full md:w-3/4">
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-3/4" />
              </div>
              <Skeleton className="h-5 w-24 shrink-0" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
