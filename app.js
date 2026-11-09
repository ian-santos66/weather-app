import 'dotenv/config'
import express from 'express'
import {connectToDatabase} from '../WeatherApp/database/db.js'
import {getWeatherByCity} from '../WeatherApp/controllers/weather.controller.js'
const PORT = process.env.PORT || 3030
const app = express()
app.use(express.json())

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city
    const data = await getWeatherByCity(city)
    
    if (!data) {
        return res.status(404).json({ success: false, error: 'City not found' })
    }

    res.status(200).json({success: true, data: data.main.temp})
})

app.listen(PORT, async () => {
    console.log(`is running on port ${PORT}`)
    await connectToDatabase()
})