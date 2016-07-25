const SimServ = require('./services/SimulationService');      // start sim first to show that sim won't explode if game data is false or empty
const initGDS = require('./services/GameDataService').init;

const ControlsService = require('./services/env/aiServer/ControlsService');

////////

SimServ.start();
initGDS();

ControlsService.start();



const FirebaseRefService = require('./services/FirebaseRefService');

FirebaseRefService.initThen(function(){
	const ref = FirebaseRefService.ref;
	console.log('about to set foo to bar (i.e. testing fb data send from root file of app...)');
	const testRef = ref.child('test/aiServerSetData');
	testRef.push().set({foo:'bar'}, function onComplete(err){
		if (err) throw err;
		console.log('foo set to bar (fb send from root file of app successful.)');
	});
});