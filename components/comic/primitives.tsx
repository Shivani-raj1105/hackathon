import Image from 'next/image'
import { cn } from '@/lib/utils'

export function HyperionBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center border-[3px] border-ink bg-paper px-2.5 py-0.5 font-display text-lg leading-none tracking-wide text-ink',
        className,
      )}
    >
      HYPERION
    </span>
  )
}

export function SvceLogo({
  size = 40,
  className,
  priority,
}: {
  size?: number
  className?: string
  priority?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-white',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/svce-logo.png"
        alt="SVCE Bengaluru logo"
        width={size * 2}
        height={size * 2}
        priority={priority}
        className="h-[82%] w-[82%] object-contain"
      />
    </span>
  )
}

export function SectionHeading({
  kicker,
  title,
  accent,
  className,
  invert,
}: {
  kicker: string
  title: string
  accent?: string
  className?: string
  invert?: boolean
}) {
  return (
    <div data-stagger="140" className={cn('flex flex-col items-start gap-4', className)}>
      <span data-reveal="pop" className="comic-shadow-sm inline-block -rotate-2 border-[3px] border-ink bg-comic-yellow px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-ink">
        {kicker}
      </span>
      <h2
        data-reveal="text"
        className={cn(
          'text-balance font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl',
          invert ? 'text-paper' : 'text-ink',
        )}
      >
        {title}{' '}
        {accent ? <span className="text-outline text-comic-red">{accent}</span> : null}
      </h2>
    </div>
  )
}

export function Starburst({
  children,
  className,
  color = 'bg-comic-red',
  parallax,
}: {
  children: React.ReactNode
  className?: string
  color?: string
  parallax?: number
}) {
  return (
    <span
      aria-hidden="true"
      data-parallax={parallax}
      className={cn('pointer-events-none absolute inline-grid place-items-center', className)}
    >
      <span className="starburst absolute inset-0 bg-ink" />
      <span className={cn('starburst absolute inset-[5px]', color)} />
      <span className="relative -rotate-12 font-display text-ink">{children}</span>
    </span>
  )
}
