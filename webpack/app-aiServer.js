require('log-timestamp');

const SimServ = require('./services/SimulationService');      // start sim first to show that sim won't explode if game data is false or empty
const initGDS = require('./services/GameDataService').init;

const ControlsService = require('./services/env/aiServer/ControlsService');

const FirebaseRefService = require('./services/FirebaseRefService');

////////

SimServ.start();
initGDS();

ControlsService.start();