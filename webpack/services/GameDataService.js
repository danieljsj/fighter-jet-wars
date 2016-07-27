const env = require('./env');
const snapshotRetrievalInterval = require('./GameParamsService').params.snapshotRetrievalInterval;

//////////

const serv = {
	data: false,
	init: init,
}

function init(){ // maybe in some other world this should have callbacks... but ideally the app can sit there and do nothing on false or empty data. so for now I'm leaving this as-is.
	switch (true) {
		
		case env.isBrowser() : 
		case env.isAiClient() :

			client_init(); break;
		
		case env.isCoreServer() : 
		
			coreServer_init(); break;
		
		default : 

			throw 'env not recognized';
	}
}

//////////

function client_init() {

	doSnapshotRetrieval();
}

function doSnapshotRetrieval(){
	const retrieveThen = require('./env/client/SnapshotRetrievalService').retrieveThen; // TODO: move to './client'
	const makeGD = require('./SnapshotService').makeGameDataFromSnapshot;
	
	retrieveThen(function(snapshot){
		serv.data = makeGD(snapshot);
	});
	setTimeout(doSnapshotRetrieval,snapshotRetrievalInterval);
}

/////////


function coreServer_init() {
	const init = require('./env/coreServer/GameDataInitiationService').run; // seems not very dependency injected... but... oh well...

	init();
}



/////////

module.exports = serv;