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
    const {email, password, name} = req.body
    if(!email || !password || !name){
        return res.json({
            message: "Missing input"
        })
    }
    const user = await User.findOne({email})
    if(user){
        return res.json({
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
            return res.json({message:"User not found!" })
        }

        const passwordMatch = await brcypt.compare(password, user.password)
        if(passwordMatch){
            req.session.userId = user._id
            req.session.userName = user.name

            res.json({success: true, message: "Login successful"})

        }else{
            return res.json({message: "Wrong password"})
        }

    } catch (error) {
        return res.json({ message: error })
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