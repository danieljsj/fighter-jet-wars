const SimServ = require('./services/SimulationService');      // start sim first to show that sim won't explode if game data is false or empty
const initGDS = require('./services/GameDataService').init;

const SkyCanvasService = require('./services/env/browser/SkyCanvasService');
const KeyboardControlsService = require('./services/env/browser/KeyboardControlsService');

/////

SimServ.start();
initGDS();

SkyCanvasService.initCanvas();
KeyboardControlsService.start();

require('./assets/sass/style.scss');