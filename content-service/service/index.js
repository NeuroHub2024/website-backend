const lectureRepository = require('../database/index')
const RequestResponse = require('../utils/ResponseClass')
const { ApiError } = require('../utils/errorClass')

class lectureService {
    constructor(){
        this.repo = new lectureRepository()
    }

    async getAllLectures(){
        try{
            const lectures = await this.repo.getAllLectures()
            return new RequestResponse(lectures)
        }catch(err){
            if(err instanceof ApiError) throw err
            else throw new ApiError('Service Error : ' + err.message)
        }
    }
}