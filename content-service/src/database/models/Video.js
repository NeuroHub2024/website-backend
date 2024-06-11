const mongoose = require('mongoose')

const {Schema} = mongoose

const videoSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    uploadTimeStamp: {
        type: Date,
        default: Date.now
    },
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

module.exports = mongoose.model('Video', videoSchema);