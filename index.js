import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import connectDb from './config/connectDb.js'
import route from './routes/index.js'

dotenv.config()

const app = express()
const PORT = 5000

connectDb()

route(app)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
})
