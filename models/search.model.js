import { ObjectId } from 'mongodb'
import mongoose from 'mongoose' 

const searchSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    feels: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
})

const Search = mongoose.model('Search', searchSchema)

export default Search