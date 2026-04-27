import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatDateRange(startAt: string, endAt: string) {
  const start = new Date(startAt)
  const end = new Date(endAt)

  return `${start.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })}, ${start.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  })} - ${end.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  })}`
}

export function getCountdownParts(endAt: string) {
  const remainingMs = Math.max(new Date(endAt).getTime() - Date.now(), 0)
  const totalSeconds = Math.floor(remainingMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { totalSeconds, hours, minutes, seconds }
}

export function humanTimeAgo(timestamp: string) {
  const elapsed = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.round(elapsed / 60000)

  if (minutes < 60) {
    return `${minutes}m ago`
  }

  const hours = Math.round(minutes / 60)
  if (hours < 24) {
    return `${hours}h ago`
  }

  const days = Math.round(hours / 24)
  return `${days}d ago`
}
