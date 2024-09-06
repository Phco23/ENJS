const express = require("express");
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const users = require("../models/users");

//image upload
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage: storage,
}).single("image");


//insert an user into database router
router.post('/add', upload, (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });
    user.save((err) => {
        if(err){
            response.json({message: err.message, type: 'danger'});
        }else {
            req.session.message = {
                type: 'success',
                message: "User adder successfully!",
            },
            res.redirect("/");
        }
    });
});
//get all users router
// router.get('/', async (req, res) => {
//     try {
//       const data = await User.find({});
//     // userArray | listUser | users = danh sách user
//     // user = 1 thông tin của user
//       res.render('index', { users :data, title: 'My Page Title'});
//     //   res.render('layout/header', { title: 'My Page Title' });
//     } catch (error) {
//       console.error('Error occurred:', error);
//       res.status(500).send('An error occurred');
//     }
//   });


router.get("/", (req, res) => {
    User.find().exec((err, users) => {
        if(err) {
        res.json({ message: err.message });
        
    } else {
        res.render('index', {
            title: 'Home Page',
            users: users,
        })
    }
})
});

router.get('/add', (req, res) => {
    res.render("add_users", { title: "Add Users" });
});
//edit an user route
router.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if(err) {
            res.redirect('/');
        } else {
            if(user == null) {
                res.redirect('/');
            } else {
                res.render("edit_users", {
                    title: "Edit User",
                    user: user,
                });
            }
        }
    });
});

// delete user route

router.get("/delete/:id", (req, res) => {
    let id = req.params.id;
    User.findByIdAndRemove(id, (err, result) =>{
        if(result.image != "") {
            try{
                fs.unlinkSync("./uploads/" + result.image);
            } catch(err) {
                console.log(err);
            }
            } 
            if (err) {
                res.json({ message: err.message });
            } else {
                req.session.message = {
                    type: "info",
                    message: "User deleted successfully!",
                };
                res.redirect("/");
            }
        });
    })
module.exports = router;

