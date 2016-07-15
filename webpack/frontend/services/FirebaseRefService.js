'use strict';

const Firebase = require('firebase');
const GameParamsService = require('../../common/services/GameParamsService');


function initThen(cb){
	
	if (service.ref) return cb();

	service.ref = new Firebase(GameParamsService.params.firebaseUrl);

	cb(); // in the future, this may be in an async callback after some auth or something, but for now it's fine to put it sync, as just initing an FB is sync, doesn't take a network call.

}

const service = {
	ref: false,
	initThen: initThen,
}

module.exports = service;