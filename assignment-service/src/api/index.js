const express = require('express')
const router = express.Router()
const AssignmentService = require('../service/index')
const { AuthorisationError } = require('../utils/errorClass')
const { authUser } = require('../middlewares/authMiddleware')

const service = new AssignmentService()

//#region GET ALL ASSIGNMENTS : [ADMIN ONLY] : GET /assignment
// router.get('/', async(req, res, next)=>{
//     // res.send('Assignment service running here')
//     try{
//         // const role = req.cookies.role
//         // if(!role || role != 'Admin') {
//         //     throw new AuthorisationError('User of this role is not authorized')
//         // }
//         // console.log(role)
//         const response = await service.getAllAssignments()
//         res.json(response.data)
//     }catch(err){
//         next(err)
//     }
// })
// router.get('/:assignmentId', async (req, res, next) => {
//     try {
//         const assignmentId = req.params.assignmentId
//         const response = await service.getAssignmentById(assignmentId)
//         res.json(response.data)
//     } catch (err) {
//         next(err)
//     }
// })

// //#region CREATE NEW ASSIGNMENT : [TEACHER, ADMIN] : POST /assignment/createassignment
// router.post('/createassignment/:batchId', async (req, res, next)=> {
//     try{
//         const batchId = req.params.batchId
//         const {title, due, createdBy, body} = req.body
//         const inputs = {
//             batchId, title, due, createdBy, body
//         }
//         const response = await service.createAssignment(inputs)
//         res.json(response.data)
//     }catch(err){
//         next(err)
//     }
// })

// //#region SUBMIT RESPONSE TO ASSIGNMENT : [STUDENT, ADMIN] : POST /assignment/createresponse
// router.post('/createresponse/:assignmentId', authUser, async(req, res, next)=>{
//     try{
//         const assignmentId = req.params.assignmentId
//         const {studentId, fileUrl} = req.body
//         console.log(req.userData)
//         console.log(req.cookies.token)
//         // const studentDetails = await fetch('http://localhost:5000/user/authenticate', {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //         'Cookie': `token=${req.cookies.token};role=${req.cookies.role}`
//         //     },
//         // })
//         // console.log(studentDetails)
//         const inputs = {studentId, fileUrl, assignmentId}
//         const response = await service.createResponse(inputs)
//         res.json(response.data)
//     }catch(err){
//         next(err)
//     }
// })
//#region GET ALL ASSIGNMENTS : [ADMIN ONLY] : GET /assignment
/**
 * @swagger
 * /assignment:
 *   get:
 *     summary: Retrieve all assignments
 *     tags: [Assignments]
 *     responses:
 *       200:
 *         description: Successfully retrieved all assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res, next) => {
    try {
      const response = await service.getAllAssignments();
      res.json(response.data);
    } catch (err) {
      next(err);
    }
  });
  
  //#region GET ASSIGNMENT BY ID
  /**
   * @swagger
   * /assignment/{assignmentId}:
   *   get:
   *     summary: Get an assignment by ID
   *     tags: [Assignments]
   *     parameters:
   *       - in: path
   *         name: assignmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: The assignment ID
   *     responses:
   *       200:
   *         description: Successfully retrieved the assignment
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Assignment'
   *       404:
   *         description: Assignment not found
   *       500:
   *         description: Internal server error
   */
  router.get('/:assignmentId', async (req, res, next) => {
    try {
      const assignmentId = req.params.assignmentId;
      const response = await service.getAssignmentById(assignmentId);
      res.json(response.data);
    } catch (err) {
      next(err);
    }
  });
  
  //#region CREATE NEW ASSIGNMENT : [TEACHER, ADMIN] : POST /assignment/createassignment
  /**
   * @swagger
   * /assignment/createassignment/{batchId}:
   *   post:
   *     summary: Create a new assignment
   *     tags: [Assignments]
   *     parameters:
   *       - in: path
   *         name: batchId
   *         schema:
   *           type: string
   *         required: true
   *         description: The batch ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               due:
   *                 type: string
   *                 format: date-time
   *               createdBy:
   *                 type: string
   *               body:
   *                 type: string
   *     responses:
   *       200:
   *         description: Assignment created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Assignment'
   *       500:
   *         description: Internal server error
   */
  router.post('/createassignment/:batchId', async (req, res, next) => {
    try {
      const batchId = req.params.batchId;
      const { title, due, createdBy, body } = req.body;
      const inputs = {
        batchId,
        title,
        due,
        createdBy,
        body,
      };
      const response = await service.createAssignment(inputs);
      res.json(response.data);
    } catch (err) {
      next(err);
    }
  });
  
  //#region SUBMIT RESPONSE TO ASSIGNMENT : [STUDENT, ADMIN] : POST /assignment/createresponse
  /**
   * @swagger
   * /assignment/createresponse/{assignmentId}:
   *   post:
   *     summary: Submit a response to an assignment
   *     tags: [Assignments]
   *     parameters:
   *       - in: path
   *         name: assignmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: The assignment ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               studentId:
   *                 type: string
   *               fileUrl:
   *                 type: string
   *     responses:
   *       200:
   *         description: Response submitted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       500:
   *         description: Internal server error
   */
  router.post('/createresponse/:assignmentId', authUser, async (req, res, next) => {
    try {
      const assignmentId = req.params.assignmentId;
      const { studentId, fileUrl } = req.body;
      const inputs = { studentId, fileUrl, assignmentId };
      const response = await service.createResponse(inputs);
      res.json(response.data);
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = router;
//   Now, define the Swagger schema for the Assignment model. Add this to your Swagger options or in a separate file.
  
//   javascript
//   Copy code
  // Swagger definition for Assignment model
  /**
   * @swagger
   * components:
   *   schemas:
   *     Assignment:
   *       type: object
   *       required:
   *         - title
   *         - body
   *       properties:
   *         title:
   *           type: string
   *           description: The title of the assignment
   *         uploadTime:
   *           type: string
   *           format: date-time
   *           description: The upload time of the assignment
   *         createdBy:
   *           type: string
   *           description: ID of the user who created the assignment
   *         due:
   *           type: string
   *           format: date-time
   *           description: The due date of the assignment
   *         batchId:
   *           type: string
   *           description: ID of the batch the assignment belongs to
   *         body:
   *           type: string
   *           description: The content of the assignment
   *         responses:
   *           type: array
   *           items:
   *             type: string
   *           description: IDs of the responses submitted for the assignment
   */
module.exports = router;

// // Swagger definition for Assignment model
// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Assignment:
//  *       type: object
//  *       required:
//  *         - title
//  *         - body
//  *       properties:
//  *         title:
//  *           type: string
//  *           description: The title of the assignment
//  *         uploadTime:
//  *           type: string
//  *           format: date-time
//  *           description: The upload time of the assignment
//  *         createdBy:
//  *           type: string
//  *           description: ID of the user who created the assignment
//  *         due:
//  *           type: string
//  *           format: date-time
//  *           description: The due date of the assignment
//  *         batchId:
//  *           type: string
//  *           description: ID of the batch the assignment belongs to
//  *         body:
//  *           type: string
//  *           description: The content of the assignment
//  *         responses:
//  *           type: array
//  *           items:
//  *             type: string
//  *           description: IDs of the responses submitted for the assignment
//  */
