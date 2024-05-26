const express = require('express')
const LectureService = require('../service/index')
const router = express.Router()

const service = new LectureService()

router.get('/', (req, res)=>{
})

module.exports = router;