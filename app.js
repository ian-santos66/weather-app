import 'dotenv/config'
import express from 'express'
import {connectToDatabase} from '../WeatherApp/database/db.js'
const PORT = process.env.PORT || 3030
const app = express()
app.use(express.json())

app.get('/weather', async (req, res) => {
    const apiKey = process.env.WEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Douradina&appid=${apiKey}&units=metric`

    const response = await fetch(url)

    if (!url.ok) {
        console.log('fdeu erro')
    }

    const data = await response.json()
    res.status(200).json({success: true, data: data.main.temp})
})

app.listen(PORT, async () => {
    console.log(`is running on port ${PORT}`)
    await connectToDatabase()
})