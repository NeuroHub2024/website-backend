const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')
const cookieParser = require('cookie-parser')
const config = require('./config/index')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.send('Gateway service running here')
})

//#region GATEWAY ROUTES
app.use('/user', createProxyMiddleware({
    target: config.BASE_URL + config.USER_PORT,
    changeOrigin: true
}))

app.use('/batch', createProxyMiddleware({
    target: config.BASE_URL + config.BATCH_PORT,
    changeOrigin: true
}))
//#endregion GATEWAY ROUTES END

app.listen(config.GATEWAY_PORT, ()=> console.log(`Gateway service running at ${config.BASE_URL + config.GATEWAY_PORT}`))