import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const accessToken = authHeader && authHeader.split(' ')[1]
  if (!accessToken) return res.status(401).json({ message: 'Token not found' })

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return next(createError(403, 'Token is not valid'))
    req.user = user
    next()
  })
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      return next(createError(403, 'You are not authorized'))
    }
  })
}

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      return next(createError(403, 'You are not authorized'))
    }
  })
}
