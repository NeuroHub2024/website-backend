// THIS CLASS CONTAINS CUSTOM ERRORS THAT WILL BE USED THROUGHOUT THE SERVICE

const STATUS_CODES = {
    OK : 200,
    BAD_REQUEST : 400,
    UNAUTHORISED : 401,
    NOT_FOUND : 404,
    INTERNAL_ERROR : 500
}

class AppError extends Error {
    constructor(name, statusCode, desc) {
        super(desc)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.status = statusCode
        this.description, desc

        Error.captureStackTrace(this)
    }
}

// 500 : INTERNAL ERROR
class ApiError extends AppError {
    constructor(desc = "API error") {
        super("API Internal Error", STATUS_CODES.INTERNAL_ERROR, desc)
        
    }
}

// 400 : BAD REQUEST
class ValidationError extends AppError {
    constructor(desc = "Validation Error") {
        super("Validation Error", STATUS_CODES.BAD_REQUEST, desc)
    
    }
}

// 401 : AUTHORISATION ERROR
class AuthorisationError extends AppError {
    constructor(desc = "Authorisation Error") {
        super("Authorisation Error", STATUS_CODES.UNAUTHORISED, desc)
        
    }
}

// 404 : NOT FOUND ERROR
class NotFoundError extends AppError {
    constructor(desc = "API error") {
        super("API Internal Error", STATUS_CODES.NOT_FOUND, desc)
        
    }
}

module.exports = {ApiError, ValidationError, AuthorisationError, NotFoundError}