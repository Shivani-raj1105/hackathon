import { cn } from '@/lib/utils'

interface Props {
  id: string
  message?: string
  className?: string
}

export function FieldError({ id, message, className }: Props) {
  if (!message) return null
  return (
    <p
      id={id}
      role="alert"
      className={cn(
        'mt-1 inline-flex items-center gap-1.5 bg-comic-red px-2 py-0.5 font-display text-base tracking-wide text-paper',
        className,
      )}
    >
      <span aria-hidden="true" className="font-black">✕</span>
      {message}
    </p>
  )
}
