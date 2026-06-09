'use client';

import { useState } from 'react';
import { SidebarContent } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { cn } from '@/lib/utils';

/**
 * DashboardShell — sidebar + topbar iskeletini ve mobil drawer durumunu koordine eder
 * (Client Component). Sayfa içeriği {children} olarak gelir.
 */
interface DashboardShellProps {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
  userInitials: string;
}

export function DashboardShell({
  children,
  userName,
  userEmail,
  userInitials,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[272px_1fr]">
      {/* Masaüstü sidebar */}
      <aside className="hidden border-r border-border bg-surface/40 lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobil drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            'absolute inset-0 bg-black/60 transition-opacity',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigasyon menüsü"
          className={cn(
            'absolute left-0 top-0 h-full w-72 border-r border-border bg-surface transition-transform duration-200',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </div>
      </div>

      {/* İçerik kolonu */}
      <div className="flex min-w-0 flex-col">
        <Topbar
          onOpenMobileNav={() => setMobileOpen(true)}
          userName={userName}
          userEmail={userEmail}
          userInitials={userInitials}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
