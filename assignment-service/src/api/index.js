const express = require('express')
const router = express.Router()
const AssignmentService = require('../service/index')
const { AuthorisationError } = require('../utils/errorClass')
const { authUser } = require('../middlewares/authMiddleware')

const service = new AssignmentService()

//#region GET ALL ASSIGNMENTS : [ADMIN ONLY] : GET /assignment
router.get('/', async(req, res, next)=>{
    // res.send('Assignment service running here')
    try{
        // const role = req.cookies.role
        // if(!role || role != 'Admin') {
        //     throw new AuthorisationError('User of this role is not authorized')
        // }
        console.log(role)
        const response = await service.getAllAssignments()
        res.json(response.data)
    }catch(err){
        next(err)
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const assignmentId = req.params.id
        const response = await service.getAssignmentById(assignmentId)
        res.json(response.data)
    } catch (err) {
        next(err)
    }
})

//#region CREATE NEW ASSIGNMENT : [TEACHER, ADMIN] : POST /assignment/createassignment
router.post('/createassignment/:batchId', async (req, res, next)=> {
    try{
        const batchId = req.params.batchId
        const {title, due, createdBy, body} = req.body
        const inputs = {
            batchId, title, due, createdBy, body
        }
        const response = await service.createAssignment(inputs)
        res.json(response.data)
    }catch(err){
        next(err)
    }
})

//#region SUBMIT RESPONSE TO ASSIGNMENT : [STUDENT, ADMIN] : POST /assignment/createresponse
router.post('/createresponse/:assignmentId', authUser, async(req, res, next)=>{
    try{
        const assignmentId = req.params.assignmentId
        const {studentId, fileUrl} = req.body
        console.log(req.userData)
        console.log(req.cookies.token)
        // const studentDetails = await fetch('http://localhost:5000/user/authenticate', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Cookie': `token=${req.cookies.token};role=${req.cookies.role}`
        //     },
        // })
        // console.log(studentDetails)
        const inputs = {studentId, fileUrl, assignmentId}
        const response = await service.createResponse(inputs)
        res.json(response.data)
    }catch(err){
        next(err)
    }
})

module.exports = router;