const SimServ = require('./services/SimulationService');      // start sim first to show that sim won't explode if game data is false or empty
const GD = require('./services/models/components/empties/GD');

const initCanvas = require('./services/env/browser/SkyCanvasService').initCanvas;
const KeyboardControlsService = require('./services/env/browser/KeyboardControlsService');

/////

const mainSim = new SimServ.Simulation({gD: new GD()});

mainSim.start();

initCanvas(mainSim);
KeyboardControlsService.start(mainSim);

require('./assets/sass/style.scss');