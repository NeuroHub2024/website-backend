const mongoose = require('mongoose')
const {Schema} = mongoose

const assignmentResponseSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fileUrl: String,
    submissionTime: {
        type: Date
    },
    isLate: Boolean,
    marks: Number
})

module.exports = mongoose.model('AssignmentResponse', assignmentResponseSchema)