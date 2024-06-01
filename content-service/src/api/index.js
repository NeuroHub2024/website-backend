const express = require('express')
const LectureService = require('../service/index')
const router = express.Router()

const service = new LectureService()

router.get('/', async(req, res)=>{
    res.json({msg: 'Content Service running'})
})

router.get('/:lectureId', async(req, res)=>{
    // try{
    //     const lectureId = req.params.lectureId
    //     const response = await service.getLectureById(lectureId)
    //     res.status(response.status).json(response.data)
    // }catch(err){
    //     next(err)
    // }

    res.json({
        url: 'https://www.youtube.com/watch?v=71eUes30gwc',
        uploadTimeStamp: '1716811044168',
        title: 'Is universe really just a Black Hole',
        teacher: 'Kurzegsagt',
        batch: 'Astronomy',
    })
})

module.exports = router;