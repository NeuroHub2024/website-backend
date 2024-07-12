const mongoose = require('mongoose');
const connectToDb = require('./connection');
const Batch = require('./models/Batch');
const { ApiError } = require('../utils/errorClass');

class BatchRepository {
    constructor() {
        connectToDb();
    }

    //#region GET ALL BATCHES
    async getAllBatches() {
        try {
            const batches = await Batch.find();
            return batches;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region GET BATCHES BY USERNAME
    async findBatchesByUsername(username) {
        try {
            const batches = await Batch.find({ username: username });
            return batches;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region GET BATCH BY ID
    async findBatchById(batchId) {
        try {
            const batch = await Batch.findById(batchId);
            return batch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region CREATE A NEW BATCH
    async createBatch(batchObj) {
        try {
            const newBatch = new Batch(batchObj);
            const res = await newBatch.save();
            return res;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region UPDATE AN EXISTING BATCH
    async updateBatch(batchId, newBatchObj) {
        try {
            const batch = await Batch.findByIdAndUpdate(batchId, newBatchObj, { new: true });
            return batch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region DELETE BATCH
    async deleteBatch(batchId) {
        try {
            await Batch.findByIdAndDelete(batchId);
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region ADD TEACHER TO BATCH
    async addTeacherToBatch(batchId, teacherId) {
       
        try {
            const updatedBatch = await Batch.findByIdAndUpdate(
                
                batchId,
                { $addToSet: { teachers: teacherId } },
                { new: true }
            );
            console.log(updatedBatch);
            return updatedBatch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region REMOVE TEACHER FROM BATCH
    async removeTeacherFromBatch(batchId, teacherId) {
        try {
            const updatedBatch = await Batch.findByIdAndUpdate(
                batchId,
                { $pull: { teachers: teacherId } },
                { new: true }
            );
            return updatedBatch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region ADD STUDENT TO BATCH
    async addStudentToBatch(batchId, studentId) {
        try {
            const updatedBatch = await Batch.findByIdAndUpdate(
                batchId,
                { $addToSet: { students: studentId } },
                { new: true }
            );
            return updatedBatch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region REMOVE STUDENT FROM BATCH
    async removeStudentFromBatch(batchId, studentId) {
        try {
            const updatedBatch = await Batch.findByIdAndUpdate(
                batchId,
                { $pull: { students: studentId } },
                { new: true }
            );
            return updatedBatch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region ADD LECTURE TO BATCH
    async addLectureToBatch(batchId, lectureId) {
        try {
            const updatedBatch = await Batch.findByIdAndUpdate(
                batchId,
                { $addToSet: { lectures: lectureId } },
                { new: true }
            );
            return updatedBatch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region REMOVE LECTURE FROM BATCH
    async removeLectureFromBatch(batchId, lectureId) {
        try {
            const updatedBatch = await Batch.findByIdAndUpdate(
                batchId,
                { $pull: { lectures: lectureId } },
                { new: true }
            );
            return updatedBatch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region ADD ASSIGNMENT TO BATCH
    async addAssignmentToBatch(batchId, assignmentId) {
        try {
            const updatedBatch = await Batch.findByIdAndUpdate(
                batchId,
                { $addToSet: { assignments: assignmentId } },
                { new: true }
            );
            return updatedBatch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion

    //#region REMOVE ASSIGNMENT FROM BATCH
    async removeAssignmentFromBatch(batchId, assignmentId) {
        try {
            const updatedBatch = await Batch.findByIdAndUpdate(
                batchId,
                { $pull: { assignments: assignmentId } },
                { new: true }
            );
            return updatedBatch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
    //#endregion
    async addAnnouncementToBatch(batchId, announcementId) {
        try {
            const updatedBatch = await Batch.findByIdAndUpdate(
                batchId,
                { $addToSet: { announcements: announcementId } },
                { new: true }
            );
            return updatedBatch;
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
}

module.exports = BatchRepository;
