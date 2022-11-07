import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

export const create = async (req, res, next) => {
  try {
    const newHotel = await Hotel.create(req.body)
    res.status(201).json({ success: true, newHotel })
  } catch (error) {
    next(error)
  }
}

export const put = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ success: true, updatedHotel })
  } catch (error) {
    next(error)
  }
}

export const get = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json({ success: true, hotel })
  } catch (error) {
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  const { min, max, limits, ...otherQueries } = req.query
  try {
    const hotels = await Hotel.find({
      ...otherQueries,
      cheapestPrice: { $gte: min || 1, $lte: max || 999 },
    }).limit(limits)
    res.status(200).json({ success: true, hotels })
  } catch (error) {
    next(error)
  }
}

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: 'Delete successfully' })
  } catch (error) {
    next(error)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',').map((city) => city.toLowerCase())
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city })
      })
    )
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' })
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' })
    const villaCount = await Hotel.countDocuments({ type: 'villa' })
    const resortCount = await Hotel.countDocuments({ type: 'resort' })
    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartment', count: apartmentCount },
      { type: 'cabin', count: cabinCount },
      { type: 'villa', count: villaCount },
      { type: 'resort', count: resortCount },
    ])
  } catch (error) {
    next(error)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const currentHotel = await Hotel.findById(req.params.hotelId)
    const list = await Promise.all(
      currentHotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )
    return res.status(200).json({ success: true, list })
  } catch (error) {
    next(createError(error))
  }
}
