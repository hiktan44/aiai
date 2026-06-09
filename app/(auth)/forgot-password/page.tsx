import type { Metadata } from 'next';
import Link from 'next/link';
import { ForgotPasswordForm } from './forgot-password-form';

export const metadata: Metadata = {
  title: 'Şifremi Unuttum',
  description: 'Şifre sıfırlama bağlantısı isteyin.',
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Şifrenizi mi unuttunuz?</h1>
      <p className="mt-1.5 text-sm text-muted">
        E-posta adresinizi girin, size bir sıfırlama bağlantısı gönderelim.
      </p>
      <ForgotPasswordForm />
      <p className="mt-7 text-center text-sm text-muted">
        Hatırladınız mı?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Giriş yapın
        </Link>
      </p>
    </div>
  );
}
