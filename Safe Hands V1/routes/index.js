var express = require('express');
var router = express.Router();
var User = require('../models/user')
var mid = require('../middleware');

//GET / profile
router.get('/profile', mid.requiresLogin, function(req, res, next){
  User.findById(req.session.userId)
    .exec(function (error, user){
      if(error) {
        return next (error);
      } else {
        return res.render('profile', { title: 'Profile', name: user.name});
      }
    });
})


// GET/ login 

router.get('/login', mid.loggedOut, function(req, res, next){
  return res.render('login',{ title: 'Login' });
});

//GET/logout
router.get('/logout', function(req, res, next){
  if(req.session){
    req.session.destroy(function(err){
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    })
  }
});

// POST/ login 

router.post('/login',function(req, res, next){
  if(req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function(error, user){
      if(error || !user ){
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);

      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else{
    var err = new Error("Email and password are required");
    err.status = 401;
    return next(err);
  }
});

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

router.get('/register', mid.loggedOut, function(req, res, next) {
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
          req.session.userID = user._id;
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
