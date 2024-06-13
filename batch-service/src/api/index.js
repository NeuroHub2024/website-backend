const express = require('express')
const router = express.Router()
const BatchService = require('../service/index')
const { authUser } = require('../middlewares/authMiddleware');
const swagger = require('../../../gateway-service/swagger');
const service = new BatchService()

router.use(authUser);

const batchService = new BatchService();

//#region GET ALL BATCHES : [ADMIN]
/**
 * @swagger
 * /batch:
 *   get:
 *     summary: Get all batches
 *     tags: [Batch]
 *     responses:
 *       200:
 *         description: List of all batches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/batch'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res, next) => {
    try {
        const batches = await batchService.getAllBatches();
        res.json(batches);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region GET BATCHES BY USERNAME : [ADMIN, TEACHER, STUDENT]
/**
 * @swagger
 * /batch/user/{username}:
 *   get:
 *     summary: Get batches by username
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username to filter batches
 *     responses:
 *       200:
 *         description: List of batches for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/batch'
 *       500:
 *         description: Internal server error
 */
router.get('/user/:username', async (req, res, next) => {
    try {
        const batches = await batchService.findBatchesByUsername(req.params.username);
        res.json(batches);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region GET BATCH BY ID : [ADMIN, TEACHER, STUDENT]
/**
 * @swagger
 * /batch/{id}:
 *   get:
 *     summary: Get batch by ID
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *     responses:
 *       200:
 *         description: Batch data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/batch'
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res, next) => {
    try {
        const batch = await batchService.findBatchById(req.params.id);
        res.json(batch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region CREATE A NEW BATCH : [ADMIN, TEACHER]
/**
 * @swagger
 * /batch:
 *   post:
 *     summary: Add a new Batch
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/batch'
 *     responses:
 *       200:
 *         description: Batch added successfully
 *       403:
 *         description: Unauthorized. Only teachers and admins are allowed to create batches.
 *       500:
 *         description: Internal server error
 */
router.post('/', authUser, async (req, res, next) => {
    try {
        const userRole = req.cookies.userRole;
        if (userRole === 'teacher' || userRole === 'admin') {
            await batchService.createBatch(req, res);
        } else {
            res.status(403).json({ error: 'Unauthorized. Only teachers and admins are allowed to create batches.' });
        }
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region UPDATE BATCH : [ADMIN, TEACHER]
/**
 * @swagger
 * /batch/{id}:
 *   put:
 *     summary: Update a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/batch'
 *     responses:
 *       200:
 *         description: Batch updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authUser, async (req, res, next) => {
    try {
        const updatedBatch = await batchService.updateBatch(req.params.id, req.body);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region DELETE BATCH : [ADMIN]
/**
 * @swagger
 * /batch/{id}:
 *   delete:
 *     summary: Delete a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *     responses:
 *       204:
 *         description: Batch deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authUser, async (req, res, next) => {
    try {
        await batchService.deleteBatch(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region ADD TEACHER TO BATCH : [ADMIN, TEACHER]
/**
 * @swagger
 * /batch/{batchId}/teacher/{teacherId}:
 *   post:
 *     summary: Add a teacher to a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *       - in: path
 *         name: teacherId
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher added to batch successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:batchId/teacher/:teacherId', authUser, async (req, res, next) => {
    try {
        const updatedBatch = await batchService.addTeacherToBatch(req.params.batchId, req.params.teacherId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region REMOVE TEACHER FROM BATCH : [ADMIN, TEACHER]
/**
 * @swagger
 * /batch/{batchId}/teacher/{teacherId}:
 *   delete:
 *     summary: Remove a teacher from a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *       - in: path
 *         name: teacherId
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher removed from batch successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:batchId/teacher/:teacherId', authUser, async (req, res, next) => {
    try {
        const updatedBatch = await batchService.removeTeacherFromBatch(req.params.batchId, req.params.teacherId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region ADD STUDENT TO BATCH : [ADMIN, TEACHER]
/**
 * @swagger
 * /batch/{batchId}/student/{studentId}:
 *   post:
 *     summary: Add a student to a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student added to batch successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:batchId/student/:studentId', authUser, async (req, res, next) => {
    try {
        const updatedBatch = await batchService.addStudentToBatch(req.params.batchId, req.params.studentId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region REMOVE STUDENT FROM BATCH : [ADMIN, TEACHER]
/**
 * @swagger
 * /batch/{batchId}/student/{studentId}:
 *   delete:
 *     summary: Remove a student from a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student removed from batch successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:batchId/student/:studentId', authUser, async (req, res, next) => {
    try {
        const updatedBatch = await batchService.removeStudentFromBatch(req.params.batchId, req.params.studentId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region ADD LECTURE TO BATCH : [ADMIN, TEACHER]
/**
 * @swagger
 * /batch/{batchId}/lecture/{lectureId}:
 *   post:
 *     summary: Add a lecture to a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *       - in: path
 *         name: lectureId
 *         schema:
 *           type: string
 *         required: true
 *         description: Lecture ID
 *     responses:
 *       200:
 *         description: Lecture added to batch successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:batchId/lecture/:lectureId', authUser, async (req, res, next) => {
    try {
        const updatedBatch = await batchService.addLectureToBatch(req.params.batchId, req.params.lectureId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region REMOVE LECTURE FROM BATCH : [ADMIN, TEACHER]
/**
 * @swagger
 * /batch/{batchId}/lecture/{lectureId}:
 *   delete:
 *     summary: Remove a lecture from a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *       - in: path
 *         name: lectureId
 *         schema:
 *           type: string
 *         required: true
 *         description: Lecture ID
 *     responses:
 *       200:
 *         description: Lecture removed from batch successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:batchId/lecture/:lectureId', authUser, async (req, res, next) => {
    try {
        const updatedBatch = await batchService.removeLectureFromBatch(req.params.batchId, req.params.lectureId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region ADD ASSIGNMENT TO BATCH : [ADMIN, TEACHER]
/**
 * @swagger
 * /batch/{batchId}/assignment/{assignmentId}:
 *   post:
 *     summary: Add an assignment to a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *       - in: path
 *         name: assignmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: Assignment added to batch successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:batchId/assignment/:assignmentId', authUser, async (req, res, next) => {
    try {
        const updatedBatch = await batchService.addAssignmentToBatch(req.params.batchId, req.params.assignmentId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region REMOVE ASSIGNMENT FROM BATCH : [ADMIN, TEACHER]
/**
 * @swagger
 * /batch/{batchId}/assignment/{assignmentId}:
 *   delete:
 *     summary: Remove an assignment from a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Batch ID
 *       - in: path
 *         name: assignmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: Assignment removed from batch successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:batchId/assignment/:assignmentId', authUser, async (req, res, next) => {
    try {
        const updatedBatch = await batchService.removeAssignmentFromBatch(req.params.batchId, req.params.assignmentId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *    batch:    
 *     type: object
 *     required:
 *       - name
 *       - language
 *     properties:
 *       name:
 *         type: string
 *         description: Batch name
 *       language:
 *         type: string
 *         enum: ['English', 'Hindi', 'Hinglish']
 *         description: Language of the batch
 *       teacher:
 *         type: string
 *         description: Teacher's username
 *       students:
 *         type: array
 *         items:
 *           type: string
 *           description: Student's username
 *       lectures:
 *         type: array
 *         items:
 *           type: string
 *           description: Lecture ID
 *       assignments:
 *         type: array
 *         items:
 *           type: string
 *           description: Assignment ID
 */
