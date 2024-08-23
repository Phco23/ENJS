const mongoose = require('mongoose')
const express = require('express')
const User = require('./models/users')
const app = express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/ENJS")
    .then(() => {
        console.log("Conenction successfully")
    })
    .catch(() => {
        console.log("Unable to connect database")
    })

app.post('/user', (req, res) => {
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
})

app.get("/user", (req, res) => {
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
    })


app.listen(5000, () => {
    console.log(`App listen on port ${5000}`)
})