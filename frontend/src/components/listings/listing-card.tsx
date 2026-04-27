import {
  BookOpen,
  Dumbbell,
  FlaskConical,
  Heart,
  Laptop,
  MapPin,
  Package,
  PenTool,
  ShieldCheck,
  Star,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CategoryId, Listing } from '../../lib/types'
import { cn, formatCurrency } from '../../lib/utils'
import { Badge } from '../ui/badge'

const categoryIconById: Record<CategoryId, LucideIcon> = {
  LAB_INSTRUMENTS: FlaskConical,
  STATIONERY: PenTool,
  ELECTRONICS: Laptop,
  BOOKS: BookOpen,
  SPORTS: Dumbbell,
  TOOLS: Wrench,
  OTHER: Package,
}

type ListingCardProps = {
  listing: Listing
  wishlisted: boolean
  onToggleWishlist: (listingId: string) => void
}

export function ListingCard({
  listing,
  wishlisted,
  onToggleWishlist,
}: ListingCardProps) {
  const CategoryIcon = categoryIconById[listing.category]

  return (
    <article className="surface-strong overflow-hidden rounded-[28px] p-0">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <Badge className="gap-2 bg-white/90">
            <CategoryIcon size={14} />
            {listing.categoryLabel}
          </Badge>
          <button
            type="button"
            aria-label="Toggle wishlist"
            onClick={() => onToggleWishlist(listing.id)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl',
              wishlisted
                ? 'border-transparent bg-[color:var(--coral)] text-white'
                : 'bg-white/80 text-[color:var(--foreground)]',
            )}
          >
            <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[color:var(--foreground)]">
              {listing.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              {listing.description}
            </p>
          </div>
          <div className="rounded-[18px] bg-[color:var(--mint)] px-3 py-2 text-right">
            <p className="text-lg font-bold text-[color:var(--teal-deep)]">
              {formatCurrency(listing.pricePerHour)}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--teal)]">
              per hour
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {listing.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} className="bg-[color:var(--background-strong)]">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[color:var(--muted)]">
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} />
            {listing.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <Star size={16} />
            {listing.lender.rating.toFixed(1)} lender
          </span>
          {listing.sameCollege ? (
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} />
              Same-college match
            </span>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
              Reverse-auction rank
            </p>
            <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">
              #{listing.rank} in its price ladder
            </p>
          </div>
          <Link
            to={`/listing/${listing.id}`}
            className="inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}
