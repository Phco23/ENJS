var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var users = [
    {
      name: "Nguyen Van A",
      email: "email1@gmail.com",
      address: "Ha Noi"
    },
    {
      name: "Nguyen Van B",
      email: "email2@gmail.com",
      address: "Da Nang"
    },
    {
      name: "Nguyen Van C",
      email: "email3@gmail.com",
      address: "Ho Chi Minh"
    }
  ];

  res.render('index', {users});
});

module.exports = router;
