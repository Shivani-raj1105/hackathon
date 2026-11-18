import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { FieldError } from './FieldError'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
  showCount?: boolean
  maxLength?: number
}

export const ComicTextarea = forwardRef<HTMLTextAreaElement, Props>(function ComicTextarea(
  { label, error, hint, showCount, maxLength, id, className, value, ...rest },
  ref,
) {
  const textareaId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const errorId = `${textareaId}-error`
  const hintId = hint ? `${textareaId}-hint` : undefined
  const described = [hintId, error ? errorId : undefined].filter(Boolean).join(' ')
  const charCount = typeof value === 'string' ? value.length : 0

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={textareaId} className="text-sm font-extrabold uppercase tracking-[0.12em]">
        {label}
        {rest.required && <span className="ml-1 text-comic-red" aria-hidden="true">*</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-ink/60">
          {hint}
        </p>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        maxLength={maxLength}
        value={value}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={described || undefined}
        rows={4}
        className={cn(
          'resize-y border-[3px] border-ink bg-paper px-3 py-2.5 font-sans text-base text-ink outline-none',
          'placeholder:text-ink/40',
          'focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-comic-blue',
          'comic-shadow-sm',
          error && 'border-comic-red',
        )}
        {...rest}
      />
      {showCount && maxLength && (
        <p className="text-right text-xs text-ink/50" aria-live="polite">
          {charCount}/{maxLength}
        </p>
      )}
      <FieldError id={errorId} message={error} />
    </div>
  )
})
