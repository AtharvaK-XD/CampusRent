import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import type { Category } from '../../lib/types'

type FiltersBarProps = {
  search: string
  category: string
  condition: string
  maxPrice: number
  sameCollegeOnly: boolean
  categories: Category[]
  onUpdate: (
    next: Partial<{
      search: string
      category: string
      condition: string
      maxPrice: number
      sameCollegeOnly: boolean
    }>,
  ) => void
  onReset: () => void
}

export function FiltersBar({
  search,
  category,
  condition,
  maxPrice,
  sameCollegeOnly,
  categories,
  onUpdate,
  onReset,
}: FiltersBarProps) {
  return (
    <div className="surface-strong rounded-[28px] p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="relative block">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--muted)]"
            />
            <Input
              value={search}
              placeholder="Search calculators, lab kits, books, gadgets..."
              className="pl-11"
              onChange={(event) => onUpdate({ search: event.target.value })}
            />
          </label>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-[color:var(--background-strong)] px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] md:flex">
          <SlidersHorizontal size={16} />
          Filters
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <select
          value={category}
          className="h-12 rounded-[14px] border bg-white/90 px-4 text-sm outline-none"
          onChange={(event) => onUpdate({ category: event.target.value })}
        >
          <option value="ALL">All categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={condition}
          className="h-12 rounded-[14px] border bg-white/90 px-4 text-sm outline-none"
          onChange={(event) => onUpdate({ condition: event.target.value })}
        >
          <option value="ALL">Any condition</option>
          <option value="NEW">New</option>
          <option value="LIKE_NEW">Like new</option>
          <option value="GOOD">Good</option>
          <option value="FAIR">Fair</option>
        </select>

        <label className="rounded-[14px] border bg-white/90 px-4 py-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
            <span>Max price</span>
            <span>₹{maxPrice}/hr</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            value={maxPrice}
            className="mt-2 w-full accent-[color:var(--teal)]"
            onChange={(event) =>
              onUpdate({ maxPrice: Number(event.target.value) })
            }
          />
        </label>

        <label className="flex items-center justify-between rounded-[14px] border bg-white/90 px-4 py-3 text-sm font-medium text-[color:var(--foreground)]">
          Same college only
          <input
            type="checkbox"
            checked={sameCollegeOnly}
            onChange={(event) =>
              onUpdate({ sameCollegeOnly: event.target.checked })
            }
            className="h-4 w-4 accent-[color:var(--teal)]"
          />
        </label>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </div>
  )
}
