import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDb from './config/connectDb.js'
import route from './routes/index.js'
import corsOptionsDelegate from './config/corsOptions.js'
import credentials from './config/credentials.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDb()

// Middleware
app.use(credentials)
app.use(cors(corsOptionsDelegate))
app.use(cookieParser())
app.use(express.json())

route(app)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
})
