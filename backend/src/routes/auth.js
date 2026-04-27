const { Router } = require('express')
const { z } = require('zod')
const { store } = require('../data/mock-data')

const router = Router()

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

const registerSchema = z.object({
  name: z.string().min(2),
  collegeEmail: z.email(),
  password: z.string().min(8),
  collegeName: z.string().min(2),
  department: z.string().min(2),
  year: z.coerce.number().min(1).max(5),
})

router.post('/login', (req, res) => {
  const result = loginSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({ error: 'Invalid login payload' })
  }

  res.json({
    message: 'Login successful',
    accessToken: 'demo-access-token',
    user: store.user,
  })
})

router.post('/register', (req, res) => {
  const result = registerSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({ error: 'Invalid registration payload' })
  }

  res.status(201).json({
    message: 'Registration successful',
    nextStep: 'verify-email',
    user: {
      ...store.user,
      name: result.data.name,
      collegeName: result.data.collegeName,
      department: result.data.department,
      year: result.data.year,
    },
  })
})

module.exports = {
  authRouter: router,
}
