const mongoose = require('mongoose')
const {Schema} = mongoose
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */


const userSchema = new Schema({
    username: { type: String, required: true,},
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)