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
  return res.send('User Created');
});


router.get('/evidence', function(req, res, next) {
  return res.render('evidence',{title:'Evidence'});
});

router.get('/depositchecker', function(req, res, next) {
  return res.render('depositchecker',{title:'Deposit Checker'});
});


module.exports = router;
