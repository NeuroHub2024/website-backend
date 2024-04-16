// THIS CLASS CONTAINS CUSTOM ERRORS THAT WILL BE USED THROUGHOUT THE SERVICE

const STATUS_CODES = {
    OK : 200,
    BAD_REQUEST : 400,
    UNAUTHORISED : 403,
    NOT_FOUND : 404,
    INTERNAL_ERROR : 500
}

class AppError extends Error {
    constructor(name, statusCode, desc) {
        super(desc)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode
        this.description, desc

        Error.captureStackTrace(this)
    }
}

// 500 : INTERNAL ERROR
class API_ERROR extends AppError {
    constructor(desc = "API error") {
        super("API Internal Error", STATUS_CODES.INTERNAL_ERROR, desc)
        
    }
}

// 400 : BAD REQUEST
class Validation_Error extends AppError {
    constructor(desc = "API error") {
        super("API Internal Error", STATUS_CODES.INTERNAL_ERROR, desc)
    
    }
}

// 500 : AUTHORISATION ERROR
class API_ERROR extends AppError {
    constructor(desc = "API error") {
        super("API Internal Error", STATUS_CODES.INTERNAL_ERROR, desc)
        
    }
}

// 500 : INTERNAL ERROR
class API_ERROR extends AppError {
    constructor(desc = "API error") {
        super("API Internal Error", STATUS_CODES.INTERNAL_ERROR, desc)
        
    }
}