import { startTransition, useDeferredValue } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../components/ui/badge'
import { FiltersBar } from '../components/listings/filters-bar'
import { ListingCard } from '../components/listings/listing-card'
import { SectionHeading } from '../components/shared/section-heading'
import { useAppStore } from '../store/app-store'

export function BrowsePage() {
  const data = useAppStore((state) => state.data!)
  const filters = useAppStore((state) => state.filters)
  const updateFilters = useAppStore((state) => state.updateFilters)
  const resetFilters = useAppStore((state) => state.resetFilters)
  const wishlist = useAppStore((state) => state.wishlist)
  const toggleWishlist = useAppStore((state) => state.toggleWishlist)
  const deferredSearch = useDeferredValue(filters.search)

  const filteredListings = [...data.listings]
    .filter((listing) => {
      const matchesSearch =
        deferredSearch.length === 0 ||
        `${listing.title} ${listing.description} ${listing.categoryLabel}`
          .toLowerCase()
          .includes(deferredSearch.toLowerCase())
      const matchesCategory =
        filters.category === 'ALL' || listing.category === filters.category
      const matchesCondition =
        filters.condition === 'ALL' || listing.condition === filters.condition
      const matchesPrice = listing.pricePerHour <= filters.maxPrice
      const matchesCollege = !filters.sameCollegeOnly || listing.sameCollege

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCondition &&
        matchesPrice &&
        matchesCollege
      )
    })
    .sort((left, right) => {
      if (left.pricePerHour !== right.pricePerHour) {
        return left.pricePerHour - right.pricePerHour
      }

      if (left.sameCollege !== right.sameCollege) {
        return Number(right.sameCollege) - Number(left.sameCollege)
      }

      return right.lender.rating - left.lender.rating
    })

  const update = (
    next: Partial<{
      search: string
      category: string
      condition: string
      maxPrice: number
      sameCollegeOnly: boolean
    }>,
  ) => {
    startTransition(() => updateFilters(next))
  }

  return (
    <main className="shell py-10 sm:py-14">
      <section className="surface-strong overflow-hidden rounded-[36px] p-6 sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Browse rentals"
              title="Lowest price comes first, with context that makes the choice easier"
              description="Search across student-owned items, keep pricing honest with category ceilings, and stay inside the borrowing windows that matter to campus life."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {data.categories.slice(0, 3).map((category) => (
              <div
                key={category.id}
                className="rounded-[24px] bg-[color:var(--background-strong)] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {category.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-[color:var(--foreground)]">
                  ₹{category.ceiling}
                </p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  Max price per hour
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <FiltersBar
          search={filters.search}
          category={filters.category}
          condition={filters.condition}
          maxPrice={filters.maxPrice}
          sameCollegeOnly={filters.sameCollegeOnly}
          categories={data.categories}
          onUpdate={update}
          onReset={resetFilters}
        />
      </section>

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Search results
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
              {filteredListings.length} listings sorted by price
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[color:var(--mint)] text-[color:var(--teal-deep)]">
              Low to high default
            </Badge>
            {deferredSearch !== filters.search ? (
              <Badge className="bg-[color:var(--sun)] text-slate-900">
                Updating results
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {filteredListings.length === 0 ? (
            <div className="surface-strong rounded-[28px] p-8 text-center">
              <h3 className="text-2xl font-bold text-[color:var(--foreground)]">
                No listings match this filter mix yet
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                Try widening the price ceiling or swapping to another category.
                The reverse-auction list repopulates as soon as the filters relax.
              </p>
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.35 }}
              >
                <ListingCard
                  listing={listing}
                  wishlisted={wishlist.includes(listing.id)}
                  onToggleWishlist={toggleWishlist}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
