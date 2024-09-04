var express = require('express');
var userRouter = express.Router();
const {createUser, getUsers} = require('../controllers/users')

userRouter.post('/create', createUser)
userRouter.get('/user', getUsers)

module.exports = userRouter;
