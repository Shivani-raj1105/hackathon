import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { FieldError } from './FieldError'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
  error?: string
}

export const ComicCheckbox = forwardRef<HTMLInputElement, Props>(function ComicCheckbox(
  { label, error, id, className, ...rest },
  ref,
) {
  const checkId = id ?? 'checkbox'
  const errorId = `${checkId}-error`

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={checkId} className="flex cursor-pointer items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'mt-1 size-5 shrink-0 cursor-pointer appearance-none border-[3px] border-ink bg-paper',
            'checked:bg-comic-yellow',
            'focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-comic-blue',
            error && 'border-comic-red',
          )}
          {...rest}
        />
        <span className="text-sm leading-relaxed">{label}</span>
      </label>
      <FieldError id={errorId} message={error} />
    </div>
  )
})
