'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Field {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  hint?: string;
}

/**
 * SettingsForm — basit, erişilebilir ayar formu (Client Component).
 * Kaydetme demo modunda yerel onay gösterir; production'da server action'a bağlanır.
 */
export function SettingsForm({
  fields,
  submitLabel = 'Değişiklikleri kaydet',
}: {
  fields: Field[];
  submitLabel?: string;
}) {
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-surface p-6">
      {fields.map((f) => (
        <Input
          key={f.name}
          name={f.name}
          label={f.label}
          type={f.type ?? 'text'}
          defaultValue={f.defaultValue}
          hint={f.hint}
        />
      ))}
      <div className="flex items-center gap-3">
        <Button type="submit">{submitLabel}</Button>
        {saved && (
          <span className="text-sm text-success" role="status">
            ✓ Kaydedildi
          </span>
        )}
      </div>
    </form>
  );
}
