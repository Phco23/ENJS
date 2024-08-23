const mongoose = require('mongoose'); // Erase if already required

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    fullname:{
        type: String
    },
    address:{
        type: String
    },
    age:{
        type: Number
    }
});

const User = mongoose.model("User", userSchema)

module.exports = User