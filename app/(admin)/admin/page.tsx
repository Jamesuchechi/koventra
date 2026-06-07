import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Package, Users, Briefcase, Newspaper, ArrowUpRight, Plus, Settings } from 'lucide-react';

export const revalidate = 0; // Disable caching for admin dashboard

export default async function AdminPage() {
  // Query DB counts in parallel
  const [productCount, teamCount, jobCount, pressCount] = await Promise.all([
    prisma.product.count(),
    prisma.teamMember.count(),
    prisma.jobListing.count(),
    prisma.pressEntry.count(),
  ]);

  // Query recent additions/updates
  const [recentProducts, recentJobs, recentPress] = await Promise.all([
    prisma.product.findMany({ take: 3, orderBy: { updatedAt: 'desc' } }),
    prisma.jobListing.findMany({ take: 3, orderBy: { updatedAt: 'desc' } }),
    prisma.pressEntry.findMany({ take: 3, orderBy: { updatedAt: 'desc' } }),
  ]);

  const stats = [
    { label: 'Products', count: productCount, icon: Package, href: '/admin/products', color: 'text-blue-400' },
    { label: 'Team Members', count: teamCount, icon: Users, href: '/admin/team', color: 'text-purple-400' },
    { label: 'Job Listings', count: jobCount, icon: Briefcase, href: '/admin/jobs', color: 'text-amber-400' },
    { label: 'Press Entries', count: pressCount, icon: Newspaper, href: '/admin/press', color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Title block */}
      <div>
        <h1 className="font-display text-3xl font-light text-white tracking-wide">
          Dashboard Overview
        </h1>
        <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
          Enterprise Systems Management Console
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-navy-card border border-border rounded-[4px] p-6 hover:bg-navy-hover transition-colors duration-200 group flex items-start justify-between"
            >
              <div className="space-y-4">
                <span className="font-body text-xs tracking-wider text-muted uppercase block">
                  {stat.label}
                </span>
                <span className="font-display text-4xl font-light text-white block">
                  {stat.count}
                </span>
              </div>
              <div className={`p-2 bg-navy rounded-[4px] ${stat.color} group-hover:bg-gold group-hover:text-navy transition-colors duration-200`}>
                <Icon size={20} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Recent Updates */}
        <div className="bg-navy-card border border-border rounded-[4px] p-6 space-y-6">
          <h2 className="font-body text-sm font-medium tracking-wider text-gold uppercase border-b border-border pb-3">
            Recent System Activity
          </h2>

          <div className="space-y-4">
            {recentProducts.length === 0 && recentJobs.length === 0 && recentPress.length === 0 && (
              <p className="font-body text-xs text-muted py-4">No recent database operations recorded.</p>
            )}

            {/* Products updates */}
            {recentProducts.map((p) => (
              <div key={p.id} className="flex justify-between items-center py-3 border-b border-border-dim last:border-0">
                <div className="flex items-center gap-3">
                  <span className="p-1.5 bg-blue-500/10 text-blue-400 rounded-full">
                    <Package size={14} />
                  </span>
                  <div>
                    <h4 className="font-body text-xs font-medium text-white">{p.name}</h4>
                    <p className="font-body text-[0.65rem] text-muted">Product updated</p>
                  </div>
                </div>
                <Link href={`/admin/products/${p.id}`} className="text-muted hover:text-gold transition-colors">
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}

            {/* Jobs updates */}
            {recentJobs.map((j) => (
              <div key={j.id} className="flex justify-between items-center py-3 border-b border-border-dim last:border-0">
                <div className="flex items-center gap-3">
                  <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded-full">
                    <Briefcase size={14} />
                  </span>
                  <div>
                    <h4 className="font-body text-xs font-medium text-white">{j.title}</h4>
                    <p className="font-body text-[0.65rem] text-muted">Job listing: {j.status.toLowerCase()}</p>
                  </div>
                </div>
                <Link href={`/admin/jobs/${j.id}`} className="text-muted hover:text-gold transition-colors">
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}

            {/* Press updates */}
            {recentPress.map((pr) => (
              <div key={pr.id} className="flex justify-between items-center py-3 border-b border-border-dim last:border-0">
                <div className="flex items-center gap-3">
                  <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-full">
                    <Newspaper size={14} />
                  </span>
                  <div>
                    <h4 className="font-body text-xs font-medium text-white">{pr.headline}</h4>
                    <p className="font-body text-[0.65rem] text-muted">Press item added</p>
                  </div>
                </div>
                <Link href={`/admin/press/${pr.id}`} className="text-muted hover:text-gold transition-colors">
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-navy-card border border-border rounded-[4px] p-6 space-y-6 self-start">
          <h2 className="font-body text-sm font-medium tracking-wider text-gold uppercase border-b border-border pb-3">
            Quick System Actions
          </h2>

          <div className="flex flex-col gap-3">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-3 px-4 py-3 bg-navy border border-border rounded-[2px] font-body text-[0.8rem] text-white hover:border-gold hover:text-gold transition-all duration-200"
            >
              <Plus size={16} />
              Add New Product
            </Link>
            <Link
              href="/admin/jobs"
              className="flex items-center gap-3 px-4 py-3 bg-navy border border-border rounded-[2px] font-body text-[0.8rem] text-white hover:border-gold hover:text-gold transition-all duration-200"
            >
              <Plus size={16} />
              Create Job Posting
            </Link>
            <Link
              href="/admin/press"
              className="flex items-center gap-3 px-4 py-3 bg-navy border border-border rounded-[2px] font-body text-[0.8rem] text-white hover:border-gold hover:text-gold transition-all duration-200"
            >
              <Plus size={16} />
              Add Press Entry
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 bg-navy border border-border rounded-[2px] font-body text-[0.8rem] text-white hover:border-gold hover:text-gold transition-all duration-200"
            >
              <Settings size={16} />
              Configure System Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
