import User from '../models/user.model.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

export async function signUp(req, res, next) {
    const session =  await mongoose.startSession()
    session.startTransaction()

    try {
        const {name, email, password} = req.body
        const existUser = await User.findOne({email}).session(session)

        if (existUser) {
            const error = new Error('User already exists')
            error.statusCode = 409
            throw error
        }

        const [newUser] = await User.create([{name, email, password}], {session})

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        const userResponse = newUser.toObject()

        delete userResponse.password

        await session.commitTransaction()

        res.status(201).json({
            success: true,
            message: 'User created in successfully',
            data: {
                user: userResponse,
                token
            }
        })
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
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

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        const userResponse = user.toObject()
        delete userResponse.password

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                user: userResponse,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}
