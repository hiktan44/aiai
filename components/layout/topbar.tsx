'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { signOut } from '@/actions/auth';

interface TopbarProps {
  onOpenMobileNav: () => void;
  userName: string;
  userEmail: string;
  userInitials: string;
}

/** Topbar — arama, bildirim, kullanıcı menüsü (Client Component). */
export function Topbar({
  onOpenMobileNav,
  userName,
  userEmail,
  userInitials,
}: TopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      {/* Mobil menü tetikleyici */}
      <button
        type="button"
        onClick={onOpenMobileNav}
        aria-label="Menüyü aç"
        className="flex size-9 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-foreground lg:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Arama */}
      <div className="relative flex-1 max-w-md">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          placeholder="Link, etiket veya domain ara…"
          aria-label="Ara"
          className="h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm text-foreground placeholder:text-muted/60 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Bildirimler"
          className="relative flex size-9 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-foreground"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <span className="absolute right-2 top-2 size-2 rounded-full bg-accent" aria-hidden />
        </button>

        <Button size="sm" className="hidden sm:inline-flex">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          Yeni link
        </Button>

        {/* Kullanıcı menüsü */}
        <div className="relative ml-1" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Kullanıcı menüsü"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-display text-sm font-semibold text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {userInitials || 'LS'}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-elevated"
            >
              <div className="border-b border-border px-4 py-3">
                <p className="truncate text-sm font-medium text-foreground">{userName}</p>
                <p className="truncate text-xs text-muted">{userEmail}</p>
              </div>
              <nav className="p-1.5">
                <a
                  href="/settings/profile"
                  role="menuitem"
                  className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  Profil
                </a>
                <a
                  href="/settings"
                  role="menuitem"
                  className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  Ayarlar
                </a>
                <form action={signOut}>
                  <button
                    type="submit"
                    role="menuitem"
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-error transition-colors hover:bg-error/10"
                  >
                    Çıkış yap
                  </button>
                </form>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
