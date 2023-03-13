const express = require('express')
const mongoose = require('mongoose')
const geozoneRouter = require('./routes/geozoneRoute')
const config = require('./config')
const PORT = config.serverPort || 4005

const app = express()

app.use(express.json())
app.use('/api', geozoneRouter)

const start = async () => {
    try {
        await mongoose.connect(config.dbUrl)
        app.listen(PORT, ()=>{console.log(`server started${PORT}`)})
    } catch (e) {
        console.log(e)
    }
}

start()