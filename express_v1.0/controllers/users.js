const User = require('../models/users')

const createUser = async(req, res) => {
    const user = await User.create(req.body)

    user.save()
    res.render('create', {user})
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find()
        res.render('user', {users})
    } catch (error) {
        console.log(error)
    }   
}

const updateUser = (req, res) => {
    
}

module.exports = {
    createUser,
    getUsers
}