import toast from 'react-hot-toast'
import { BellOff, ShieldCheck, Star } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { SectionHeading } from '../components/shared/section-heading'
import { formatCurrency, humanTimeAgo } from '../lib/utils'
import { useAppStore } from '../store/app-store'

export function ProfilePage() {
  const data = useAppStore((state) => state.data!)
  const notificationsMuted = useAppStore((state) => state.notificationsMuted)
  const setNotificationsMuted = useAppStore(
    (state) => state.setNotificationsMuted,
  )
  const markNotificationRead = useAppStore((state) => state.markNotificationRead)

  return (
    <main className="shell py-10 sm:py-14">
      <section className="surface-strong overflow-hidden rounded-[36px] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <img
              src={data.user.avatar}
              alt={data.user.name}
              className="h-32 w-32 rounded-[28px] object-cover"
            />
            <div>
              <p className="eyebrow">Profile</p>
              <h1 className="mt-3 text-4xl font-bold text-[color:var(--foreground)]">
                {data.user.name}
              </h1>
              <p className="mt-2 text-base text-[color:var(--muted)]">
                {data.user.department} · Year {data.user.year} · {data.user.collegeName}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="gap-2 bg-[color:var(--mint)] text-[color:var(--teal-deep)]">
                <ShieldCheck size={14} />
                Verified student
              </Badge>
              <Badge className="gap-2">
                <Star size={14} />
                {data.user.rating.toFixed(1)} rating
              </Badge>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: 'Total rentals',
                value: `${data.user.totalRentals}`,
              },
              {
                label: 'Wallet balance',
                value: formatCurrency(data.user.walletBalance),
              },
              {
                label: 'Community role',
                value: data.user.roleLabel,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] bg-[color:var(--background-strong)] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-[color:var(--foreground)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-8">
          <Card className="rounded-[34px]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionHeading
                eyebrow="Preferences"
                title="Notification and account controls"
                description="A lightweight settings surface for the most important preferences in the MVP."
              />
              <Button
                variant={notificationsMuted ? 'outline' : 'default'}
                className="rounded-full"
                onClick={() => {
                  const next = !notificationsMuted
                  setNotificationsMuted(next)
                  toast.success(
                    next
                      ? 'Live notification sounds muted.'
                      : 'Live notification sounds restored.',
                  )
                }}
              >
                <BellOff size={16} />
                {notificationsMuted ? 'Muted' : 'Mute sounds'}
              </Button>
            </div>
          </Card>

          <Card className="rounded-[34px]">
            <p className="eyebrow">Reviews</p>
            <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
              Reputation on campus
            </h2>
            <div className="mt-6 grid gap-4">
              {data.reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-[24px] border bg-white/80 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[color:var(--foreground)]">
                        {review.name}
                      </h3>
                      <p className="text-sm text-[color:var(--muted)]">{review.role}</p>
                    </div>
                    <Badge className="gap-2 bg-[color:var(--mint)] text-[color:var(--teal-deep)]">
                      <Star size={14} />
                      {review.rating}/5
                    </Badge>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--foreground)]">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-8">
          <Card className="rounded-[34px]">
            <p className="eyebrow">Notifications center</p>
            <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
              Recent alerts
            </h2>
            <div className="mt-6 grid gap-4">
              {data.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="rounded-[24px] border bg-white/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                        {notification.type.replaceAll('_', ' ')}
                      </p>
                      <p className="mt-2 text-base leading-7 text-[color:var(--foreground)]">
                        {notification.message}
                      </p>
                    </div>
                    {notification.isRead ? (
                      <Badge>Read</Badge>
                    ) : (
                      <Badge className="bg-[color:var(--coral)] text-white">
                        Unread
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-[color:var(--muted)]">
                      {humanTimeAgo(notification.createdAt)}
                    </p>
                    {!notification.isRead ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => markNotificationRead(notification.id)}
                      >
                        Mark read
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[34px]">
            <p className="eyebrow">Leaderboard</p>
            <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
              Top lenders this month
            </h2>
            <div className="mt-6 grid gap-4">
              {data.leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border bg-white/80 p-5"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                      #{index + 1} ranked
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-[color:var(--foreground)]">
                      {entry.name}
                    </h3>
                    <p className="text-sm text-[color:var(--muted)]">
                      {entry.specialty}
                    </p>
                  </div>
                  <Badge className="bg-[color:var(--mint)] text-[color:var(--teal-deep)]">
                    {formatCurrency(entry.earnings)}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
