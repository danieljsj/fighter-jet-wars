'use strict';

var Firebase = require('firebase');
var FirebaseTokenGenerator = require("firebase-token-generator");

const GameParamsService = require('../../common/services/GameParamsService');

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
	ref = new Firebase(GameParamsService.params.firebaseUrl);

	ref.authWithCustomToken(token, function(error, authData) {
	    cb(ref);
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
if ('undefined' != typeof define) {
	define([], function(){
		return module.exports;
	});
}