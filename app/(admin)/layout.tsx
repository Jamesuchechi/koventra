'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminTopbar from '@/components/layout/AdminTopbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <SessionProvider>
        <div className="min-h-screen bg-navy text-white flex items-center justify-center font-body">
          {children}
        </div>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-navy text-white font-body">
        {/* Sidebar Navigation */}
        <AdminSidebar />

        {/* Content Panel */}
        <div className="flex-grow flex flex-col min-w-0">
          {/* Header */}
          <AdminTopbar />

          {/* Body */}
          <main className="flex-grow p-8 overflow-y-auto bg-navy-mid">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
