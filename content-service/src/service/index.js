const lectureRepository = require('../database/index')
const RequestResponse = require('../utils/ResponseClass')
const { ApiError, ValidationError } = require('../utils/errorClass')

class LectureService {
    constructor(){
        this.repo = new lectureRepository()
    }

    //#region GET ALL LECTURES
    async getAllLectures(){
        try{
            const lectures = await this.repo.getAllLectures()
            return new RequestResponse(lectures)
        }catch(err){
            if(err instanceof ApiError) throw err
            else throw new ApiError('Service Error : ' + err.message)
        }
    }
    //#endregion

    //#region GET LECTURE BY ID
    async getLectureById(lectureId){
        try{
            if(!lectureId || lectureId === '') throw new ValidationError('Service Error : Lecture Id not present')
            const lecture = await this.repo.getLectureById(lectureId)
            return new RequestResponse(lecture, 'lecture retrieved successfully')
        }catch(err){
            if(err instanceof ApiError) throw err
            else throw new ApiError('Service Error : ' + err.message)
        }
    }
    //#endregion
}

module.exports = LectureService;