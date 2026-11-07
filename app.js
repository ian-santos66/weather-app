import 'dotenv/config'
import express from 'express'
import {connectToDatabase} from '../WeatherApp/database/db.js'
const PORT = process.env.PORT || 3030
const app = express()
app.use(express.json())

app.listen(PORT, async () => {
    console.log(`is running on port ${PORT}`)
    await connectToDatabase()
})