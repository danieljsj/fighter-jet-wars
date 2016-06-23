module.exports.authThen = authThen;


function authThen(cb){

	var Firebase = require('firebase');

	var FirebaseTokenGenerator = require("firebase-token-generator");
	var fbSecret = 'M6mwQVaUkf0wrVd0I0aQIvM5QS1TW5Z2hbNguWol';
	var tokenGenerator = new FirebaseTokenGenerator(fbSecret);
	var token = tokenGenerator.createToken(
	   {uid: "my-awesome-server"}, 
	   {expires: 3600*24*7}
	);
	var ref = new Firebase("https://fighter-jets-oldfire.firebaseio.com");

	ref.authWithCustomToken(token, function(error, authData) {
	    console.log(error,authData);
	    cb(ref); // seems a little wierd...
	});

}