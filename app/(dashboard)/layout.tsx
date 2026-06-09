import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { getCurrentUser } from '@/lib/auth';

/**
 * DashboardLayout (Server Component) — erişim koruması.
 *
 * getCurrentUser() getUser() ile session'ı sunucuda doğrular (learnings).
 * Oturum yoksa /login'e yönlendirir. Demo modunda (Supabase yapılandırılmamış)
 * getCurrentUser bir demo kullanıcı döndürür ve pano örnek verilerle gezilebilir.
 * Hassas alanlar (token/hash) Client bileşenlere ASLA prop olarak geçmez (learnings).
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?redirectTo=/dashboard');
  }

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <DashboardShell userName={user.name} userEmail={user.email} userInitials={initials}>
      {children}
    </DashboardShell>
  );
}
