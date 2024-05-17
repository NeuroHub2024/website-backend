const express = require('express');
const router = express.Router();
const UserService = require('../service/index');
const validateRole = require('../middlewares/validateRole');
const updatePassword = require('../middlewares/updatePassword');
const validateResetCode = require('../middlewares/validateResetCode');
const generateResetCode = require('../middlewares/generateResetCode');
const sendResetCodeEmail = require('../middlewares/sendResetCodeEmail');
const resetCodeStorage = require('../middlewares/resetCodeStorage');
const { ApiError, AuthorisationError } = require('../utils/errorClass');
const service = new UserService();

//#region GET ALL USERS : [ADMIN] : GET /user
router.get('/', async (req, res, next) => {
    try {
        await validateRole(['Admin'], req, res, next)

        const response = await service.getAllUsers();
        res.json(response);
    } catch (error) {
        next(error);
    }
});
//#endregion

//#region ADD A NEW USER : [ALL] : POST /user/adduser
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
router.post('/login', async (req, res, next) => {
    try {
        if (!req.body) {
            // res.status(500).json({
            //     message: 'Request object not present'
            // });
            throw new ApiError('Request object not present')
        }
        const response = await service.loginUser(req.body);
        res.cookie('token', response.data.token)
        res.cookie('userrole', response.data.user.role)
        res.json(response);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region AUTHENTICATE USER TOKEN : [ALL] : POST /user/authenticate
router.post('/authenticate', async (req, res, next) => {
    try {
        const token = req.cookies.token
        const userRole = req.cookies.userrole
        const {roleList} = req.body

        if(roleList) await validateRole(roleList, req, res, next)

        const response = await service.authenticateUser(token)
        res.status(response.status).json(response.data)
    } catch (err) {
        next(err)
    }
})
//#endregion

//#region VALIDATE USER ROLE : [ALL] : GET /user/validaterole
//#endregion

//#region FORGOT PASSWORD
router.post('/forgotpassword', async (req, res, next) => {
    try {
        const { username } = req.body;
        if (!username) {
            throw new ApiError('Username is required');
        }
        const resetCode = await generateResetCode(); 
        resetCodeStorage.setResetCode(resetCode);
        await sendResetCodeEmail(username, resetCode); 

        res.json({ message: 'Reset code sent successfully' });
    } catch (err) {
        next(err);
    }
});

//#region RESET PASSWORD
router.post('/resetpassword', async (req, res, next) => {
    try {
        const { username, resetCode, newPassword } = req.body;
        if (!username || !resetCode || !newPassword) {
            throw new ApiError('Username, reset code, and new password are required');
        }
        
        const isValidCode = await validateResetCode(resetCodeStorage.getResetCode(),resetCode); // Implement your own function

        if (!isValidCode) {
            throw new ApiError('Invalid reset code');
        }

        
        await updatePassword(username, newPassword); // Implement your own function to update the password

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;







/**
 * @swagger
 * components:
 *  schemas:
 *    Signup:    
 *     type: object
 *     required:
 *       - username
 *       - password
 *       - role
 *     properties:
 *       username:
 *         type: string
 *         description: User's username
 *       password:
 *         type: string
 *         description: User's password
 *       role:
 *         type: string
 *         enum: ['Admin', 'Teacher', 'Student']
 *         description: User's role
 *         
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    Login:    
 *     type: object
 *     required:
 *       - username
 *       - password
 *       - role
 *     properties:
 *       username:
 *         type: string
 *         description: User's username
 *       password:
 *         type: string
 *         description: User's password
 *         
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    Resetpassword:    
 *     type: object
 *     required:
 *       - username
 *       - resetCode
 *       - newPassword
 *     properties:
 *       username:
 *         type: string
 *         description: User's username
 *       resetCode:
 *         type: string
 *         description: User's RecetCode
 *       newPassword:
 *         type: string
 *         description: New Password
 *         
 */
//#region GET ALL USERS : [ADMIN] : GET /user
/**
 * @swagger
 * components:
 *  schemas:
 *    forgotpassword:    
 *     type: object
 *     required:
 *       - username
 *     properties:
 *       username:
 *         type: string
 *         description: User's username      
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
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       200:
 *         description: User added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

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
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User Login successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /forgotpassword:
 *   post:
 *     summary: Forgot the Password
 *     tags: [Users Forgot Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forgotpassword'
 *     responses:
 *       200:
 *         description: User Login successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /resetpassword:
 *   post:
 *     summary: Reset the password
 *     tags: [Users Reset Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resetpassword'
 *     responses:
 *       200:
 *         description: Password Recet successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */