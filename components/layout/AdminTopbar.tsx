'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { User, Menu } from 'lucide-react';

interface AdminTopbarProps {
  onOpenSidebar?: () => void;
}

export default function AdminTopbar({ onOpenSidebar }: AdminTopbarProps) {
  const { data: session } = useSession();
  const userName = session?.user?.name || session?.user?.email || 'Administrator';

  return (
    <header className="h-16 bg-navy-card border-b border-border flex items-center justify-between px-4 md:px-8 select-none">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-md border border-border-dim text-muted hover:text-white hover:border-gold transition-colors duration-200"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <span className="font-body text-[0.82rem] tracking-wider text-muted uppercase">
            Welcome back,
          </span>
          <span className="font-body text-[0.82rem] tracking-wider text-white uppercase ml-1.5 font-medium">
            {userName}
          </span>
        </div>
      </div>

      {/* User Actions / Profile Display */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-border bg-navy flex items-center justify-center text-gold">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}
