const express = require('express')
const app = express()
const api = require('./src/api/index')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {PORT} = require('./src/config/index')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend domain
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };
  
  app.use(cors(corsOptions));
  
  // Handle preflight requests
  app.options('*', cors(corsOptions));

app.use('/', api)


app.listen(PORT, ()=> console.log(`Batch service running at http://localhost:${PORT}`))
