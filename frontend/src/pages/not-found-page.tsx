import { Link } from 'react-router-dom'
import { buttonVariants } from '../components/ui/button-variants'
import { Card } from '../components/ui/card'
import { cn } from '../lib/utils'

export function NotFoundPage() {
  return (
    <main className="shell flex min-h-[60vh] items-center py-16">
      <Card className="mx-auto max-w-2xl rounded-[34px] text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl font-bold text-[color:var(--foreground)]">
          This campus page wandered off.
        </h1>
        <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
          The route exists in the product map, but there is nothing published at
          this URL yet. Head back into the main marketplace flow.
        </p>
        <div className="mt-8">
          <Link to="/" className={cn(buttonVariants({ size: 'lg' }), 'rounded-full')}>
            Return home
          </Link>
        </div>
      </Card>
    </main>
  )
}
