const jwt = require('jsonwebtoken');

async function generateResetCode() {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    
    // Concatenate the username with the random code
    const resetCode = randomCode.toString(); // Using the first 3 characters of the username
    
    return resetCode;
}

module.exports=generateResetCode;