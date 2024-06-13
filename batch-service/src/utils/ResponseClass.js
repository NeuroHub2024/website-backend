// THIS CLASS CONTAINS THE CLASS FOR RESPONSE

class RequestResponse{
    constructor(data, message="Request successfull", status=200){
        this.data = data
        this.message = message
        this.status = status
    }

}

module.exports = RequestResponse