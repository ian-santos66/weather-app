import { saveHistory } from './history.controller.js'

export const getWeatherByCity = async (req, res, next) => {
    try{
        const city = req.params.city
        const apiKey = process.env.WEATHER_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        const response = await fetch(url)
        
        if (!response.ok) {
            return res.status(404).json({success: false, error: 'City not found'})
        }

        const apiData = await response.json()
        const data = {
            country: apiData.sys.country,
            name: apiData.name,
            temp: apiData.main.temp,
            feels: apiData.main.feels_like
        } 
        await saveHistory(req.user, data)

        return res.status(200).json({success: true, data})
    } catch (error) {
        next(error)
    }
}
