import authRoute from './auth.js'
import usersRoute from './users.js'
import hotelsRoute from './hotels.js'
import roomsRoute from './rooms.js'

const route = (app) => {
  app.use('/api/auth', authRoute)
  app.use('/api/users', usersRoute)
  app.use('/api/hotels', hotelsRoute)
  app.use('/api/rooms', roomsRoute)
}

export default route
