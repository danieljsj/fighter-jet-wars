const SimServ = require('./services/SimulationS');      // start sim first to show that sim won't explode if game data is false or empty
const GD = require('./services/models/components/empties/GD');

const initCanvas = require('./services/env/browser/SkyCanvasS').initCanvas;
const KeyboardControlsS = require('./services/env/browser/KeyboardControlsS');

/////

const mainSim = new SimServ.Simulation({gD: new GD()});

mainSim.start();

initCanvas(mainSim);
KeyboardControlsS.start(mainSim);

require('./assets/sass/style-loader.scss');