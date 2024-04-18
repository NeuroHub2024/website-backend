require('dotenv').config()

const devURI = 'mongodb+srv://vaibhavbajpai:mongodb@1207@cluster0.sibgrep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

module.exports = {
    PORT : process.env.PORT || 5001,
    DB_URI : process.env.MONGO_URI || devURI
}