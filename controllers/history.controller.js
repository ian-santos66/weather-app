import Search from "../models/search.model.js";

export async function saveHistory(user, data) {
    try {
        await Search.create({
            userName: user.name,
            userId: user._id,
            country: data.country,
            city: data.name,
            temp: data.temp,
            feels: data.feels
        })
    } catch(error) {
        console.error('Failed to save search History', error)
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