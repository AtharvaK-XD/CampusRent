import { create } from 'zustand'
import type { AppNotification, BootstrapData } from '../lib/types'

type Filters = {
  search: string
  category: string
  condition: string
  maxPrice: number
  sameCollegeOnly: boolean
}

type AppStore = {
  data: BootstrapData | null
  status: 'idle' | 'loading' | 'ready' | 'error'
  error: string | null
  wishlist: string[]
  filters: Filters
  notificationsMuted: boolean
  liveConnected: boolean
  setData: (data: BootstrapData) => void
  setStatus: (status: AppStore['status'], error?: string | null) => void
  updateFilters: (next: Partial<Filters>) => void
  resetFilters: () => void
  toggleWishlist: (listingId: string) => void
  markNotificationRead: (notificationId: string) => void
  addLiveNotification: (notification: AppNotification) => void
  setNotificationsMuted: (value: boolean) => void
  setLiveConnected: (value: boolean) => void
}

const defaultFilters: Filters = {
  search: '',
  category: 'ALL',
  condition: 'ALL',
  maxPrice: 20,
  sameCollegeOnly: false,
}

export const useAppStore = create<AppStore>((set) => ({
  data: null,
  status: 'idle',
  error: null,
  wishlist: [],
  filters: defaultFilters,
  notificationsMuted: false,
  liveConnected: false,
  setData: (data) =>
    set((state) => ({
      data,
      status: 'ready',
      error: null,
      wishlist: state.wishlist.length > 0 ? state.wishlist : data.user.wishlist,
    })),
  setStatus: (status, error = null) => set({ status, error }),
  updateFilters: (next) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...next,
      },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  toggleWishlist: (listingId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(listingId)
        ? state.wishlist.filter((item) => item !== listingId)
        : [listingId, ...state.wishlist],
    })),
  markNotificationRead: (notificationId) =>
    set((state) => {
      if (!state.data) {
        return state
      }

      return {
        data: {
          ...state.data,
          notifications: state.data.notifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, isRead: true }
              : notification,
          ),
        },
      }
    }),
  addLiveNotification: (notification) =>
    set((state) => {
      if (!state.data) {
        return state
      }

      return {
        data: {
          ...state.data,
          notifications: [notification, ...state.data.notifications].slice(0, 8),
        },
      }
    }),
  setNotificationsMuted: (value) => set({ notificationsMuted: value }),
  setLiveConnected: (value) => set({ liveConnected: value }),
}))
