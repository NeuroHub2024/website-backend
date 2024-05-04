const express = require('express')
const router = express.Router()
const UserService = require('../service/index')

const service = new UserService()

//#region GET ALL USERS : [ADMIN] : GET /user
router.get('/', async(req, res, next)=> {
    try{
        const response = await service.getAllUsers()
        res.json(response)
    }catch(error){
        res.json(error)
    }
})
//#endregion

//#region NEW USER SIGNUP : [ALL] : POST /user/adduser
router.post('/adduser', async(req, res, next)=>{
    try{
        if(!req.body){
            res.status(500).json({
                message: 'Request object not present'
            })
        }
        const response = await service.addUser(req.body)
        res.json(response)
    }catch(err){
        res.status(err.status).json(err)
    }
})
//#endregion

//#region LOGIN A USER : [ALL] : POST /user/login
router.post('/login', async (req, res, next)=>{
    try{
        if(!req.body){
            res.status(500).json({
                message: 'Request object not present'
            })
        }

        const response = await service.loginUser(req.body)
        res.json(response)
    }catch(err){
        next(err)
    }
})
//#endregion

//#region AUTHENTICATE USER : [ALL] : POST /user/authenticate
//#endregion

module.exports = router;