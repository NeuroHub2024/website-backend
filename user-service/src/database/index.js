const mongoose = require('mongoose')
const connectToDb = require('./connection')

class UserRepository {
    constructor() {
        connectToDb()
    }

}

module.exports = UserRepository;