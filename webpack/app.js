const env = require('./services/env');
const SimServ = require('./services/SimulationService');      // start sim first to show that sim won't explode if game data is false or empty
const initGDS = require('./services/GameDataService').init;


SimServ.start();
initGDS();
if (env.isCoreServer()){
	const server = require('./services/env/coreServer/server');
	server.start();
}