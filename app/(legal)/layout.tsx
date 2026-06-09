import Link from 'next/link';
import { Logo } from '@/components/layout/logo';

/** Yasal sayfalar layout — sade, okunabilir doküman kabuğu (Server Component). */
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" aria-label="Ana sayfa">
            <Logo />
          </Link>
          <Link href="/" className="text-sm text-muted hover:text-foreground">
            ← Ana sayfa
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-14">
        <article className="space-y-5 text-sm leading-relaxed text-muted [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-foreground [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </article>
      </main>
    </div>
  );
}
