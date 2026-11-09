import User from '../models/user.model.js'

export async function getUsers (req, res, next) {
    try {
        const users = await User.find().select('-password')

        res.status(200).json({success: true, data: users})
    } catch (error) {
        next(error)
    }
}