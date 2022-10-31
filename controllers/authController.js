import User from '../models/User.js'

const authController = {
  register: async (req, res, next) => {
    try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      res.status(201).json({ success: true, newUser })
    } catch (error) {
      next(error)
    }
  },
}

export default authController
