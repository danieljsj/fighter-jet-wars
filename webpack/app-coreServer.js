const SimServ = require('./services/SimulationService');      // start sim first to show that sim won't explode if game data is false or empty
const initGDS = require('./services/GameDataService').init;

const server = require('./services/env/coreServer/server');

////////

SimServ.start();
initGDS();

server.start();








//////////// DEBUG /////
//////////// DEBUG /////
//////////// DEBUG /////


// const FirebaseRefService = require('./services/FirebaseRefService');

// FirebaseRefService.initThen(function(){
// 	const ref = FirebaseRefService.ref;
// 	const testRef = ref.child('test/coreServerSetData');
// 	testRef.push().set({foo:'bar'}, function(err){
// 		if (err) throw err;
// 		console.log('foo set to bar');
// 	});
// });