const mongoose=require('mongoose');

const {Schema}=mongoose;

const announcementSchema=new Schema({
    date: {
        type: Date,
        default:Date.now()
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch'
    }
})

module.exports=mongoose.model('Announcement',announcementSchema);