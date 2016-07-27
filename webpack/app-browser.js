require('log-timestamp');

const SimServ = require('./services/SimulationService');      // start sim first to show that sim won't explode if game data is false or empty
const initGDS = require('./services/GameDataService').init;

const initCanvas = require('./services/env/browser/SkyCanvasService').initCanvas;
const KeyboardControlsService = require('./services/env/browser/KeyboardControlsService');

/////

SimServ.start();
initGDS();

initCanvas();
KeyboardControlsService.start();

require('./assets/sass/style.scss');