/**
 * GET /api/register/status
 * Returns the current registration status (public, no auth required).
 */
import { NextResponse } from 'next/server'
import { getRegistrationStatus } from '@/lib/services/registration.service'

export const revalidate = 60 // cache for 60 s on Vercel edge

export async function GET() {
  try {
    const result = await getRegistrationStatus()
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    console.error('[/api/register/status]', err)
    return NextResponse.json(
      { ok: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch status.' } },
      { status: 500 },
    )
  }
}
