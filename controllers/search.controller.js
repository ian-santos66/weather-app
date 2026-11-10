import Search from "../models/search.model.js";
import mongoose from 'mongoose'
import User from "../models/user.model.js";

export async function newSearch(user, data) {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const search = await Search.create([{
            userName: user.name,
            userEmail: user.email,
            country: data.country,
            city: data.name,
            temp: data.temp,
            feels: data.feels
        }], {session})
        console.log(search)
        await session.commitTransaction()
    } catch(error) {
        await session.abortTransaction()
    } finally {
        session.endSession()
    }
}