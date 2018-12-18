var express = require('express');
var router = express.Router();
var User = require('../models/user')

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

//GET/register

router.get('/register', function(req, res, next) {
  return res.render('register',{title:'Sign Up'});
});

//POST/register

router.post('/register', function(req, res, next) {
  if (req.body.name &&
    req.body.password &&
    req.body.confirmPassword){

      //confirm that password and confirmpassword are the same 
      if (req.body.password !== req.body.confirmPassword) {
        var err =  new Error('Password do not match.');
        err.status = 400; 
        return next(err);
      } 

      var userData = {
        email : req.body.email,
        name : req.body.name,
        password : req.body.password
      };

      // use schema create method to insert document into Mongo

      User.create(userData, function (error, user){
        if (error) {
          return next(error);
        } else {
          return res.redirect('/profile');
        }
      });
  } else {
    var err = new Error('All field required.');
    err.status = 400;
    return next(err);
  }
})


router.get('/evidence', function(req, res, next) {
  return res.render('evidence',{title:'Evidence'});
});

router.get('/depositchecker', function(req, res, next) {
  return res.render('depositchecker',{title:'Deposit Checker'});
});

router.get('/services' , function(req, res, next) {
  return res.render('services',{title:'Services'});
});


module.exports = router;
