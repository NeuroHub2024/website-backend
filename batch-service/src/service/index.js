const BatchRepository = require('../database/index');
const { ApiError } = require('../utils/errorClass');

class BatchService {
    constructor() {
        this.repo = new BatchRepository()
    }

    //#region GET ALL BATCHES : [ADMIN]
    async getAllBatches(){
        try{
            const batches = await this.repo.getAllBatches()
            return batches
        }catch(err){
            if(err instanceof ApiError){
                throw err
            }
            else{
                throw new ApiError('Service Error : ' + err.message)
            }
        }
    }
    //#endregion

    //#region CREATE A NEW BATCH : [ADMIN, TEACHER]
    async createBatch(){
        
    }
    //#endregion
}

module.exports = BatchService;