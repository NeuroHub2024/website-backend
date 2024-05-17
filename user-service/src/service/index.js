const UserRepository = require('../database/index')
const { ApiError, ValidationError, AuthorisationError, NotFoundError } = require('../utils/errorClass')
const RequestResponse = require('../utils/ResponseClass')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/index')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
class UserService {
    constructor() {
        this.repo = new UserRepository()
        this.roles = ['Admin', 'Student', 'Teacher']
    }
   
    //#region GET ALL USERS : [ADMIN]
    async getAllUsers(){
        try{
            const users = await this.repo.getAllUsers()
            return new RequestResponse(users, "All users retrieved")
        }catch(err){
            if(err instanceof ApiError){
                throw err
            }
        }
    }
    //#endregion

    //#region ADD NEW USER : [ALL]
    async addUser({username, password, role}){
        try{
            if(!username || username == ''){
                throw new ValidationError('Username not present')
            }
            if(!password || password == ''){
                throw new ValidationError('Password not present')
            }
            if(!role || role == '' || !this.roles.includes(role)){
                throw new ValidationError('Role invalid')
            }

            let user = await this.repo.findUserByUsername(username)
            if(user){
                throw new ValidationError('User already exists')
            }
            user = await this.repo.addUser({username, password, role})
            return new RequestResponse(user, "New user added")

        }catch(err){
            if(err instanceof ApiError || err instanceof ValidationError){
                throw err
            }
            else throw new ApiError("Error in service : " + err?.message)
        }
    }
    //#endregion

    //#region USER LOGIN : [ALL]
    
    async  loginUser({ username, password }) {
        try {
            if (!username || username == '') {
                throw new ValidationError('Username not present');
            }
            if (!password || password == '') {
                throw new ValidationError('Password not present');
            }
    
            const user = await this.repo.findUserByUsername(username);
    
            if (user) {
                if (user.password === password) {
                    const token = jwt.sign({ username}, JWT_SECRET);
                    user.password = null;
                    return new RequestResponse({ user, token }); 
                } else {
                    throw new AuthorisationError('Incorrect password');
                }
            } else {
                throw new NotFoundError('User with given username does not exist');
            }
        } catch (err) {
            if (!(err instanceof ValidationError || err instanceof AuthorisationError || err instanceof NotFoundError)) {
                throw new ApiError();
            } else {
                throw err;
            }
        }
    }
    //#endregion

    //#region AUTHENTICATE USER : [ALL]
    async authenticateUser(token){
        debugger
        try{
            if(!token){
                throw new ValidationError('Token not provided')
            }

            const payload = jwt.verify(token, JWT_SECRET)
            if(payload){
                let user = await this.repo.findUserByUsername(payload.username)
                if(!user){
                    throw new AuthorisationError('User does not exist corresponding to this token')
                }else{
                    user.password = null
                    return new RequestResponse(user)
                }
            }
        }catch(err){
            if(err instanceof ValidationError || err instanceof AuthorisationError){
                throw err
            }
            else if(err?.name === 'JsonWebTokenError'){
                throw new ValidationError(err.message)
            }
            else throw new ApiError('Error from user-service : ' + err.message)
        }
    }
    //#endregion
    
    async getUserByUsername(username) {
        try {
            // Assuming your database interface has a method to fetch user by username
            const user = await this.repo.findUserByUsername(username);
            return user;
        } catch (error) {
            throw new Error('Error fetching user by username');
        }
    }
    
    async getUserById(id) {
        try {
            // Assuming your database interface has a method to fetch user by id
            const user = await this.repo.findById(id);
            return user;
        } catch (error) {
            throw new Error('Error fetching user by id');
        }
    }
}

module.exports = UserService;