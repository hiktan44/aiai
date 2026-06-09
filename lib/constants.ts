import type { Plan } from '@/lib/types';

/** Plan tanımları ve limitleri (landing pricing ile tutarlı). */
export const PLANS: Record<
  Plan,
  { name: string; monthly: number; linkLimit: number; domainLimit: number }
> = {
  free: { name: 'Free', monthly: 0, linkLimit: 25, domainLimit: 0 },
  pro: { name: 'Pro', monthly: 19, linkLimit: 1000, domainLimit: 1 },
  growth: { name: 'Growth', monthly: 49, linkLimit: 10000, domainLimit: 5 },
  enterprise: {
    name: 'Enterprise',
    monthly: 149,
    linkLimit: Number.POSITIVE_INFINITY,
    domainLimit: Number.POSITIVE_INFINITY,
  },
};

/** Rezerve link anahtarları — kullanıcılar bu key'leri alamaz. */
export const RESERVED_KEYS = new Set([
  'api',
  'app',
  'login',
  'register',
  'dashboard',
  'admin',
  'settings',
  'health',
]);

export const SHORT_DOMAIN = 'link.sp';
