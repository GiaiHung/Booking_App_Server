import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import connectDb from './config/connectDb.js'
import route from './routes/index.js'

dotenv.config()

const app = express()
const PORT = 5000

connectDb()

// Middleware
app.use(cookieParser())
app.use(express.json())

route(app)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
})
