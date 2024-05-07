const express = require('express')
const router = express.Router()
const BatchService = require('../service/index')

const service = new BatchService()

router.get('/', async (req, res)=> {
    res.send('Batch service running here')
})


module.exports = router;