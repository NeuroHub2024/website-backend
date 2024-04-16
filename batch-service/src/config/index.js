require('dotenv').config()

const devURI = 'mongodb+srv://vaibhavbajpai:mongodb@1207@cluster0.sibgrep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

module.exports = {
    port : process.env.PORT || 3002,
    dbURI : process.env.MONGO_URI || devURI
}