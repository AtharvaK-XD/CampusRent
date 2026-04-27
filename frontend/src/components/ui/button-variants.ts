import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[14px] font-semibold transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--teal)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[color:var(--teal)] text-white shadow-[0_18px_40px_rgba(15,118,110,0.25)] hover:bg-[color:var(--teal-deep)]',
        secondary:
          'bg-[color:var(--sun)] text-slate-900 hover:bg-[#ffc45c]',
        outline:
          'border bg-white/70 text-[color:var(--foreground)] hover:bg-white',
        ghost:
          'text-[color:var(--foreground)] hover:bg-white/70',
      },
      size: {
        default: 'h-11 px-5 text-sm',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
