import User from '../models/User.js'

export const put = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ success: true, updatedUser })
  } catch (error) {
    next(error)
  }
}
export const get = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({ success: true, user })
  } catch (error) {
    next(error)
  }
}
export const getAll = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({ success: true, users })
  } catch (error) {
    next(error)
  }
}
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: 'Delete successfully' })
  } catch (error) {
    next(error)
  }
}
