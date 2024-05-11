const jwt = require('jsonwebtoken');
const generateResetCode = require('./generateResetCode');

async function validateResetCode(EnterresetCode,resetCode) {
    try {
        // Extract the username from the reset code
        // const resetUsername =await generateResetCode(); // Assuming the first 3 characters represent the username
        
        // Check if the extracted username matches the provided username
        if (EnterresetCode === resetCode) {
            return true; // Reset code is valid
        }
        return false; // Reset code is invalid
    } catch (err) {
        return false; // Reset code is invalid
    }
}
module.exports=validateResetCode