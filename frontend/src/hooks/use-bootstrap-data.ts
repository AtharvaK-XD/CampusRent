import { useEffect } from 'react'
import { api } from '../lib/api'
import type { BootstrapData } from '../lib/types'
import { useAppStore } from '../store/app-store'

export function useBootstrapData() {
  const data = useAppStore((state) => state.data)
  const status = useAppStore((state) => state.status)
  const error = useAppStore((state) => state.error)
  const setData = useAppStore((state) => state.setData)
  const setStatus = useAppStore((state) => state.setStatus)

  useEffect(() => {
    if (data || status === 'loading' || status === 'ready') {
      return
    }

    setStatus('loading')

    api
      .get<BootstrapData>('/api/bootstrap')
      .then((response) => {
        setData(response.data)
      })
      .catch(() => {
        setStatus(
          'error',
          'CampusRent could not load its demo marketplace right now.',
        )
      })
  }, [data, setData, setStatus, status])

  return {
    data,
    status,
    error,
    retry: () => setStatus('idle'),
  }
}
