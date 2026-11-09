import {Router} from 'express'
import {getWeatherByCity} from '../controllers/weather.controller.js'
const weatherRouter = Router()

weatherRouter.get('/weather/:city', getWeatherByCity)

export default weatherRouter