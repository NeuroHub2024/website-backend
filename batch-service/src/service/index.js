// const BatchRepository = require('../database/index');
// const { ApiError } = require('../utils/errorClass');

// class BatchService {
//     constructor() {
//         this.repo = new BatchRepository()
//     }

//     //#region GET ALL BATCHES : [ADMIN]
//     async getAllBatches(){
//         try{
//             const batches = await this.repo.getAllBatches()
//             return batches
//         }catch(err){
//             if(err instanceof ApiError){
//                 throw err
//             }
//             else{
//                 throw new ApiError('Service Error : ' + err.message)
//             }
//         }
//     }
//     //#endregion

//     //#region CREATE A NEW BATCH : [ADMIN, TEACHER]
//     async createBatch(){
        
//     }
//     //#endregion
// }

// module.exports = BatchService;

const BatchRepository = require('../database/index');
const { ApiError } = require('../utils/errorClass');

class BatchService {
    constructor() {
        this.repo = new BatchRepository();
    }

    //#region GET ALL BATCHES : [ADMIN]
    async getAllBatches() {
        try {
            const batches = await this.repo.getAllBatches();
            return batches;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region GET BATCHES BY USERNAME : [ADMIN, TEACHER, STUDENT]
    async findBatchesByUsername(username) {
        try {
            const batches = await this.repo.findBatchesByUsername(username);
            return batches;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region GET BATCH BY ID : [ADMIN, TEACHER, STUDENT]
    async findBatchById(batchId) {
        try {
            const batch = await this.repo.findBatchById(batchId);
            return batch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region CREATE A NEW BATCH : [ADMIN, TEACHER]
    async createBatch(name, language) {
        try {
            const newBatch = await this.repo.createBatch({ name, language });
            return newBatch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region UPDATE BATCH : [ADMIN, TEACHER]
    async updateBatch(batchId, updateData) {
        try {
            const updatedBatch = await this.repo.updateBatch(batchId, updateData);
            return updatedBatch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region DELETE BATCH : [ADMIN]
    async deleteBatch(batchId) {
        try {
            await this.repo.deleteBatch(batchId);
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region ADD TEACHER TO BATCH : [ADMIN, TEACHER]
    async addTeacherToBatch(batchId, teacherId) {
        try {
            const updatedBatch = await this.repo.addTeacherToBatch(batchId, teacherId);
            return updatedBatch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region REMOVE TEACHER FROM BATCH : [ADMIN, TEACHER]
    async removeTeacherFromBatch(batchId, teacherId) {
        try {
            const updatedBatch = await this.repo.removeTeacherFromBatch(batchId, teacherId);
            return updatedBatch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region ADD STUDENT TO BATCH : [ADMIN, TEACHER]
    async addStudentToBatch(batchId, studentId) {
        try {
            const updatedBatch = await this.repo.addStudentToBatch(batchId, studentId);
            return updatedBatch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region REMOVE STUDENT FROM BATCH : [ADMIN, TEACHER]
    async removeStudentFromBatch(batchId, studentId) {
        try {
            const updatedBatch = await this.repo.removeStudentFromBatch(batchId, studentId);
            return updatedBatch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region ADD LECTURE TO BATCH : [ADMIN, TEACHER]
    async addLectureToBatch(batchId, lectureId) {
        try {
            const updatedBatch = await this.repo.addLectureToBatch(batchId, lectureId);
            return updatedBatch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region REMOVE LECTURE FROM BATCH : [ADMIN, TEACHER]
    async removeLectureFromBatch(batchId, lectureId) {
        try {
            const updatedBatch = await this.repo.removeLectureFromBatch(batchId, lectureId);
            return updatedBatch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region ADD ASSIGNMENT TO BATCH : [ADMIN, TEACHER]
    async addAssignmentToBatch(batchId, assignmentId) {
        try {
            const updatedBatch = await this.repo.addAssignmentToBatch(batchId, assignmentId);
            return updatedBatch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion

    //#region REMOVE ASSIGNMENT FROM BATCH : [ADMIN, TEACHER]
    async removeAssignmentFromBatch(batchId, assignmentId) {
        try {
            const updatedBatch = await this.repo.removeAssignmentFromBatch(batchId, assignmentId);
            return updatedBatch;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('Service Error : ' + err.message);
            }
        }
    }
    //#endregion
}

module.exports = BatchService;
