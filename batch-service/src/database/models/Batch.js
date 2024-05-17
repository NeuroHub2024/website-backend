const mongoose= require('mongoose');
const {Schema}= mongoose;

const batchSchema=new Schema({
    // BatchID: { type: String, unique: true, required: true },
    // Name: { type: String, required: true },
    // Course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    // Instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // StartDate: { type: Date, required: true },
    // EndDate: { type: Date, required: true },
    // Students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // CreatedAt: { type: Date, default: Date.now },
    // UpdatedAt: { type: Date, default: Date.now },

    thumbnailImage: String,
    tags: [String],
    language: String,
    batchName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    durationOfClass: String,
    category: {
        type: String,
        enum: ['Programming', 'Mathematics', 'Science', 'Arts', 'Music', 'Languages', 'Other'],
        required: true
    },
    teachersId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    demoVideo: videoSchema,
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});



module.exports=mongoose.model('Batch',batchSchema);