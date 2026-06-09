'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'LinkSpark’ı kullanmak için teknik bilgi gerekir mi?',
    a: 'Hayır. Sunucu kurulumu, DNS yapılandırması veya kod yazımı gerekmez. Domain’inizi bağlayın, SSL otomatik tanımlansın ve linkleri oluşturmaya başlayın.',
  },
  {
    q: 'Dub.co’dan farkı nedir?',
    a: 'LinkSpark, Dub.co’nun güvenilir açık kaynak altyapısını bulutta yönetilen bir hizmet olarak sunar; üzerine yerleşik retargeting piksel yönetimi ve AI UTM sihirbazı gibi pazarlamaya özel özellikler ekler.',
  },
  {
    q: 'Ücretsiz planın sınırı var mı?',
    a: 'Free plan süresiz ücretsizdir ve ayda 25 link, temel analitik ve 1 QR kod içerir. İhtiyacınız büyüdüğünde istediğiniz zaman Pro veya Growth’a yükseltebilirsiniz.',
  },
  {
    q: 'Analitik verileri KVKK uyumlu mu?',
    a: 'Evet. IP adresleri hash’lenerek saklanır, kişisel veriler anonimleştirilir ve tüm veriler KVKK ile uyumlu şekilde işlenir.',
  },
  {
    q: 'Hangi retargeting piksellerini destekliyorsunuz?',
    a: 'Facebook (Meta), Google Ads, TikTok ve LinkedIn piksellerini destekliyoruz. Birden fazla pikseli tek linke ekleyip yönlendirme öncesi otomatik rotasyonla çalıştırabilirsiniz.',
  },
];

/** FAQ — akordiyon SSS menüsü (Client Component: openIndex state). */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Sıkça sorulan sorular
        </h2>
        <p className="mt-4 text-muted">Aklınızdaki soruların yanıtları burada.</p>
      </div>

      <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-surface">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.q}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-foreground">{faq.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                      'shrink-0 text-muted transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                    aria-hidden
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                hidden={!isOpen}
                className="px-6 pb-5 text-sm leading-relaxed text-muted"
              >
                {faq.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
