const steps = [
  {
    n: '01',
    title: 'Link oluştur',
    description:
      'Hedef URL’nizi yapıştırın, markalı domain ve anahtar kelimeyi seçin. AI, en iyi UTM parametrelerini önersin.',
  },
  {
    n: '02',
    title: 'Paylaş',
    description:
      'Kısa linki veya dinamik QR kodu kampanyalarınızda kullanın. Retargeting pikselleri otomatik devreye girer.',
  },
  {
    n: '03',
    title: 'İzle & optimize et',
    description:
      'Coğrafi, cihaz ve referrer kırılımını gerçek zamanlı izleyin. Verilere göre kampanyanızı anında iyileştirin.',
  },
];

/** HowItWorks — 3 adımlı çalışma mantığı (Server Component). */
export function HowItWorks() {
  return (
    <section className="relative border-y border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Üç adımda yayında
          </h2>
          <p className="mt-4 text-muted">
            Kayıttan ilk dönüşüme dakikalar içinde ulaşın.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.n} className="relative">
              {i < steps.length - 1 && (
                <span
                  className="absolute left-12 top-6 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-primary/40 to-transparent sm:block"
                  aria-hidden
                />
              )}
              <span className="flex size-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 font-mono text-sm font-semibold text-primary">
                {step.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
