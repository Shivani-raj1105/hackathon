/**
 * Validated environment variables — imported once at module load.
 * The app fails fast at boot if required vars are missing.
 * Never import from this file on the client; it is server-only.
 */
import { z } from 'zod'

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  ADMIN_TOKEN: z.string().min(16, 'ADMIN_TOKEN must be at least 16 chars'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Optional mailer (off by default)
  ENABLE_EMAIL: z.string().optional().transform((v) => v === 'true'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional().transform((v) => (v ? Number(v) : 587)),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
})

function parseEnv() {
  const result = serverEnvSchema.safeParse(process.env)
  if (!result.success) {
    const missing = result.error.issues
      .map((i) => `  ${i.path.join('.')}: ${i.message}`)
      .join('\n')
    throw new Error(`Missing / invalid environment variables:\n${missing}`)
  }
  return result.data
}

// Cache across hot-reload in dev
const globalForEnv = globalThis as unknown as { _env?: ReturnType<typeof parseEnv> }
export const env = globalForEnv._env ?? (globalForEnv._env = parseEnv())
