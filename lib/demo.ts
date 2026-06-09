import type {
  BreakdownPoint,
  DomainDTO,
  GeoPoint,
  LinkDTO,
  PixelDTO,
  TeamMemberDTO,
} from '@/lib/types';
import { SHORT_DOMAIN } from '@/lib/constants';

/**
 * Demo veri katmanı.
 *
 * Supabase bağlı olmadığında panolar bu örnek verilerle render edilir; böylece
 * uygulama uçtan uca gezilebilir kalır. Production'da bu fonksiyonlar yerine
 * lib/supabase/server.ts üzerinden gerçek sorgular kullanılır.
 */

export const demoLinks: LinkDTO[] = [
  { id: 'l1', key: 'yaz-kampanya', shortUrl: `${SHORT_DOMAIN}/yaz-kampanya`, destinationUrl: 'https://acme.com/yaz-indirimi-2026', title: 'Yaz İndirimi Kampanyası', tag: 'Kampanya', clickCount: 8420, createdAt: '2026-05-28' },
  { id: 'l2', key: 'tiktok-bio', shortUrl: `${SHORT_DOMAIN}/tiktok-bio`, destinationUrl: 'https://acme.com/shop', title: 'TikTok Profil Linki', tag: 'Sosyal', clickCount: 12940, createdAt: '2026-05-20' },
  { id: 'l3', key: 'bulten-42', shortUrl: `${SHORT_DOMAIN}/bulten-42`, destinationUrl: 'https://acme.com/blog/buyume-rehberi', title: 'Bülten #42 — Büyüme Rehberi', tag: 'E-posta', clickCount: 3110, createdAt: '2026-06-01' },
  { id: 'l4', key: 'webinar-q2', shortUrl: `${SHORT_DOMAIN}/webinar-q2`, destinationUrl: 'https://acme.com/etkinlik/webinar', title: 'Q2 Webinar Kaydı', tag: 'Etkinlik', clickCount: 1875, createdAt: '2026-06-03' },
  { id: 'l5', key: 'urun-lansman', shortUrl: `${SHORT_DOMAIN}/urun-lansman`, destinationUrl: 'https://acme.com/yeni-urun', title: 'Yeni Ürün Lansmanı', tag: 'Kampanya', clickCount: 6230, createdAt: '2026-06-05' },
  { id: 'l6', key: 'ig-story', shortUrl: `${SHORT_DOMAIN}/ig-story`, destinationUrl: 'https://acme.com/promo', title: 'Instagram Story Swipe-Up', tag: 'Sosyal', clickCount: 9510, createdAt: '2026-06-06' },
];

export const demoDomains: DomainDTO[] = [
  { id: 'd1', domain: 'go.acme.com', verified: true, ssl: 'active', primary: true, links: 842 },
  { id: 'd2', domain: 'acme.link', verified: true, ssl: 'active', primary: false, links: 318 },
  { id: 'd3', domain: 'kampanya.acme.com', verified: false, ssl: 'pending', primary: false, links: 0 },
];

export const demoPixels: PixelDTO[] = [
  { id: 'p1', provider: 'facebook', name: 'Meta Ana Piksel', pixelId: '8421••••••3092', isEnabled: true },
  { id: 'p2', provider: 'google', name: 'Google Ads Dönüşüm', pixelId: 'AW-••••••812', isEnabled: true },
  { id: 'p3', provider: 'tiktok', name: 'TikTok Pixel', pixelId: 'C9D••••••2A', isEnabled: false },
  { id: 'p4', provider: 'linkedin', name: 'LinkedIn Insight', pixelId: '1289••••', isEnabled: true },
];

export const demoTeam: TeamMemberDTO[] = [
  { id: 'm1', name: 'Ada Lovelace', email: 'ada@acme.com', role: 'owner', status: 'active', initials: 'AL' },
  { id: 'm2', name: 'Mehmet Yılmaz', email: 'mehmet@acme.com', role: 'admin', status: 'active', initials: 'MY' },
  { id: 'm3', name: 'Zeynep Kaya', email: 'zeynep@acme.com', role: 'member', status: 'active', initials: 'ZK' },
  { id: 'm4', name: 'Can Demir', email: 'can@acme.com', role: 'member', status: 'invited', initials: 'CD' },
];

export const demoGeo: GeoPoint[] = [
  { country: 'Türkiye', flag: '🇹🇷', clicks: 124300, share: 44 },
  { country: 'Almanya', flag: '🇩🇪', clicks: 52100, share: 18 },
  { country: 'ABD', flag: '🇺🇸', clicks: 38700, share: 14 },
  { country: 'Birleşik Krallık', flag: '🇬🇧', clicks: 24500, share: 9 },
  { country: 'Hollanda', flag: '🇳🇱', clicks: 18200, share: 6 },
  { country: 'Diğer', flag: '🌍', clicks: 26500, share: 9 },
];

export const demoDevices: BreakdownPoint[] = [
  { label: 'Mobil', value: 62 },
  { label: 'Masaüstü', value: 31 },
  { label: 'Tablet', value: 7 },
];

export const demoBrowsers: BreakdownPoint[] = [
  { label: 'Chrome', value: 58 },
  { label: 'Safari', value: 24 },
  { label: 'Edge', value: 9 },
  { label: 'Firefox', value: 6 },
  { label: 'Diğer', value: 3 },
];

export const demoReferrers: BreakdownPoint[] = [
  { label: 'Instagram', value: 38400 },
  { label: 'Doğrudan', value: 29100 },
  { label: 'Google', value: 21800 },
  { label: 'TikTok', value: 17600 },
  { label: 'LinkedIn', value: 9300 },
];

/** 30 günlük tıklama zaman serisi (demo). */
export const demoClickSeries: number[] = [
  120, 180, 150, 230, 280, 240, 360, 320, 410, 380, 520, 480, 540, 610, 580,
  650, 700, 660, 720, 690, 780, 810, 760, 880, 920, 870, 960, 1010, 980, 1080,
];

export const demoUtmTemplates = [
  { id: 'u1', name: 'Meta Reklam', source: 'facebook', medium: 'cpc', campaign: 'yaz_indirimi' },
  { id: 'u2', name: 'E-posta Bülteni', source: 'newsletter', medium: 'email', campaign: 'haftalik_bulten' },
  { id: 'u3', name: 'Organik Sosyal', source: 'instagram', medium: 'social', campaign: 'marka_bilinirligi' },
];
