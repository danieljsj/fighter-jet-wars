'use strict';

var FirebaseRefService = require('./services/FirebaseRefService');
var SimulationService = require('./services/SimulationService');

// todo: switch to some cool async waterfall or something
FirebaseRefService.initThen(function(){
	SimulationService.start();
});