import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import weatherRouter from '../WeatherApp/routes/weather.routes.js'
import authRouter from '../WeatherApp/routes/auth.routes.js'
import userRouter from '../WeatherApp/routes/user.routes.js'
import {connectToDatabase} from '../WeatherApp/database/db.js'

const PORT = process.env.PORT || 3030
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/v1', authRouter)
app.use('/v1', weatherRouter)
app.use('/v1', userRouter)

app.listen(PORT, async () => {
    console.log(`is running on port ${PORT}`)
    await connectToDatabase()
})
