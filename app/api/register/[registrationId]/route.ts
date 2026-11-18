/**
 * GET /api/register/:registrationId
 * Returns a public-safe team summary (no PII).
 */
import { NextRequest, NextResponse } from 'next/server'
import { getRegistrationSummary } from '@/lib/services/registration.service'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ registrationId: string }> },
) {
  const { registrationId } = await params
  const code = registrationId.toUpperCase()

  if (!code.startsWith('HYP-') || code.length !== 10) {
    return NextResponse.json(
      { ok: false, error: { code: 'INVALID_ID', message: 'Invalid registration ID format.' } },
      { status: 400 },
    )
  }

  try {
    const summary = await getRegistrationSummary(code)
    if (!summary) {
      return NextResponse.json(
        { ok: false, error: { code: 'NOT_FOUND', message: 'Registration not found.' } },
        { status: 404 },
      )
    }
    return NextResponse.json({ ok: true, registration: summary })
  } catch (err) {
    console.error('[/api/register/:id]', err)
    return NextResponse.json(
      { ok: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch registration.' } },
      { status: 500 },
    )
  }
}
