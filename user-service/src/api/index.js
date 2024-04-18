const express = require('express')
const router = express.Router()
const UserService = require('../service/index')

const service = new UserService()

router.get('/', async (req, res)=> {
    res.send('User service running here')
})

module.exports = router;