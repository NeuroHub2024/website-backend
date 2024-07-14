const mongoose = require('mongoose')
const connectToDb = require('./connection')
const Announcement = require('./models/announcement')
const { ApiError, NotFoundError } = require('../utils/error')
// const Batch = require('../../../batch-service/src/database/models/Batch');
class AnnouncementRepository {
    constructor() {
        connectToDb()
    }

    
    // GET ALL ANNOUNCEMENTS
    async getAllAnnouncements() {
        try {
            return await Announcement.find();
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }

    // GET ANNOUNCEMENTS BY BATCH ID
    async getAnnouncementsByBatchId(batchId) {
        try {
            return await Announcement.find({ batchId });
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }

    // GET ANNOUNCEMENT BY ID
    async getAnnouncementById(id) {
        try {
            return await Announcement.findById(id);
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }

    // CREATE ANNOUNCEMENT
    async createAnnouncement(data) {
        try {
            const announcement = new Announcement(data);
            return await announcement.save();
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }

    // UPDATE ANNOUNCEMENT
    async updateAnnouncement(id, data) {
        try {
            return await Announcement.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }

    // DELETE ANNOUNCEMENT
    async deleteAnnouncement(id) {
        try {
            return await Announcement.findByIdAndDelete(id);
        } catch (err) {
            throw new ApiError('DB Error : ' + err.message);
        }
    }
   // ADD ANNOUNCEMENT TO BATCH
   async addAnnouncementToBatch(batchId, announcementId) {
    try {
        // const batch = await Batch.findById(batchId);
        const announcement = await Announcement.findById(announcementId);
        // if (!batch || !announcement) {
        //     throw new NotFoundError('Batch or Announcement not found');
        // }

        // announcement.batchId = batchId;
        // await announcement.save();

        return announcement;
    } catch (err) {
        throw new ApiError('DB Error : ' + err.message);
    }
}
   
}

module.exports = AnnouncementRepository