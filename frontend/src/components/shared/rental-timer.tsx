import { useEffect, useState } from 'react'
import { Clock3 } from 'lucide-react'
import { getCountdownParts } from '../../lib/utils'

type RentalTimerProps = {
  endAt: string
}

export function RentalTimer({ endAt }: RentalTimerProps) {
  const [countdown, setCountdown] = useState(() => getCountdownParts(endAt))

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownParts(endAt))
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [endAt])

  if (countdown.totalSeconds === 0) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,143,102,0.14)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)]">
        <Clock3 size={14} />
        Return window reached
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,118,110,0.12)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)]">
      <Clock3 size={14} />
      {countdown.hours}h {String(countdown.minutes).padStart(2, '0')}m{' '}
      {String(countdown.seconds).padStart(2, '0')}s left
    </span>
  )
}
