//import
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery',true)


//database connection
const connect = mongoose.connect('mongodb://localhost:27017/ENJS')
// mongoose.connect(process.env.DB_URI,  {useNewParser: true, useUnifiendTopology: true });
// const db =mongoose.connect;
// db.on("error", (error) => console.log(error));
// db.once("open", ()=> console.log("Connection to the database!"));

// var mongoDB = 'mongodb://localhost/ENJS';
// mongoose.connect(mongoDB, {useNewUrlParser: true });
// mongoose.Promise = global.Promise;
// var db = mongoose.Connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error'));

//milddlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
})
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// app.use(express.static("uploads"));

//set temple engine
app.set('view engine', 'ejs');


//router prefix
app.use("", require("./routes/routes"));

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});