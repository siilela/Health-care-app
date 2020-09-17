var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
//var emailClient = require('../models/mailcontroller');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Search 
router.get('/search', function(req, res) {
  res.render('search');
});

// Search for user 
router.post('/search', function(req, res) {
  var idNumber = req.body.idNumber;

});

// Register User
router.post('/register', function(req, res){
    var username = req.body.username;
	  var name = req.body.name;
    var surname = req.body.surname;
    var idNumber = req.body.idNumber;
    var email_address = req.body.email_address;
    var gender = req.body.gender;
    var age = req.body.age;
    var kin_name = req.body.kin_name;
    var kin_numbers = req.body.kin_numbers;
    var kin_email = req.body.kin_email;
    var doctors_name = req.body.doctors_name;
    var doctors_numbers = req.body.doctors_numbers;
    var doctors_email = req.body.doctors_email;
    var medical_aid = req.body.medical_aid;
    var diagnosis = req.body.diagnosis;
	  var password = req.body.password;
	  var password2 = req.body.password2;


	// Validation
/*    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('surname', 'Surname is required').notEmpty();
    req.checkBody('emailAddress', 'Email address is required').notEmpty();
    req.checkBody('emailAddress', 'Email address is not valid').isEmail();
    req.checkBody('gender', 'Gender is not valid').notEmpty();
    req.checkBody('age', 'Age is not valid').notEmpty();
    req.checkBody('kinName', 'Next of kin name is not valid').notEmpty();
    req.checkBody('kinNumbers', 'Next of kin numbers is not valid').notEmpty();
    req.checkBody('kinEmail', ' Next of kin numbers email address is not valid').notEmpty();
    req.checkBody('kinEmail', ' Next of kin numbers email address is not valid').isEmail();
    req.checkBody('doctorName', 'Doctors name is required').notEmpty();
    req.checkBody('doctorEmail', 'Doctors email  is required').notEmpty();
    req.checkBody('doctorEmail', 'Doctors email  is required').isEmail();
    req.checkBody('medicalAid', 'Medical aid name is required').notEmpty();
    req.checkBody('diagnosis', 'Diagnosis is required').notEmpty();	
    req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password); */

	var errors = req.validationErrors();

	if(errors) {

		res.render('register',{
		errors:errors
		});
	} else {

		var newUser = new User({
    username: username,
		name: name,
    surname: surname,
    email_address: email_address,
    idNumber: idNumber,
    gender: gender,
    age: age,
    kin_name: kin_name,
    kin_numbers: kin_numbers,
    kin_name: kin_name,
    doctors_name: doctors_name,
    doctors_numbers: doctors_numbers, 
    doctors_email: doctors_email,
    medical_aid: medical_aid,
    diagnosis: diagnosis,
    password: password

		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) { 
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){  
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;