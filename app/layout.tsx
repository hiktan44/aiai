import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// next/font ile self-host edilen fontlar — harici @import font YOK (security_checklist + learnings)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// Root metadata — create-next-app varsayılanları ASLA bırakılmaz (learnings)
export const metadata: Metadata = {
  title: {
    default: 'LinkSpark — Yapay Zeka Destekli Link Yönetimi & Dönüşüm Takibi',
    template: '%s · LinkSpark',
  },
  description:
    'Markalı kısa linkler, gerçek zamanlı analitik, dinamik QR kodları ve AI destekli UTM sihirbazı. Pazarlama ekipleri için tek tıkla kullanıma hazır link yönetim platformu.',
  keywords: [
    'link kısaltma',
    'link yönetimi',
    'QR kod',
    'UTM',
    'retargeting piksel',
    'dönüşüm takibi',
    'pazarlama analitiği',
  ],
  authors: [{ name: 'LinkSpark' }],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg'],
    apple: [{ url: '/favicon.svg' }],
  },
  openGraph: {
    title: 'LinkSpark — Yapay Zeka Destekli Link Yönetimi',
    description:
      'Markalı kısa linkler, derin analitik ve AI kampanya optimizasyonu tek platformda.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'LinkSpark',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        type: 'image/svg+xml',
        alt: 'LinkSpark — Yapay Zeka Destekli Link Yönetimi & Dönüşüm Takibi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkSpark — Yapay Zeka Destekli Link Yönetimi',
    description:
      'Markalı kısa linkler, derin analitik ve AI kampanya optimizasyonu tek platformda.',
    images: ['/og-image.svg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0b14',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
