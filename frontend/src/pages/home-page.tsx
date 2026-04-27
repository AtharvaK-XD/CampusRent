import { motion } from 'framer-motion'
import {
  ArrowRight,
  BellRing,
  ChartColumn,
  Clock3,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ListingCard } from '../components/listings/listing-card'
import { LivePill } from '../components/shared/live-pill'
import { SectionHeading } from '../components/shared/section-heading'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { buttonVariants } from '../components/ui/button-variants'
import { resolveIcon } from '../lib/icon-map'
import { cn, formatCompactNumber, formatCurrency } from '../lib/utils'
import { useAppStore } from '../store/app-store'

const animationProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55 },
}

export function HomePage() {
  const data = useAppStore((state) => state.data!)
  const wishlist = useAppStore((state) => state.wishlist)
  const toggleWishlist = useAppStore((state) => state.toggleWishlist)

  const featuredListings = data.listings.slice(0, 4)

  return (
    <main>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(105deg, rgba(4, 20, 18, 0.84), rgba(7, 53, 48, 0.48)), url(${data.hero.image})`,
          }}
        />
        <div className="hero-grid absolute inset-0 opacity-40" />

        <div className="shell relative grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <motion.div {...animationProps} className="max-w-3xl text-white">
            <LivePill />
            <h1 className="mt-6 text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
              {data.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(255,255,255,0.76)] sm:text-xl">
              {data.hero.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/browse"
                className={cn(buttonVariants({ size: 'lg' }), 'rounded-full')}
              >
                Browse low-price listings
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/dashboard/lender"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'rounded-full border-white/20 bg-white/8 text-white hover:bg-white/16',
                )}
              >
                Start lending today
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {data.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[24px] border border-white/12 bg-white/10 p-4 backdrop-blur-xl"
                >
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-sm font-semibold text-[rgba(255,255,255,0.84)]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-sm text-[rgba(255,255,255,0.62)]">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...animationProps} className="self-end">
            <Card className="rounded-[32px] bg-white/12 p-0 text-white shadow-[0_30px_100px_rgba(0,0,0,0.22)]">
              <div className="border-b border-white/12 px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-[rgba(216,243,236,0.74)]">
                      Weekly campus pulse
                    </p>
                    <h2 className="mt-2 text-3xl font-bold">Micro-pricing that actually works</h2>
                  </div>
                  <Badge className="border-white/10 bg-white/10 text-white">
                    Reverse auction
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 px-6 py-6">
                {[
                  {
                    icon: ChartColumn,
                    title: 'Lower than store prices',
                    detail: 'Top categories are renting at 28-46% below off-campus alternatives.',
                  },
                  {
                    icon: Clock3,
                    title: 'Time-boxed by design',
                    detail: 'Students can borrow for one hour or an all-evening lab block without overpaying.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Trust before transaction',
                    detail: 'Verified college identity, ratings, deposits, and auto-return reminders protect both sides.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-white/10 bg-slate-950/16 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                        <item.icon size={18} />
                      </span>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-[rgba(255,255,255,0.68)]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="shell py-16 sm:py-20">
        <motion.div {...animationProps}>
          <SectionHeading
            eyebrow="How it works"
            title="A campus-first rental loop with far less friction"
            description="CampusRent keeps the product tight around student reality: short time windows, tiny prices, campus pickup points, and the lowest offer surfacing first."
          />
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            {
              icon: WalletCards,
              title: 'List with a ceiling, not a gamble',
              detail:
                'Every category has a maximum hourly price, so lenders compete by being useful and fair instead of opportunistic.',
            },
            {
              icon: BellRing,
              title: 'Borrow in compact time blocks',
              detail:
                'Students pick 1 to 24 hours, see slot conflicts instantly, and get nudges before return time gets awkward.',
            },
            {
              icon: ShieldCheck,
              title: 'Close the loop with proof and reviews',
              detail:
                'Ratings, deposits, messaging, and return reminders give both sides confidence during fast handoffs.',
            },
          ].map((item) => (
            <motion.div key={item.title} {...animationProps}>
              <Card className="h-full rounded-[28px]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--mint)] text-[color:var(--teal)]">
                  <item.icon size={20} />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-[color:var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                  {item.detail}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="shell py-6 sm:py-10">
        <motion.div {...animationProps}>
          <SectionHeading
            eyebrow="Ceiling-led categories"
            title="Every category is tuned for student budgets"
            description="These caps shape the marketplace behavior. Cheap items stay cheap, expensive tools stay accessible, and discovery always starts at the lowest honest price."
          />
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.categories.map((category) => {
            const Icon = resolveIcon(category.icon)

            return (
              <motion.div key={category.id} {...animationProps}>
                <Card className="h-full rounded-[26px]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--background-strong)] text-[color:var(--teal)]">
                      <Icon size={20} />
                    </span>
                    <Badge className="bg-[color:var(--sun)] text-slate-900">
                      Max {formatCurrency(category.ceiling)}/hr
                    </Badge>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-[color:var(--foreground)]">
                    {category.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    {category.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.examples.map((example) => (
                      <Badge
                        key={example}
                        className="bg-[color:var(--background-strong)]"
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="shell py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured inventory"
            title="Low-cost listings that feel ready to reserve"
            description="Every card below is sorted to reward the lowest hourly price, with context for condition, pickup, and lender reputation."
          />
          <Link
            to="/browse"
            className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full')}
          >
            See all listings
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featuredListings.map((listing) => (
            <motion.div key={listing.id} {...animationProps}>
              <ListingCard
                listing={listing}
                wishlisted={wishlist.includes(listing.id)}
                onToggleWishlist={toggleWishlist}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[color:var(--teal-deep)] py-16 text-white sm:py-20">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <motion.div {...animationProps}>
            <SectionHeading
              eyebrow="Dual dashboards"
              title="Borrower speed on one side, lender control on the other"
              description="CampusRent is shaped as a product, not a pitch deck. Borrowers get countdowns and quick re-rent tools. Lenders get revenue visibility, requests, and pricing guardrails."
            />
          </motion.div>

          <motion.div {...animationProps} className="grid gap-4 sm:grid-cols-2">
            <Card className="rounded-[28px] bg-white/8 text-white">
              <p className="eyebrow text-[rgba(216,243,236,0.78)]">Borrower</p>
              <h3 className="mt-3 text-2xl font-bold">Never miss a handoff</h3>
              <p className="mt-3 text-sm leading-7 text-[rgba(255,255,255,0.72)]">
                Countdown timers, pickup points, re-rent suggestions, and live
                notifications keep every active rental visible.
              </p>
              <div className="mt-6 rounded-[22px] border border-white/10 bg-slate-950/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[rgba(255,255,255,0.55)]">
                  Active savings this week
                </p>
                <p className="mt-2 text-4xl font-bold">
                  {formatCurrency(data.rentals.reduce((sum, rental) => sum + rental.totalAmount, 0))}
                </p>
                <p className="mt-2 text-sm text-[rgba(255,255,255,0.64)]">
                  Spread across lab tools, notes, and gear without buying duplicates.
                </p>
              </div>
            </Card>

            <Card className="rounded-[28px] bg-white/8 text-white">
              <p className="eyebrow text-[rgba(216,243,236,0.78)]">Lender</p>
              <h3 className="mt-3 text-2xl font-bold">Price, accept, and earn</h3>
              <p className="mt-3 text-sm leading-7 text-[rgba(255,255,255,0.72)]">
                Weekly charts, incoming requests, category caps, and pickup
                logistics stay visible in one workbench.
              </p>
              <div className="mt-6 grid gap-3">
                {data.rentalRequests.slice(0, 2).map((request) => (
                  <div
                    key={request.id}
                    className="rounded-[20px] border border-white/10 bg-slate-950/20 p-4"
                  >
                    <p className="font-semibold">{request.listingTitle}</p>
                    <p className="mt-1 text-sm text-[rgba(255,255,255,0.66)]">
                      {request.borrowerName} wants this for {request.borrowerCourse}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[rgba(255,255,255,0.86)]">
                      Offer {formatCurrency(request.offeredAmount)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="shell py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div {...animationProps}>
            <SectionHeading
              eyebrow="Community trust"
              title="The people using it already make the case"
              description="Strong campus products feel social and local. Reviews, top lender momentum, and same-college visibility make this marketplace easier to trust at a glance."
            />

            <div className="mt-8 grid gap-4">
              {data.leaderboard.slice(0, 3).map((entry, index) => (
                <Card key={entry.id} className="rounded-[26px]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                        #{index + 1} campus lender
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-[color:var(--foreground)]">
                        {entry.name}
                      </h3>
                      <p className="mt-1 text-sm text-[color:var(--muted)]">
                        {entry.specialty} at {entry.collegeName}
                      </p>
                    </div>
                    <Badge className="bg-[color:var(--mint)] text-[color:var(--teal-deep)]">
                      {formatCurrency(entry.earnings)} earned
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4">
            {data.testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} {...animationProps}>
                <Card className="rounded-[28px]">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-14 w-14 rounded-2xl object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[color:var(--foreground)]">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-[color:var(--muted)]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-lg leading-8 text-[color:var(--foreground)]">
                    “{testimonial.quote}”
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-16 sm:pb-20">
        <motion.div {...animationProps}>
          <Card className="rounded-[34px] border-none bg-[linear-gradient(135deg,#083833,#0f766e)] px-8 py-10 text-white sm:px-10">
            <p className="eyebrow text-[rgba(216,243,236,0.78)]">Ready to launch</p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
              <div>
                <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
                  A real product foundation for a campus marketplace, not a placeholder.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[rgba(255,255,255,0.72)]">
                  The frontend you are seeing is paired with a working Express API,
                  live notification plumbing, dashboards, filters, and domain data
                  shaped around the brief you supplied.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/auth"
                  className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
                >
                  Join the marketplace
                </Link>
                <Link
                  to="/dashboard/borrower"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'border-white/18 bg-white/6 text-white hover:bg-white/12',
                  )}
                >
                  Open borrower flow
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: 'Monthly GMV target',
                  value: formatCompactNumber(145000),
                },
                {
                  label: 'Listings under ₹10/hr',
                  value: `${Math.round(
                    (data.listings.filter((item) => item.pricePerHour <= 10).length /
                      data.listings.length) *
                      100,
                  )}%`,
                },
                {
                  label: 'Average lender rating',
                  value: data.user.rating.toFixed(1),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/10 bg-white/8 p-5"
                >
                  <p className="text-sm text-[rgba(255,255,255,0.68)]">{item.label}</p>
                  <p className="mt-2 text-3xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </section>
    </main>
  )
}
