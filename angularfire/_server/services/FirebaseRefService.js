'use strict';

var Firebase = require('firebase');
var FirebaseTokenGenerator = require("firebase-token-generator");


//////////


var ref = false;

function initThen(cb){

	if (ref) return cb();

	var fbSecret = 'M6mwQVaUkf0wrVd0I0aQIvM5QS1TW5Z2hbNguWol';
	var tokenGenerator = new FirebaseTokenGenerator(fbSecret);
	var token = tokenGenerator.createToken(
	   {uid: "my-awesome-server"}, 
	   {expires: (new Date).getTime() + 3600*24*7}
	);
	ref = new Firebase("https://fighter-jets-oldfire.firebaseio.com");

	ref.authWithCustomToken(token, function(error, authData) {
	    console.log("|||||| error |||||| ",error);
		console.log("|||||| authData |||||| ", authData);
	    cb(ref); // seems a little wierd...
	});

}

function getRef(){
	return ref;
}


/////////

module.exports = {
	initThen: initThen,
	getRef: getRef,
}