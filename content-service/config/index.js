require('dotenv').config()

const devURI = 'mongodb+srv://summerprojectssarv:mongodbssarv167@cluster0.ghdnllc.mongodb.net/test'

module.exports = {
    PORT : process.env.PORT || 5002,
    DB_URI : process.env.MONGO_URI || devURI
}