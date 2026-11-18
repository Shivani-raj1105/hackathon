/**
 * POST /api/register
 * Creates a new team registration.
 */
import { NextRequest, NextResponse } from 'next/server'
import { registrationSchema } from '@/lib/validation/registration'
import { createRegistration } from '@/lib/services/registration.service'
import { checkRateLimit } from '@/lib/rate-limit'

const MAX_BODY_BYTES = 32_768 // 32 KB

function errorResponse(
  code: string,
  message: string,
  status: number,
  fieldErrors?: Record<string, string>,
) {
  return NextResponse.json(
    { ok: false, error: { code, message, ...(fieldErrors ? { fieldErrors } : {}) } },
    { status },
  )
}

export async function POST(req: NextRequest) {
  // ── Rate limit ──────────────────────────────────────────────────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return errorResponse('RATE_LIMITED', 'Too many requests. Please wait a minute.', 429)
  }

  // ── Size guard ──────────────────────────────────────────────────────────────
  const contentLength = Number(req.headers.get('content-length') ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    return errorResponse('PAYLOAD_TOO_LARGE', 'Request body too large.', 413)
  }

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errorResponse('INVALID_JSON', 'Invalid JSON body.', 400)
  }

  // ── Honeypot check ──────────────────────────────────────────────────────────
  if (typeof body === 'object' && body !== null && (body as Record<string, unknown>).website) {
    // Silently accept but do nothing (bot trap)
    return NextResponse.json({ ok: true, registrationId: 'HYP-000000' }, { status: 201 })
  }

  // ── Validate ────────────────────────────────────────────────────────────────
  const parsed = registrationSchema.safeParse(body)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.')
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return errorResponse('VALIDATION_ERROR', 'Validation failed.', 422, fieldErrors)
  }

  // ── Create ──────────────────────────────────────────────────────────────────
  const result = await createRegistration(parsed.data)

  if ('error' in result) {
    const { code, message, fieldErrors } = result.error
    const status =
      code === 'REGISTRATION_NOT_OPEN'
        ? 403
        : code === 'DUPLICATE_TEAM_NAME' || code === 'DUPLICATE_EMAIL' || code === 'DUPLICATE_USN'
        ? 409
        : 500
    return errorResponse(code, message, status, fieldErrors)
  }

  return NextResponse.json({ ok: true, registrationId: result.registrationId }, { status: 201 })
}
