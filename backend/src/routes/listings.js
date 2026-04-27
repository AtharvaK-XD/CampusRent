const { Router } = require('express')
const { store } = require('../data/mock-data')

const router = Router()

router.get('/categories', (_req, res) => {
  res.json(store.categories)
})

router.get('/', (req, res) => {
  const { q = '', category = 'ALL', condition = 'ALL', maxPrice = '20' } = req.query
  const max = Number(maxPrice)

  const listings = store.listings
    .filter((listing) => {
      const matchesSearch =
        q.length === 0 ||
        `${listing.title} ${listing.description} ${listing.categoryLabel}`
          .toLowerCase()
          .includes(String(q).toLowerCase())
      const matchesCategory = category === 'ALL' || listing.category === category
      const matchesCondition = condition === 'ALL' || listing.condition === condition
      const matchesPrice = Number.isNaN(max) ? true : listing.pricePerHour <= max

      return matchesSearch && matchesCategory && matchesCondition && matchesPrice
    })
    .sort((left, right) => left.pricePerHour - right.pricePerHour)

  res.json(listings)
})

router.get('/:id', (req, res) => {
  const listing = store.listings.find((item) => item.id === req.params.id)

  if (!listing) {
    return res.status(404).json({ error: 'Listing not found' })
  }

  const similar = store.listings.filter(
    (item) => item.category === listing.category && item.id !== listing.id,
  )

  res.json({
    listing,
    similar,
  })
})

module.exports = {
  listingsRouter: router,
}
