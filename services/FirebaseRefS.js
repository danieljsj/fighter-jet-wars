'use strict';

const firebase = require("firebase");
const ParamsS = require('./ParamsS');
const env = require('./env');
const ToLog = require('./ToLog');

var serv = {
	ref: false,
	app: false,
	getOffset: getOffset,
	initThen: initThen,
}


function initThen(cb){

	if (serv.ref) return cb();

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
	cb();

}




let _offset;
let _offsetRef;

initThen(function(){ // todo: maybe figure out smarter ways of init'ing everything in a cool async waterfall or whatever.
  _offsetRef = serv.ref.child(".info/serverTimeOffset");
  _updateOffset();
  setInterval(_updateOffset, 1000);
});

function _updateOffset(){
	_offsetRef.on("value", function(ss) {
    	_offset = ss.val();
    	if (ToLog.fbOffset) console.log("updated offset to",ss.val());
	});
}


function getOffset(){
	return _offset || 0;
}

module.exports = {
	getOffset: getOffset,
}


module.exports = serv;