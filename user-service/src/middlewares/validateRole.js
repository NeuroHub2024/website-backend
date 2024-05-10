const { AuthorisationError } = require("../utils/errorClass")

const validateRole = async (roleList, req, res, next)=>{
    const userRole = req.cookies.userrole
    
    if(!roleList.includes(userRole)){
        throw new AuthorisationError(`User of role ${userRole} is not authorised to this route`)
    }
}

module.exports = validateRole