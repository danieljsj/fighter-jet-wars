require('log-timestamp');

const SimServ = require('./services/SimulationS');      // start sim first to show that sim won't explode if game data is false or empty

const AiControlsS = require('./services/env/aiClient/AiControlsS');
const GD = require('./services/models/components/empties/GD');

////////

const mainSim = new SimServ.Simulation({gD: new GD()});

mainSim.start();

AiControlsS.start(mainSim);