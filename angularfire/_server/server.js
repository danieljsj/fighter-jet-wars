var FirebaseRefService = require('./services/FirebaseRefService');
var SimulationService = require('./services/SimulationService');

FirebaseRefService.authThen(function(ref){
	SimulationService.simulate(ref);
});