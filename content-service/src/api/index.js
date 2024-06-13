
const express = require('express');
const LectureService = require('../service/index');
const { authUserAndBatch } = require('../middlewares/auth');
const router = express.Router();
router.use(authUserAndBatch);
const service = new LectureService();
/**
 * @swagger
 * tags:
 *   name: Lectures
 *   description: Lecture management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Lecture:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: The url of the lecture.
 *         title:
 *           type: string
 *           description: The title of the lecture.
 */

/**
 * @swagger
 * /lectures:
 *   get:
 *     summary: Retrieve all lectures
 *     tags: [Lectures]
 *     responses:
 *       200:
 *         description: A list of lectures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lecture'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res, next) => {
    try {
        const response = await service.getAllLectures();
        res.status(200).json(response.data);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /lectures/{lectureId}:
 *   get:
 *     summary: Retrieve a lecture by ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         schema:
 *           type: string
 *         required: true
 *         description: Lecture ID
 *     responses:
 *       200:
 *         description: A lecture object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *       500:
 *         description: Internal server error
 */
router.get('/:lectureId', async (req, res, next) => {
    try {
        const lectureId = req.params.lectureId;
        const response = await service.getLectureById(lectureId);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /lectures:
 *   post:
 *     summary: Create a new lecture
 *     tags: [Lectures]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lecture'
 *     responses:
 *       200:
 *         description: A successful response
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res, next) => {
    try {
        const response = await service.addLecture(req, res);
        res.status(response.status).json(response.data);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /lectures/{lectureId}:
 *   put:
 *     summary: Update a lecture by ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         schema:
 *           type: string
 *         required: true
 *         description: Lecture ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lecture'
 *     responses:
 *       200:
 *         description: A successful response
 *       500:
 *         description: Internal server error
 */
router.put('/:lectureId', async (req, res, next) => {
    try {
        const lectureId = req.params.lectureId;
        const newLectureObj = req.body;
        const response = await service.updateLecture(lectureId, newLectureObj);
        res.status(response.status).json(response.data);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /lectures/{lectureId}:
 *   delete:
 *     summary: Delete a lecture by ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         schema:
 *           type: string
 *         required: true
 *         description: Lecture ID
 *     responses:
 *       204:
 *         description: Lecture deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:lectureId', async (req, res, next) => {
    try {
        const lectureId = req.params.lectureId;
        const response = await service.deleteLecture(lectureId);
        res.status(response.status).json(response.data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
