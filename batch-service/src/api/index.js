const express = require('express')
const router = express.Router()
const BatchService = require('../service/index')
const { authUser } = require('../middlewares/authMiddleware');
const service = new BatchService()

router.use(authUser);

const batchService = new BatchService();

//#region GET ALL BATCHES : [ADMIN]
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
router.put('/:id', async (req, res, next) => {
    try {
        const updatedBatch = await batchService.updateBatch(req.params.id, req.body);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region DELETE BATCH : [ADMIN]
router.delete('/:id', async (req, res, next) => {
    try {
        await batchService.deleteBatch(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region ADD TEACHER TO BATCH : [ADMIN, TEACHER]
router.post('/:batchId/teacher/:teacherId', async (req, res, next) => {
    try {
        const updatedBatch = await batchService.addTeacherToBatch(req.params.batchId, req.params.teacherId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region REMOVE TEACHER FROM BATCH : [ADMIN, TEACHER]
router.delete('/:batchId/teacher/:teacherId', async (req, res, next) => {
    try {
        const updatedBatch = await batchService.removeTeacherFromBatch(req.params.batchId, req.params.teacherId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region ADD STUDENT TO BATCH : [ADMIN, TEACHER]
router.post('/:batchId/student/:studentId', async (req, res, next) => {
    try {
        const updatedBatch = await batchService.addStudentToBatch(req.params.batchId, req.params.studentId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region REMOVE STUDENT FROM BATCH : [ADMIN, TEACHER]
router.delete('/:batchId/student/:studentId', async (req, res, next) => {
    try {
        const updatedBatch = await batchService.removeStudentFromBatch(req.params.batchId, req.params.studentId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region ADD LECTURE TO BATCH : [ADMIN, TEACHER]
router.post('/:batchId/lecture/:lectureId', async (req, res, next) => {
    try {
        const updatedBatch = await batchService.addLectureToBatch(req.params.batchId, req.params.lectureId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region REMOVE LECTURE FROM BATCH : [ADMIN, TEACHER]
router.delete('/:batchId/lecture/:lectureId', async (req, res, next) => {
    try {
        const updatedBatch = await batchService.removeLectureFromBatch(req.params.batchId, req.params.lectureId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region ADD ASSIGNMENT TO BATCH : [ADMIN, TEACHER]
router.post('/:batchId/assignment/:assignmentId', async (req, res, next) => {
    try {
        const updatedBatch = await batchService.addAssignmentToBatch(req.params.batchId, req.params.assignmentId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region REMOVE ASSIGNMENT FROM BATCH : [ADMIN, TEACHER]
router.delete('/:batchId/assignment/:assignmentId', async (req, res, next) => {
    try {
        const updatedBatch = await batchService.removeAssignmentFromBatch(req.params.batchId, req.params.assignmentId);
        res.json(updatedBatch);
    } catch (err) {
        next(err);
    }
});
//#endregion

module.exports = router;