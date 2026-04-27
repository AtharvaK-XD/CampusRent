const { Router } = require('express')
const { store } = require('../data/mock-data')

const router = Router()

router.get('/bootstrap', (_req, res) => {
  res.json(store)
})

module.exports = {
  bootstrapRouter: router,
}
