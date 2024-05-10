const mongoose = require('mongoose')
const {Schema} = mongoose
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */


const userSchema = new Schema({
    username: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Teacher', 'Student'],
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)