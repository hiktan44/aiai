import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind sınıflarını çakışmasız birleştirir. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Büyük sayıları kısa biçimde gösterir (12_400 → "12,4 B"). */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('tr-TR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/** Tam sayı binlik ayraçlı (8420 → "8.420"). */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('tr-TR').format(value);
}

/** Tarihi Türkçe okunur biçime çevirir (2026-06-05 → "5 Haz 2026"). */
export function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(typeof value === 'string' ? new Date(value) : value);
}

/** URL anahtarı için güvenli slug üretir. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}
