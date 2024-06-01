const mongoose = require('mongoose')
const Video = require('./models/Video')
const connectToDb = require('./connection')
const { ApiError } = require('../utils/errorClass')

class contentRepository {
    constructor(){
        connectToDb()
    }

    //#region GET ALL LECTURES
    async getAllLectures(){
        try{
            const lectures = await Video.find()
            return lectures;
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region GET A LECTURE BY ID
    async getLectureById(lectureId){
        try{
            const lecture = await Video.findById(lectureId)
            return lecture;
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region ADD A NEW LECTURE
    async addLecture(lectureObj){
        try{
            const lecture = new Video(lectureObj)
            await lecture.save()

            return lecture
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region UPDATE LECTURE
    async updateLecture(newLectureObj){
        try{
            const newLecture = await Video.findByIdAndUpdate(newLectureObj)
            return newLectureObj
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion
}

module.exports = contentRepository