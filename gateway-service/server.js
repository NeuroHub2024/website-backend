const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const config = require('./config/index')
const swagger = require('./swagger');

const app = express()

app.use('/api', swagger.serve, swagger.setup);


app.get('/', (req, res)=>{
    res.send('Gateway service running here')
})

//#region GATEWAY ROUTES
// USER SERVICE
app.use('/user', createProxyMiddleware({
    target: 'https://user-service-4wcl.onrender.com',
    changeOrigin: true,
}))

// BATCH SERVICE
app.use('/batch', createProxyMiddleware({
    target: 'https://batch-service.onrender.com',
    changeOrigin: true
}))

// CONTENT SERVICE
app.use('/lecture', createProxyMiddleware({
    target: 'https://content-service-ib0m.onrender.com',
    changeOrigin: true
}))

// ASSIGNMENT SERVICE
app.use('/assignment', createProxyMiddleware({
    target: 'https://assignment-service-7w4r.onrender.com',
    
    changeOrigin: true
    
}))
// ANNOUNCEMENT SERVICE
const announcementUrl = `${config.BASE_URL}+${config.ANNOUNCEMENT_PORT}`;
console.log(`Announcement URL: ${announcementUrl}`); 

app.use('/announcement', createProxyMiddleware({
    target: 'http://localhost:5008',
    changeOrigin: true
}));

// TEST SERVICE
//#endregion GATEWAY ROUTES END

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

app.listen(5000, ()=> console.log(`Gateway service running at http://localhost:5000`))

