const ES = require('./EnvService'); const env = ES.env; const envs = ES.envs;

//////////

const serv = {
	data: false,
	init: init,
}

function init(){ // maybe in some other world this should have callbacks... but ideally the app can sit there and do nothing on false or empty data. so for now I'm leaving this as-is.
	switch (env()) {
		case envs.BROWSER : browser_init(); break;
		case envs.CORE_SERVER : coreServer_init(); break;
		// case envs.AI_SERVER : aiServerInit(); break;
	}
}

//////////

function browser_init() {
	const retrieveThen = require('./SnapshotRetrievalService').retrieveThen;
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