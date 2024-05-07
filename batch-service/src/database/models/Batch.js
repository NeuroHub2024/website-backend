const mongoose= require('mongoose');
const {Schema}= mongoose;

const batchSchema=new Schema({
    BatchID: { type: String, unique: true, required: true },
    Name: { type: String, required: true },
    Course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    Instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    StartDate: { type: Date, required: true },
    EndDate: { type: Date, required: true },
    Students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    CreatedAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date, default: Date.now },
});

module.exports=mongoose.model('Batch',batchSchema);