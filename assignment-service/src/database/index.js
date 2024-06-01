const mongoose = require('mongoose')
const connectToDb = require('./connection')
const Assignment = require('./models/Assignment')
const AssignmentResponse = require('./models/AssignmentResponse')
const { ApiError } = require('../utils/errorClass')

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
            const newAssignment = new Assignment(assignmentObj)
            await newAssignment.save((err, res)=>{
                if(err) throw err
                return res
            })
        }catch(err){
            throw new ApiError('DB Error : ' + err.message)
        }
    }
    //#endregion

    //#region EDIT ASSIGNMENT BY ID
    //#endregion

    //#region DELETE ASSIGNMENT BY ID
    //#endregion
    
    //#region SUBMIT NEW RESPONSE
    async createResponse(responseObj){
        try{
            const newResponse = new AssignmentResponse(responseObj)
            await newResponse.save((err, res)=>{
                if(err) throw err
                return res
            })
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