const { response } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
var cors = require('cors')


const app = express()
app.use(cors({ 
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'Origin', 
        'x-access-token', 
        'XSRF-TOKEN'
    ], 
    preflightContinue: false 
})) // this uses default values

// Configuring express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Configuring database - mongoose is going to be connected to mongodb
mongoose.connect("mongodb://localhost:27017/crud-employee", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => {
        console.log('mongodb connected successfully')
    }).catch(err => {
        console.log('db conn failed')
    })

// Configring routes
const defaultRoutes = require('./routes/defaultRoutes')
app.use('/', defaultRoutes)


// Listening on port
app.listen(3000, () => {
    console.log(`server is running on p no 3000`)
})
