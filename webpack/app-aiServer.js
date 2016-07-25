const SimServ = require('./services/SimulationService');      // start sim first to show that sim won't explode if game data is false or empty
const initGDS = require('./services/GameDataService').init;

const ControlsService = require('./services/env/aiServer/ControlsService');

////////

SimServ.start();
initGDS();

ControlsService.start();