const userRouter = require("./users")

const initRoutes = (app) => {
    app.use('/', userRouter)
}  



module.exports = initRoutes;
