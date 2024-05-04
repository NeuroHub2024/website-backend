const express = require('express')
const app = express()
const api = require('./src/api/index')
const cookieParser = require('cookie-parser')
const {PORT} = require('./src/config/index')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use('/', api)

app.use((error, req, res, next)=>{
    const statusCode = error.statusCode || 500
    const message = error.message
    return res.status(statusCode).json({message: message})
})

app.listen(PORT, ()=> console.log(`User service running at http://localhost:${PORT}`))
