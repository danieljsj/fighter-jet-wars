const Firebase = require('firebase');
const GameParamsService = require('./GameParamsService');
const FirebaseTokenGenerator = require('firebase-token-generator');

const env = require('./env');

var serv = {
	ref: false,
	initThen: initThen,
}


function initThen(callback){

	if (serv.ref) return callback();

	serv.ref = new Firebase(GameParamsService.params.firebaseUrl);

	switch (true) {

		case env.isBrowser() : 

			callback();

			break;

		case env.isCoreServer() : 

			// TODO: put these into a config file
			var fbSecret = 'M6mwQVaUkf0wrVd0I0aQIvM5QS1TW5Z2hbNguWol';
			var tokenGenerator = new FirebaseTokenGenerator(fbSecret);
			var token = tokenGenerator.createToken(
			   {uid: "my-awesome-server"}, 
			   {expires: (new Date).getTime() + 3600*24*7}
			);

			serv.ref.authWithCustomToken(token, function(error, authData) {
				if (error) throw error;
				console.log('authData',authData);
			    callback();

			});
			
			break;

		default : 

			throw 'env not recognized';

	}


}

module.exports = serv;