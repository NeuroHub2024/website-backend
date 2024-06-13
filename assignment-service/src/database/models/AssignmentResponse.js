const mongoose = require('mongoose')
const {Schema} = mongoose

const assignmentResponseSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    },
    fileUrl: String,
    submissionTime: {
        type: Date,
        default: Date.now
    },
    isLate: Boolean,
    marks: Number
})

module.exports = mongoose.model('AssignmentResponse', assignmentResponseSchema)