const express = require('express');
const router = express.Router();
const UserService = require('../service/index');
const service = new UserService();

//#region GET ALL USERS : [ADMIN] : GET /user
/**
 * @swagger
 * components:
 *  schemas:
 *    User:    
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *         description: User's username
 *       password:
 *         type: string
 *         description: User's password
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Get Users]
 *     summary: To check all users
 *     description: This is used to check all the users
 *     responses:
 *       200:
 *         description: To test Get Method
 */
router.get('/', async (req, res, next) => {
    try {
        const response = await service.getAllUsers();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});
//#endregion

//#region NEW USER SIGNUP : [ALL] : POST /user/adduser
/**
 * @swagger
 * /adduser:
 *   post:
 *     summary: Add a new user
 *     tags: [Users SignUp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/adduser', async (req, res, next) => {
    try {
        if (!req.body) {
            res.status(500).json({
                message: 'Request object not present'
            });
        }
        const response = await service.addUser(req.body);
        res.json(response);
    } catch (err) {
        next(err)
    }
});
//#endregion

//#region LOGIN A USER : [ALL] : POST /user/login
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login User
 *     tags: [Users Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User Login successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/login', async (req, res, next) => {
    try {
        if (!req.body) {
            res.status(500).json({
                message: 'Request object not present'
            });
        }
        const response = await service.loginUser(req.body);
        res.json(response);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region AUTHENTICATE USER : [ALL] : POST /user/authenticate
router.post('/authenticate', async (req, res, next)=>{
    try{
        const token = req.cookies.token
        const response = await service.authenticateUser(token)
        res.status(response.status).json(response.data)
    }catch(err){
        next(err)
    }
})
//#endregion

module.exports = router;
