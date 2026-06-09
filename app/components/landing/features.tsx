import { Card } from '@/components/ui/card';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'Sınırsız Özel Alan Adı + Otomatik SSL',
    description:
      'Kendi markalı domain’inizi tek tıkla bağlayın; SSL sertifikası otomatik tanımlanır. Teknik kurulumla uğraşmadan profesyonel kısa linkler.',
    icon: (
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm9-9c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9ZM3.5 9h17M3.5 15h17" />
    ),
  },
  {
    title: 'Gerçek Zamanlı Analitik Paneli',
    description:
      'Coğrafi konum, cihaz, tarayıcı ve referrer kırılımını canlı izleyin. Her tıklama milisaniyeler içinde panonuza yansır.',
    icon: <path d="M4 19V5m0 14h16M8 17V9m4 8V6m4 11v-5" />,
  },
  {
    title: 'AI Destekli UTM & Kampanya Önerici',
    description:
      'Yapay zeka, kampanyanıza en uygun UTM parametrelerini ve etiket stratejisini saniyeler içinde önerir. Tahmin yok, veri var.',
    icon: (
      <path d="M12 3v2m0 14v2M5 12H3m18 0h-2m-2.5-6.5-1.4 1.4M7.9 16.1l-1.4 1.4m0-11.4 1.4 1.4m8.2 8.2 1.4 1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
    ),
  },
  {
    title: 'Retargeting Piksel Rotasyonu',
    description:
      'Facebook, Google, TikTok ve LinkedIn piksellerini tek linke ekleyin. Yönlendirme öncesi otomatik enjeksiyon ile dönüşümleri yakalayın.',
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
    ),
  },
  {
    title: 'Dinamik & İzlenebilir QR Kod',
    description:
      'Marka renklerinize uygun QR kodları oluşturun; hedef linki sonradan değiştirin, taramaları analitikte takip edin.',
    icon: (
      <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 3h3m-3 3h6m0-6v3" />
    ),
  },
];

/** Features — 5 ana özellik showcase kartı (Server Component). */
export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pazarlama ekibinin ihtiyacı olan{' '}
          <span className="text-gradient">her şey</span>
        </h2>
        <p className="mt-4 text-muted">
          Dub.co’nun güçlü açık kaynak altyapısı, bulutta yönetilen kolaylıkla
          birleşti.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group transition-colors hover:border-primary/40"
          >
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {feature.icon}
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
