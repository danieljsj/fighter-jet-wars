const env = require('./env');

//////////

const serv = {
	data: false,
	init: init,
}

function init(){ // maybe in some other world this should have callbacks... but ideally the app can sit there and do nothing on false or empty data. so for now I'm leaving this as-is.
	switch (true) {
		case env.isBrowser() : browser_init(); break;
		case env.isCoreServer() : coreServer_init(); break;
		// case env.isAiServer() : coreServer_init(); break;
		default : throw 'env not recognized';
	}
}

//////////

function browser_init() {
	const retrieveThen = require('./env/browser/SnapshotRetrievalService').retrieveThen;
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