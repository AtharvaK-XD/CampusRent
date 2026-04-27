import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ListingCard } from '../components/listings/listing-card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { NotFoundPage } from './not-found-page'
import { formatCurrency, formatDateRange } from '../lib/utils'
import { useAppStore } from '../store/app-store'

export function ListingDetailPage() {
  const { listingId } = useParams()
  const data = useAppStore((state) => state.data!)
  const wishlist = useAppStore((state) => state.wishlist)
  const toggleWishlist = useAppStore((state) => state.toggleWishlist)
  const listing = data.listings.find((item) => item.id === listingId)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (!listing) {
    return <NotFoundPage />
  }

  const similarListings = data.listings
    .filter(
      (item) => item.category === listing.category && item.id !== listing.id,
    )
    .slice(0, 2)
  const pricingWidth = Math.min(
    Math.round((listing.pricePerHour / listing.priceCeiling) * 100),
    100,
  )

  return (
    <main className="shell py-10 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <div className="overflow-hidden rounded-[34px] border bg-white">
            <div className="aspect-[5/4] overflow-hidden">
              <img
                src={listing.images[activeImageIndex]}
                alt={listing.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {listing.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`overflow-hidden rounded-[20px] border ${
                  index === activeImageIndex
                    ? 'ring-2 ring-[color:var(--teal)]'
                    : ''
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${listing.title} preview ${index + 1}`}
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <Card className="rounded-[34px]">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[color:var(--mint)] text-[color:var(--teal-deep)]">
                Rank #{listing.rank} in reverse auction
              </Badge>
              <Badge>{listing.condition.replace('_', ' ')}</Badge>
              {listing.sameCollege ? (
                <Badge className="bg-[rgba(255,209,119,0.24)] text-slate-900">
                  Same-college priority
                </Badge>
              ) : null}
            </div>

            <h1 className="mt-5 text-4xl font-bold text-[color:var(--foreground)]">
              {listing.title}
            </h1>
            <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
              {listing.description}
            </p>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-5 rounded-[26px] bg-[color:var(--background-strong)] p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  Student hourly rate
                </p>
                <p className="mt-2 text-4xl font-bold text-[color:var(--teal-deep)]">
                  {formatCurrency(listing.pricePerHour)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  Category ceiling
                </p>
                <p className="mt-2 text-2xl font-bold text-[color:var(--foreground)]">
                  {formatCurrency(listing.priceCeiling)}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Price ceiling usage</span>
                <span>{pricingWidth}% of maximum</span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-[color:var(--background-strong)]">
                <div
                  className="h-3 rounded-full bg-[linear-gradient(90deg,#0f766e,#34d399)]"
                  style={{ width: `${pricingWidth}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 rounded-[26px] border bg-white/70 p-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Clock3 size={18} className="mt-1 text-[color:var(--teal)]" />
                <div>
                  <p className="font-semibold text-[color:var(--foreground)]">
                    Availability
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                    {formatDateRange(listing.availableFrom, listing.availableTo)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-[color:var(--teal)]" />
                <div>
                  <p className="font-semibold text-[color:var(--foreground)]">
                    Pickup point
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                    {listing.location} · {listing.pickupNote}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays
                  size={18}
                  className="mt-1 text-[color:var(--teal)]"
                />
                <div>
                  <p className="font-semibold text-[color:var(--foreground)]">
                    Demand window
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                    {listing.hoursBooked} hours already booked this week
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={18}
                  className="mt-1 text-[color:var(--teal)]"
                />
                <div>
                  <p className="font-semibold text-[color:var(--foreground)]">
                    Deposit safety
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                    Refundable deposit capped at {formatCurrency(listing.deposit)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                className="rounded-full"
                onClick={() =>
                  toast.success('Rental request sent to the lender for confirmation.')
                }
              >
                Rent now
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  toggleWishlist(listing.id)
                  toast.success(
                    wishlist.includes(listing.id)
                      ? 'Removed from wishlist.'
                      : 'Saved for quick re-rent.',
                  )
                }}
              >
                <Heart size={16} className={wishlist.includes(listing.id) ? 'fill-current' : ''} />
                {wishlist.includes(listing.id) ? 'Saved' : 'Save item'}
              </Button>
            </div>
          </Card>

          <Card className="rounded-[34px]">
            <div className="flex items-center gap-4">
              <img
                src={listing.lender.avatar}
                alt={listing.lender.name}
                className="h-16 w-16 rounded-2xl object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-[color:var(--foreground)]">
                  {listing.lender.name}
                </h2>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  {listing.collegeName}
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Badge className="gap-2 bg-[color:var(--mint)] text-[color:var(--teal-deep)]">
                <Star size={14} />
                {listing.lender.rating.toFixed(1)} rating
              </Badge>
              <Badge className="gap-2">
                <ShieldCheck size={14} />
                Verified student
              </Badge>
            </div>
            <p className="mt-5 text-sm leading-7 text-[color:var(--muted)]">
              {listing.lender.name} has kept this listing inside campus price
              discipline while staying highly rated on responsiveness, handoff
              quality, and return condition.
            </p>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[color:var(--foreground)]">
            Similar listings in this ladder
          </h2>
          <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
            These alternatives are close in category but differ on price, condition,
            and pickup convenience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {similarListings.map((item) => (
            <ListingCard
              key={item.id}
              listing={item}
              wishlisted={wishlist.includes(item.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
