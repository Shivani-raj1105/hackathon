import { cn } from '@/lib/utils'

interface Props {
  pending: boolean
  label?: string
  pendingLabel?: string
  className?: string
}

export function SubmitButton({
  pending,
  label = 'REGISTER YOUR TEAM',
  pendingLabel = 'SENDING…',
  className,
}: Props) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn(
        'inline-flex items-center justify-center gap-3 border-[3px] border-ink font-display text-2xl tracking-wide transition-transform',
        'px-6 py-3 sm:text-3xl',
        pending
          ? 'cursor-not-allowed bg-paper-dark text-ink/70'
          : 'comic-shadow bg-comic-red text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-comic-blue',
        className,
      )}
    >
      {pending ? (
        <>
          <span
            aria-hidden="true"
            className="inline-block size-6 animate-spin rounded-full border-[3px] border-ink border-t-transparent"
          />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </button>
  )
}
