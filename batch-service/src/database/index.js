const mongoose = require('mongoose')
const connectToDb = require('./connection')
const Batch = require('./models/Batch')
const { ApiError } = require('../utils/errorClass')

class BatchRepository {
    constructor() {
        connectToDb()
    }

    //#region GET ALL BATCHES
    async getAllBatches(){
        try{
            const batches = await Batch.find()
            return batches
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region GET BATCHES BY USERNAME
    async findBatchesByUsername(username){
        try{
            const batches = await Batch.find({username: username})
            return batches
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    async findBatchById(batchId){
        try{
            const batch = await Batch.findById(batchId)
            return batch
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }

    //#region CREATE A NEW BATCH
    async createBatch(username, batchObj){
        try{
            const newBatch = new Batch(batchObj)
            await newBatch.save((err, res)=>{
                if(err) throw err
                else {
                    return res
                }
            })
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region UPDATE AN EXISTING BATCH
    async updateBatch(batchId, newBatchObj){
        try{
            const batch = await Batch.findByIdAndUpdate(batchId, newBatchObj);
            return batch
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion
}

module.exports = BatchRepository