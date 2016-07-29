require('log-timestamp');

const SimServ = require('./services/SimulationServiceNEW');      // start sim first to show that sim won't explode if game data is false or empty
const initGDS = require('./services/GameDataService').init;

const server = require('./services/env/server/server');

////////

const gD = .............

const mainSim = new SimServ.Simulation({gD:});

mainSim.start();
initGDS();

server.start();