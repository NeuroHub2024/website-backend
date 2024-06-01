require('dotenv').config()

module.exports = {
    PORT : process.env.PORT || 5001,
    DB_URI : process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}