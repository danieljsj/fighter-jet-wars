const env = require('./env');

//////////

const serv = {
	data: false,
	init: init,
}

function init(){ // maybe in some other world this should have callbacks... but ideally the app can sit there and do nothing on false or empty data. so for now I'm leaving this as-is.
	switch (true) {
		
		case env.isBrowser() : 
		case env.isAiServer() :

			client_init(); break;
		
		case env.isCoreServer() : 
		
			coreServer_init(); break;
		
		default : 

			throw 'env not recognized';
	}
}

//////////

function client_init() {
	const retrieveThen = require('./env/browser/SnapshotRetrievalService').retrieveThen; // TODO: move to './client'
	const makeGD = require('./SnapshotService').makeGameDataFromSnapshot;

	retrieveThen(function(snapshot){
		serv.data = makeGD(snapshot);
	});
}

function coreServer_init() {
	const init = require('./env/coreServer/GameDataInitiationService').run; // seems not very dependency injected... but... oh well...

	init();
}



/////////

module.exports = serv;