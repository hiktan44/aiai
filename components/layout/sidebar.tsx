'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/layout/logo';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const icon = (d: string) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d={d} />
  </svg>
);

const nav: NavItem[] = [
  { label: 'Genel Bakış', href: '/dashboard', icon: icon('M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6V11h-6v9Zm0-16v5h6V4h-6Z') },
  { label: 'Linkler', href: '/links', icon: icon('M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1m-1 8a5 5 0 0 1-7 0 5 5 0 0 1 0-7l3-3a5 5 0 0 1 7 0') },
  { label: 'Analitik', href: '/analytics', icon: icon('M4 19V5m0 14h16M8 17V9m4 8V6m4 11v-5') },
  { label: 'QR Kodları', href: '/qr-codes', icon: icon('M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 3h3m-3 3h6m0-6v3') },
  { label: 'Domainler', href: '/domains', icon: icon('M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm.5-3h17m-17 6h17M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9Z') },
  { label: 'Pikseller', href: '/pixels', icon: icon('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z') },
  { label: 'UTM & AI', href: '/utm', icon: icon('M12 3v2m0 14v2M5 12H3m18 0h-2M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z') },
  { label: 'Ekip', href: '/team', icon: icon('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11') },
];

const secondary: NavItem[] = [
  { label: 'Faturalandırma', href: '/billing', icon: icon('M3 10h18M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z') },
  { label: 'Ayarlar', href: '/settings', icon: icon('M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.3l2-1.6-2-3.4-2.4 1a7.3 7.3 0 0 0-2.2-1.3L14.3 2H9.7l-.4 2.5a7.3 7.3 0 0 0-2.2 1.3l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.6l-2 1.6 2 3.4 2.4-1a7.3 7.3 0 0 0 2.2 1.3l.4 2.5h4.6l.4-2.5a7.3 7.3 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.06-.43.1-.86.1-1.3Z') },
];

function NavList({
  items,
  pathname,
  onNavigate,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-1">
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/12 text-primary'
                  : 'text-muted hover:bg-surface-elevated hover:text-foreground',
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Sidebar içeriği — hem masaüstü hem mobil drawer tarafından kullanılır. */
export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Link href="/dashboard" aria-label="Genel bakışa git">
          <Logo />
        </Link>
      </div>

      {/* Workspace göstergesi (WorkspaceSwitcher build aşamasında genişletilir) */}
      <div className="mx-3 mb-4 flex items-center justify-between rounded-xl border border-border bg-surface-elevated px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/20 font-display text-xs font-bold text-primary">
            AS
          </span>
          <span className="text-sm font-medium text-foreground">Acme Studio</span>
        </div>
        <Badge tone="primary">Pro</Badge>
      </div>

      <nav className="flex-1 overflow-y-auto px-3" aria-label="Pano navigasyonu">
        <NavList items={nav} pathname={pathname} onNavigate={onNavigate} />
        <hr className="my-4 border-border" />
        <NavList items={secondary} pathname={pathname} onNavigate={onNavigate} />
      </nav>

      <div className="border-t border-border p-3">
        <div className="rounded-xl bg-surface-elevated p-3">
          <p className="text-xs font-medium text-foreground">Plan kullanımı</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full w-[64%] rounded-full bg-primary" />
          </div>
          <p className="mt-1.5 text-xs text-muted">640 / 1.000 link</p>
        </div>
      </div>
    </div>
  );
}
