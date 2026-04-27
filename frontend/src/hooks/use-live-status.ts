import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'
import type { AppNotification } from '../lib/types'
import { useAppStore } from '../store/app-store'

export function useLiveStatus() {
  const setLiveConnected = useAppStore((state) => state.setLiveConnected)
  const addLiveNotification = useAppStore((state) => state.addLiveNotification)
  const notificationsMuted = useAppStore((state) => state.notificationsMuted)
  const socketUrl = import.meta.env.VITE_SOCKET_URL ?? window.location.origin

  useEffect(() => {
    const socket = io(socketUrl, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
    })

    socket.on('connect', () => {
      setLiveConnected(true)
    })

    socket.on('disconnect', () => {
      setLiveConnected(false)
    })

    socket.on('notification', (notification: AppNotification) => {
      addLiveNotification(notification)

      if (!notificationsMuted) {
        toast(notification.message, {
          icon: '●',
        })
      }
    })

    return () => {
      socket.disconnect()
      setLiveConnected(false)
    }
  }, [addLiveNotification, notificationsMuted, setLiveConnected, socketUrl])
}
