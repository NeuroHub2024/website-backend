const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('Assignment service running here')
})

module.exports = router;