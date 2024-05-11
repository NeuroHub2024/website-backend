let resetCode = '';

function setResetCode(code) {
    resetCode = code;
}

function getResetCode() {
    return resetCode;
}

module.exports = {
    setResetCode,
    getResetCode
};
