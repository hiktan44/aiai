import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { buttonClassName } from '@/components/ui/button';
import { Hero } from './components/landing/hero';
import { Features } from './components/landing/features';
import { HowItWorks } from './components/landing/how-it-works';
import { Pricing } from './components/landing/pricing';
import { FAQ } from './components/landing/faq';
import { Stats } from './components/landing/stats';
import { Footer } from './components/landing/footer';

// Sosyal kanıt metrikleri normalde Server Component içinde DB/cache’ten gelir (ISR).
// Build aşaması bu fonksiyonu gerçek Supabase agregatına bağlayacaktır.
async function getLandingStats(): Promise<{
  totalLinks: number;
  totalClicks: number;
}> {
  return { totalLinks: 184_000, totalClicks: 9_400_000 };
}

export default async function LandingPage() {
  const stats = await getLandingStats();

  return (
    <>
      {/* Sticky navigasyon */}
      <header className="sticky top-0 z-50 border-b border-border/60 glass">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" aria-label="LinkSpark ana sayfa">
            <Logo />
          </Link>
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Ana navigasyon"
          >
            <Link href="#features" className="text-sm text-muted transition-colors hover:text-foreground">
              Özellikler
            </Link>
            <Link href="#pricing" className="text-sm text-muted transition-colors hover:text-foreground">
              Fiyatlandırma
            </Link>
            <Link href="#faq" className="text-sm text-muted transition-colors hover:text-foreground">
              SSS
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className={buttonClassName({ variant: 'ghost', size: 'sm' })}
            >
              Giriş
            </Link>
            <Link
              href="/register"
              className={buttonClassName({ size: 'sm' })}
            >
              Başla
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Hero stats={stats} />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <Stats />
      </main>

      <Footer />
    </>
  );
}
