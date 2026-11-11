import {Router} from 'express'
import {getUser} from '../controllers/user.controller.js'
import authorize from '../middlewares/auth.middleware.js'
import { getUserHistory } from '../controllers/history.controller.js'
const userRouter = Router()
userRouter.get('/users/me', authorize, getUser)
userRouter.get('/users/history', authorize, getUserHistory)

export default userRouter