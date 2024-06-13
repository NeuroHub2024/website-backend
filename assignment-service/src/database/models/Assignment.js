const mongoose = require('mongoose')
// const User = require('./User')
// const Batch = require('./Batch')
const {Schema} = mongoose

const assignmentSchema = new Schema({
    title: String,
    uploadTime: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    due: {
        type: Date,
    },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch'
    },
    body: {
        type: String,
        required: true
    },
    responses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AssignmentResponse'
        }
    ]
})

module.exports = mongoose.model('Assignment', assignmentSchema)