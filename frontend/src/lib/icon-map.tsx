import {
  BookOpen,
  ChartLine,
  Clock3,
  Dumbbell,
  FlaskConical,
  Laptop,
  type LucideIcon,
  Package,
  PenTool,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import type { IconName } from './types'

const iconMap: Record<IconName, LucideIcon> = {
  'flask-conical': FlaskConical,
  'pen-tool': PenTool,
  laptop: Laptop,
  'book-open': BookOpen,
  dumbbell: Dumbbell,
  wrench: Wrench,
  package: Package,
  'shield-check': ShieldCheck,
  'chart-line': ChartLine,
  'clock-3': Clock3,
}

export function resolveIcon(name: IconName) {
  return iconMap[name]
}
