const mongoose = require('mongoose')
const connectToDb = require('./connection')
const Assignment = require('./models/Assignment')
const AssignmentResponse = require('./models/AssignmentResponse')
const { ApiError, NotFoundError } = require('../utils/errorClass')

class AssignmentRepository {
    constructor() {
        connectToDb()
    }

    //#region GET ALL ASSIGNMENTS
    async getAllAssignments(){
        try{
            const assignments = await Assignment.find()
            return assignments
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region CREATE A NEW ASSIGNMENT
    async createAssignment(assignmentObj){
        try{
            const assignment = new Assignment(assignmentObj)
            const newAssignment = await assignment.save()
            return newAssignment
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region GET ASSIGNMENT BY ID
    async getAssignmentById(assignmentId){
        try{
            const assignment = await Assignment.findById(assignmentId)
            return assignment
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region EDIT ASSIGNMENT BY ID
    async editAssignmentById(assignmentId, newAssignmentObj){
        try{
            const newAssignment = await Assignment.findByIdAndUpdate(assignmentId, newAssignmentObj)
            return newAssignment
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region DELETE ASSIGNMENT BY ID
    //#endregion
    
    //#region SUBMIT NEW RESPONSE
    async createResponse(responseObj){
        try{
            const newResponse = new AssignmentResponse(responseObj)
            await newResponse.save()
            return newResponse
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region DELETE RESPONSE BY ID
    //#endregion

    //#region GRADE A RESPONSE BY ID
    async gradeResponse(resId, marks){
        try{
            let assignment = await Assignment.findByIdAndUpdate(resId, {})
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion
}

module.exports = AssignmentRepository