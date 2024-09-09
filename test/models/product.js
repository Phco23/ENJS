const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var Product = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    
});

//Export the model
module.exports = mongoose.model('Product', Product);