const jwt = require('jsonwebtoken');
const generateResetCode = require('./generateResetCode');

async function validateResetCode(EnterresetCode,resetCode) {
    try {
        if (EnterresetCode === resetCode) {
            return true; 
        }
        return false; 
    } catch (err) {
        return false;
    }
}
module.exports=validateResetCode