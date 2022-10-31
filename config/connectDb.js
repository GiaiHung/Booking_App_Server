import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bookingapp.eonadds.mongodb.net/?retryWrites=true&w=majority`
    )
  } catch (error) {
    console.log(error)
  }
}

export default connectDb
