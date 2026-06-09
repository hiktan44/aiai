import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Giriş Yap',
  description: 'LinkSpark hesabınıza giriş yapın.',
};

/**
 * LoginPage (Server Component). LoginForm useSearchParams() kullandığı için
 * <Suspense> sınırı zorunludur (Next.js 15 build hatası önlemi — learnings).
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-surface-elevated" />}>
      <LoginForm />
    </Suspense>
  );
}
