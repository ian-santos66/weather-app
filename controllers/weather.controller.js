export const getWeatherByCity = async (city) => {
    try{
        const apiKey = process.env.WEATHER_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        const response = await fetch(url)
        
        if (!response.ok) {
            return
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}