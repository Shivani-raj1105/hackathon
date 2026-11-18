/**
 * GET /api/admin/registrations
 * Paginated, searchable list of all registrations.
 * Protected by ADMIN_TOKEN header.
 */
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { env } from '@/lib/env'

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: { code: 'UNAUTHORIZED', message: 'Invalid or missing admin token.' } },
    { status: 401 },
  )
}

export async function GET(req: NextRequest) {
  if (req.headers.get('x-admin-token') !== env.ADMIN_TOKEN) return unauthorized()

  const { searchParams } = req.nextUrl
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const perPage = Math.min(100, Math.max(1, Number(searchParams.get('perPage') ?? 25)))
  const search = searchParams.get('search')?.trim() ?? ''

  const where = search
    ? {
        OR: [
          { teamName: { contains: search, mode: 'insensitive' as const } },
          { registrationCode: { contains: search.toUpperCase() } },
          { members: { some: { fullName: { contains: search, mode: 'insensitive' as const } } } },
        ],
      }
    : {}

  const [total, teams] = await Promise.all([
    db.team.count({ where }),
    db.team.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        members: {
          orderBy: [{ isLeader: 'desc' }, { createdAt: 'asc' }],
        },
      },
    }),
  ])

  return NextResponse.json({
    ok: true,
    page,
    perPage,
    total,
    totalPages: Math.ceil(total / perPage),
    teams,
  })
}
