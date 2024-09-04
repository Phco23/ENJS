const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const route = require('./routes/routes')
const mongoose = require('mongoose')
const session = require('express-session');
const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

const connect = mongoose.connect('mongodb://localhost:27017/pr2rmk')

app.use(session({
    secret: 'dwuadjahdjdjwajfjwdajdwauUYFWUDJW&&$@*#E@', // Change this to a random string for security
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

connect.then(() => {
    console.log("Database connected")
})
.catch(() => {
    console.log("Database connect error")
})


app.set('view engine', 'ejs');

app.use(express.static('public'))

route(app)

const port = 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})