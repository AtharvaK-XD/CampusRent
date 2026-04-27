const { Router } = require('express')
const { store } = require('../data/mock-data')

const router = Router()

router.get('/me', (_req, res) => {
  res.json(store.user)
})

router.get('/me/listings', (_req, res) => {
  res.json(store.listings.filter((listing) => listing.ownedByUser))
})

router.get('/me/rentals', (_req, res) => {
  res.json(store.rentals)
})

router.get('/me/notifications', (_req, res) => {
  res.json(store.notifications)
})

router.put('/me/notifications/:id/read', (req, res) => {
  const notification = store.notifications.find((item) => item.id === req.params.id)

  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' })
  }

  notification.isRead = true

  res.json(notification)
})

module.exports = {
  usersRouter: router,
}
