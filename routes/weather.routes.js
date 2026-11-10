import {Router} from 'express'
import {getWeatherByCity} from '../controllers/weather.controller.js'
import authorize from '../middlewares/auth.middleware.js'
const weatherRouter = Router()

weatherRouter.get('/weather/:city', authorize, getWeatherByCity)

export default weatherRouter