const mongoose = require('mongoose');
const {DB_URI} = require('../config/index');
const {ApiError} = require('../utils/error')

const connectToDb = async()=>{
    try{
        await mongoose.connect(DB_URI)
        console.log('connected to DB')
    }
    catch(err){
        throw new ApiError(err.message);
    }
}
module.exports = connectToDb;
