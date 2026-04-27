import {
  Bell,
  CircleUserRound,
  Menu,
  MoveRight,
  Plus,
  Sparkles,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAppStore } from '../../store/app-store'
import { LivePill } from '../shared/live-pill'
import { buttonVariants } from '../ui/button-variants'
import { cn } from '../../lib/utils'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse' },
  { to: '/dashboard/lender', label: 'Lender' },
  { to: '/dashboard/borrower', label: 'Borrower' },
  { to: '/profile', label: 'Profile' },
]

export function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const notifications = useAppStore((state) => state.data?.notifications ?? [])
  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  return (
    <div className="min-h-screen">
      <div className="border-b border-[color:var(--border)] bg-white/70 backdrop-blur-xl">
        <div className="shell flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--sun)] text-slate-950">
                <Sparkles size={16} />
              </span>
              CampusRent
            </Link>
            <div className="hidden lg:block">
              <LivePill />
            </div>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium text-[color:var(--muted)] transition hover:bg-white hover:text-[color:var(--foreground)]',
                    isActive && 'bg-white text-[color:var(--foreground)] shadow-sm',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/dashboard/lender"
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              <Plus size={16} />
              List item
            </Link>
            <Link
              to="/profile"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white"
              aria-label="View profile"
            >
              <CircleUserRound size={18} />
              {unreadCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--coral)] px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              ) : null}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white lg:hidden"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen ? (
          <div className="shell pb-4 lg:hidden">
            <div className="surface-strong rounded-[24px] p-4">
              <div className="mb-4">
                <LivePill />
              </div>
              <div className="grid gap-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-[16px] px-4 py-3 text-sm font-semibold text-[color:var(--muted)]',
                        isActive && 'bg-[color:var(--mint)] text-[color:var(--foreground)]',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className={cn(buttonVariants({ size: 'default' }), 'mt-2')}
                >
                  Join campus
                  <MoveRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <Outlet />

      <footer className="border-t border-[color:var(--border)] bg-[#083833] text-white">
        <div className="shell grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="eyebrow text-[rgba(216,243,236,0.76)]">Built for campus</p>
            <h2 className="mt-3 text-3xl font-bold">Borrow smarter. Lend lighter.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[rgba(255,255,255,0.72)]">
              Reverse-auction pricing, verified student identity, and tiny
              rental windows built for labs, dorms, and deadline-week chaos.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(216,243,236,0.8)]">
              Explore
            </h3>
            <div className="mt-5 grid gap-3 text-sm text-[rgba(255,255,255,0.76)]">
              <Link to="/browse">Browse listings</Link>
              <Link to="/dashboard/lender">Lender dashboard</Link>
              <Link to="/dashboard/borrower">Borrower dashboard</Link>
              <Link to="/profile">Profile and reviews</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(216,243,236,0.8)]">
              Trust layer
            </h3>
            <div className="mt-5 grid gap-4 text-sm text-[rgba(255,255,255,0.76)]">
              <div className="flex items-center gap-3">
                <Bell size={16} />
                Auto-return reminders and payment updates
              </div>
              <div className="flex items-center gap-3">
                <Sparkles size={16} />
                College-verified accounts and peer reviews
              </div>
              <div className="flex items-center gap-3">
                <MoveRight size={16} />
                Lowest-price-first discovery on every search
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
