const env = require('./services/env');
const SimServ = require('./services/SimulationService');      // start sim first to show that sim won't explode if game data is false or empty
const initGDS = require('./services/GameDataService').init;

if (env.isBrowser()) {
	var SkyCanvasService = require('./services/env/browser/SkyCanvasService');
	var KeyboardControlsService = require('./services/env/browser/KeyboardControlsService');
}

/////

SimServ.start();
initGDS();

if (env.isCoreServer()){
	const server = require('./services/env/coreServer/server');
	server.start();
}

if (env.isBrowser()){
	SkyCanvasService.initCanvas();
	KeyboardControlsService.start();
}