import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import { createError } from '../utils/error.js'

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
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

    const { password, isAdmin, ...other } = user._doc

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET
      )
      res.cookie('access_token', token, {
        httpOnly: true,
      })
      return res.status(200).json({ success: true, message: 'Logged in successfully', ...other })
    } else return next(createError(401, 'Password is incorrect'))
  } catch (error) {
    next(error)
  }
}
