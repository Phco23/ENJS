const User = require('../models/user')
const Swal = require('sweetalert2')
const brcypt = require('bcrypt')

const account = (req, res) => {
    res.render('account')
}

const index = (req, res) => {
    res.render('index', { userName: req.session.userName })
}

const shop = (req, res) => {
    res.render('shop', { userName: req.session.userName })
}

const signup = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user){
        res.json({
            message: "User already exist"
        })
    }else{
        const salt = 10 
        const hashedPassword = await brcypt.hash(password, salt)

        req.body.password = hashedPassword

        const response = await User.create(req.body)
        res.json({ success: true, message: "User created successfully!" })
        console.log(response)
    }
}

const login = async(req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            res.send("User not found!")
        }

        const passwordMatch = await brcypt.compare(password, user.password)
        if(passwordMatch){
            req.session.userId = user._id
            req.session.userName = user.name

            res.json({success: true, message: "Login successful"})

        }else{
            res.json({message: "Wrong password"})
        }

    } catch (error) {
        res.json({ message: error })
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.json({ success: false, message: "Logout failed!" });
        }
        res.redirect('/')
    })
}

module.exports = {
    account,
    signup,
    login,
    logout,
    index,
    shop
}