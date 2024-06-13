
const express = require('express');
const LectureService = require('../service/index');
const { authUserAndBatch } = require('../middlewares/auth');
const router = express.Router();
router.use(authUserAndBatch);
const service = new LectureService();

router.get('/', async (req, res, next) => {
    try {
        const response = await service.getAllLectures();
        res.status(200).json(response.data);
    } catch (err) {
        next(err);
    }
});

router.get('/:lectureId', async (req, res, next) => {
    try {
        const lectureId = req.params.lectureId;
        const response = await service.getLectureById(lectureId);
        res.status(response.status).json(response.data);
    } catch (err) {
        next(err);
    }
});

router.post('/', authUserAndBatch, async (req, res, next) => {
    try {

        const response = await service.addLecture(req,res);
        res.status(response.status).json(response.data);
    } catch (err) {
        next(err);
    }
});

router.put('/:lectureId', authUserAndBatch, async (req, res, next) => {
    try {
        const lectureId = req.params.lectureId;
        const newLectureObj = req.body;
        const response = await service.updateLecture(lectureId, newLectureObj);
        res.status(response.status).json(response.data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
