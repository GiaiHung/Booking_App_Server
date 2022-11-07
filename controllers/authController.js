import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import { createError } from '../utils/error.js'

export const register = async (req, res, next) => {
  if (!req.body.username || !req.body.password)
    return next(createError(500, 'Please fill in username and/or password'))
  const foundUser = await User.findOne({ username: req.body.username }).exec()
  if (foundUser) {
    return next(createError(400, 'User already exists'))
  }
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)
  try {
    const newUser = await User.create({
      ...req.body,
      password: hash,
    })
    res.status(201).json({ success: true, newUser })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password)
      return next(createError(405, 'Please fill in username and/or password'))

    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, 'Sorry, we cant find user'))

    const { password, ...other } = user._doc

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (isPasswordCorrect) {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET
      )
      return res
        .status(200)
        .json({ success: true, message: 'Logged in successfully', user: { ...other, accessToken } })
    } else return next(createError(401, 'Password is incorrect'))
  } catch (error) {
    next(error)
  }
}
