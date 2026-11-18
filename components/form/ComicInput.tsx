import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { FieldError } from './FieldError'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  /** Hides the field visually (honeypot). */
  hidden?: boolean
}

export const ComicInput = forwardRef<HTMLInputElement, Props>(function ComicInput(
  { label, error, hint, hidden, id, className, ...rest },
  ref,
) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const errorId = `${inputId}-error`
  const hintId = hint ? `${inputId}-hint` : undefined
  const described = [hintId, error ? errorId : undefined].filter(Boolean).join(' ')

  if (hidden) {
    return (
      <div aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor={inputId}>{label}</label>
        <input id={inputId} ref={ref} tabIndex={-1} autoComplete="off" {...rest} />
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={inputId} className="text-sm font-extrabold uppercase tracking-[0.12em]">
        {label}
        {rest.required && <span className="ml-1 text-comic-red" aria-hidden="true">*</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-ink/60">
          {hint}
        </p>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={described || undefined}
        className={cn(
          'border-[3px] border-ink bg-paper px-3 py-2.5 font-sans text-base text-ink outline-none',
          'placeholder:text-ink/40',
          'focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-comic-blue',
          'comic-shadow-sm',
          error && 'border-comic-red',
        )}
        {...rest}
      />
      <FieldError id={errorId} message={error} />
    </div>
  )
})
