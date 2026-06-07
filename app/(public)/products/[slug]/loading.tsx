import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function ProductDetailLoading() {
  return (
    <main className="min-h-screen bg-navy pt-32 pb-24 px-[6vw]">
      {/* Back to Products */}
      <div className="mb-12">
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start border-b border-border-dim pb-16 mb-16">
        <div className="space-y-6">
          <Skeleton className="h-5 w-24" />
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-[8px]" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-6 w-3/4 max-w-lg" />
        </div>
        <Skeleton className="h-12 w-40" />
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24">
        {/* Left Side: Overview & Description */}
        <div className="space-y-12">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-64" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>

        {/* Right Side: Features & Specifications */}
        <div className="space-y-8 h-fit bg-navy-card border border-border-dim rounded-[4px] p-8">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32 border-b border-border pb-3" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <div className="pt-6 border-t border-border-dim space-y-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </main>
  );
}
