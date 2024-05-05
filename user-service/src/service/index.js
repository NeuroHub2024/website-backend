const UserRepository = require('../database/index')
const { ApiError, ValidationError, AuthorisationError, NotFoundError } = require('../utils/errorClass')
const RequestResponse = require('../utils/ResponseClass')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
class UserService {
    constructor() {
        this.repo = new UserRepository()
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
    async addUser({username, password}){
        try{
            if(!username || username == ''){
                throw new ValidationError('Username not present')
            }
            if(!password || password == ''){
                throw new ValidationError('Password not present')
            }

            let user = await this.repo.findUserByUsername(username)
            if(user){
                throw new ValidationError('User already exists')
            }
            password=null;
            user = await this.repo.addUser({username, password})
            return new RequestResponse(user, "New user added")

        }catch(err){
            throw err
        }
    }
    //#endregion

    //#region USER LOGIN : [ALL]
    
    async  loginUser({ username, password }) {
        const secretKey = crypto.randomBytes(32).toString('hex');
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
                    const token = jwt.sign({ username}, secretKey);
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
}

module.exports = UserService;