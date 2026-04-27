import { Radio } from 'lucide-react'
import { useAppStore } from '../../store/app-store'

export function LivePill() {
  const liveConnected = useAppStore((state) => state.liveConnected)

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/70 px-3 py-2 text-xs font-semibold text-white">
      <Radio
        size={14}
        className={liveConnected ? 'text-emerald-300' : 'text-orange-300'}
      />
      {liveConnected ? 'Live campus updates' : 'Reconnecting live updates'}
    </span>
  )
}
