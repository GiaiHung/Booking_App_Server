import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    hotelId: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: { type: [Date], default: [] },
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Room', RoomSchema)
