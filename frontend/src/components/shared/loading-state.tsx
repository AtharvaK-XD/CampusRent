import { RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'

type LoadingStateProps = {
  error: string | null
  onRetry: () => void
}

export function LoadingState({ error, onRetry }: LoadingStateProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[color:var(--background)]">
      <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-[rgba(15,118,110,0.2)] to-transparent" />
      <div className="shell relative flex min-h-screen flex-col justify-center py-20">
        <div className="surface-strong max-w-3xl rounded-[36px] p-8 sm:p-12">
          <p className="eyebrow">CampusRent</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold text-[color:var(--foreground)] sm:text-6xl">
            The marketplace is warming up the campus grid.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-[color:var(--muted)] sm:text-lg">
            Student listings, live pricing, and trust signals are being loaded so
            every screen feels like a real product instead of a mock brochure.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-[22px] border bg-white/70"
              />
            ))}
          </div>

          {error ? (
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-[20px] border border-[rgba(255,143,102,0.35)] bg-[rgba(255,143,102,0.08)] p-4">
              <p className="text-sm font-medium text-[color:var(--foreground)]">
                {error}
              </p>
              <Button onClick={onRetry}>
                <RefreshCw size={16} />
                Retry
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
