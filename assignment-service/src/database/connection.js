const mongoose = require('mongoose')
const {DB_URI} = require('../config/index')
const {ApiError} = require('../utils/errorClass')

const connectToDb = async()=> {
    try{
        await mongoose.connect(DB_URI)
        console.log('Connected to DB')
    }catch(err){
        throw new ApiError(err.message)
    }
}

module.exports = connectToDb