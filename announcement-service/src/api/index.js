const express = require('express')
const router = express.Router()
const AnnouncementService = require('../service/index')
const { AuthorisationError } = require('../utils/error')
const announcementService = new AnnouncementService();

// router.get('/', async (req, res, next) => {
//     try {
//         const announcements = await announcementService.getAllAnnouncements();
//         res.json(announcements);
//     } catch (err) {
//         next(err);
//     }
// });

// // GET ANNOUNCEMENTS BY BATCH ID
// router.get('/batch/:batchId', async (req, res, next) => {
//     try {
//         const announcements = await announcementService.getAnnouncementsByBatchId(req.params.batchId);
//         res.json(announcements);
//     } catch (err) {
//         next(err);
//     }
// });

// // GET ANNOUNCEMENT BY ID
// router.get('/:id', async (req, res, next) => {
//     try {
//         const announcement = await announcementService.getAnnouncementById(req.params.id);
//         res.json(announcement);
//     } catch (err) {
//         next(err);
//     }
// });

// // CREATE ANNOUNCEMENT
// router.post('/', async (req, res, next) => {
//     try {
//         const announcement = await announcementService.createAnnouncement(req.body);
//         res.status(201).json(announcement);
//     } catch (err) {
//         next(err);
//     }
// });

// // UPDATE ANNOUNCEMENT
// router.put('/:id', async (req, res, next) => {
//     try {
//         const announcement = await announcementService.updateAnnouncement(req.params.id, req.body);
//         res.json(announcement);
//     } catch (err) {
//         next(err);
//     }
// });

// // DELETE ANNOUNCEMENT
// router.delete('/:id', async (req, res, next) => {
//     try {
//         await announcementService.deleteAnnouncement(req.params.id);
//         res.status(204).send();
//     } catch (err) {
//         next(err);
//     }
// });
// router.post('/createannouncement/:batchId', async (req, res, next)=> {
//     try{
//         const batchId = req.params.batchId
//         const {date, title, message} = req.body
//         const inputs = {
//             batchId, date , title, message
//         }
//         const response = await announcementService.createAnnouncement(inputs)
//         res.json(response.data)
//     }catch(err){
//         next(err)
//     }
// })


// module.exports = router;
//#region GET ALL ANNOUNCEMENTS
/**
 * @swagger
 * /announcement:
 *   get:
 *     summary: Retrieve all announcements
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: Successfully retrieved all announcements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Announcement'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res, next) => {
    try {
        const announcements = await announcementService.getAllAnnouncements();
        res.json(announcements);
    } catch (err) {
        next(err);
    }
});

//#region GET ANNOUNCEMENTS BY BATCH ID
/**
 * @swagger
 * /announcement/batch/{batchId}:
 *   get:
 *     summary: Get announcements by batch ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         schema:
 *           type: string
 *         required: true
 *         description: The batch ID
 *     responses:
 *       200:
 *         description: Successfully retrieved announcements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Announcement'
 *       404:
 *         description: Announcements not found
 *       500:
 *         description: Internal server error
 */
router.get('/batch/:batchId', async (req, res, next) => {
    try {
        const announcements = await announcementService.getAnnouncementsByBatchId(req.params.batchId);
        res.json(announcements);
    } catch (err) {
        next(err);
    }
});

//#region GET ANNOUNCEMENT BY ID
/**
 * @swagger
 * /announcement/{id}:
 *   get:
 *     summary: Get an announcement by ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The announcement ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the announcement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res, next) => {
    try {
        const announcement = await announcementService.getAnnouncementById(req.params.id);
        res.json(announcement);
    } catch (err) {
        next(err);
    }
});

//#region CREATE ANNOUNCEMENT
/**
 * @swagger
 * /announcement:
 *   post:
 *     summary: Create a new announcement
 *     tags: [Announcements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               batchId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res, next) => {
    try {
        const announcement = await announcementService.createAnnouncement(req.body);
        res.status(201).json(announcement);
    } catch (err) {
        next(err);
    }
});

//#region UPDATE ANNOUNCEMENT
/**
 * @swagger
 * /announcement/{id}:
 *   put:
 *     summary: Update an announcement
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The announcement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res, next) => {
    try {
        const announcement = await announcementService.updateAnnouncement(req.params.id, req.body);
        res.json(announcement);
    } catch (err) {
        next(err);
    }
});

//#region DELETE ANNOUNCEMENT
/**
 * @swagger
 * /announcement/{id}:
 *   delete:
 *     summary: Delete an announcement
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The announcement ID
 *     responses:
 *       204:
 *         description: Announcement deleted successfully
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res, next) => {
    try {
        await announcementService.deleteAnnouncement(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

//#region CREATE ANNOUNCEMENT FOR BATCH
/**
 * @swagger
 * /announcement/createannouncement/{batchId}:
 *   post:
 *     summary: Create a new announcement for a specific batch
 *     tags: [Announcements]
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
 *               date:
 *                 type: string
 *                 format: date-time
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       500:
 *         description: Internal server error
 */
router.post('/createannouncement/:batchId', async (req, res, next) => {
    try {
        const batchId = req.params.batchId;
        const { date, title, message } = req.body;
        const inputs = {
            batchId,
            date,
            title,
            message
        };
        const response = await announcementService.createAnnouncement(inputs);
        res.json(response.data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

// Swagger definition for Announcement model
/**
 * @swagger
 * components:
 *   schemas:
 *     Announcement:
 *       type: object
 *       required:
 *         - title
 *         - message
 *         - batchId
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the announcement
 *         title:
 *           type: string
 *           description: The title of the announcement
 *         message:
 *           type: string
 *           description: The message content of the announcement
 *         batchId:
 *           type: string
 *           description: ID of the batch the announcement is related to
 */
