const mongoose = require('mongoose')
const User = require('./User')
const Batch = require('./Batch')
const {Schema} = mongoose

const videoSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    uploadTimeStamp: Date,
    title: String,
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    batch: {
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    },
})

module.exports = mongoose.model('Video', videoSchema)