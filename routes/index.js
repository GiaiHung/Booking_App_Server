import authRoute from './auth.js'
import usersRoute from './users.js'
import hotelsRoute from './hotels.js'
import roomsRoute from './rooms.js'

const route = (app) => {
  app.use('/api/auth', authRoute)
  app.use('/api/users', usersRoute)
  app.use('/api/hotels', hotelsRoute)
  app.use('/api/rooms', roomsRoute)

  // Test when deployed
  app.use('/', (req, res) => {
    res.send('This is our main server')
  })

  // Middleware handle error
  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: err.message || 'Internal server error',
      stack: err.stack,
    })
  })
}

export default route
