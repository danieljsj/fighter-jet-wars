const Firebase = require('firebase');
const GameParamsService = require('./GameParamsService');

const env = require('./EnvService').env;
const envs = require('./EnvService').envs;

var serv = {
	ref: false,
	initThen: initThen,
}


function initThen(callback){

	if (serv.ref) return callback();

	serv.ref = new Firebase(GameParamsService.params.firebaseUrl);

	switch (env()) {

		case envs.BROWSER : 

			callback();

			break;

		case envs.CORE_SEVER : 

			// TODO: put these into a config file
			var fbSecret = 'M6mwQVaUkf0wrVd0I0aQIvM5QS1TW5Z2hbNguWol';
			var tokenGenerator = new FirebaseTokenGenerator(fbSecret);
			var token = tokenGenerator.createToken(
			   {uid: "my-awesome-server"}, 
			   {expires: (new Date).getTime() + 3600*24*7}
			);

			serv.ref.authWithCustomToken(token, function(error, authData) {

			    callback();

			});
			
			break;

	}


}

module.exports = serv;