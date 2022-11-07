import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'

export const create = async (req, res, next) => {
  try {
    const newRoom = await Room.create(req.body)
    try {
      await Hotel.findByIdAndUpdate(req.params.hotelId, { $push: { rooms: newRoom._id } })
    } catch (error) {
      next(error)
    }
    res.status(201).json({ success: true, message: 'New room is created successfully', newRoom })
  } catch (error) {
    next(error)
  }
}

export const put = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ success: true, updatedRoom })
  } catch (error) {
    next(error)
  }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      { $push: { 'roomNumbers.$.unavailableDates': req.body.dates } }
    )
    return res.status(206).json("Room is reserved successfully")
  } catch (error) {
    next(error)
  }
}

export const get = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)
    res.status(200).json({ success: true, room })
  } catch (error) {
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const rooms = await Room.find()
    res.status(200).json({ success: true, rooms })
  } catch (error) {
    next(error)
  }
}

export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id)
    try {
      await Hotel.findByIdAndUpdate(req.params.hotelId, { $pull: { rooms: req.params.id } })
    } catch (error) {
      next(error)
    }
    res.status(200).json({ success: true, message: 'Delete successfully' })
  } catch (error) {
    next(error)
  }
}
