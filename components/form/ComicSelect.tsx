import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { FieldError } from './FieldError'

interface Option {
  value: string | number
  label: string
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
  placeholder?: string
  error?: string
  hint?: string
}

export const ComicSelect = forwardRef<HTMLSelectElement, Props>(function ComicSelect(
  { label, options, placeholder, error, hint, id, className, ...rest },
  ref,
) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const errorId = `${selectId}-error`
  const hintId = hint ? `${selectId}-hint` : undefined
  const described = [hintId, error ? errorId : undefined].filter(Boolean).join(' ')

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={selectId} className="text-sm font-extrabold uppercase tracking-[0.12em]">
        {label}
        {rest.required && <span className="ml-1 text-comic-red" aria-hidden="true">*</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-ink/60">
          {hint}
        </p>
      )}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={described || undefined}
        className={cn(
          'border-[3px] border-ink bg-paper px-3 py-2.5 font-sans text-base text-ink outline-none',
          'comic-shadow-sm appearance-none',
          'focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-comic-blue',
          error && 'border-comic-red',
        )}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FieldError id={errorId} message={error} />
    </div>
  )
})
