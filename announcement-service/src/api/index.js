const express = require('express')
const router = express.Router()
const AnnouncementService = require('../service/index')
const { AuthorisationError } = require('../utils/error')
const announcementService = new AnnouncementService();

router.get('/', async (req, res, next) => {
    try {
        const announcements = await announcementService.getAllAnnouncements();
        res.json(announcements);
    } catch (err) {
        next(err);
    }
});

// GET ANNOUNCEMENTS BY BATCH ID
router.get('/batch/:batchId', async (req, res, next) => {
    try {
        const announcements = await announcementService.getAnnouncementsByBatchId(req.params.batchId);
        res.json(announcements);
    } catch (err) {
        next(err);
    }
});

// GET ANNOUNCEMENT BY ID
router.get('/:id', async (req, res, next) => {
    try {
        const announcement = await announcementService.getAnnouncementById(req.params.id);
        res.json(announcement);
    } catch (err) {
        next(err);
    }
});

// CREATE ANNOUNCEMENT
router.post('/', async (req, res, next) => {
    try {
        const announcement = await announcementService.createAnnouncement(req.body);
        res.status(201).json(announcement);
    } catch (err) {
        next(err);
    }
});

// UPDATE ANNOUNCEMENT
router.put('/:id', async (req, res, next) => {
    try {
        const announcement = await announcementService.updateAnnouncement(req.params.id, req.body);
        res.json(announcement);
    } catch (err) {
        next(err);
    }
});

// DELETE ANNOUNCEMENT
router.delete('/:id', async (req, res, next) => {
    try {
        await announcementService.deleteAnnouncement(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;