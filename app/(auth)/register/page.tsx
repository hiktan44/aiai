import type { Metadata } from 'next';
import { RegisterForm } from './register-form';

export const metadata: Metadata = {
  title: 'Kaydol',
  description: 'LinkSpark hesabınızı ücretsiz oluşturun.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
