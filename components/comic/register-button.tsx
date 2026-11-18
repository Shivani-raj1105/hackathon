import { ArrowUpRight, Clock, XCircle } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export type RegStatus = 'not_open' | 'open' | 'closed' | 'full'

type Size = 'sm' | 'lg'

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-lg',
  lg: 'px-6 py-3 text-2xl sm:text-3xl',
}

const labels: Record<RegStatus, string> = {
  not_open: 'REGISTRATION OPENING SOON',
  open: 'REGISTER NOW',
  closed: 'REGISTRATIONS CLOSED',
  full: 'ALL SLOTS FILLED',
}

export function RegisterButton({
  size = 'lg',
  className,
  /** Override the derived status (e.g. pass the server-fetched status). */
  status,
  openLabel,
  closedLabel,
}: {
  size?: Size
  className?: string
  status?: RegStatus
  openLabel?: string
  closedLabel?: string
}) {
  // Derive status from siteConfig when no server-provided status is given
  const derivedStatus: RegStatus = status ?? (siteConfig.registrationOpensAt ? 'open' : 'not_open')
  const url = siteConfig.registrationUrl

  const base =
    'inline-flex items-center justify-center gap-3 border-[3px] border-ink font-display tracking-wide transition-transform'

  const isActive = derivedStatus === 'open' && url

  if (isActive) {
    const isExternal = url.startsWith('http')
    const label = openLabel ?? labels.open
    return (
      <a
        href={url}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={cn(
          base,
          sizes[size],
          'comic-shadow bg-comic-red text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-comic-blue',
          className,
        )}
      >
        {label}
        <ArrowUpRight className="size-[0.9em]" aria-hidden="true" />
      </a>
    )
  }

  const disabledLabel =
    closedLabel ??
    (derivedStatus === 'closed'
      ? labels.closed
      : derivedStatus === 'full'
      ? labels.full
      : labels.not_open)

  const Icon = derivedStatus === 'closed' || derivedStatus === 'full' ? XCircle : Clock

  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className={cn(base, sizes[size], 'cursor-not-allowed bg-paper-dark text-ink/70', className)}
    >
      <Icon className="size-[0.9em]" aria-hidden="true" />
      {disabledLabel}
    </button>
  )
}
