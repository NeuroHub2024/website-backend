async function generateResetCode() {
    const randomCode = Math.floor(100000 + Math.random() * 900000);

    const resetCode = randomCode.toString(); 
    
    return resetCode;
}

module.exports=generateResetCode;