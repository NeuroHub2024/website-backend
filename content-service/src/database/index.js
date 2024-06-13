
const mongoose = require('mongoose');
const Video = require('./models/Video');
const connectToDb = require('./connection');
const { ApiError } = require('../utils/errorClass');

class contentRepository {
    constructor(){
        connectToDb();
    }

    async getAllLectures(){
        try{
            const lectures = await Video.find();
            return lectures;
        } catch(err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }

    async getLectureById(lectureId){
        try{
            const lecture = await Video.findById(lectureId);
            console.log(lecture)
            return lecture;
        } catch(err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }

    async addLecture(lectureObj){
        try{
            const lecture = new Video(lectureObj);
            await lecture.save();
            return lecture;
        } catch(err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }

    async updateLecture(lectureId, newLectureObj){
        try{
            const updatedLecture = await Video.findByIdAndUpdate(lectureId, newLectureObj, { new: true });
            return updatedLecture;
        } catch(err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }

    async deleteLecture(lectureId) {
        try {
            await Video.findByIdAndDelete(lectureId);
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
}
  
module.exports = contentRepository;
