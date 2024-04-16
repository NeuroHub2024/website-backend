const express = require('express')
const app = express()
const PORT = 3001

app.get('/', (req, res)=> {
    res.send('User running here')
})

app.listen(PORT, ()=> console.log(`User service running at http://localhost:${PORT}`))
