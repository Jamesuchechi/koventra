'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { User } from 'lucide-react';

export default function AdminTopbar() {
  const { data: session } = useSession();
  const userName = session?.user?.name || session?.user?.email || 'Administrator';

  return (
    <header className="h-16 bg-navy-card border-b border-border flex items-center justify-between px-8 select-none">
      {/* Page Context Greeting */}
      <div>
        <span className="font-body text-[0.82rem] tracking-wider text-muted uppercase">
          Welcome back,
        </span>
        <span className="font-body text-[0.82rem] tracking-wider text-white uppercase ml-1.5 font-medium">
          {userName}
        </span>
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
