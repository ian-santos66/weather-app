import Search from "../models/search.model.js";
import mongoose from 'mongoose'
import User from "../models/user.model.js";

export async function newSearch(user, data) {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const search = await Search.create([{
            userName: user.name,
            userId: user._id,
            country: data.country,
            city: data.name,
            temp: data.temp,
            feels: data.feels
        }], {session})
        await session.commitTransaction()
    } catch(error) {
        await session.abortTransaction()
    } finally {
        session.endSession()
    }
}

export const getUserHistory = async(req, res, next) => {
    try {
        const userHistory = await Search.find({userId: req.user._id})
        if (userHistory.length === 0) {
            return res.status(200).json({success: true, data: []})
        }
        
        return res.status(200).json({success: true, data: userHistory})
    } catch (error) {
        next(error)
    }
}