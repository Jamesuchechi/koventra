'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface DashboardStatsItem {
  label: string;
  count: number;
  href: string;
  accent: string;
}

interface DashboardStatsProps {
  stats?: DashboardStatsItem[];
}

export default function DashboardStats({ stats = [] }: DashboardStatsProps) {
  if (stats.length === 0) {
    return (
      <div className="bg-navy-card border border-border rounded-[4px] p-6 text-center text-sm text-muted">
        No dashboard metrics configured yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className="bg-navy-card border border-border rounded-[4px] p-6 hover:bg-navy-hover transition-colors duration-200"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted font-semibold">{stat.label}</p>
              <p className="mt-4 text-4xl font-light text-white">{stat.count}</p>
            </div>
            <div className="rounded-full p-2 bg-gold text-navy">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
