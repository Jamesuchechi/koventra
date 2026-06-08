'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Package,
  Users,
  Briefcase,
  Newspaper,
  Settings,
  LogOut,
  Globe,
} from 'lucide-react';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Jobs', href: '/admin/jobs', icon: Briefcase },
  { label: 'Press', href: '/admin/press', icon: Newspaper },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ mobileOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy-card border-r border-border min-h-screen flex flex-col justify-between select-none transform transition-transform duration-300 ease-out lg:static lg:translate-x-0 lg:flex ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
      <div>
        {/* Logo / Header */}
        <div className="h-16 flex items-center px-6 border-b border-border bg-navy/50">
          <Link href="/admin" className="font-display text-lg font-medium tracking-[0.05em] text-white flex items-center gap-1.5">
            Koventra Admin<span className="text-gold">.</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            // Match sub-routes for active state (e.g. /admin/products/new matches /admin/products)
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-[4px] font-body text-[0.85rem] tracking-wide uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-gold text-navy font-medium'
                    : 'text-muted hover:text-white hover:bg-navy-hover'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Utilities */}
      <div className="p-4 border-t border-border space-y-1.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-[4px] font-body text-[0.85rem] tracking-wide uppercase text-muted hover:text-white hover:bg-navy-hover transition-all duration-200"
        >
          <Globe size={18} />
          View Live Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-[4px] font-body text-[0.85rem] tracking-wide uppercase text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 text-left"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  </>
  );
}
