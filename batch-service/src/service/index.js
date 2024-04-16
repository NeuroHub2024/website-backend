const BatchRepository = require('../database/index')

class BatchService {
    constructor() {
        this.repo = new BatchRepository()
    }
}

module.exports = BatchService;