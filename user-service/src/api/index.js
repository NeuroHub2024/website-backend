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
        // await validateRole(['Admin'], req, res, next)
        const userRole = req.cookies.userrole
        if(userRole != 'Admin') throw new AuthorisationError('API Error : Not authorised')

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
        res.cookie('token', response.data.token);
        res.cookie('userrole', response.data.user.role);
        res.json(response);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region AUTHENTICATE USER TOKEN : [ALL] : POST /user/authenticate
router.post('/authenticate', async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const userRole = req.cookies.userrole;
        const {roleList} = req.body

        // if(roleList) await validateRole(roleList, req, res, next)
        if(!roleList.includes(userRole)) throw new AuthorisationError('API Error : User of this role is not authorised')

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

//#region CHANGE PASSWORD
router.post('/changepassword', async (req, res, next) => {
    try {
        const { username, currentPassword, newPassword } = req.body;
        if (!username || !currentPassword || !newPassword) {
            throw new ApiError('Username, current password, and new password are required');
        }
        
        // First, authenticate the user to ensure they are allowed to change the password
        const authResponse = await service.loginUser({ username, password: currentPassword });
        if (authResponse.status !== 200) {
            throw new ApiError('Invalid current password');
        }
        
        // If authentication is successful, proceed to update the password
        await updatePassword(username, newPassword); // Implement your own function to update the password

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region GET USER BY ID
router.get('/id/:id', async (req, res, next) => {

    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError('ID is required');
        }

        const user = await service.getUserById(id);

        if (!user) {
            throw new ApiError('User not found');
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});
//#endregion

//#region GET USER BY USERNAME
router.get('/username/:username', async (req, res, next) => {
    try {
        const { username } = req.params;

       
        if (!username) {
            throw new ApiError('Username is required');
        }
        const user = await service.getUserByUsername(username);

        if (!user) {
            throw new ApiError('User not found');
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});
//#endregion

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
 *       email:
 *         type: string
 *         description: User's email
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
/**
 * @swagger
 * components:
 *  schemas:
 *    Changepassword:    
 *     type: object
 *     required:
 *       - username
 *       - currentPassword
 *       - newPassword
 *     properties:
 *       username:
 *         type: string
 *         description: User's username
 *       currentPassword:
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
 * /user:
 *   get:
 *     tags: [Get]
 *     summary: To check all users
 *     description: This is used to check all the users
 *     responses:
 *       200:
 *         description: To test Get Method
 */
//#region NEW USER SIGNUP : [ALL] : POST /user/adduser
/**
 * @swagger
 * /user/adduser:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
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
 * /user/login:
 *   post:
 *     summary: Login User
 *     tags: [Users]
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
 * /user/forgotpassword:
 *   post:
 *     summary: Forgot the Password
 *     tags: [Users]
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
 * /user/resetpassword:
 *   post:
 *     summary: Reset the password
 *     tags: [Users]
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
/**
 * @swagger
 * /user/changepassword:
 *   post:
 *     summary: Change the password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Changepassword'
 *     responses:
 *       200:
 *         description: Password Recet successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/id/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     description: Retrieve user information based on the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       '200':
 *         description: Successful response
 */
/**
 * @swagger
 * /user/username/{username}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by Username
 *     description: Retrieve user information based on the provided User Name
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: User Name
 *     responses:
 *       '200':
 *         description: Successful response
 */

/**
 * @swagger
 * /user/authenticate:
 *   post:
 *     tags: [User]
 *     summary: Authenticate user token
 *     description: Authenticate user token and check user role
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User authenticated successfully
 */

