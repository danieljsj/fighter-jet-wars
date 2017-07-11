'use strict';

const firebase = require("firebase");
const ParamsService = require('./ParamsService');
const env = require('./env');


var serv = {
	ref: false,
	app: false,
	initThen: initThen,
}


function initThen(callback){

	if (serv.ref) return callback();

	var config = {
		authDomain: "fighter-jets.firebaseapp.com",
	    databaseURL: "https://fighter-jets.firebaseio.com",
	    storageBucket: "fighter-jets.appspot.com",
	}

	switch (true) {

		case env.isBrowser() : 
			config.apiKey = "AIzaSyB0wRqUQWX0nfOl7TC8ydGgs0MGXnLJ_9Y";
			break;
		case env.isNodejs() : 
			config.serviceAccount = "firebase-service-account.json";
			break;
		default : 
			throw 'env not recognized';
	}

	serv.app = firebase.initializeApp(config); // HOPING THIS IS ALSO TRUE FOR THE BROWSER: initializeApp is synchronous: http://stackoverflow.com/questions/37527247/firebase-initializeapp-callback-promise
	serv.ref = firebase.database().ref();
	callback();

}

module.exports = serv;