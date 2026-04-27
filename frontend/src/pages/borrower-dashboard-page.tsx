import toast from 'react-hot-toast'
import { ArrowRight, Bell, MessageSquareMore, Repeat2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { RentalTimer } from '../components/shared/rental-timer'
import { SectionHeading } from '../components/shared/section-heading'
import { formatCurrency, formatDateRange, humanTimeAgo } from '../lib/utils'
import { useAppStore } from '../store/app-store'

export function BorrowerDashboardPage() {
  const data = useAppStore((state) => state.data!)
  const wishlist = useAppStore((state) => state.wishlist)
  const wishlistListings = data.listings.filter((listing) =>
    wishlist.includes(listing.id),
  )
  const activeRentals = data.rentals.filter((rental) => rental.status === 'ACTIVE')
  const upcomingRentals = data.rentals.filter(
    (rental) => rental.status === 'UPCOMING',
  )

  return (
    <main className="shell py-10 sm:py-14">
      <section className="surface-strong rounded-[36px] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="Borrower board"
              title="Every live rental stays visible until the handoff is done"
              description="Countdown timers, notifications, re-rent shortcuts, and quick messaging are organized around active campus use instead of generic ecommerce flow."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: 'Active rentals',
                  value: `${activeRentals.length}`,
                },
                {
                  label: 'Upcoming sessions',
                  value: `${upcomingRentals.length}`,
                },
                {
                  label: 'Wishlist saves',
                  value: `${wishlistListings.length}`,
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

          <Card className="rounded-[32px] bg-[#072c29] text-white">
            <p className="eyebrow text-[rgba(216,243,236,0.8)]">Savings snapshot</p>
            <h2 className="mt-2 text-3xl font-bold">This week’s student advantage</h2>
            <div className="mt-6 grid gap-4">
              {[
                {
                  label: 'Borrowed value',
                  value: formatCurrency(
                    activeRentals.reduce((sum, rental) => sum + rental.totalAmount, 0),
                  ),
                },
                {
                  label: 'Re-rent ready items',
                  value: `${wishlistListings.length}`,
                },
                {
                  label: 'Unread alerts',
                  value: `${data.notifications.filter((item) => !item.isRead).length}`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-white/10 bg-white/8 p-4"
                >
                  <p className="text-sm text-[rgba(255,255,255,0.66)]">{item.label}</p>
                  <p className="mt-2 text-3xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-8">
          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Active rentals</p>
                <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
                  Countdown to return
                </h2>
              </div>
              <Badge className="bg-[color:var(--mint)] text-[color:var(--teal-deep)]">
                Auto reminders enabled
              </Badge>
            </div>

            <div className="mt-6 grid gap-4">
              {activeRentals.map((rental) => (
                <div
                  key={rental.id}
                  className="grid gap-4 rounded-[24px] border bg-white/80 p-4 sm:grid-cols-[104px_1fr]"
                >
                  <img
                    src={rental.image}
                    alt={rental.listingTitle}
                    className="aspect-square h-24 w-full rounded-[18px] object-cover"
                  />
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-[color:var(--foreground)]">
                          {rental.listingTitle}
                        </h3>
                        <p className="mt-2 text-sm text-[color:var(--muted)]">
                          {rental.categoryLabel} · {rental.pickupLocation}
                        </p>
                      </div>
                      <RentalTimer endAt={rental.endTime} />
                    </div>

                    <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                      {formatDateRange(rental.startTime, rental.endTime)}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button
                        size="sm"
                        className="rounded-full"
                        onClick={() =>
                          toast.success('Rental thread opened for the lender.')
                        }
                      >
                        <MessageSquareMore size={16} />
                        Message lender
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                        onClick={() =>
                          toast.success('Return reminder pinned to notifications.')
                        }
                      >
                        <Bell size={16} />
                        Remind me
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Wishlist and re-rent</p>
                <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
                  Items you can grab again fast
                </h2>
              </div>
              <Badge>{wishlistListings.length} saved</Badge>
            </div>

            <div className="mt-6 grid gap-4">
              {wishlistListings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border bg-white/80 p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="h-16 w-16 rounded-[18px] object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[color:var(--foreground)]">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-[color:var(--muted)]">
                        {formatCurrency(listing.pricePerHour)}/hr · {listing.location}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={() => toast.success(`${listing.title} moved into quick re-rent flow.`)}
                  >
                    <Repeat2 size={16} />
                    Rent again
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-8">
          <Card className="rounded-[34px]">
            <p className="eyebrow">Upcoming</p>
            <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
              Scheduled pickup windows
            </h2>
            <div className="mt-6 grid gap-4">
              {upcomingRentals.map((rental) => (
                <div
                  key={rental.id}
                  className="rounded-[24px] border bg-white/80 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[color:var(--foreground)]">
                        {rental.listingTitle}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                        {formatDateRange(rental.startTime, rental.endTime)}
                      </p>
                      <p className="text-sm text-[color:var(--muted)]">
                        Pickup at {rental.pickupLocation}
                      </p>
                    </div>
                    <Badge className="bg-[color:var(--background-strong)]">
                      {formatCurrency(rental.totalAmount)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[34px]">
            <p className="eyebrow">Live inbox</p>
            <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
              Recent conversations
            </h2>
            <div className="mt-6 grid gap-4">
              {data.chatThreads.map((thread) => (
                <div
                  key={thread.rentalId}
                  className="rounded-[24px] border bg-white/80 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[color:var(--foreground)]">
                        {thread.peerName}
                      </h3>
                      <p className="mt-1 text-sm text-[color:var(--muted)]">
                        {thread.peerRole}
                      </p>
                    </div>
                    {thread.unreadCount > 0 ? (
                      <Badge className="bg-[color:var(--coral)] text-white">
                        {thread.unreadCount} new
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]">
                    {thread.lastMessage}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-[color:var(--muted)]">
                      {humanTimeAgo(thread.lastActive)}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => toast.success('Chat opened in the live thread.')}
                    >
                      Open chat
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
