import User from '../models/user.model.js'
import mongoose from 'mongoose'

export async function signUp(req, res, next) {
    const session =  await mongoose.startSession()
    session.startTransaction()

    try {
        const {name, email, password} = req.body
        const existUser = await User.findOne({email})

        if (existUser) {
            const error = new Error('User already exists')
            error.statusCode = 409
            throw error
        }

        const newUser = await User.create([{name, email, password}], {session})

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        })

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}
