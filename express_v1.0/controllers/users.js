const User = require("../models/users")

const createUser = (req, res) => {
    console.log(req.body)
    const user = new User(req.body)

    user.save()
        .then(() => {
        res.status(200).json({
                messsage: "Successfully"
            })
    }).catch((err) => {
        res.status(500).json({  
            messsage: err
        })
    }) 
}

const getUsers = (req, res) => {
    var users = User.find()
        .then((user) => {
            res.status(200).json({
            messsage: "Get user success",
            userData: user
            })
        }).catch((err) => {
            res.status(500).json({
                messsage: "Unsuccessful",
                userData: err
            })
        })
    }

const updateUser = (req, res) => {
    
}

module.exports = {
    createUser,
    getUsers
}