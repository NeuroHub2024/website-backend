const mongoose= require('mongoose');
const User = require('./User')
const Assignment = require('./Assignment')
const Video = require('./Video')
const {Schema}= mongoose;

const batchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['English', 'Hindi', 'Hinglish'],
        required: true
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    }]
});

module.exports=mongoose.model('Batch', batchSchema);