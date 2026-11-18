/**
 * Prisma singleton — prevents connection exhaustion during Next.js dev
 * hot-reload and in serverless environments.
 *
 * Usage:  import { db } from '@/lib/db/client'
 */
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'error']
        : ['warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
