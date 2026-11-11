import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import weatherRouter from './routes/weather.routes.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import {connectToDatabase} from './database/db.js'

const PORT = process.env.PORT || 3030
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/v1', authRouter)
app.use('/v1', weatherRouter)
app.use('/v1', userRouter)

const startServer = async () => {
    await connectToDatabase()

    app.listen(PORT, () => {
        console.log(`is running on port ${PORT}`)
    })
}

startServer()
