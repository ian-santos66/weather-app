import User from '../models/user.model.js'

export async function getUser (req, res, next) {
    try {
        const users = await User.findOne(req.user._id).select('-password')

        res.status(200).json({success: true, data: users})
    } catch (error) {
        next(error)
    }
}