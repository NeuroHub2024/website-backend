const mongoose = require('mongoose')
const connectToDb = require('./connection')

class BatchRepository {
    constructor() {
        connectToDb()
    }
}

module.exports = BatchRepository