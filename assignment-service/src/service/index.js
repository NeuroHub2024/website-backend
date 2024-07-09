const RequestResponse = require('../../../user-service/src/utils/ResponseClass')
const AssignmentRepository = require('../database/index')
const { ApiError, ValidationError } = require('../utils/errorClass')

class AssignmentService {
    constructor () {
        this.repo = new AssignmentRepository()
    }

    //#region GET ALL ASSIGNMENTS : [ADMIN]
    async getAllAssignments(){
        try{
            const assignments = await this.repo.getAllAssignments()
            return new RequestResponse(assignments)
        }catch(err){
            if(err instanceof ApiError) throw err
            else throw new ApiError('Error in Service : ' + err.message)
        }
    }
    

    //#endregion
    async getAssignmentById(assignmentId){
        try {
            const assignment = await this.repo.getAssignmentById(assignmentId)
            if(!assignment) {
                throw new ApiError('Assignment not found')
            }
            return new RequestResponse(assignment)
        } catch (err) {
            if (err instanceof ApiError) throw err
            else throw new ApiError('Error in Service : ' + err.message)
        }
    }

    //#region CREATE NEW ASSIGNMENT : [ADMIN, TEACHER]
    async createAssignment({title, body, due, batchId, createdBy}) {
        try{
            if(!title || title === ''){
                throw new ValidationError('Error in Service : Assignment title not provided')
            }
            if(!body || body === ''){
                throw new ValidationError('Error in Service : Assignment body not provided')
            }
            if(!batchId || batchId === ''){
                throw new ValidationError('Error in Service : Assignment batchId not provided')
            }
            if(!createdBy || createdBy === ''){
                throw new ValidationError('Error in Service : Assignment createdBy not provided')
            }
            if(!due){
                throw new ValidationError('Error in Service : Assignment due date not provided')
            }

            const assignmentObj = {title, body, batchId, due}
            const newAssignment = await this.repo.createAssignment(assignmentObj)
            return new RequestResponse(newAssignment)
        } catch(err){
            if(err instanceof ApiError || err instanceof ValidationError) throw err
            else{ 
                throw new ApiError('Error in service : ' + err.message)
            }
        }
    }
    //#endregion

    //#region CREATE NEW RESPONSE TO ASSIGNMENT : [STUDENT, ADMIN]
    async createResponse({studentId, fileUrl, assignmentId}){
        try{
            if(!studentId || studentId === ''){
                throw new ValidationError('Error in service : student id not provided')
            }
            if(!assignmentId || assignmentId === ''){
                throw new ValidationError('Error in service : assignment id not provided')
            }
            if(!fileUrl || fileUrl === ''){
                throw new ValidationError('Error in service : File url not provided')
            }

            const responseObj = {studentId, fileUrl, assignmentId}
            let assignment = await this.repo.getAssignmentById(assignmentId)

            responseObj.isLate = assignment.due < Date.now()

            const response = await this.repo.createResponse(responseObj)
            assignment.responses.push(response)

            const newAssignment = await this.repo.editAssignmentById(assignmentId, assignment)
            return new RequestResponse(response)
        }catch(err){
            if(err instanceof ApiError || err instanceof ValidationError) throw err
            else{ 
                throw new ApiError('Error in service : ' + err.message)
            }
        }
    }
    //#endregion
}

module.exports = AssignmentService