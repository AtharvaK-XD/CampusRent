import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowRight, IndianRupee, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { SectionHeading } from '../components/shared/section-heading'
import { formatCurrency, formatDateRange } from '../lib/utils'
import { useAppStore } from '../store/app-store'

export function LenderDashboardPage() {
  const data = useAppStore((state) => state.data!)
  const ownedListings = data.listings.filter((listing) => listing.ownedByUser)
  const categoryCeilings = Object.fromEntries(
    data.categories.map((category) => [category.id, category.ceiling]),
  )

  const listingSchema = z
    .object({
      title: z.string().min(3, 'Give the listing a clear title'),
      category: z.string().min(1, 'Choose a category'),
      pricePerHour: z.number().min(1, 'Start at least at ₹1/hr'),
      condition: z.string().min(1, 'Choose item condition'),
      location: z.string().min(3, 'Add a pickup point'),
    })
    .superRefine((values, context) => {
      const ceiling = categoryCeilings[values.category] ?? 20

      if (values.pricePerHour > ceiling) {
        context.addIssue({
          code: 'custom',
          path: ['pricePerHour'],
          message: `This category caps at ₹${ceiling}/hr`,
        })
      }
    })

  type ListingFormInput = z.input<typeof listingSchema>
  type ListingFormValues = z.output<typeof listingSchema>

  const form = useForm<ListingFormInput, unknown, ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      category: 'LAB_INSTRUMENTS',
      pricePerHour: 8,
      condition: 'GOOD',
      location: '',
    },
  })

  const submitListing: SubmitHandler<ListingFormValues> = (values) => {
    toast.success(
      `${values.title} is ready for moderation with a ${formatCurrency(values.pricePerHour)}/hr price tag.`,
    )
    form.reset({
      title: '',
      category: values.category,
      pricePerHour: values.pricePerHour,
      condition: values.condition,
      location: '',
    })
  }

  return (
    <main className="shell py-10 sm:py-14">
      <section className="surface-strong rounded-[36px] p-6 sm:p-8">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Lender cockpit"
              title="Operate your campus inventory with pricing guardrails built in"
              description="This dashboard leans into the brief: live requests, earnings visibility, campus pickup notes, and category-aware price enforcement."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: 'Week earnings',
                  value: formatCurrency(data.earnings.weekTotal),
                },
                {
                  label: 'Month earnings',
                  value: formatCurrency(data.earnings.monthTotal),
                },
                {
                  label: 'Pending payout',
                  value: formatCurrency(data.earnings.pendingPayout),
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

          <Card className="rounded-[32px] bg-[#062b27] text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow text-[rgba(216,243,236,0.8)]">Revenue flow</p>
                <h2 className="mt-2 text-3xl font-bold">Weekly earnings curve</h2>
              </div>
              <Badge className="gap-2 border-white/10 bg-white/10 text-white">
                <IndianRupee size={14} />
                {data.earnings.utilizationRate}% utilization
              </Badge>
            </div>

            <div className="mt-6 min-h-[290px] min-w-0">
              <ResponsiveContainer width="100%" height={290}>
                <AreaChart data={data.earnings.series}>
                  <defs>
                    <linearGradient id="earningsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6ee7b7" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#6ee7b7" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="rgba(255,255,255,0.6)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.6)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#082f2a',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16,
                      color: '#fff',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="#6ee7b7"
                    strokeWidth={3}
                    fill="url(#earningsFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[34px]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Create listing</p>
              <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
                Add a new campus rental
              </h2>
            </div>
            <Badge className="bg-[color:var(--sun)] text-slate-900">
              Max ₹20/hr platform cap
            </Badge>
          </div>

          <form className="mt-8 grid gap-4" onSubmit={form.handleSubmit(submitListing)}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                Item title
              </label>
              <Input {...form.register('title')} placeholder="Oscilloscope starter kit" />
              {form.formState.errors.title ? (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.title.message}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                  Category
                </label>
                <select
                  className="h-12 w-full rounded-[14px] border bg-white px-4 text-sm outline-none"
                  {...form.register('category')}
                >
                  {data.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                  Pickup point
                </label>
                <Input {...form.register('location')} placeholder="Library gate" />
                {form.formState.errors.location ? (
                  <p className="mt-2 text-sm text-red-600">
                    {form.formState.errors.location.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                  Price per hour
                </label>
                <Input
                  type="number"
                  min={1}
                  max={20}
                  {...form.register('pricePerHour', { valueAsNumber: true })}
                />
                {form.formState.errors.pricePerHour ? (
                  <p className="mt-2 text-sm text-red-600">
                    {form.formState.errors.pricePerHour.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                  Condition
                </label>
                <select
                  className="h-12 w-full rounded-[14px] border bg-white px-4 text-sm outline-none"
                  {...form.register('condition')}
                >
                  <option value="NEW">New</option>
                  <option value="LIKE_NEW">Like new</option>
                  <option value="GOOD">Good</option>
                  <option value="FAIR">Fair</option>
                </select>
              </div>
            </div>

            <Button className="mt-2 rounded-full" type="submit">
              Publish demo listing
              <ArrowRight size={16} />
            </Button>
          </form>
        </Card>

        <div className="grid gap-8">
          <Card className="rounded-[34px]">
            <p className="eyebrow">Incoming requests</p>
            <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
              Respond before another cheaper slot wins
            </h2>

            <div className="mt-6 grid gap-4">
              {data.rentalRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-[24px] border bg-white/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[color:var(--foreground)]">
                        {request.listingTitle}
                      </h3>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
                        {request.borrowerName} · {request.borrowerCourse}
                      </p>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
                        {formatDateRange(request.requestedStart, request.requestedEnd)}
                      </p>
                    </div>
                    <Badge className="bg-[color:var(--mint)] text-[color:var(--teal-deep)]">
                      Offer {formatCurrency(request.offeredAmount)}
                    </Badge>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={() =>
                        toast.success(`Confirmed ${request.listingTitle} for ${request.borrowerName}.`)
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() =>
                        toast('Request declined and the slot reopened.')
                      }
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Your inventory</p>
                <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
                  Live listings
                </h2>
              </div>
              <Badge className="gap-2 bg-[color:var(--background-strong)]">
                <Sparkles size={14} />
                {ownedListings.length} active
              </Badge>
            </div>

            <div className="mt-6 grid gap-4">
              {ownedListings.map((listing) => (
                <div
                  key={listing.id}
                  className="grid gap-4 rounded-[24px] border bg-white/80 p-4 sm:grid-cols-[96px_1fr]"
                >
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="aspect-square h-24 w-full rounded-[18px] object-cover"
                  />
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[color:var(--foreground)]">
                        {listing.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                        {listing.location} · {listing.categoryLabel}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[color:var(--teal-deep)]">
                        {formatCurrency(listing.pricePerHour)}
                      </p>
                      <p className="text-sm text-[color:var(--muted)]">per hour</p>
                    </div>
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
