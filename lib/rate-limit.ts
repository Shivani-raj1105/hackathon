/**
 * Simple in-memory rate limiter (per IP).
 * Good for a single-process deployment (Vercel serverless, local dev).
 * For multi-region, swap the Map for a Redis store.
 */

interface Bucket {
  count: number
  resetAt: number
}

const store = new Map<string, Bucket>()

const WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 5    // per IP per window (for POST /api/register)

/** Returns true when the request is allowed, false when rate-limited. */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const bucket = store.get(ip)

  if (!bucket || now >= bucket.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (bucket.count >= MAX_REQUESTS) return false

  bucket.count++
  return true
}

// Prune expired buckets every 5 minutes to avoid unbounded memory growth.
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, bucket] of store) {
      if (now >= bucket.resetAt) store.delete(key)
    }
  }, 5 * 60_000)
}
