const mongoose = require('mongoose')
const {Schema} = mongoose

const assignmentSchema = new Schema({
    title: String, 
})

module.exports = mongoose.model('Assignment', assignmentSchema)