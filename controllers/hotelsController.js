import Hotel from '../models/Hotel.js'

const hotelsController = {
  create: async (req, res, next) => {
    try {
      const newHotel = await Hotel.create(req.body)
      res.status(201).json({ success: true, newHotel })
    } catch (error) {
      next(error)
    }
  },
  put: async (req, res, next) => {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json({ success: true, updatedHotel })
    } catch (error) {
      next(error)
    }
  },
  get: async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id)
      res.status(200).json({ success: true, hotel })
    } catch (error) {
      next(error)
    }
  },
  getAll: async (req, res, next) => {
    try {
      const hotels = await Hotel.find()
      res.status(200).json({ success: true, hotels })
    } catch (error) {
      next(error)
    }
  },
  delete: async (req, res, next) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id)
      res.status(200).json({ success: true, message: "Delete successfully" })
    } catch (error) {
      next(error)
    }
  },
}

export default hotelsController
