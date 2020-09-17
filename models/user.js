var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Users Schema
var UserSchema = mongoose.Schema({
        username: {
		type: String,
		index:true
	},
        name: {
                type: String,
        },
        surname: {
                type: String
        },
        email: {
                type: String
        },
        idNumber: {
                type: String
        },
        gender: {
                type: String
        },
        age: {
                type: String
        },
        kin_name: {
                type: String
        },
        kin_numbers: {
                type: String
        },
        kin_email: {
                type: String
        },
        doctors_name: {
            type: String
        }, 
        doctors_numbers: {
            type: String
        },
        doctors_email: {
            type: String
        }, 
        medical_aid: {
            type: String
        }, 
        diagnosis: {
            type: String
        }, 
        password: {
	    type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserIdNumber = function(idNumber, callback){
        var query = {idNumber: idNumber};
        User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback){
        var query = {email: email};
        User.findOne(query, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}