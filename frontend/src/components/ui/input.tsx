import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-12 w-full rounded-[14px] border bg-white/90 px-4 text-sm text-[color:var(--foreground)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--teal)] focus:ring-2 focus:ring-[color:var(--mint)]',
        className,
      )}
      {...props}
    />
  )
}
