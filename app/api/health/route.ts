import { NextResponse } from 'next/server';

/**
 * Sağlık kontrolü endpoint'i (Coolify canlılık testi — CLAUDE.md zorunlu).
 * Her zaman { status: "ok" } döner.
 */
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'linkspark',
    timestamp: new Date().toISOString(),
  });
}
