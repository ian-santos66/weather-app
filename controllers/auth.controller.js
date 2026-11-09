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
            message: 'User created in successfully',
            data: newUser
        })

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export async function signIn(req, res, next) {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            const error = new Error('User not found')
            error.statusCode = 404
            throw error
        }

        const passwordIsValid = user.password == password

        if (!passwordIsValid) {
            const error = new Error('Invalid password')
            error.statusCode = 401
            throw error
        }

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: user
        })
    } catch (error) {
        next(error)
    }
}
