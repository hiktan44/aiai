'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/** ForgotPasswordForm — sıfırlama bağlantısı isteği (Client Component). */
export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mt-7 rounded-xl border border-success/40 bg-success/10 p-4 text-sm text-foreground" role="status">
        Bağlantı gönderildi. E-posta kutunuzu kontrol edin; birkaç dakika içinde gelmezse spam
        klasörüne bakın.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
      <Input
        label="E-posta"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="siz@sirket.com"
        required
      />
      <Button type="submit" className="w-full">
        Sıfırlama bağlantısı gönder
      </Button>
    </form>
  );
}
