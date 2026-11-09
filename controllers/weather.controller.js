
export const getWeatherByCity = async (req, res, next) => {
    try{
        const city = req.params.city
        const apiKey = process.env.WEATHER_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        const response = await fetch(url)
        
        if (!response.ok) {
            return res.status(404).json({success: false, error: 'City not found'})
        }

        const data = await response.json()
        const informations = {
            country: data.sys.country,
            name: data.name,
            temp: data.main.temp,
            feels: data.main.feels_like
        } 

        return res.status(200).json({success: true, data: informations})
    } catch (error) {
        next(error)
    }
}