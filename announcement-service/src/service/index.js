const RequestResponse = require('../../../user-service/src/utils/ResponseClass')
const AnnouncementRepository = require('../database/index')
const { ApiError, ValidationError } = require('../utils/error')

class AnnouncementService {
    constructor () {
        this.repo = new AnnouncementRepository()
    }
// GET ALL ANNOUNCEMENTS
 // GET ALL ANNOUNCEMENTS
 async getAllAnnouncements() {
    return await this.repo.getAllAnnouncements();
}

// GET ANNOUNCEMENTS BY BATCH ID
async getAnnouncementsByBatchId(batchId) {
    return await this.repo.getAnnouncementsByBatchId(batchId);
}

// GET ANNOUNCEMENT BY ID
async getAnnouncementById(id) {
    const announcement = await this.repo.getAnnouncementById(id);
    if (!announcement) {
        throw new NotFoundError('Announcement not found');
    }
    return announcement;
}

// CREATE ANNOUNCEMENT
async createAnnouncement(data) {
    if (!data.title || !data.message || !data.batchId) {
        throw new ValidationError('Title, message, and batch ID are required');
    }
    return await this.repo.createAnnouncement(data);
}

// UPDATE ANNOUNCEMENT
async updateAnnouncement(id, data) {
    const announcement = await this.repo.updateAnnouncement(id, data);
    if (!announcement) {
        throw new NotFoundError('Announcement not found');
    }
    return announcement;
}

// DELETE ANNOUNCEMENT
async deleteAnnouncement(id) {
    const announcement = await this.repo.deleteAnnouncement(id);
    if (!announcement) {
        throw new NotFoundError('Announcement not found');
    }
    return announcement;
}
    
    
    //#endregion
    // ADD ANNOUNCEMENT TO BATCH
    async addAnnouncementToBatch(batchId, announcementId) {
        const announcement = await this.repo.addAnnouncementToBatch(batchId, announcementId);
        if (!announcement) {
            throw new NotFoundError('Batch or Announcement not found');
        }
        return announcement;
    }
    //#region CREATE NEW ASSIGNMENT : [ADMIN, TEACHER]
    async createAnnouncement({batchId, date , title, message}) {
        try{
            if(!title || title === ''){
                throw new ValidationError('Error in Service : Announcement title not provided')
            }
           
            if(!batchId || batchId === ''){
                throw new ValidationError('Error in Service : Announcement batchId not provided')
            }
            if(!message || message === ''){
                throw new ValidationError('Error in Service : Announcement message not provided')
            }
            if(!date){
                throw new ValidationError('Error in Service : Announcement  date not provided')
            }

            const assignmentObj = {batchId, date , title, message}
            const newAssignment = await this.repo.createAnnouncement(assignmentObj)
            return new RequestResponse(newAssignment)
        } catch(err){
            if(err instanceof ApiError || err instanceof ValidationError) throw err
            else{ 
                throw new ApiError('Error in service : ' + err.message)
            }
        }
    }
}

module.exports = AnnouncementService