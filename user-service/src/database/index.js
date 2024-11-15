const mongoose = require('mongoose')
const connectToDb = require('./connection')
const User = require('./models/User')
const { ApiError } = require('../utils/errorClass')

class UserRepository {
    constructor() {
        try {
            connectToDb()
        } catch (error) {
            throw error
        }
    }

    async getAllUsers() {
        const users = await User.find().select('-password');
        return users;
    }
    

    async addUser(userObj) {
        try {
            const newUser = new User(userObj)
            await newUser.save()
            return newUser
        } catch (err) {
            throw new ApiError(err.message)
        }
    }
//Rishav 
    async findUserByUsername(username){
        try{
            const user = await User.findOne({username: username})
            if(user){
                return user
            }else{
                return null
            }
        }catch(err){
            throw new ApiError(err.message)
        }
    }
    
    async findById(id) {
        try {
            const user = await User.findById(id);
            return user;
        } catch (err) {
            throw new ApiError(err.message);
        }
    }
}


module.exports = UserRepository;