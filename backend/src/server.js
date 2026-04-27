const http = require('http')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const { Server } = require('socket.io')
const { bootstrapRouter } = require('./routes/bootstrap')
const { authRouter } = require('./routes/auth')
const { listingsRouter } = require('./routes/listings')
const { usersRouter } = require('./routes/users')

const defaultOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']
const configuredOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
  : defaultOrigins

const corsOptions = {
  origin(origin, callback) {
    if (!origin || configuredOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error(`Origin ${origin} is not allowed by CampusRent CORS`))
  },
  credentials: true,
}

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: corsOptions,
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'CampusRent API',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api', bootstrapRouter)
app.use('/api/auth', authRouter)
app.use('/api/listings', listingsRouter)
app.use('/api/users', usersRouter)

io.on('connection', (socket) => {
  socket.emit('notification', {
    id: `live-${Date.now()}`,
    type: 'LISTING_TAKEN',
    message: 'Live update: the calculator ladder just repriced after a new low-cost listing went live.',
    createdAt: new Date().toISOString(),
    isRead: false,
  })

  const cadence = [
    'Reminder queued: one borrower has 15 minutes left on an active session.',
    'New request: a hostel-side pickup opened for a maker kit tonight.',
  ]

  let index = 0
  const intervalId = setInterval(() => {
    socket.emit('notification', {
      id: `pulse-${Date.now()}`,
      type: 'RENTAL_ACTIVE',
      message: cadence[index % cadence.length],
      createdAt: new Date().toISOString(),
      isRead: false,
    })
    index += 1
  }, 25000)

  socket.on('join_room', (rentalId) => {
    socket.join(rentalId)
  })

  socket.on('send_message', (rentalId, message) => {
    io.to(rentalId).emit('new_message', {
      rentalId,
      message,
      sentAt: new Date().toISOString(),
    })
  })

  socket.on('typing', (rentalId) => {
    socket.to(rentalId).emit('user_typing', {
      rentalId,
      userId: 'u1',
    })
  })

  socket.on('rental_action', (rentalId, action) => {
    io.to(rentalId).emit('rental_updated', {
      rentalId,
      action,
      updatedAt: new Date().toISOString(),
    })
  })

  socket.on('disconnect', () => {
    clearInterval(intervalId)
  })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({
    error: 'CampusRent server error',
  })
})

const port = Number(process.env.PORT || 5000)

server.listen(port, () => {
  console.log(`CampusRent server listening on http://localhost:${port}`)
  console.log(`Allowed client origins: ${configuredOrigins.join(', ')}`)
})
