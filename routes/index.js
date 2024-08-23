var express = require('express');
const userRouter = require("./users")

const initRoutes = (app) => {
    app.use('/api', userRouter)
}  

module.exports = initRoutes;
