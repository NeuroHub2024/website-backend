// const lectureRepository = require('../database/index')
// const RequestResponse = require('../utils/ResponseClass')
// const { ApiError, ValidationError } = require('../utils/errorClass')

// class LectureService {
//     constructor(){
//         this.repo = new lectureRepository()
//     }

//     //#region GET ALL LECTURES
//     async getAllLectures(){
//         try{
//             const lectures = await this.repo.getAllLectures()
//             return new RequestResponse(lectures)
//         }catch(err){
//             if(err instanceof ApiError) throw err
//             else throw new ApiError('Service Error : ' + err.message)
//         }
//     }
//     //#endregion

//     //#region GET LECTURE BY ID
//     async getLectureById(lectureId){
//         try{
//             if(!lectureId || lectureId === '') throw new ValidationError('Service Error : Lecture Id not present')
//             const lecture = await this.repo.getLectureById(lectureId)
//             return new RequestResponse(lecture, 'lecture retrieved successfully')
//         }catch(err){
//             if(err instanceof ApiError) throw err
//             else throw new ApiError('Service Error : ' + err.message)
//         }
//     }
//     //#endregion
// }

// module.exports = LectureService;
const lectureRepository = require('../database/index');
const Video = require('../database/models/Video');
const RequestResponse = require('../utils/ResponseClass');
const { ApiError, ValidationError } = require('../utils/errorClass');

class LectureService {
    constructor(){
        this.repo = new lectureRepository();
    }

    async getAllLectures(){
        try{
            const lectures = await this.repo.getAllLectures();
            return new RequestResponse(lectures);
        } catch(err){
            if(err instanceof ApiError) throw err;
            else throw new ApiError('Service Error : ' + err.message);
        }
    }

    async getLectureById(lectureId){
        try{
            if(!lectureId || lectureId === '') throw new ValidationError('Service Error : Lecture Id not present');
            const lecture = await this.repo.getLectureById(lectureId);
            return new RequestResponse(lecture, 'lecture retrieved successfully');
        } catch(err){
            if(err instanceof ApiError) throw err;
            else throw new ApiError('Service Error : ' + err.message);
        }
    }

    async addLecture(req, res) {
        try {
            const { url, title } = req.body;
            const userId = req.userData._id;
            const uploadTimeStamp = Date.now();
            const lectureObj = { url, title, teacher:userId, uploadTimeStamp };
    
            const newLecture = await this.repo.addLecture(lectureObj);
            res.status(201).json(new RequestResponse(newLecture, 'Lecture added successfully'));
        } catch (err) {
            if (err instanceof ApiError) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(500).json({ message: 'Service Error: ' + err.message });
            }
        }
    }
    

    async updateLecture(lectureId, newLectureObj){
        try{
            const updatedLecture = await this.repo.updateLecture(lectureId, newLectureObj);
            return new RequestResponse(updatedLecture, 'lecture updated successfully');
        } catch(err){
            if(err instanceof ApiError) throw err;
            else throw new ApiError('Service Error : ' + err.message);
        }
    }

    async  deleteLecture(lectureId) {
        try {
            const result = await this.repo.deleteLecture(lectureId);
            if (!result) {
                return { status: 404, data: { message: 'Lecture not found' } };
            }
            return { status: 200, data: { message: 'Lecture deleted successfully' } };
        } catch (err) {
            return { status: 500, data: { message: 'Internal server error', error: err.message } };
        }
    }
}


module.exports = LectureService;
