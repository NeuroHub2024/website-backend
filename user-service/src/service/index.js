const UserRepository = require('../database/index')

class UserService {
    constructor() {
        this.repo = new UserRepository()
    }
}

module.exports = UserService;