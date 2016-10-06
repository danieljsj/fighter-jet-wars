require('log-timestamp');

const SimServ = require('./services/SimulationServiceNEW');      // start sim first to show that sim won't explode if game data is false or empty
const initGDS = require('./services/GameDataService').init;

const GD = require('./services/models/components/nulls/GD');

////////

const mainSim = new SimServ.Simulation({gD: new GD()}); // going to need an initializer...


mainSim.start();