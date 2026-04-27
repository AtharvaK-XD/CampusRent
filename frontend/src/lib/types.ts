export type CategoryId =
  | 'LAB_INSTRUMENTS'
  | 'STATIONERY'
  | 'ELECTRONICS'
  | 'BOOKS'
  | 'SPORTS'
  | 'TOOLS'
  | 'OTHER'

export type Condition = 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR'

export type IconName =
  | 'flask-conical'
  | 'pen-tool'
  | 'laptop'
  | 'book-open'
  | 'dumbbell'
  | 'wrench'
  | 'package'
  | 'shield-check'
  | 'chart-line'
  | 'clock-3'

export interface Category {
  id: CategoryId
  label: string
  ceiling: number
  description: string
  icon: IconName
  examples: string[]
}

export interface Listing {
  id: string
  title: string
  description: string
  category: CategoryId
  categoryLabel: string
  condition: Condition
  pricePerHour: number
  priceCeiling: number
  location: string
  collegeName: string
  distanceKm: number
  deposit: number
  availableFrom: string
  availableTo: string
  images: string[]
  tags: string[]
  hoursBooked: number
  rank: number
  pickupNote: string
  sameCollege: boolean
  ownedByUser: boolean
  lender: {
    id: string
    name: string
    rating: number
    avatar: string
    verified: boolean
  }
}

export interface UserProfile {
  id: string
  name: string
  collegeName: string
  department: string
  year: number
  avatar: string
  roleLabel: string
  rating: number
  totalRentals: number
  verified: boolean
  walletBalance: number
  wishlist: string[]
}

export interface Stat {
  label: string
  value: string
  detail: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  avatar: string
}

export interface Rental {
  id: string
  listingId: string
  listingTitle: string
  categoryLabel: string
  image: string
  startTime: string
  endTime: string
  durationHours: number
  totalAmount: number
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED'
  pickupLocation: string
}

export interface RentalRequest {
  id: string
  listingTitle: string
  borrowerName: string
  borrowerCourse: string
  requestedStart: string
  requestedEnd: string
  offeredAmount: number
}

export interface AppNotification {
  id: string
  type: string
  message: string
  createdAt: string
  isRead: boolean
}

export interface Review {
  id: string
  name: string
  rating: number
  role: string
  comment: string
}

export interface LeaderboardEntry {
  id: string
  name: string
  collegeName: string
  specialty: string
  earnings: number
}

export interface ChatThread {
  rentalId: string
  peerName: string
  peerRole: string
  lastMessage: string
  unreadCount: number
  lastActive: string
}

export interface EarningsSnapshot {
  weekTotal: number
  monthTotal: number
  pendingPayout: number
  utilizationRate: number
  series: Array<{
    label: string
    earnings: number
    rentals: number
  }>
}

export interface HeroContent {
  image: string
  headline: string
  subheadline: string
}

export interface BootstrapData {
  hero: HeroContent
  stats: Stat[]
  categories: Category[]
  listings: Listing[]
  testimonials: Testimonial[]
  user: UserProfile
  notifications: AppNotification[]
  rentalRequests: RentalRequest[]
  rentals: Rental[]
  reviews: Review[]
  leaderboard: LeaderboardEntry[]
  chatThreads: ChatThread[]
  earnings: EarningsSnapshot
}
