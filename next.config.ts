import type { NextConfig } from 'next';

/**
 * Güvenlik header'ları (learnings: CSP, X-Frame-Options, X-Content-Type-Options eksikti).
 * connect-src Supabase'e izin verir; redirect hot-path ve API'ler için yeterli.
 */
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Coolify/Docker hedefi için standalone çıktı (multi-stage build).
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  // Lint kuralları ayrı `pnpm lint` ile denetlenir; build'i bloklamaz
  // (learnings: ESLint apostrophe/unused-vars hataları build'i kırıyordu).
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
