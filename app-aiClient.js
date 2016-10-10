require('log-timestamp');

const SimServ = require('./services/SimulationService');      // start sim first to show that sim won't explode if game data is false or empty

const AiControlsService = require('./services/env/aiClient/AiControlsService');
const GD = require('./services/models/components/nulls/GD');

const FirebaseRefService = require('./services/FirebaseRefService');

////////

const mainSim = new SimServ.Simulation({gD: new GD()});

mainSim.start();

AiControlsService.start(mainSim);