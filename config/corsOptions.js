// Cross Origin Resource Sharing
import allowedOrigins from './allowedOrigins.js'

const corsOptionsDelegate = function (req, callback) {
  let corsOptions
  if (allowedOrigins.indexOf(req.header('Origin') !== -1)) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

export default corsOptionsDelegate
