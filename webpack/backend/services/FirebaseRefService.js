'use strict';

var Firebase = require('firebase');
var FirebaseTokenGenerator = require("firebase-token-generator");

const GameParamsService = require('../../services/GameParamsService');

//////////



var service = {
	ref: false,
	getRef: getRef,
	initThen: initThen,
}


function initThen(cb){

	if (service.ref) return cb();

	var fbSecret = 'M6mwQVaUkf0wrVd0I0aQIvM5QS1TW5Z2hbNguWol';
	var tokenGenerator = new FirebaseTokenGenerator(fbSecret);
	var token = tokenGenerator.createToken(
	   {uid: "my-awesome-server"}, 
	   {expires: (new Date).getTime() + 3600*24*7}
	);
	service.ref = new Firebase(GameParamsService.params.firebaseUrl);

	service.ref.authWithCustomToken(token, function(error, authData) {
	    cb(service.ref);
	});

}

function getRef(){
	return service.ref;
}


/////////

module.exports = service;