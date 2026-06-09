/** Uygulama genelinde paylaşılan TypeScript tipleri (strict). */

export type Plan = 'free' | 'pro' | 'growth' | 'enterprise';
export type Role = 'owner' | 'admin' | 'member';
export type PixelProvider = 'facebook' | 'google' | 'tiktok' | 'linkedin';

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  isDemo: boolean;
}

export interface WorkspaceDTO {
  id: string;
  name: string;
  slug: string;
  plan: Plan;
  role: Role;
}

export interface LinkDTO {
  id: string;
  key: string;
  shortUrl: string;
  destinationUrl: string;
  title: string;
  tag: string;
  clickCount: number;
  createdAt: string;
}

export interface DomainDTO {
  id: string;
  domain: string;
  verified: boolean;
  ssl: 'active' | 'pending' | 'none';
  primary: boolean;
  links: number;
}

/** Hassas alan (access_token) İÇERMEZ — Server→Client sızıntı önlemi (learnings). */
export interface PixelDTO {
  id: string;
  provider: PixelProvider;
  name: string;
  pixelId: string;
  isEnabled: boolean;
}

export interface TeamMemberDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'invited';
  initials: string;
}

export interface GeoPoint {
  country: string;
  flag: string;
  clicks: number;
  share: number;
}

export interface BreakdownPoint {
  label: string;
  value: number;
}

export interface ActionResponse<T = undefined> {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: T;
}
