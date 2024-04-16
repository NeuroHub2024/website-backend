const express = require('express')
const app = express()
const api = require('./src/api/index')
const cookieParser = require('cookie-parser')
const {PORT} = require('./src/config/index')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/', api)

app.listen(PORT, ()=> console.log(`User service running at http://localhost:${PORT}`))
